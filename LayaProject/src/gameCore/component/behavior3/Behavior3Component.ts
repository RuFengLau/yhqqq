import BehaviorTree from "./core/BehaviorTree";
import Behavior3TreeConfig from "./config/Behavior3TreeConfig";
import Behavior3Manager from "./Behavior3Manager";
import LayaScript3D from "../LayaScript3D";

/**
 * 组件类
 */
export default class Behavior3Component extends LayaScript3D {
    private _aiTree: BehaviorTree;
    public get aiTree(): BehaviorTree {
        return this._aiTree
    }
    public setBehaviorTreeData(url: string) {
        Laya.loader.load(url, Laya.Handler.create(this, this.loadAIComplete));
    }

    loadAIComplete(cfg: Behavior3TreeConfig) {
        this._aiTree = new BehaviorTree();
        this._aiTree.load(cfg);
        console.log("AI加载完成");
    }

    onUpdate() {
        if (this._aiTree) {
            this._aiTree.tick(this, Behavior3Manager.inst.blackboard);
        }
    }
}