import Action from "../../../../behavior3/core/Action";
import Behavior3NodeConfig, { Behavior3NodeConfigHelper } from "../../../../behavior3/config/Behavior3NodeConfig";
import Tick from "../../../../behavior3/core/Tick";
import { B3Status } from "../../../../behavior3/constants";
import D3Helper from "../../../../gameCore/plugins/tools/D3Helper";

/**
 * This action node returns `FindChildByName` always.
 * 跟随目标
 * @module b3
 * @class FindChildByName
 * @extends Action
 **/
export default class FindChildByName extends Action {
    private _name: string;
    private _useLocal: boolean;
    private _localKey: string;
    private _inited: boolean = false;
    public static get TypeName(): string {
        return "FindChildByName";
    }

    /**
     * Creates an instance of Track.
     * @memberof Track
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = FindChildByName.TypeName;
        this.title = FindChildByName.TypeName;
        this._name = Behavior3NodeConfigHelper.GetString(cfg, "name", "");
        this._localKey = Behavior3NodeConfigHelper.GetString(cfg, "localKey", "");
        console.log("Initialize:", this.name, this.title);
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `CrossFade`.
     **/
    tick(tick: Tick) {
        if (this._inited == false) {
            let scene = Laya.stage["_scene3Ds"][0];
            if (this._localKey != undefined || this._localKey != "") {
                let target = D3Helper.findChild(scene, this._name);
                tick.blackboard.set(this._localKey, target, tick.tree.id, "");
            }
            this._inited = true;
        }
        return B3Status.SUCCESS;
    }
};
