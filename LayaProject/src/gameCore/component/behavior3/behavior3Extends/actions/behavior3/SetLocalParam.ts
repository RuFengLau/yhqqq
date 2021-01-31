import Action from "../../../../behavior3/core/Action";
import Behavior3NodeConfig, { Behavior3NodeConfigHelper } from "../../../../behavior3/config/Behavior3NodeConfig";
import Tick from "../../../../behavior3/core/Tick";
import { B3Status } from "../../../../behavior3/constants";

/**
 * This action node returns `CrossFade` always.
 * 播放动画
 * @module b3
 * @class CrossFade
 * @extends Action
 **/
export default class SetLocalParam extends Action {
    /**键值 */
    private _key: string;
    /**值 */
    private _value: any;
    /**只执行一次 */
    private _once: boolean;
    /**是否初始化过 */
    private _inited:boolean = false;

    public static get TypeName(): string {
        return "SetLocalParam";
    }

    /**
     * Creates an instance of SetLocalParam.
     * @memberof SetLocalParam
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = SetLocalParam.TypeName;
        this.title = SetLocalParam.TypeName;
        console.log("Initialize:", this.name, this.title);

        this._key = Behavior3NodeConfigHelper.GetString(cfg, "key", "");
        this._once = Behavior3NodeConfigHelper.GetBool(cfg, "once", false);
        if (cfg.properties && ("value" in cfg.properties)) {
            this._value = cfg.properties["value"];
        }
    }

    open(tick: Tick) {
        if (this._once) {
            if (this._inited) {
                return;
            }
            tick.blackboard.set(this._key, this._value, tick.tree.id, "");
            this._inited = true;
        }else{
            tick.blackboard.set(this._key, this._value, tick.tree.id, "");
        }
       
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `CrossFade`.
     **/
    tick(tick: Tick) {
        return B3Status.SUCCESS;
    }
};
