import Decorator from '../core/Decorator';
import { B3Status } from '../constants';
import BaseNode from '../core/BaseNode';
import Behavior3NodeConfig from '../config/Behavior3NodeConfig';
import Tick from '../core/Tick';

/**
 * RepeatUntilSuccess is a decorator that repeats the tick signal until the
 * node child returns `SUCCESS`, `RUNNING` or `ERROR`. Optionally, a maximum
 * number of repetitions can be defined.
 *
 * @module b3
 * @class RepeatUntilSuccess
 * @extends Decorator
 **/

export default class RepeatUntilSuccess extends Decorator {
    public static get TypeName(): string {
        return "RepeatUntilSuccess";
    }
    maxLoop: number;

    /**
     * Creates an instance of RepeatUntilSuccess.
     *
     * - **maxLoop** (*Integer*) Maximum number of repetitions. Default to -1 (infinite).
     * - **child** (*BaseNode*) The child node.
     *
     * @param {Object} params Object with parameters.
     * @param {Number} params.maxLoop Maximum number of repetitions. Default to -1 (infinite).
     * @param {BaseNode} params.child The child node.
     * @memberof RepeatUntilSuccess
     **/
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = RepeatUntilSuccess.TypeName;
        this.title = "Repeat Until Success";
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
        var status = B3Status.ERROR;

        while (this.maxLoop < 0 || i < this.maxLoop) {
            status = this.child._execute(tick);

            if (status == B3Status.FAILURE) {
                i++;
            } else {
                break;
            }
        }

        tick.blackboard.set('i', i, tick.tree.id, this.id);
        return status;
    }
};
