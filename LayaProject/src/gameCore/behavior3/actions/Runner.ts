import Action from '../core/Action';
import { B3Status } from '../constants';
import Behavior3NodeConfig from '../config/Behavior3NodeConfig';

/**
 * This action node returns RUNNING always.
 *
 * @module b3
 * @class Runner
 * @extends Action
 **/
export default class Runner extends Action {
    public static get TypeName(): string {
        return "Runner";
    }

    /**
     * Creates an instance of Runner.
     * @memberof Runner
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = Runner.TypeName;
        this.title = Runner.TypeName;
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `RUNNING`.
     **/
    tick(tick) {
        return B3Status.RUNNING;
    }
}