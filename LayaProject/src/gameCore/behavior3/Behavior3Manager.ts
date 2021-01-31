import Blackboard from "./core/Blackboard";

export default class Behavior3Manager {
    private static _inst: Behavior3Manager;
    public static get inst(): Behavior3Manager {
        if (this._inst == null) {
            this._inst = new Behavior3Manager();
        }
        return this._inst;
    }

    public blackboard: Blackboard;

    public init() {
        this.blackboard = new Blackboard();
    }

    /**
     * 设置全局变量
     * @param key 
     * @param value 
     */
    public setGlobalParamData(key: string, value: any) {
        this.blackboard.set(key, value, "", "");
    }

    /**
     * 获取全局变量
     * @param key 
     */
    public getGlobalParamData(key: string):any {
        return this.blackboard.get(key, "", "", null);
    }

}