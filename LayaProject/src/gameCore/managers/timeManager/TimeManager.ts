import Timer from "./Timer";

export default class TimeManager {
    private static _inst: TimeManager;
    public static get inst(): TimeManager {
        if (this._inst == null) {
            this._inst = new TimeManager();
        }
        return this._inst;
    }
    private timer:Laya.Timer;
    public timers: Array<{ key: string, timer: Timer }> = new Array<{ key: string, timer: Timer }>();

    public init() {
        if(this.timer == null){
            this.timer = new Laya.Timer();
        }
        this.timer.frameLoop(1, this, this.onUpdate);
    }

    public addTimer(id: string, timer: Timer) {
        if (this.has(id) == false) {
            timer.timeId = id;
            this.timers.push({ key: id, timer: timer });
        }else{
            console.log("已经有id");
        }
    }

    public removeTimer(id: string) {
        if (this.has(id)) {
            let t = this.getTimer(id);
            t.clear();
            let index = this.getChildIndex(id);
            this.timers.splice(index, 1);
        } else {
            console.log("没有该timer id");
        }
    }

    private onUpdate() {
        for (let index = 0; index < this.timers.length; index++) {
            const item = this.timers[index];
            item.timer.onUpdate();
        }
    }

    public getTimer(id: string): Timer {
        for (let index = 0; index < this.timers.length; index++) {
            const item = this.timers[index];
            if (item.key == id) {
                return item.timer;
            }
        }
        return null;
    }

    private has(id: string): boolean {
        for (let index = 0; index < this.timers.length; index++) {
            const item = this.timers[index];
            if (item.key == id) {
                return true;
            }
        }
        return false;
    }

    private getChildIndex(id: string): number {
        for (let index = 0; index < this.timers.length; index++) {
            const item = this.timers[index];
            if (item.key == id) {
                return index;
            }
        }
        return -1;
    }
}