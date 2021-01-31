import Behavior3NodeConfig, { Behavior3NodeConfigHelper } from "../../../../../behavior3/config/Behavior3NodeConfig";
import SetLocalParam from "../../../actions/behavior3/SetLocalParam";
import Tick from "../../../../../behavior3/core/Tick";
import { B3Status } from "../../../../../behavior3/constants";
import Condition from "../../../../../behavior3/core/Condition";


/**
 * This action node returns `HasLocalObject` always.
 * 播放动画
 * @module b3
 * @class HasLocalObject
 * @extends Action
 **/
export default class HasLocalObject extends Condition {
    private localKey: string;

    public static get TypeName(): string {
        return "HasLocalObject";
    }

    /**
     * Creates an instance of HasLocalObject.
     * @memberof HasLocalObject
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = HasLocalObject.TypeName;
        this.title = HasLocalObject.TypeName;
        this.localKey = Behavior3NodeConfigHelper.GetString(cfg, "localKey", "");
        console.log("Initialize:", this.name, this.title);
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `CrossFade`.
     **/
    tick(tick: Tick) {
        if (this.localKey == "" || this.localKey == undefined) {
            return B3Status.ERROR;
        }
        let target = tick.blackboard.get(this.localKey, tick.tree.id, "", null);
        if (target) {
            return B3Status.SUCCESS;
        }
        return B3Status.FAILURE;
    }
};
