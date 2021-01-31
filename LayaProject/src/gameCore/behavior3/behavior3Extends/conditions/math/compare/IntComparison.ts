import Behavior3NodeConfig, { Behavior3NodeConfigHelper } from "../../../../config/Behavior3NodeConfig";
import Tick from "../../../../core/Tick";
import { B3Status } from "../../../../constants";
import Condition from "../../../../core/Condition";


/**
 * This action node returns `IntComparison` always.
 * 整型数值判断
 * @module b3
 * @class IntComparison
 * @extends Action
 **/
export default class IntComparison extends Condition {
    private n1: number;
    private n2: number;
    private operation: string;
    public static get TypeName(): string {
        return "IntComparison";
    }

    /**
     * Creates an instance of IntComparison.
     * @memberof IntComparison
     */
    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = IntComparison.TypeName;
        this.title = IntComparison.TypeName;
        this.n1 = Behavior3NodeConfigHelper.GetInt32(cfg, "n1", 0);
        this.n2 = Behavior3NodeConfigHelper.GetInt32(cfg, "n2", 0);
        this.operation = Behavior3NodeConfigHelper.GetString(cfg, "operation", "=");
    }

    /**
     * Tick method.
     * @method tick
     * @param {b3.Tick} tick A tick instance.
     * @return {Constant} Always return `IntComparison`.
     **/
    tick(tick: Tick) {
        switch (this.operation) {
            case "=":
                if (this.n1 == this.n2) {
                    return B3Status.SUCCESS;
                }
                break;
            case ">":
                if (this.n1 > this.n2) {
                    return B3Status.SUCCESS;
                }
                break;
            case ">=":
                if (this.n1 >= this.n2) {
                    return B3Status.SUCCESS;
                }
                break;
            case "<":
                if (this.n1 < this.n2) {
                    return B3Status.SUCCESS;
                }
                break;
            case "<=":
                if (this.n1 <= this.n2) {
                    return B3Status.SUCCESS;
                }
                break;
        }

        return B3Status.FAILURE;
    }
};
