
import Behavior3NodeConfig, { Behavior3NodeConfigHelper } from "../../config/Behavior3NodeConfig";
import Tick from "../../core/Tick";
import { B3Status } from "../../constants";

import Condition from "../../core/Condition";
import Behavior3Manager from "../../Behavior3Manager";
import RoleController from "../../../../gameLogic/controllers/RoleController";
import EventManager from "../../../managers/eventManager/EventManager";
import BattleManager from "../../../../gameLogic/managers/BattleManager";
import CustomEvents from "../../../../gameLogic/models/CustomEvents";

/**
 * This action node returns `DashAttack` always.
 * 播放动画
 * @module b3
 * @class DashAttack
 * @extends Condition
 **/
export default class DashAttack extends Condition {

    private _owner: Laya.Sprite3D;
    private _controller: RoleController;
    private _up: Laya.Vector3 = new Laya.Vector3(0, 1, 0);
    private _lookAtTarget: Laya.Sprite3D;
    private _inited: boolean = false;
    private isLookAt: boolean = false;
    public static get TypeName(): string {
        return "DashAttack";
    }

    /**
     * Creates an instance of DashAttack.
     * @memberof DashAttack
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = DashAttack.TypeName;
        this.title = DashAttack.TypeName;
        console.log("Initialize:", this.name, this.title);
        EventManager.inst.AddEventListener(CustomEvents.onRoleDead, this, this.onRoleDead);
    }

    private onRoleDead(instanceId: string) {
        if (this._lookAtTarget) {
            let role = this._lookAtTarget.getComponent(RoleController) as RoleController;
            if (role && role.instanceId == instanceId) {
                role.stopAI();
                this._lookAtTarget = null;
            }
        }
    }


    /**
     * Open method.
     * @method open
     * @param {Tick} tick A tick instance.
     **/
    open(tick: Tick) {
        if (this._inited == false) {
            this._inited = true;
        }

    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `DashAttack`.
     **/
    tick(tick: Tick) {
        if (this._owner == null) {
            this._owner = (<Laya.Script3D>tick.target).owner as Laya.Sprite3D;
            this._controller = this._owner.getComponent(RoleController) as RoleController;
        }
        let isTriggerWall = tick.blackboard.get<boolean>('isTriggerWall', tick.tree.id, "", false);
        if ( this._lookAtTarget == null || isTriggerWall == true || this._lookAtTarget.parent == null) {
            this.getTarget();
            tick.blackboard.set('isTriggerWall', false, tick.tree.id, "");
        } else {
            //选定某个目标为坐标点
            if (this.isLookAt && this._lookAtTarget) {
                this._owner.transform.lookAt(this._lookAtTarget.transform.position, this._up);
                this._owner.transform.localRotationEulerY += 180;
                this._owner.transform.localRotationEulerX = 0;
                let dis = Laya.Vector3.distance(this._owner.transform.position, this._lookAtTarget.transform.position);
                if (dis < 10) {
                    this.isLookAt = false;
                }
            }
            

        }

        let list = BattleManager.inst.getNearEnemyList(this._owner, this._controller.friendType, 10);
        if (list.length > 0) {
            Behavior3Manager.inst.blackboard.set("isAttack", true, tick.tree.id, "");
            // this._controller.dashAttack(list);
            return B3Status.SUCCESS;
        } else {
            return B3Status.FAILURE;
        }
    }

    getTarget() {
        console.log("重新搜索敌人");
        this._lookAtTarget = BattleManager.inst.getRandomEnemy(this._owner, this._controller.friendType);
        if (this._lookAtTarget) {
            //选定某个目标为坐标点
            this._owner.transform.lookAt(this._lookAtTarget.transform.position, this._up);
            this._owner.transform.localRotationEulerY += 180;
            this._owner.transform.localRotationEulerX = 0;
            this.isLookAt = true;
        }

    }
};
