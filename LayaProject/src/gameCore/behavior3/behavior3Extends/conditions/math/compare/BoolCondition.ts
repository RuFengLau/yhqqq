import Behavior3NodeConfig, { Behavior3NodeConfigHelper } from "../../../../../behavior3/config/Behavior3NodeConfig";
import SetLocalParam from "../../../actions/behavior3/SetLocalParam";
import Tick from "../../../../../behavior3/core/Tick";
import { B3Status } from "../../../../../behavior3/constants";
import Condition from "../../../../../behavior3/core/Condition";


/**
 * This action node returns `BoolCondition` always.
 * 播放动画
 * @module b3
 * @class BoolCondition
 * @extends Action
 **/
export default class BoolCondition extends Condition {
    private localKey: string;
    private value: boolean = true;

    public static get TypeName(): string {
        return "BoolCondition";
    }

    /**
     * Creates an instance of BoolCondition.
     * @memberof BoolCondition
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = BoolCondition.TypeName;
        this.title = BoolCondition.TypeName;
        this.localKey = Behavior3NodeConfigHelper.GetString(cfg, "localParamKey", "");
        this.value = Behavior3NodeConfigHelper.GetBool(cfg, "value", false);
        console.log("Initialize:", this.name, this.title, this.localKey, this.value);
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `CrossFade`.
     **/
    tick(tick: Tick) {
        if (this.localKey == "" || this.localKey == undefined) {
            console.log("请输入正确的bool变量名");
            return B3Status.ERROR;
        }
        let boolvalue = tick.blackboard.get(this.localKey, tick.tree.id, "", false);
        if(typeof boolvalue == "string"){
            let ss = boolvalue;
            if(ss == "true"){
                boolvalue = true;
            }else{
                boolvalue = false;
            }
        }
        if (boolvalue == this.value) {
            return B3Status.SUCCESS;
        }
        return B3Status.FAILURE;
    }
};
