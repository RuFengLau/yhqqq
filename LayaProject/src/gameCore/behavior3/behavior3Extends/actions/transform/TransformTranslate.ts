import Action from "../../../../behavior3/core/Action";
import Behavior3NodeConfig, { Behavior3NodeConfigHelper } from "../../../../behavior3/config/Behavior3NodeConfig";
import Tick from "../../../../behavior3/core/Tick";
import { B3Status } from "../../../../behavior3/constants";

/**
 * This action node returns `TransformTranslate` always.
 * 向某方向移动
 * @module b3
 * @class TransformTranslate
 * @extends Action
 **/
export default class TransformTranslate extends Action {
    private speed:number;
    private localSpeedKey:string;

    private _owner: Laya.Sprite3D;
    private _translateV3:Laya.Vector3 = new Laya.Vector3(0,0,1);
    private _outV3:Laya.Vector3 = new Laya.Vector3(0,0,0);

    public static get TypeName(): string {
        return "TransformTranslate";
    }

    /**
     * Creates an instance of Track.
     * @memberof Track
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = TransformTranslate.TypeName;
        this.title = TransformTranslate.TypeName;
        this.speed = Behavior3NodeConfigHelper.GetFloat(cfg, "speed", 1);
        this.localSpeedKey = Behavior3NodeConfigHelper.GetString(cfg, "localSpeedKey", "");

        console.log("Initialize:", this.name, this.title);
        console.log("  property:", this.speed);
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
        let speedValue = tick.blackboard.get(this.localSpeedKey, tick.tree.id, "", 1);
        if(speedValue){
            this.speed = speedValue;
        }
        let detla = Laya.timer.delta * 0.001;
        Laya.Vector3.scale(this._translateV3,this.speed * detla,this._outV3);
        this._owner.transform.translate(this._outV3);
        return B3Status.SUCCESS;
    }
};
