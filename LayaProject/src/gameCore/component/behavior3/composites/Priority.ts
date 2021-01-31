import Composite from '../core/Composite';
import { B3Status } from '../constants';
import BaseNode from '../core/BaseNode';
import Behavior3NodeConfig from '../config/Behavior3NodeConfig';
import Tick from '../core/Tick';

/**
 * Priority ticks its children sequentially until one of them returns
 * `SUCCESS`, `RUNNING` or `ERROR`. If all children return the failure state,
 * the priority also returns `FAILURE`.
 *
 * @module b3
 * @class Priority
 * @extends Composite
 **/

export default class Priority extends Composite {
    public static get TypeName(): string {
        return "Priority";
    }

    /**
     * Creates an instance of Priority.
     * @param {Object} params 
     * @param {Array} params.children 
     * @memberof Priority
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = Priority.TypeName;
        this.title = Priority.TypeName;
    }

    /**
     * Tick method.
     * @method tick
     * @param {Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick(tick: Tick) {
        for (var i = 0; i < this.children.length; i++) {
            var status = this.children[i]._execute(tick);

            if (status !== B3Status.FAILURE) {
                return status;
            }
        }

        return B3Status.FAILURE;
    }
};
