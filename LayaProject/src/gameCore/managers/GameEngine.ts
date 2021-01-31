import Platforms, { Platform } from "../platform/Platforms";
import PlatformConfig from "../platform/PlatformConfig";
import UIManager from "./UIManager";
import SoundManager from "./soundManager/SoundManager";
import ResourcesManager from './ResourcesManager';
import DataManager from './DataManager';
import LocalStorageManager from "./LocalStorageManager";
import YMSDK, { SdkPlatformConfig } from "../ymsdk/YMSDK";
import YmAdSdk from "../platform/ADUI/YmAdSdk";

export default class GameEngine {
    private static _inst: GameEngine;
    public static get inst(): GameEngine {
        if (this._inst == null) {
            this._inst = new GameEngine();
        }
        return this._inst;
    }
    public host:string = "";
    /**是否读取本地资源 */
    public isLocal: boolean = false;
    /**设置渠道 */
    public set platform(value: Platform) {
        Platforms.inst.platform = value;
    }

    private debugIndex: number = 0;
    public useZipAssets: boolean = false;
    public zipHost:string = "";

    /**引擎初始化 */
    public async init(): Promise<boolean> {
        return new Promise<boolean>( async (resolve, reject) => {
            UIManager.inst.init();
            await ResourcesManager.inst.loadLocalFiles();//本地资源加载
            PlatformConfig.inst.init(Platforms.inst.platform);//必须放这
            this.debug(`设置本地保存项目key ${PlatformConfig.inst.globalConfigs.localProjectkey}`);
            LocalStorageManager.inst.projectKey = PlatformConfig.inst.globalConfigs.localProjectkey;//必须放这
            DataManager.inst.init();
            SoundManager.inst.loadData();//必须放这
            if (this.useZipAssets == false &&
                this.isLocal == false &&
                PlatformConfig.inst.currentPlatform.basePath &&
                PlatformConfig.inst.currentPlatform.basePath != "") {
                Laya.URL.basePath = PlatformConfig.inst.currentPlatform.basePath;
            }
            Platforms.inst.setLoadingProgress(100);
            this.debug(`设置Laya.URL.basePath ${Laya.URL.basePath}`);
            resolve(true);
        });
    }

    /**平台+读取资源 */
    public async initAsync(callback: () => void) {
        //渠道初始
        Platforms.inst.onInit(null);
        //资源加载
        await ResourcesManager.inst.loadResource();
        //注入广告组件信息
        YmAdSdk.inst.init();
        //注入sdk信息
        let sdkPlatformConfig = new Array<SdkPlatformConfig>();
        sdkPlatformConfig.push(new SdkPlatformConfig("99e555608e754cca9725a3c9d2a7945b",Platform.weixin_h5));
        sdkPlatformConfig.push(new SdkPlatformConfig("tt_123456",Platform.toutiao_h5));
        sdkPlatformConfig.push(new SdkPlatformConfig("qqplay_123456",Platform.qqplay_h5));
        await YMSDK.inst.initAsync(sdkPlatformConfig);
        //数据初始
        DataManager.inst.initData();
        Platforms.inst.onInitAdService(() => {
            callback();
        });
       
    }

    /**
     * 保存数据
     * @param key 
     * @param data 
     */
    public saveData(key: string, data: any) {
        Platforms.inst.saveDataToCache(key, data)
    }

    /**读取数据 */
    public loadData(key: string) {
        return Platforms.inst.readDataFromCache(key);
    }

    /**震动 */
    public vibrateShort() {
        Platforms.inst.vibrateShort();
    }

    /**debug信息 */
    public debug(msg: string) {
        this.debugIndex++;
        console.log(`${this.debugIndex}: 广州游梦 - ${msg}`);
    }

    public pauseGame() {
        console.warn("暂停游戏");
        Laya.timer.scale = 0;
    }

    public resumeGame() {
        console.warn("恢复游戏");
        Laya.timer.scale = 1;
    }
}