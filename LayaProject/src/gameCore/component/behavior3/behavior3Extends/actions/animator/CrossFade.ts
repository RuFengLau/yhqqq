import Action from "../../../core/Action";
import Behavior3NodeConfig, { Behavior3NodeConfigHelper } from "../../../config/Behavior3NodeConfig";
import Tick from "../../../core/Tick";
import { B3Status } from "../../../constants";


/**
 * This action node returns `CrossFade` always.
 * 播放动画
 * @module b3
 * @class CrossFade
 * @extends Action
 **/
export default class CrossFade extends Action {

    private _animator: Laya.Animator;
    /**动画文件名 */
    private _name: string;
    /**过度时间 */
    private _transitionDuration: number;
    /**层 */
    private _layerIndex: number;
    /**开始时间 */
    private _normalizedTime: number;

    public static get TypeName(): string {
        return "CrossFade";
    }

    /**
     * Creates an instance of CrossFade.
     * @memberof CrossFade
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = CrossFade.TypeName;
        this.title = CrossFade.TypeName;
        console.log("Initialize:", this.name, this.title);
        this._name = Behavior3NodeConfigHelper.GetString(cfg, "name", "");
        this._transitionDuration = Behavior3NodeConfigHelper.GetFloat(cfg, "transitionDuration", 0.03);
        this._layerIndex = Behavior3NodeConfigHelper.GetInt32(cfg, "layerIndex", 0);
        this._normalizedTime = Behavior3NodeConfigHelper.GetFloat(cfg, "normalizedTime", 0);
    }

    enter(tick: Tick) {
        if(this._animator == null){
            this._animator = (<Laya.Script3D>tick.target).owner.getComponent(Laya.Animator);
        }
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `CrossFade`.
     **/
    tick(tick) {
        if (this._name == undefined || this.name == "") {
            console.log("请检查动画文件名是否为空")
            return B3Status.ERROR;
        }
        if (this._animator == null) {
            console.log("请检查动画组件")
            return B3Status.ERROR;
        }

        //console.log("播放动画:", this._name);
        if(this._animator.getCurrentAnimatorPlayState(this._layerIndex).animatorState.name != this._name){
            console.log("播放动画:", this._name);
            this._animator.crossFade(this._name, this._transitionDuration, this._layerIndex, this._normalizedTime);
        }
        return B3Status.SUCCESS;

    }
};
