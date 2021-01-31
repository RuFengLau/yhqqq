export default class CustomEventDispatcher extends Laya.EventDispatcher {

    private static _instance: CustomEventDispatcher;
    public static get instance(): CustomEventDispatcher {
        if (this._instance == null) {

            this._instance = new CustomEventDispatcher();
        }

        return this._instance;
    }
    constructor() { super(); }
}