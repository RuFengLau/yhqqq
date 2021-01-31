import { createUUID } from '../b3.functions';
import { B3Category } from '../constants';
import Tick from './Tick';
import BaseNode from './BaseNode';
import Composite from './Composite';
import Decorator from './Decorator';
import Behavior3TreeConfig from '../config/Behavior3TreeConfig';
import Behavior3NodeConfig from '../config/Behavior3NodeConfig';
import Behavior3Factory from '../config/Behavior3Factory';
import Blackboard from './Blackboard';

/**
 * The BehaviorTree class, as the name implies, represents the Behavior Tree
 * structure.
 *
 * There are two ways to construct a Behavior Tree: by manually setting the
 * root node, or by loading it from a data structure (which can be loaded
 * from a JSON). Both methods are shown in the examples below and better
 * explained in the user guide.
 *
 * The tick method must be called periodically, in order to send the tick
 * signal to all nodes in the tree, starting from the root. The method
 * `BehaviorTree.tick` receives a target object and a blackboard as
 * parameters. The target object can be anything: a game agent, a system, a
 * DOM object, etc. This target is not used by any piece of Behavior3JS,
 * i.e., the target object will only be used by custom nodes.
 *
 * The blackboard is obligatory and must be an instance of `Blackboard`. This
 * requirement is necessary due to the fact that neither `BehaviorTree` or
 * any node will store the execution variables in its own object (e.g., the
 * BT does not store the target, information about opened nodes or number of
 * times the tree was called). But because of this, you only need a single
 * tree instance to control multiple (maybe hundreds) objects.
 *
 * Manual construction of a Behavior Tree
 * --------------------------------------
 *
 *     var tree = new b3.BehaviorTree();
 *
 *     tree.root = new b3.Sequence({children:[
 *       new b3.Priority({children:[
 *         new MyCustomNode(),
 *         new MyCustomNode()
 *       ]}),
 *       ...
 *     ]});
 *
 *
 * Loading a Behavior Tree from data structure
 * -------------------------------------------
 *
 *     var tree = new b3.BehaviorTree();
 *
 *     tree.load({
 *       'title'       : 'Behavior Tree title'
 *       'description' : 'My description'
 *       'root'        : 'node-id-1'
 *       'nodes'       : {
 *         'node-id-1' : {
 *           'name'        : 'Priority', // this is the node type
 *           'title'       : 'Root Node',
 *           'description' : 'Description',
 *           'children'    : ['node-id-2', 'node-id-3'],
 *         },
 *         ...
 *       }
 *     })
 *
 *
 * @module b3
 * @class BehaviorTree
 **/

export default class BehaviorTree {
    /**
     * The tree id, must be unique. By default, created with `createUUID`.
     * @property {String} id
     * @readOnly
     **/
    public id: string;

    /**
     * The tree title.
     * @property {String} title
     * @readonly
     **/
    public title: string;

    /**
     * Description of the tree.
     * @property {String} description
     * @readonly
     **/
    public description: string;

    /**
     * A dictionary with (key-value) properties. Useful to define custom
     * variables in the visual editor.
     *
     * @property {Object} properties
     * @readonly
     **/
    public properties: { [key: string]: string; };

    /**
     * The reference to the root node. Must be an instance of `BaseNode`.
     * @property {BaseNode} root
     **/
    public root: BaseNode;

    /**
     * The reference to the debug instance.
     * @property {Object} debug
     **/
    public debug;
    dumpinfo: any;

    /**
     * Initialization method.
     * @method initialize
     * @constructor
     **/
    constructor() {
        this.id = createUUID();
        this.title = 'The behavior tree';
        this.description = 'Default description';
        this.properties = {};
        this.root = null;
        this.debug = null;
        this.dumpinfo = null;
    }

    public set Debug(debug) {
        this.debug = debug;
    }

    /**
     * This method loads a Behavior Tree from a data structure, populating this
     * object with the provided data. Notice that, the data structure must
     * follow the format specified by Behavior3JS. Consult the guide to know
     * more about this format.
     *
     * You probably want to use custom nodes in your BTs, thus, you need to
     * provide the `names` object, in which this method can find the nodes by
     * `names[NODE_NAME]`. This variable can be a namespace or a dictionary,
     * as long as this method can find the node by its name, for example:
     *
     *     //json
     *     ...
     *     'node1': {
     *       'name': MyCustomNode,
     *       'title': ...
     *     }
     *     ...
     *
     *     //code
     *     var bt = new b3.BehaviorTree();
     *     bt.load(data, {'MyCustomNode':MyCustomNode})
     *
     *
     * @method load
     * @param {Object} data The data structure representing a Behavior Tree.
     * @param {Object} [names] A namespace or dict containing custom nodes.
     **/
    load0(data, names) {
        // names = names || {};

        // this.title = data.title || this.title;
        // this.description = data.description || this.description;
        // this.properties = data.properties || this.properties;

        // var nodes = {};
        // var id, spec, node;
        // // Create the node list (without connection between them)
        // for (id in data.nodes) {
        //     spec = data.nodes[id];
        //     var Cls;

        //     if (spec.name in names) {
        //         // Look for the name in custom nodes
        //         Cls = names[spec.name];
        //     } else if (spec.name in Decorators) {
        //         // Look for the name in default nodes
        //         Cls = Decorators[spec.name];
        //     } else if (spec.name in Composites) {
        //         Cls = Composites[spec.name];
        //     } else if (spec.name in Actions) {
        //         Cls = Actions[spec.name];
        //     } else {
        //         // Invalid node name
        //         throw new EvalError('BehaviorTree.load: Invalid node name + "' +
        //             spec.name + '".');
        //     }

        //     node = new Cls(spec.properties);
        //     node.id = spec.id || node.id;
        //     node.title = spec.title || node.title;
        //     node.description = spec.description || node.description;
        //     node.properties = spec.properties || node.properties;

        //     nodes[id] = node;
        // }

        // // Connect the nodes
        // for (id in data.nodes) {
        //     spec = data.nodes[id];
        //     node = nodes[id];

        //     if (node.category === B3Category.COMPOSITE && spec.children) {
        //         for (var i = 0; i < spec.children.length; i++) {
        //             var cid = spec.children[i];
        //             node.children.push(nodes[cid]);
        //         }
        //     } else if (node.category === B3Category.DECORATOR && spec.child) {
        //         node.child = nodes[spec.child];
        //     }
        // }

        // this.root = nodes[data.root];
    }

    load(data: Behavior3TreeConfig): void {
        this.title = data.title;
        this.description = data.description;
        this.properties = data.properties;
        this.dumpinfo = data;

        let nodes: { [key: string]: BaseNode; } = {};
        let spec: Behavior3NodeConfig;
        let node: BaseNode;

        for (let nodeKey in data.nodes) {
            spec = data.nodes[nodeKey];
            node = Behavior3Factory.singleton.CreateBehavior3Instance(spec.name);
            if (node === null) {
                throw "BehaviorTree.load: Invalid node name:" + spec.name;
            }
            node.Initialize(spec);
            nodes[spec.id] = node;
        }

        for (let nodeKey in data.nodes) {
            spec = data.nodes[nodeKey];
            node = nodes[spec.id];
            const category = node.Category;
            if (category === B3Category.COMPOSITE && spec.children && spec.children.length > 0) {
                for (let i = 0; i < spec.children.length; i++) {
                    const comp = <Composite>node;
                    comp.AddChild(nodes[spec.children[i]]);
                }
            }
            else if (category === B3Category.DECORATOR && spec.child && spec.child.length > 0) {
                const dec = <Decorator>node;
                dec.Child = nodes[spec.child];
            }
        }

        this.root = nodes[data.root];
    }

    /**
     * This method dump the current BT into a data structure.
     *
     * Note: This method does not record the current node parameters. Thus,
     * it may not be compatible with load for now.
     *
     * @method dump
     * @return {Object} A data object representing this tree.
     **/
    dump0() {
        // var data: {
        //     title: string, description: string, root: string,
        //     properties: { [key: string]: string; }, nodes, custom_nodes: []
        // } = {};
        // var customNames = [];

        // data.title = this.title;
        // data.description = this.description;
        // data.root = (this.root) ? this.root.id : null;
        // data.properties = this.properties;
        // data.nodes = {};
        // data.custom_nodes = [];

        // if (!this.root) return data;

        // var stack = [this.root];
        // while (stack.length > 0) {
        //     var node = stack.pop();

        //     var spec: {
        //         id: string, name: string, title: string, description: string,
        //         properties: { [key: string]: string; },
        //         parameters: { [key: string]: string; }, child?: string, children?: string[]
        //     } = {
        //         id: node.id,
        //         name: node.name,
        //         title: node.title,
        //         description: node.description,
        //         properties: node.properties,
        //         parameters: node.parameters
        //     };

        //     // verify custom node
        //     var proto = (node.constructor && node.constructor.prototype);
        //     var nodeName = (proto && proto.name) || node.name;
        //     if (!Decorators[nodeName] && !Composites[nodeName] && !Actions[nodeName] && customNames.indexOf(nodeName) < 0) {
        //         var subdata: { name: string, title: string, category: B3Category }
        //             = {
        //             name: nodeName,
        //             title: (proto && proto.title) || node.title,
        //             category: node.category
        //         };
        //         customNames.push(nodeName);
        //         data.custom_nodes.push(subdata);
        //     }

        //     // store children/child
        //     if (node.category === B3Category.COMPOSITE && (<Composite>node).children) {
        //         const compositeNode = <Composite>node;
        //         var children: string[] = [];
        //         for (var i = compositeNode.children.length - 1; i >= 0; i--) {
        //             children.push(compositeNode.children[i].id);
        //             stack.push(compositeNode.children[i]);
        //         }
        //         spec.children = children;
        //     } else if (node.category === B3Category.DECORATOR && (<Decorator>node).child) {
        //         const decoratorNode = <Decorator>node;
        //         stack.push(decoratorNode.child);
        //         spec.child = decoratorNode.child.id;
        //     }

        //     data.nodes[node.id] = spec;
        // }

        // return data;
    }

    /**
 * This method dump the current BT into a data structure.
 *
 * Note: This method does not record the current node parameters. Thus,
 * it may not be compatible with load for now.
 *
 * @method dump
 * @return {Object} A data object representing this tree.
 **/
    dump() {
        return this.dumpinfo;
    }

    /**
     * Propagates the tick signal through the tree, starting from the root.
     *
     * This method receives a target object of any type (Object, Array,
     * DOMElement, whatever) and a `Blackboard` instance. The target object has
     * no use at all for all Behavior3JS components, but surely is important
     * for custom nodes. The blackboard instance is used by the tree and nodes
     * to store execution variables (e.g., last node running) and is obligatory
     * to be a `Blackboard` instance (or an object with the same interface).
     *
     * Internally, this method creates a Tick object, which will store the
     * target and the blackboard objects.
     *
     * Note: BehaviorTree stores a list of open nodes from last tick, if these
     * nodes weren't called after the current tick, this method will close them
     * automatically.
     *
     * @method tick
     * @param {Object} target A target object.
     * @param {Blackboard} blackboard An instance of blackboard object.
     * @return {Constant} The tick signal state.
     **/
    tick(target, blackboard: Blackboard) {
        if (!blackboard) {
            throw 'The blackboard parameter is obligatory and must be an ' +
            'instance of b3.Blackboard';
        }

        /* CREATE A TICK OBJECT */
        var tick = new Tick();
        tick.debug = this.debug;
        tick.target = target;
        tick.blackboard = blackboard;
        tick.tree = this;

        /* TICK NODE */
        var state = this.root._execute(tick);

        /* CLOSE NODES FROM LAST TICK, IF NEEDED */
        // var lastOpenNodes = blackboard.get('openNodes', this.id);
        var lastOpenNodes = blackboard._getTreeData(this.id).openNodes;
        var currOpenNodes = tick._openNodes;

        // does not close if it is still open in this tick
        var start = 0;
        var i: number;
        for (i = 0; i < Math.min(lastOpenNodes.length, currOpenNodes.length); i++) {
            start = i + 1;
            if (lastOpenNodes[i] !== currOpenNodes[i]) {
                break;
            }
        }

        // close the nodes
        for (i = lastOpenNodes.length - 1; i >= start; i--) {
            lastOpenNodes[i]._close(tick);
        }

        /* POPULATE BLACKBOARD */
        blackboard.set('openNodes', currOpenNodes, this.id, "");
        blackboard.set('nodeCount', tick._nodeCount, this.id, "");

        return state;
    }
};
