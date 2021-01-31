import BaseNode from "../core/BaseNode";
import Runner from "../actions/Runner";
import Error from "../actions/Error";
import Failer from "../actions/Failer";
import Succeeder from "../actions/Succeeder";
import Wait from "../actions/Wait";
import MemPriority from "../composites/MemPriority";
import Priority from "../composites/Priority";
import Sequence from "../composites/Sequence";
import MemSequence from "../composites/MemSequence";
import Inverter from "../decorators/Inverter";
import Limiter from "../decorators/Limiter";
import MaxTime from "../decorators/MaxTime";
import Repeater from "../decorators/Repeater";
import RepeatUntilFailure from "../decorators/RepeatUntilFailure";
import RepeatUntilSuccess from "../decorators/RepeatUntilSuccess";
import Behavior3TreeConfig from "./Behavior3TreeConfig";
import BehaviorTree from "../core/BehaviorTree";
import Log from "../actions/Log";
import CrossFade from "../behavior3Extends/actions/animator/CrossFade";
import SetLocalParam from "../behavior3Extends/actions/behavior3/SetLocalParam";
import BoolCondition from "../behavior3Extends/conditions/math/compare/BoolCondition";
import Track from "../behavior3Extends/movement/Track";
import FindChildByName from "../behavior3Extends/actions/gameObject/FindChildByName";
import CanSeeTarget from "../behavior3Extends/movement/CanSeeTarget";
import AttackTarget from "../behavior3Extends/aiExtends/AttackTarget";
import GooseHadObject from "../behavior3Extends/aiExtends/GooseHadObject";
import ObjectIsGround from "../behavior3Extends/aiExtends/ObjectIsGround";


export default class Behavior3Factory {
    public static singleton: Behavior3Factory = new Behavior3Factory();
    private nodes: { [key: string]: new () => BaseNode; } = {

    }

    constructor() {
        this.Initialize();
    }
    Initialize() {
        // actions
        this.nodes[Error.TypeName] = Error;
        this.nodes[Failer.TypeName] = Failer;
        this.nodes[Runner.TypeName] = Runner;
        this.nodes[Succeeder.TypeName] = Succeeder;
        this.nodes[Wait.TypeName] = Wait;
        this.nodes[Log.TypeName] = Log;
        
        // custom actions
        this.nodes[CrossFade.TypeName] = CrossFade;
        this.nodes[SetLocalParam.TypeName] = SetLocalParam;
        this.nodes[BoolCondition.TypeName] = BoolCondition;
        this.nodes[Track.TypeName] = Track;
        this.nodes[FindChildByName.TypeName] = FindChildByName;
        this.nodes[CanSeeTarget.TypeName] = CanSeeTarget;
        this.nodes[AttackTarget.TypeName] = AttackTarget;
        this.nodes[GooseHadObject.TypeName] = GooseHadObject;
        this.nodes[ObjectIsGround.TypeName] = ObjectIsGround;

        // composites
        this.nodes[MemPriority.TypeName] = MemPriority;
        this.nodes[MemSequence.TypeName] = MemSequence;
        this.nodes[Priority.TypeName] = Priority;
        this.nodes[Sequence.TypeName] = Sequence;

        // decorators
        this.nodes[Inverter.TypeName] = Inverter;
        this.nodes[Limiter.TypeName] = Limiter;
        this.nodes[MaxTime.TypeName] = MaxTime;
        this.nodes[Repeater.TypeName] = Repeater;
        this.nodes[RepeatUntilFailure.TypeName] = RepeatUntilFailure;
        this.nodes[RepeatUntilSuccess.TypeName] = RepeatUntilSuccess;
    }

    public BuildBehavior3TreeFromConfig(cfg: Behavior3TreeConfig) {
        let tree = new BehaviorTree();
        tree.load(cfg);
        return tree;
    }

    CreateBehavior3Instance(name: string): BaseNode {
        if (name in this.nodes) {
            const t = this.nodes[name];
            return new t();
        }
        return null;
    }
}