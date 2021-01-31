import Action from '../core/Action';
import { B3Status } from '../constants';
import Behavior3NodeConfig, { Behavior3NodeConfigHelper } from '../config/Behavior3NodeConfig';
import Tick from '../core/Tick';

/**
 * Wait a few seconds.
 *
 * @module b3
 * @class Wait
 * @extends Action
 **/

export default class Wait extends Action {
    public static get TypeName(): string {
        return "Wait";
    }

    private endTime: number = 0;

    /**
     * Creates an instance of Wait.
     * @param {Object} settings Object with parameters
     * @param {Number} settings.milliseconds Maximum time, in milliseconds, a child can execute.
     * @memberof Wait
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = Wait.TypeName;
        this.title = `${Wait.TypeName} <milliseconds>ms`;
        this.endTime = Behavior3NodeConfigHelper.GetInt32(cfg, "milliseconds", 0);
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
        var currTime = (new Date()).getTime();
        var startTime = tick.blackboard.get<number>('startTime', tick.tree.id, this.id, 0);

        if (currTime - startTime > this.endTime) {
            console.log(this.name, this.endTime, "ms运行完毕");
            return B3Status.SUCCESS;
        }

        return B3Status.RUNNING;
    }
};
