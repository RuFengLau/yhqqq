import GameEngine from '../../managers/GameEngine';
import LocalStorageManager from '../../managers/LocalStorageManager';
import { CheckInInfoData, CheckInData } from './CheckInData';
import DateHelper from '../tools/DateHelper';

/**
 * 签到管理类
 */
export default class CheckInManager {
    private static _inst: CheckInManager;
    public static get inst(): CheckInManager {
        if (this._inst == null) {
            this._inst = new CheckInManager();
        }
        return this._inst;
    }

    private saveKey: string = "";
    private saveData: CheckInInfoData;
    private m_data:Array<CheckInData> = new Array<CheckInData>();

    public get data():Array<CheckInData>{
        return this.m_data;
    }

    public set data(d:Array<CheckInData>){
        this.m_data = d;
    }

    public get signNum():number{
        return this.saveData.signNum;
    }

    public init() {
        this.saveKey = LocalStorageManager.inst.checkInRecordKey;
        let localData = GameEngine.inst.loadData(this.saveKey);
        console.log("读取本地签到信息:", localData);
        if (localData) {
            this.saveData = localData;
        } else {
            this.saveData = new CheckInInfoData();
            this.saveData.signDate = "";
            this.saveData.signNum = 0;
            this.saveData.getDay = -1;
            GameEngine.inst.saveData(this.saveKey, this.saveData);
        }
        this.needClean();
    }

    /**
     * 清理数据
     */
    public needClean() {
        if (this.isMonday(DateHelper.getTime()) && this.checkDaySign() == false) {
            this.saveData.signNum = 0;
            this.saveData.signDate = "";
            this.saveData.getDay = -1;
            GameEngine.inst.saveData(this.saveKey, this.saveData);
        }
    }

    private isMonday(date: string): boolean {
        return new Date(date).getDay() == 1 ? true : false;
    }

    /**
     * 检测是否签到了
     */
    public checkDaySign(): boolean {
        return DateHelper.getTime() == this.saveData.signDate ? true : false
    }

    /**获取签到数据 */
    public getCheckInData():CheckInData{
        return this.data[this.saveData.signNum];
    }

    /**签到 */
    public checkIn(){
        this.saveData.signNum++;
        this.saveData.signDate = DateHelper.getTime();
        GameEngine.inst.saveData(this.saveKey, this.saveData);
    }
}