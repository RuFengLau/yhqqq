import { B3Status } from '../constants';
import Action from '../core/Action';
import Behavior3NodeConfig from '../config/Behavior3NodeConfig';

/**
 * This action node returns `ERROR` always.
 *
 * @module b3
 * @class Error
 * @extends Action
 **/
export default class Error extends Action {
    public static get TypeName(): string {
        return "Error";
    }

    /**
     * Creates an instance of Error.
     * @memberof Error
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = Error.TypeName;
        this.title = Error.TypeName;
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `ERROR`.
     **/
    tick(tick) {
        return B3Status.ERROR;
    }
};
