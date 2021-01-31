
import Behavior3NodeConfig, { Behavior3NodeConfigHelper } from "../../config/Behavior3NodeConfig";
import Tick from "../../core/Tick";
import { B3Status } from "../../constants";
import Action from "../../core/Action";

/**
 * This action node returns `TargetEscape` always.
 * 播放动画
 * @module b3
 * @class TargetEscape
 * @extends Condition
 **/
export default class TargetEscape extends Action {

    private _owner: Laya.Sprite3D;
    private _target: Laya.Sprite3D;

    private localTargetKey: string;
    private distance: number;

    public static get TypeName(): string {
        return "TargetEscape";
    }

    /**
     * Creates an instance of TargetEscape.
     * @memberof TargetEscape
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = TargetEscape.TypeName;
        this.title = TargetEscape.TypeName;
        console.log("Initialize:", this.name, this.title);
        this.localTargetKey = Behavior3NodeConfigHelper.GetString(cfg, "localTargetKey", "");
        this.distance = Behavior3NodeConfigHelper.GetFloat(cfg, "distance", 30);
    }

    /**
     * Open method.
     * @method open
     * @param {Tick} tick A tick instance.
     **/
    open(tick: Tick) {
        this._target = tick.blackboard.get(this.localTargetKey, tick.tree.id, "", null);
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `TargetEscape`.
     **/
    tick(tick: Tick) {
        if (this._owner == null) {
            this._owner = (<Laya.Script3D>tick.target).owner as Laya.Sprite3D;

        }
        if (this._target == null) {

            if (Laya.Vector3.distance(this._target.transform.position, this._owner.transform.position) >= this.distance) {
                tick.blackboard.set(this.localTargetKey, null, tick.tree.id, "");

            }
        }

        return B3Status.SUCCESS;
    }

};
