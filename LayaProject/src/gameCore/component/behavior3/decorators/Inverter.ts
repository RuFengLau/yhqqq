import Decorator from '../core/Decorator';
import { B3Status } from '../constants';
import BaseNode from '../core/BaseNode';
import Behavior3NodeConfig from '../config/Behavior3NodeConfig';
import Tick from '../core/Tick';

/**
 * The Inverter decorator inverts the result of the child, returning `SUCCESS`
 * for `FAILURE` and `FAILURE` for `SUCCESS`.
 *
 * @module b3
 * @class Inverter
 * @extends Decorator
 **/

export default class Inverter extends Decorator {
    public static get TypeName(): string {
        return "Inverter";
    }

    /**
     * Creates an instance of Inverter.
     * @param {Object} params
     * @param {BaseNode} params.child The child node.
     * @memberof Inverter
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = Inverter.TypeName;
        this.title = Inverter.TypeName;
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

        var status = this.child._execute(tick);

        if (status == B3Status.SUCCESS) {
            status = B3Status.FAILURE;
        } else if (status == B3Status.FAILURE) {
            status = B3Status.SUCCESS;
        }

        return status;
    }
};
