import Composite from '../core/Composite';
import { B3Status } from '../constants';
import BaseNode from '../core/BaseNode';
import Behavior3NodeConfig from '../config/Behavior3NodeConfig';
import Tick from '../core/Tick';

/**
 * MemPriority is similar to Priority node, but when a child returns a
 * `RUNNING` state, its index is recorded and in the next tick the,
 * MemPriority calls the child recorded directly, without calling previous
 * children again.
 *
 * @module b3
 * @class MemPriority
 * @extends Composite
 **/

export default class MemPriority extends Composite {
    public static get TypeName(): string {
        return "MemPriority";
    }

    /**
     * Creates an instance of MemPriority.
     * @param {Object} params 
     * @param {Array} params.children 
     * @memberof MemPriority
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = MemPriority.TypeName;
        this.title = MemPriority.TypeName;
    }

    /**
     * Open method.
     * @method open
     * @param {b3.Tick} tick A tick instance.
     **/
    open(tick) {
        tick.blackboard.set('runningChild', 0, tick.tree.id, this.id);
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} A state constant.
     **/
    tick(tick: Tick) {
        var child = tick.blackboard.get<number>('runningChild', tick.tree.id, this.id, 0);
        for (var i = child; i < this.children.length; i++) {
            var status = this.children[i]._execute(tick);

            if (status !== B3Status.FAILURE) {
                if (status === B3Status.RUNNING) {
                    tick.blackboard.set('runningChild', i, tick.tree.id, this.id);
                }

                return status;
            }
        }

        return B3Status.FAILURE;
    }
};
