import User from '../models/User';
import UserInfo from '../models/UserInfo';
import MathHelper from '../plugins/tools/MathHelper';
import GameEngine from './GameEngine';
import EventManager from './eventManager/EventManager';
import GameEvents from '../events/GameEvents';
import LocalStorageManager from './LocalStorageManager';
import ResourcesManager from './ResourcesManager';
// import CheckInManager from '../plugins/checkIn/CheckInManager';
// import GuideManager from '../plugins/guideSystem/GuideManager';
import { CarBagData, CarData, StageBagData } from '../../gameLogic/managers/GameModels';

export default class DataManager {
    private static _inst: DataManager;
    public static get inst(): DataManager {
        if (this._inst == null) {
            this._inst = new DataManager();
        }
        return this._inst;
    }
    public get user(): User {
        return this._user;
    }
    private _user: User = new User();
    public carConfigs:Array<CarData> = [];
    public init() { }

    public initData() {
        //数据
        let configs = Laya.loader.getRes(ResourcesManager.inst.GameConfigRes);
        this.carConfigs = configs["CarConfigs"];
        //CheckInManager.inst.data = configs["DaySignConfigs"];
        //GuideManager.inst.datas = configs["GuideConfigs"];
        this.load();
        this.checkOldData();
        console.log("用户信息:", this._user);
        //
    }

    /**
     * 生成新用户
     */
    public generalUser(): User {
        let user = new User();
        user.userInfo = new UserInfo();
        user.userInfo.nickName = "ym_" + MathHelper.newGuid();
        user.userInfo.openid = MathHelper.newGuid();
        user.coins = 0;
        user.gems = 0;
        user.score = 0;

        user.currentStage = 0;
        user.currentCarId = "1";
        //默认解锁1
        user.carBags = new Array<CarBagData>();
        let carBagData = new CarBagData();
        carBagData._id = "1";
        carBagData.isUnlock = true;
        user.carBags.push(carBagData);

        user.stageBags = new Array<StageBagData>();

        return user;
    }

    public resetData() {
        Laya.LocalStorage.clear();
        this._user = this.generalUser();
        this.save();
    }

    public resetUser() {
        Laya.LocalStorage.clear();
        this._user = this.generalUser();
        this.save();
        EventManager.inst.SendEvent(GameEvents.ON_UPDATE_USERINFO_EVENT);
    }

    /**
     * 增加金币
     * @param coins 
     */
    public addCoins(coins: number, reset: boolean = true) {
        this._user.coins += coins;
        if (reset) {
            EventManager.inst.SendEvent(GameEvents.ON_UPDATE_USERINFO_EVENT);
        }
        this.save();
    }

    /**
     * 增加钻石
     * @param gems 
     */
    public addGems(gems: number) {
        this._user.gems += gems;
        EventManager.inst.SendEvent(GameEvents.ON_UPDATE_USERINFO_EVENT);
        this.save();
    }

    public save() {
        GameEngine.inst.saveData(LocalStorageManager.inst.userDataKey, this._user);
    }

    public load() {
        let localUser = GameEngine.inst.loadData(LocalStorageManager.inst.userDataKey);
        if (localUser) {
            this._user = localUser;
        } else {
            this._user = this.generalUser();
            this.save();
        }
    }

    private checkOldData(){
        
    }

    public clearStage(){
        this.user.currentStage ++;
        EventManager.inst.SendEvent(GameEvents.ON_UPDATE_USERINFO_EVENT);
        this.save();
    }

    public isUnlockCar(id:string):boolean{
        let carBagData = this.user.carBags.find(i=>i._id == id);
        if(carBagData && carBagData.isUnlock) return true;
        return false;
    }

    public getCarData(id:string){
         
    }

    public getCarIndex(id:string){
        let index = this.user.carBags.findIndex(i=>i._id == id);
        if(index == -1){
            index = 0;
        }
        return index;
    }

    public buyCar(id:string){
        let carBagData = this.user.carBags.find(i=>i._id == id);
        if(carBagData == null){
            let data = new CarBagData();
            data._id = id;
            data.isUnlock = true;
            this.user.carBags.push(data);
            this.save();
        }
    }

    public useCar(id:string){
        this.user.currentCarId = id;
        this.save();
    }



    /**深复制 */
    public deepCopy<T>(source: any): T {
        return <T>JSON.parse(JSON.stringify(source));
    }
}