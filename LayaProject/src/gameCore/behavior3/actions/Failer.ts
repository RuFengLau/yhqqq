import Action from '../core/Action';
import { B3Status } from '../constants';
import Behavior3NodeConfig from '../config/Behavior3NodeConfig';

/**
 * This action node returns `FAILURE` always.
 *
 * @module b3
 * @class Failer
 * @extends Action
 **/
export default class Failer extends Action {
    public static get TypeName(): string {
        return "Failer";
    }

    /**
     * Creates an instance of Failer.
     * @memberof Failer
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = Failer.TypeName;
        this.title = Failer.TypeName;
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `FAILURE`.
     **/
    tick(tick) {
        return B3Status.FAILURE;
    }
}