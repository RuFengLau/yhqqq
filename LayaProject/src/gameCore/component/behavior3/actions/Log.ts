import { B3Status } from './../constants';
import Behavior3NodeConfig, { Behavior3NodeConfigHelper } from './../config/Behavior3NodeConfig';
import Action from "../core/Action";
import Tick from '../core/Tick';

export default class Log extends Action {
    private info: string;

    static get TypeName(): string {
        return "Log";
    }

    Initialize(cfg: Behavior3NodeConfig) {
        super.Initialize(cfg);
        this.name = Log.TypeName;
        this.title = Log.TypeName;
        this.info = Behavior3NodeConfigHelper.GetString(cfg, "info", "log-action");
    }

    open(tick: Tick) {
        console.log("[BT]", this.info);
    }
    tick(tick: Tick) {
        return B3Status.SUCCESS;
    }
}