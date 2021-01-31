import Condition from "../../../behavior3/core/Condition";
import Behavior3NodeConfig, { Behavior3NodeConfigHelper } from "../../../behavior3/config/Behavior3NodeConfig";
import Tick from "../../../behavior3/core/Tick";
import { B3Status } from "../../../behavior3/constants";
import D3Helper from "../../../plugins/tools/D3Helper";
import Vector3Helper from "../../../plugins/tools/Vector3Helper";

/**
 * This action node returns `CanSeeTarget` always.
 * 播放动画
 * @module b3
 * @class CanSeeTarget
 * @extends Condition
 **/
export default class CanSeeTarget extends Condition {

    private _targetName: string;
    private _localTargetName: string;
    private _seeDistance:number;
    private _seeAngle:number;
    private _target: Laya.Sprite3D;
    private _owner: Laya.Sprite3D;
    private _inited: boolean = false;
    private _tempV3: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
    private _forward: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
    private _targetForward: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
    public static get TypeName(): string {
        return "CanSeeTarget";
    }

    /**
     * Creates an instance of CanSeeTarget.
     * @memberof CanSeeTarget
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = CanSeeTarget.TypeName;
        this.title = CanSeeTarget.TypeName;
        console.log("Initialize:", this.name, this.title);

        this._targetName = Behavior3NodeConfigHelper.GetString(cfg, "target", "");
        this._localTargetName = Behavior3NodeConfigHelper.GetString(cfg, "localTarget", "");
        this._seeDistance = Behavior3NodeConfigHelper.GetFloat(cfg, "seeDistance", 4);
        this._seeAngle = Behavior3NodeConfigHelper.GetFloat(cfg, "seeAngle", 30);

    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `CrossFade`.
     **/
    tick(tick: Tick) {
        if (this._owner == null) {
            this._owner = (<Laya.Script3D>tick.target).owner as Laya.Sprite3D;
        }
        if (this._inited == false) {
            if (this._localTargetName != "") {
                this._target = tick.blackboard.get(this._localTargetName, tick.tree.id, "", null);
            } else {
                let scene = Laya.stage["_scene3Ds"][0];
                this._target = D3Helper.findChild(scene, this._targetName);
            }
            this._inited = true;
        }
        if (this._target == null) {
            console.log(this.name, "请检查是否有" + this._targetName + "对象");
            return B3Status.ERROR;
        }
        Laya.Vector3.subtract(this._owner.transform.position, this._target.transform.position, this._tempV3);
        let distance = Laya.Vector3.distance(this._owner.transform.position, this._target.transform.position);
        this._owner.transform.getForward(this._forward);
        this._target.transform.getForward(this._targetForward);
        let dotDir = Laya.Vector3.dot(this._forward, this._tempV3);//正面
        //let angle = MathHelper.Vector3Angle(this._owner.transform.position,this._target.transform.position);
        let angle = Vector3Helper.angle(this._forward,this._target.transform.position);
        //TODO 计算视角范围
        
        if (dotDir > 0 && distance <= this._seeDistance) {
            return B3Status.SUCCESS;
        }
        return B3Status.FAILURE;
    }
};
