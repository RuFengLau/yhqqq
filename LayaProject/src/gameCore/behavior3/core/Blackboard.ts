import BaseNode from "./BaseNode";

class MemoryItem {
    private _value;
    public set Value(v) {
        this._value = v;
    }

    public GetValue<T>(): T {
        return <T>this._value;
    }
}

class Memory {
    public _items: { [key: string]: MemoryItem; } = {};
    public SetValue(key: string, v) {
        let item: MemoryItem;
        if (key in this._items) {
            item = this._items[key];
        }
        else {
            item = new MemoryItem();
            this._items[key] = item;
        }
        item.Value = v;
    }

    public GetValue<T>(key: string, defaultVaule: T): T {
        if (key in this._items) {
            return this._items[key].GetValue<T>();
        }
        else {
            return defaultVaule;
        }
    }
}

class TreeData {
    public nodeMemory: Memory = new Memory();
    public openNodes: BaseNode[] = [];
    public traversalDepth = 0;
    public traversalCycle = 0;
}

class TreeMemory {
    public _memory: Memory = new Memory();
    public _treeData: TreeData = new TreeData();
    public _nodeMemory: { [key: string]: Memory; } = {};
}

/**
 * The Blackboard is the memory structure required by `BehaviorTree` and its
 * nodes. It only have 2 public methods: `set` and `get`. These methods works
 * in 3 different contexts: global, per tree, and per node per tree.
 *
 * Suppose you have two different trees controlling a single object with a
 * single blackboard, then:
 *
 * - In the global context, all nodes will access the stored information.
 * - In per tree context, only nodes sharing the same tree share the stored
 *   information.
 * - In per node per tree context, the information stored in the blackboard
 *   can only be accessed by the same node that wrote the data.
 *
 * The context is selected indirectly by the parameters provided to these
 * methods, for example:
 *
 *     // getting/setting variable in global context
 *     blackboard.set('testKey', 'value');
 *     var value = blackboard.get('testKey');
 *
 *     // getting/setting variable in per tree context
 *     blackboard.set('testKey', 'value', tree.id);
 *     var value = blackboard.get('testKey', tree.id);
 *
 *     // getting/setting variable in per node per tree context
 *     blackboard.set('testKey', 'value', tree.id, node.id);
 *     var value = blackboard.get('testKey', tree.id, node.id);
 *
 * Note: Internally, the blackboard store these memories in different
 * objects, being the global on `_baseMemory`, the per tree on `_treeMemory`
 * and the per node per tree dynamically create inside the per tree memory
 * (it is accessed via `_treeMemory[id].nodeMemory`). Avoid to use these
 * variables manually, use `get` and `set` instead.
 *
 * @module b3
 * @class Blackboard
 **/

export default class Blackboard {
    private _baseMemory: Memory;
    private _treeMemory: { [key: string]: TreeMemory; };

    /**
     * Initialization method.
     * @method initialize
     * @constructor
     **/
    constructor() {
        this._baseMemory = new Memory();
        this._treeMemory = {};
    }

    /**
     * Internal method to retrieve the tree context memory. If the memory does
     * not exist, this method creates it.
     *
     * @method _getTreeMemory
     * @param {String} treeScope The id of the tree in scope.
     * @return {Object} The tree memory.
     * @protected
     **/
    _getTreeMemory(treeScope: string) {
        if (!this._treeMemory[treeScope]) {
            this._treeMemory[treeScope] = new TreeMemory();
        }
        return this._treeMemory[treeScope];
    }

    /**
     * Internal method to retrieve the node context memory, given the tree
     * memory. If the memory does not exist, this method creates is.
     *
     * @method _getNodeMemory
     * @param {String} treeMemory the tree memory.
     * @param {String} nodeScope The id of the node in scope.
     * @return {Object} The node memory.
     * @protected
     **/
    _getNodeMemory(treeMemory: TreeMemory, nodeScope: string) {
        let memory = treeMemory._nodeMemory;
        if (!memory[nodeScope]) {
            memory[nodeScope] = new Memory();
        }

        return memory[nodeScope];
    }

    /**
     * Internal method to retrieve the context memory. If treeScope and
     * nodeScope are provided, this method returns the per node per tree
     * memory. If only the treeScope is provided, it returns the per tree
     * memory. If no parameter is provided, it returns the global memory.
     * Notice that, if only nodeScope is provided, this method will still
     * return the global memory.
     *
     * @method _getMemory
     * @param {String} treeScope The id of the tree scope.
     * @param {String} nodeScope The id of the node scope.
     * @return {Object} A memory object.
     * @protected
     **/
    _getMemory(treeScope: string, nodeScope: string) {
        let memory = this._baseMemory;

        if (treeScope && treeScope.length > 0) {
            let treeMemory = this._getTreeMemory(treeScope);
            memory = treeMemory._memory;
            if (nodeScope && nodeScope.length > 0) {
                memory = this._getNodeMemory(treeMemory, nodeScope);
            }
        }

        return memory;
    }

    /**
     * Stores a value in the blackboard. If treeScope and nodeScope are
     * provided, this method will save the value into the per node per tree
     * memory. If only the treeScope is provided, it will save the value into
     * the per tree memory. If no parameter is provided, this method will save
     * the value into the global memory. Notice that, if only nodeScope is
     * provided (but treeScope not), this method will still save the value into
     * the global memory.
     *
     * @method set
     * @param {String} key The key to be stored.
     * @param {String} value The value to be stored.
     * @param {String} treeScope The tree id if accessing the tree or node
     *                           memory.
     * @param {String} nodeScope The node id if accessing the node memory.
     **/
    set(key: string, value, treeScope: string, nodeScope: string) {
        var memory = this._getMemory(treeScope, nodeScope);
        memory.SetValue(key, value);
    }

    /**
     * Retrieves a value in the blackboard. If treeScope and nodeScope are
     * provided, this method will retrieve the value from the per node per tree
     * memory. If only the treeScope is provided, it will retrieve the value
     * from the per tree memory. If no parameter is provided, this method will
     * retrieve from the global memory. If only nodeScope is provided (but
     * treeScope not), this method will still try to retrieve from the global
     * memory.
     *
     * @method get
     * @param {String} key The key to be retrieved.
     * @param {String} treeScope The tree id if accessing the tree or node
     *                           memory.
     * @param {String} nodeScope The node id if accessing the node memory.
     * @return {Object} The value stored or undefined.
     **/
    get<T>(key: string, treeScope: string, nodeScope: string, defaultVaule: T): T {
        var memory = this._getMemory(treeScope, nodeScope);
        return memory.GetValue<T>(key, defaultVaule);
    }

    SetTree(key: string, value, treeScope: string) {
        const memory = this._getMemory(treeScope, "");
        memory.SetValue(key, value);
    }

    _getTreeData(treeScope: string) {
        return this._getTreeMemory(treeScope)._treeData;
    }
}