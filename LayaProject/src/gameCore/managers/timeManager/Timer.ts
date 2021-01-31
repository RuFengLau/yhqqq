import EventManager from "../eventManager/EventManager";
import TimeEvent from "./TimeEvent";

export default class Timer {
    public timeId: string;
    public delay: number = 10;
    private _pause: boolean = true;

    private tempTime: number = 0;
    public onUpdateTime: Laya.Handler;
    public onComplete: Laya.Handler;

    constructor(delay: number) {
        this.delay = delay;
        this.tempTime = this.delay;
    }

    public onUpdate() {
        if (this.pause) {
            return;
        }
        let detla = Laya.timer.delta * 0.001;
        this.tempTime -= detla;
        if (this.tempTime <= 0) {
            this.tempTime = 0;
        }
        if (this.onUpdateTime) {
            this.onUpdateTime.runWith(Math.floor(this.tempTime));
        }
        if (this.tempTime <= 0) {
            this.pause = true;
            if (this.onComplete) {
                this.onComplete.run();
            }
        }
    }

    public start() {
        this.pause = false;
    }

    public get pause(): boolean {
        return this._pause;
    }

    public set pause(value: boolean) {
        this._pause = value;
    }

    public reset() {
        this.tempTime = this.delay;
        this.pause = false;
    }

    public clear() {
        this.onUpdateTime.clear();
        this.onUpdateTime = null;
        this.onComplete.clear();
        this.onComplete = null;
    }
}