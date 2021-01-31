import Action from "../../../core/Action";
import Behavior3NodeConfig, { Behavior3NodeConfigHelper } from "../../../config/Behavior3NodeConfig";
import Tick from "../../../core/Tick";
import { B3Status } from "../../../constants";


/**
 * This action node returns `AnimatorCrossFade` always.
 * 播放动画
 * @module b3
 * @class AnimatorCrossFade
 * @extends Action
 **/
export default class AnimatorCrossFade extends Action {
    /**动画文件名 */
    private stateName: string;
    private _animator: Laya.Animator;

    /**过度时间 */
    private _transitionDuration: number;
    /**层 */
    private _layerIndex: number;
    /**开始时间 */
    private _normalizedTime: number;

    public static get TypeName(): string {
        return "AnimatorCrossFade";
    }

    /**
     * Creates an instance of AnimatorCrossFade.
     * @memberof AnimatorCrossFade
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = AnimatorCrossFade.TypeName;
        this.title = AnimatorCrossFade.TypeName;
        console.log("Initialize:", this.name, this.title);
        this.stateName = Behavior3NodeConfigHelper.GetString(cfg, "stateName", "");
        this._transitionDuration = Behavior3NodeConfigHelper.GetFloat(cfg, "transitionDuration", 0.03);
        this._layerIndex = Behavior3NodeConfigHelper.GetInt32(cfg, "layerIndex", 0);
        this._normalizedTime = Behavior3NodeConfigHelper.GetFloat(cfg, "normalizedTime", 0);
    }

    enter(tick: Tick) {
        let owner = (<Laya.Script3D>tick.target).owner as Laya.Sprite3D;
        if (this._animator == null) {
            this._animator = owner.getComponent(Laya.Animator);
        }
        //查找一次子级
        if (this._animator == null) {
            this._animator = (<Laya.Script3D>tick.target).owner.getChildAt(0).getComponent(Laya.Animator);
        }
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `CrossFade`.
     **/
    tick(tick) {
        if (this.stateName == undefined || this.name == "") {
            console.log("请检查动画文件名是否为空")
            return B3Status.ERROR;
        }
        if (this._animator == null) {
            console.log("请检查动画组件")
            return B3Status.ERROR;
        }

        //console.log("播放动画:", this._name);
        if (this._animator.getCurrentAnimatorPlayState(this._layerIndex).animatorState.name != this.stateName) {
            //console.log("播放动画:", this.stateName);
            this._animator.crossFade(this.stateName, this._transitionDuration, this._layerIndex, this._normalizedTime);
        }
        return B3Status.SUCCESS;

    }
};
