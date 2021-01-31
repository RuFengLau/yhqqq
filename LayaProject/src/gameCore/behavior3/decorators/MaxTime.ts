import { Behavior3NodeConfigHelper } from './../config/Behavior3NodeConfig';
import Decorator from '../core/Decorator';
import { B3Status } from '../constants';
import BaseNode from '../core/BaseNode';
import Behavior3NodeConfig from '../config/Behavior3NodeConfig';
import Tick from '../core/Tick';

/**
 * The MaxTime decorator limits the maximum time the node child can execute.
 * Notice that it does not interrupt the execution itself (i.e., the child
 * must be non-preemptive), it only interrupts the node after a `RUNNING`
 * status.
 *
 * @module b3
 * @class MaxTime
 * @extends Decorator
 **/

export default class MaxTime extends Decorator {
    public static get TypeName(): string {
        return "MaxTime";
    }
    maxTime: number;

    /**
     * Creates an instance of MaxTime.
     * 
     * - **maxTime** (*Integer*) Maximum time a child can execute.
     * - **child** (*BaseNode*) The child node.
  
     * @param {Object} params Object with parameters.
     * @param {Number} params.maxTime Maximum time a child can execute.
     * @param {BaseNode} params.child The child node.
     * @memberof MaxTime
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = MaxTime.TypeName;
        this.title = "Max <maxTime>ms";
        this.maxTime = Behavior3NodeConfigHelper.GetInt32(cfg, "maxTime", 0);
    }

    /**
     * Open method.
     * @method open
     * @param {Tick} tick A tick instance.
     **/
    open(tick: Tick) {
        var startTime = (new Date()).getTime();
        tick.blackboard.set('startTime', startTime, tick.tree.id, this.id);
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

        var currTime = (new Date()).getTime();
        var startTime = tick.blackboard.get<number>('startTime', tick.tree.id, this.id, 0);

        var status = this.child._execute(tick);
        if (currTime - startTime > this.maxTime) {
            return B3Status.FAILURE;
        }

        return status;
    }
};
