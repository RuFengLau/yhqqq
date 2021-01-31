import Composite from '../core/Composite';
import { B3Status } from '../constants';
import BaseNode from '../core/BaseNode';
import Behavior3NodeConfig from '../config/Behavior3NodeConfig';
import Tick from '../core/Tick';

/**
 * The Sequence node ticks its children sequentially until one of them
 * returns `FAILURE`, `RUNNING` or `ERROR`. If all children return the
 * success state, the sequence also returns `SUCCESS`.
 *
 * @module b3
 * @class Sequence
 * @extends Composite
 **/

export default class Sequence extends Composite {
    public static get TypeName(): string {
        return "Sequence";
    }

    /**
     * Creates an instance of Sequence.
     * @param {Object} params 
     * @param {Array} params.children 
     * @memberof Sequence
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = Sequence.TypeName;
        this.title = Sequence.TypeName;
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick(tick: Tick) {
        for (var i = 0; i < this.children.length; i++) {
            var status = this.children[i]._execute(tick);

            if (status !== B3Status.SUCCESS) {
                return status;
            }
        }

        return B3Status.SUCCESS;
    }
};
