import Action from "../../../behavior3/core/Action";
import Behavior3NodeConfig, { Behavior3NodeConfigHelper } from "../../../behavior3/config/Behavior3NodeConfig";
import Tick from "../../../behavior3/core/Tick";
import { B3Status } from "../../../behavior3/constants";
import D3Helper from "../../../gameCore/plugins/tools/D3Helper";

/**
 * This action node returns `Track` always.
 * 跟随目标
 * @module b3
 * @class Track
 * @extends Action
 **/
export default class Track extends Action {

    private _targetName: string;
    private _localTargetName: string;
    private _target: Laya.Sprite3D;
    private _speed: number;
    private _arrival: number;
    private _owner: Laya.Sprite3D;
    private _inited: boolean = false;
    private _up: Laya.Vector3 = new Laya.Vector3(0, 1, 0);
    private _movement: Laya.Vector3 = new Laya.Vector3(0, 0, 1);

    public static get TypeName(): string {
        return "Track";
    }

    /**
     * Creates an instance of Track.
     * @memberof Track
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = Track.TypeName;
        this.title = Track.TypeName;
        this._targetName = Behavior3NodeConfigHelper.GetString(cfg, "target", "");
        this._localTargetName = Behavior3NodeConfigHelper.GetString(cfg, "localTarget", "");
        this._speed = Behavior3NodeConfigHelper.GetFloat(cfg, "speed", 1);
        this._arrival = Behavior3NodeConfigHelper.GetFloat(cfg, "arrival", 1);
        console.log("Initialize:", this.name, this.title);
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `CrossFade`.
     **/
    tick(tick: Tick) {
        if (this._localTargetName == "" && this._targetName == "") {
            console.log(this.name, "请检查目标名是否正确");
            return B3Status.ERROR;
        }
        if (this._owner == null) {
            this._owner = (<Laya.Script3D>tick.target).owner as Laya.Sprite3D;
        }
        if (this._inited == false) {
            if (this._localTargetName != "") {
                console.log(this._localTargetName);
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
        let distance = Laya.Vector3.distance(this._owner.transform.position, this._target.transform.position);
        this._owner.transform.lookAt(this._target.transform.position, this._up);
        this._owner.transform.localRotationEulerY += 180;
        this._owner.transform.localRotationEulerX = 0;

        if (distance <= this._arrival) {
            console.log("到达目标");
            return B3Status.SUCCESS;
        } else {
            let delta = Laya.timer.delta * 0.001;
            this._movement.z = this._speed * delta;
            this._owner.transform.translate(this._movement);
            return B3Status.RUNNING;
        }


    }
};
