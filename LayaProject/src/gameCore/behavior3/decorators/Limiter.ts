import Decorator from '../core/Decorator';
import { B3Status } from '../constants';
import BaseNode from '../core/BaseNode';
import Behavior3NodeConfig, { Behavior3NodeConfigHelper } from '../config/Behavior3NodeConfig';
import Tick from '../core/Tick';

/**
 * This decorator limit the number of times its child can be called. After a
 * certain number of times, the Limiter decorator returns `FAILURE` without
 * executing the child.
 *
 * @module b3
 * @class Limiter
 * @extends Decorator
 **/

export default class Limiter extends Decorator {
    public static get TypeName(): string {
        return "Limiter";
    }
    maxLoop: number;

    /**
     * Creates an instance of Limiter.
     * 
     * Settings parameters:
     * 
     * - **maxLoop** (*Integer*) Maximum number of repetitions.
     * - **child** (*BaseNode*) The child node.
     * 
     * @param {Object} params
     * @param {Number} params.maxLoop Maximum number of repetitions.
     * @param {BaseNode} params.child The child node.
     * @memberof Limiter
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = Limiter.TypeName;
        this.title = `Limit <maxLoop> Activations`;
        this.maxLoop = Behavior3NodeConfigHelper.GetInt32(cfg, "maxLoop", 1);
    }

    /**
     * Open method.
     * @method open
     * @param {Tick} tick A tick instance.
     **/
    open(tick: Tick) {
        tick.blackboard.set('i', 0, tick.tree.id, this.id);
    }

    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick(tick: Tick) {
        if (!this.child) {
            return B3Status.ERROR;
        }

        var i = tick.blackboard.get<number>('i', tick.tree.id, this.id, 0);

        if (i < this.maxLoop) {
            var status = this.child._execute(tick);

            if (status == B3Status.SUCCESS || status == B3Status.FAILURE)
                tick.blackboard.set('i', i + 1, tick.tree.id, this.id);

            return status;
        }

        return B3Status.FAILURE;
    }
};
