import Action from '../core/Action';
import { B3Status } from '../constants';
import Behavior3NodeConfig from '../config/Behavior3NodeConfig';

/**
 * This action node returns `SUCCESS` always.
 *
 * @module b3
 * @class Succeeder
 * @extends Action
 **/

export default class Succeeder extends Action {
    public static get TypeName(): string {
        return "Succeeder";
    }

    /**
     * Creates an instance of Succeeder.
     * @memberof Succeeder
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = Succeeder.TypeName;
        this.title = Succeeder.TypeName;
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `SUCCESS`.
     **/
    tick(tick) {
        return B3Status.SUCCESS;
    }
}
