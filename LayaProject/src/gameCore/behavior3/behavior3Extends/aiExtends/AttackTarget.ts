import Action from "../../core/Action";
import Behavior3NodeConfig, { Behavior3NodeConfigHelper } from "../../config/Behavior3NodeConfig";
import Tick from "../../core/Tick";
import { B3Status } from "../../constants";
import { ArmType } from "../../../models/GameEnum";
import D3Helper from "../../../plugins/tools/D3Helper";

/**
 * This action node returns `AttackTarget` always.
 * 播放动画
 * @module b3
 * @class AttackTarget
 * @extends Action
 **/
export default class AttackTarget extends Action {

    private _targetName: string;
    private localTargetKey: string;
    private _attackDistance: number;
    private localAttackDistanceKey: string;

    private _target: Laya.Sprite3D;
    private _owner: Laya.Sprite3D;
    private _inited: boolean = false;
    private _up: Laya.Vector3 = new Laya.Vector3(0, 1, 0);
    private _armType:ArmType;

    public static get TypeName(): string {
        return "AttackTarget";
    }

    /**
     * Creates an instance of AttackTarget.
     * @memberof AttackTarget
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = AttackTarget.TypeName;
        this.title = AttackTarget.TypeName;
        console.log("Initialize:", this.name, this.title);

        this._targetName = Behavior3NodeConfigHelper.GetString(cfg, "target", "");
        this.localTargetKey = Behavior3NodeConfigHelper.GetString(cfg, "localTargetKey", "");
        this._attackDistance = Behavior3NodeConfigHelper.GetFloat(cfg, "attackDistance", 1.5);
        this.localAttackDistanceKey = Behavior3NodeConfigHelper.GetString(cfg, "localAttackDistanceKey", "");

    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `AttackTarget`.
     **/
    tick(tick: Tick) {
        if (this._owner == null) {
            this._owner = (<Laya.Script3D>tick.target).owner as Laya.Sprite3D;
        }
        if (this.localAttackDistanceKey != "") {
            this._attackDistance = tick.blackboard.get(this.localAttackDistanceKey, tick.tree.id, "", 1);
        }
        
        if (this.localTargetKey != "") {
            this._target = tick.blackboard.get(this.localTargetKey, tick.tree.id, "", null);
        } else {
            let scene = Laya.stage["_scene3Ds"][0];
            this._target = D3Helper.findChild(scene, this._targetName);
        }
        if (this._target == null) {
            //console.log(this.name, "请检查是否有" + this._target + "对象");
            return B3Status.FAILURE;
        }
        let distance = Laya.Vector3.distance(this._owner.transform.position, this._target.transform.position);
        if (distance <= this._attackDistance) {
            this._owner.transform.lookAt(this._target.transform.position, this._up);
            this._owner.transform.localRotationEulerY += 180;
            this._owner.transform.localRotationEulerX = 0;
            return B3Status.SUCCESS;
        }else{
            return B3Status.FAILURE;
        }

       


    }
};
