import { createUUID } from "../b3.functions";
import { B3Status, B3Category } from "../constants";
import Tick from "./Tick";
import Behavior3NodeConfig from "../config/Behavior3NodeConfig";

/**
 * The BaseNode class is used as super class to all nodes in BehaviorJS. It
 * comprises all common variables and methods that a node must have to
 * execute.
 *
 * **IMPORTANT:** Do not inherit from this class, use `Composite`,
 * `Decorator`, `Action` or `Condition`, instead.
 *
 * The attributes are specially designed to serialization of the node in a
 * JSON format. In special, the `parameters` attribute can be set into the
 * visual editor (thus, in the JSON file), and it will be used as parameter
 * on the node initialization at `BehaviorTree.load`.
 *
 * BaseNode also provide 5 callback methods, which the node implementations
 * can override. They are `enter`, `open`, `tick`, `close` and `exit`. See
 * their documentation to know more. These callbacks are called inside the
 * `_execute` method, which is called in the tree traversal.
 *
 * @module b3
 * @class BaseNode
 **/

export default abstract class BaseNode {
    protected id: string;
    /**
     * Node category. Must be `COMPOSITE`, `DECORATOR`, `ACTION` or
     * `CONDITION`. This is defined automatically be inheriting the
     * correspondent class.
     * 
     * @member BaseNode#category
     **/
    protected category: B3Category;

    /**
     * Node name. Must be a unique identifier,
     * preferable the same name of the
     * class. You have to set the node name in the prototype.
     * 
     * @member BaseNode#name
     **/
    protected name: string;
    /**
     * Node title.
     *
     * @optional
     * @member BaseNode#title
     **/
    protected title: string;
    /**
     * Node description.
     * 
     * @member BaseNode#description
     */
    protected description: string;

    /**
     * A dictionary (key, value) describing the node properties. Useful for
     * defining custom variables inside the visual editor.
     *
     * @property properties
     * @type {Object}
     * @readonly
     **/
    protected properties: { [key: string]: string; };

    /**
     * A dictionary (key, value) describing the node parameters. Useful for
     * defining parameter values in the visual editor. Note: this is only
     * useful for nodes when loading trees from JSON files.
     *
     * **Deprecated since 0.2.0. This is too similar to the properties
     * attribute, thus, this attribute is deprecated in favor to
     * `properties`.**
     *
     * @property {Object} parameters
     * @deprecated since 0.2.0.
     * @readonly
     **/
    protected parameters: { [key: string]: string; };
    /**
     * Initialization method.
     * @method initialize
     * @constructor
     **/
    constructor() {

    }

    public Initialize(cfg: Behavior3NodeConfig): void {
        this.id = cfg.id;
        this.category = cfg.category || B3Category.NONE;
        this.name = cfg.name || '';
        this.title = cfg.title || this.name;
        this.description = cfg.description || '';

        this.properties = cfg.properties || {};
        this.parameters = {};
    }

    public get ID(): string {
        return this.id;
    }

    public get Name(): string {
        return this.name;
    }

    public get Title(): string {
        return this.title;
    }

    public get Category(): B3Category {
        return this.category;
    }

    /**
     * This is the main method to propagate the tick signal to this node. This
     * method calls all callbacks: `enter`, `open`, `tick`, `close`, and
     * `exit`. It only opens a node if it is not already open. In the same
     * way, this method only close a node if the node  returned a status
     * different of `RUNNING`.
     *
     * @method _execute
     * @param {Tick} tick A tick instance.
     * @return {Constant} The tick state.
     * @protected
     **/
    _execute(tick: Tick): B3Status {
        // ENTER
        this._enter(tick);

        const result = tick.blackboard.get<boolean>('isOpen', tick.tree.id, this.id, false);
        // OPEN
        if (!result) {
            this._open(tick);
        }

        // TICK
        var status = this._tick(tick);

        // CLOSE
        if (status !== B3Status.RUNNING) {
            this._close(tick);
        }

        // EXIT
        this._exit(tick);

        return status;
    }

    /**
     * Wrapper for enter method.
     * @method _enter
     * @param {Tick} tick A tick instance.
     * @protected
     **/
    _enter(tick: Tick): void {
        tick._enterNode(this);
        this.enter(tick);
    }

    /**
     * Wrapper for open method.
     * @method _open
     * @param {Tick} tick A tick instance.
     * @protected
     **/
    _open(tick: Tick): void {
        tick._openNode(this);
        tick.blackboard.set('isOpen', true, tick.tree.id, this.id);
        this.open(tick);
    }

    /**
     * Wrapper for tick method.
     * @method _tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
     * @protected
     **/
    _tick(tick): B3Status {
        tick._tickNode(this);
        return this.tick(tick);
    }

    /**
     * Wrapper for close method.
     * @method _close
     * @param {Tick} tick A tick instance.
     * @protected
     **/
    _close(tick: Tick): void {
        tick._closeNode(this);
        tick.blackboard.set('isOpen', false, tick.tree.id, this.id);
        this.close(tick);
    }

    /**
     * Wrapper for exit method.
     * @method _exit
     * @param {Tick} tick A tick instance.
     * @protected
     **/
    _exit(tick: Tick): void {
        tick._exitNode(this);
        this.exit(tick);
    }

    /**
     * Enter method, override this to use. It is called every time a node is
     * asked to execute, before the tick itself.
     *
     * @method enter
     * @param {Tick} tick A tick instance.
     **/
    enter(tick: Tick): void { }

    /**
     * Open method, override this to use. It is called only before the tick
     * callback and only if the not isn't closed.
     *
     * Note: a node will be closed if it returned `RUNNING` in the tick.
     *
     * @method open
     * @param {Tick} tick A tick instance.
     **/
    open(tick: Tick): void { }

    /**
     * Tick method, override this to use. This method must contain the real
     * execution of node (perform a task, call children, etc.). It is called
     * every time a node is asked to execute.
     *
     * @method tick
     * @param {Tick} tick A tick instance.
     **/
    tick(tick: Tick): B3Status { return B3Status.ERROR; }

    /**
     * Close method, override this to use. This method is called after the tick
     * callback, and only if the tick return a state different from
     * `RUNNING`.
     *
     * @method close
     * @param {Tick} tick A tick instance.
     **/
    close(tick: Tick): void { }

    /**
     * Exit method, override this to use. Called every time in the end of the
     * execution.
     *
     * @method exit
     * @param {Tick} tick A tick instance.
     **/
    exit(tick: Tick): void { }
}