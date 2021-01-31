import DateHelper from "../plugins/tools/DateHelper";
import MathHelper from "../plugins/tools/MathHelper";
import GameEngine from "./GameEngine";

export default class LocalStorageManager {
    private static _inst: LocalStorageManager;
    public static get inst(): LocalStorageManager {
        if (this._inst == null) {
            this._inst = new LocalStorageManager();
        }
        return this._inst;
    }
    public projectKey: string = "";

    /**用户数据 */
    public get userDataKey(): string {
        return `${this.projectKey}_user`;
    }

    /**声音开关 */
    public get soundMuteDataKey(): string {
        return `${this.projectKey}_soundMute`;
    }

    /**分享视频保存次数 */
    public get shareVideoKey(): string {
        return `${this.projectKey}_shareVideo`;
    }

    /**桌面图标 */
    public get shortcutKey(): string {
        return `${this.projectKey}_shortcut`;
    }

    /**彩签记录 */
    public get colorSignKey(): string {
        return `${this.projectKey}_colorSign`;
    }

    /**支付本地认证记录 */
    public get payTempRecordKey(): string {
        return `${this.projectKey}_payTempyRecord`;
    }

    /**banner本地记录 */
    public get bannerRecordKey(): string {
        return `${this.projectKey}_bannerRecord`;
    }

    public get checkInRecordKey(): string {
        return `${this.projectKey}_checkIn`;
    }

    /**
     * 金矿当前储量
     */
    public get coisResourceKey(): string {
        return `${this.projectKey}_coinResource`;
    }

    /**
     * 金矿当前储量
     */
    public get woodResourceKey(): string {
        return `${this.projectKey}_woodResource`;
    }

    public get spinKey(): string {
        return `${this.projectKey}_spin_`;
    }

    /**藏宝图 */
    public get treasureKey(): string {
        return `${this.projectKey}_treasure`;
    }

    public get guideRecordKey(): string {
        return `${this.projectKey}_guide`;
    }

    /**获取每天的哪种变量是否已经使用 */
    public getDayLocalRecord(key: string): boolean {
        let data = GameEngine.inst.loadData(this.projectKey + "_" + key);
        let flag = false;
        if (data) {
            //有数据
            //判断日期
            let day = MathHelper.countDay(DateHelper.getTime(), data.date);
            if (day >= 1) {
                GameEngine.inst.saveData(this.projectKey + "_" + key, { date: DateHelper.getTime() });
            } else {
                flag = true;
            }
        } else {
            GameEngine.inst.saveData(this.projectKey + "_" + key, { date: DateHelper.getTime() });
        }
        return flag;
    }

    /**
     * 获取每天第几次进入游戏
     */
    public getDayCountEnterGame(): number {
        let count = 1;
        let key = this.projectKey + "_enterGame";
        let data = GameEngine.inst.loadData(key);
        if (data) {
            count = data.count;
        } else {
            GameEngine.inst.saveData(key, { date: DateHelper.getTime(), count: 1 });
        }
        return count;
    }

    public enterGame() {
        let key = this.projectKey + "_enterGame";
        let data = GameEngine.inst.loadData(key);
        if (data) {
            let count = data.count;
            count++;
            GameEngine.inst.saveData(key, { date: DateHelper.getTime(), count: count });
        } else {
            GameEngine.inst.saveData(key, { date: DateHelper.getTime(), count: 1 });
        }
    }

    public setDayDailyShowSwitch(){

    }
}