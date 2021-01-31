
import Behavior3NodeConfig, { Behavior3NodeConfigHelper } from "../../config/Behavior3NodeConfig";
import Tick from "../../core/Tick";
import { B3Status } from "../../constants";
import Action from "../../core/Action";
import RoleController from "../../../../gameLogic/controllers/RoleController";
import { FriendType } from "../../../models/GameEnum";
import BattleManager from "../../../../gameLogic/managers/BattleManager";

/**
 * This action node returns `SerchTarget` always.
 * 播放动画
 * @module b3
 * @class SerchTarget
 * @extends Condition
 **/
export default class SerchTarget extends Action {

    private _owner: Laya.Sprite3D;
    private _target: Laya.Sprite3D;

    private localTargetKey: string;
    private distance: number;

    public static get TypeName(): string {
        return "SerchTarget";
    }

    /**
     * Creates an instance of SerchTarget.
     * @memberof SerchTarget
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = SerchTarget.TypeName;
        this.title = SerchTarget.TypeName;
        console.log("Initialize:", this.name, this.title);
        this.localTargetKey = Behavior3NodeConfigHelper.GetString(cfg, "localTargetKey", "");
        this.distance = Behavior3NodeConfigHelper.GetFloat(cfg, "distance", 65);

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
     * @return {Constant} Always return `SerchTarget`.
     **/
    tick(tick: Tick) {
        if (this._owner == null) {
            this._owner = (<Laya.Script3D>tick.target).owner as Laya.Sprite3D;

        }
        if (this._target == null) {
            this._target = this.getTarget();
        }
        
        if (this._target) {
            tick.blackboard.set(this.localTargetKey, this._target, tick.tree.id, "");
            return B3Status.SUCCESS;
        }
        return B3Status.FAILURE;
        
    }

    getTarget(): Laya.Sprite3D {
        let role = this._owner.getComponent(RoleController) as RoleController;
        let list = [];
        if(role.friendType == FriendType.Enemy){
            list = BattleManager.inst.playerSoliderList;
        }else{
            list = BattleManager.inst.enemySoliderList;
        }
        let disList =[];
        for (let index = 0; index < list.length; index++) {
            const role = list[index];
            let dis = Laya.Vector3.distance(this._owner.transform.position, role.transform.position);
            disList.push(dis);
        }
        let minDis = 100;
        let minIndex = 0;
        for (let index = 0; index < disList.length; index++) {
            const distance = disList[index];
            if(distance > minDis){
                minDis = distance;
                minIndex = index;
            }
        }
        console.log("minIndex:",minIndex);
        return list[minIndex];
    }
};
