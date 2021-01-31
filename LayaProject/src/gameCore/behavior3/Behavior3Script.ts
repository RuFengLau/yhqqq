import BehaviorTree from "./core/BehaviorTree";
import Behavior3TreeConfig from "./config/Behavior3TreeConfig";
import Behavior3Manager from "./Behavior3Manager";


export default class Behavior3Script extends Laya.Script3D {
    private _aiTree: BehaviorTree;
    public pause: boolean = true;
    private onLoadComplete: Laya.Handler;
    public get aiTree(): BehaviorTree {
        return this._aiTree
    }
    public setBehaviorTreeData(url: string, onLoadComplete: Laya.Handler) {
        this.onLoadComplete = onLoadComplete;
        Laya.loader.load(url, Laya.Handler.create(this, this.loadAIComplete));
    }

    loadAIComplete(cfg: Behavior3TreeConfig) {
        this._aiTree = new BehaviorTree();
        this._aiTree.load(cfg);
        this.onLoadComplete && this.onLoadComplete.run();
    }

    onUpdate() {
        
        if (this._aiTree && this.pause == false) {
            this._aiTree.tick(this, Behavior3Manager.inst.blackboard);
        }
    }
}