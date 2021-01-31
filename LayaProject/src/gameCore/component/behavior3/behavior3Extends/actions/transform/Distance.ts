import Action from "../../../../behavior3/core/Action";
import Behavior3NodeConfig, { Behavior3NodeConfigHelper } from "../../../../behavior3/config/Behavior3NodeConfig";
import Tick from "../../../../behavior3/core/Tick";
import { B3Status } from "../../../../behavior3/constants";

/**
 * This action node returns `Disance` always.
 * 跟随目标
 * @module b3
 * @class Disance
 * @extends Action
 **/
export default class Disance extends Action {

    private _targetName: string;
    private _target: Laya.Sprite3D;
    private _arrival: number;
    private _owner: Laya.Sprite3D;
    private _inited: boolean = false;

    public static get TypeName(): string {
        return "Disance";
    }

    /**
     * Creates an instance of Track.
     * @memberof Track
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = Disance.TypeName;
        this.title = Disance.TypeName;
        this._targetName = Behavior3NodeConfigHelper.GetString(cfg, "target", "");
        this._arrival = Behavior3NodeConfigHelper.GetFloat(cfg, "arrival", 1);
        console.log("Initialize:", this.name, this.title);
        console.log("  property:", this._targetName, this._arrival);
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `CrossFade`.
     **/
    tick(tick: Tick) {
        if (this._targetName == undefined || this._targetName == "") {
            console.log("请检查目标名是否正确");
            return B3Status.ERROR;
        }
        if (this._owner == null) {
            this._owner = (<Laya.Script3D>tick.target).owner as Laya.Sprite3D;
        }
        if (this._inited == false) {
            let scene = Laya.stage["_scene3Ds"][0];
            this._target = this.findChild(scene, this._targetName);
            this._inited = true;
        }
        if (this._target == null) {
            console.log("请检查是否有" + this._targetName + "对象");
            return B3Status.ERROR;
        }
        let distance = Laya.Vector3.distance(this._owner.transform.position, this._target.transform.position);
        if (distance <= this._arrival) {
            console.log("到达目标");
            return B3Status.SUCCESS;
        }
    }

    /**
     * 查找节点
     * @param sp 精灵
     * @param name 需要查找的节点名
     */
    private findChild(sp, name: string) {
        if (sp.name == name)
            return sp;
        else
            return this._findChild(sp._children, name);
    }
    private _findChild(spArr, name) {
        var arr: Array<Laya.Sprite3D> = [];
        for (var i = 0; i < spArr.length; i++) {
            var child = spArr[i];
            if (child.name == name) {
                return child;
            }
            else if (child.numChildren) {
                arr = arr.concat(child._children);
            }
        }
        if (!arr.length)
            return null;
        return this._findChild(arr, name);
    }
};
