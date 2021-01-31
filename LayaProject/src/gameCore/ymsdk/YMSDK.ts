
import GameEngine from "../managers/GameEngine";
import UIManager from "../managers/UIManager";
import PlatformConfig from "../platform/PlatformConfig";
import Platforms, { Platform } from "../platform/Platforms";
import { HttpRequestExtension } from "../plugins/Http/HttpRequestExtension";
import SdkIconButtonAdComponent from "./controller/ui/SdkIconButtonAdComponent";
import SdkOneLineBannerComponent from "./controller/ui/SdkOneLineBannerComponent";
import SdkPowerViewController from "./controller/ui/SdkPowerViewController";
import SdkResultIconListViewController from "./controller/ui/SdkResultIconListViewController";
import SdkStartIconListViewController from "./controller/ui/SdkStartIconListViewController";
import UI_SdkIconButtonAd from "./views/YmSdkUI/UI_SdkIconButtonAd";
import UI_SdkOneLineBanner from "./views/YmSdkUI/UI_SdkOneLineBanner";
import UI_SdkResultIconListView from "./views/YmSdkUI/UI_SdkResultIconListView";
import YmSdkUIBinder from "./views/YmSdkUI/YmSdkUIBinder";

/**
 * YMSDK 2020-12-26
 * FengLau
 */

export enum SdkSwitchEnum {
    开始ICON导出页面 = "loadingIconListShow",
    游戏格子 = "gridIconShow",
    结算ICON导出页面 = "resultIconListShow",
    结算误点进度页面 = "reslutProgressShow",
}
export default class YMSDK {
    private static _inst: YMSDK;
    public static get inst(): YMSDK {
        if (this._inst == null) {
            this._inst = new YMSDK();
        }
        return this._inst;
    }
    private initApi: string = "https://mini.coschat.com/api/sdk/";

    private sendEventApi: string = "https://mini.coschat.com/api/sdk/click";

    public enabled: boolean = true;
    /**SDK配置数据，initAsync正常后获取，为空即获取失败 */
    public sdkConfig: SdkConfig;
    //微信平台
    private wx: any = window['wx'];
    private currentAppId: string = "";
    private platformConfig: Array<SdkPlatformConfig> = [];

    public map: { [key: string]: boolean; } = {
        "loadingIconListShow": false,
        "gridIconShow": false,
        "resultIconListShow": false,
        "reslutProgressShow": false
    };

    public setMap(key: string, value: boolean) {
        this.map[key] = value;
        console.log("[YMSDK]设置Map:", key, this.map[key])
    }

    public getKeyValue(key: string) {
        return this.map[key];
    }

    public setConfig(data: Array<SdkPlatformConfig>) {
        this.platformConfig = data;
    }

    /**
     * 初始化
     * @param sdkAppId sdk的AppId
     */
    public async initAsync(data: Array<SdkPlatformConfig>) {
        //在友盟后台增加统计事件
        //SDKIconClickEvent
        //
        this.platformConfig = data;
        this.currentAppId = this.getCurrentAppId();
        console.log("[YMSDK]初始化渠道信息:", this.platformConfig);
        console.log(`当前渠道是 ${Platforms.inst.platformDisplayName} AppID:${this.currentAppId}`)
        await this.loadUI();
        console.log("[YMSDK]加载UI完成");
        await this.initSDK(data);
        console.log("[YMSDK]初始化SDK完成");
    }

    private getCurrentAppId() {
        for (let index = 0; index < this.platformConfig.length; index++) {
            const c = this.platformConfig[index];
            if (c.platform == Platform.weixin_h5) {
                return c.appId;
            }
        }
        return "";
    }

    public getApps(): AppInfo[] {
        return this.sdkConfig.apps
    }

    /**
     * 显示Loading-主界面的 导流IconList页面
     * @param callback 
     */
    public showStartIconListView(callback: (success: boolean) => void) {
        console.log("获取SDK value:", YMSDK.inst.getKeyValue(SdkSwitchEnum.开始ICON导出页面));
        if (this.getKeyValue(SdkSwitchEnum.开始ICON导出页面)) {
            Laya.timer.callLater(this, () => {
                let view = new SdkStartIconListViewController()
                UIManager.inst.showPopupView(view);
                view.closeHandler = Laya.Handler.create(this, () => {
                    callback && callback(true);
                });
            });
        } else {
            callback && callback(true);
        }
    }

    /**
     * 显示结算的导流IconList页面
     * @param callback 
     */
    public showResultIconListView(callback?: (success: boolean) => void) {
        if (this.getKeyValue(SdkSwitchEnum.结算ICON导出页面)) {
            Laya.timer.callLater(this, () => {
                let view = new SdkResultIconListViewController();
                UIManager.inst.showPopupView(view);
            });
            callback && callback(true);
        } else {
            callback && callback(false);
        }
    }

    /**
     * 隐藏结算导流Icon页面
     */
    public hideResultIconListView() {
        UIManager.inst.hidePopupView(UI_SdkResultIconListView.URL);
    }

    /**
     * 不停点击的助力页面
     * @param callback 
     */
    public showPowerView(callback: (success: boolean) => void) {
        if (this.getKeyValue(SdkSwitchEnum.结算误点进度页面)) {
            Laya.timer.callLater(this, () => {
                let view = new SdkPowerViewController()
                UIManager.inst.showPopupView(view);
                view.closeHander = Laya.Handler.create(this, () => {
                    callback && callback(true);
                });
            });
        } else {
            callback && callback(false);
        }
    }

    private async loadUI(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            let urls = []
            urls.push({ url: "res/sdkAssets/YmSdkUI.bin", type: Laya.Loader.BUFFER });
            urls.push({ url: "res/sdkAssets/YmSdkUI_atlas0.png", type: Laya.Loader.IMAGE });
            Laya.loader.load(urls, Laya.Handler.create(this, async (res) => {
                if (res) {
                    fairygui.UIPackage.addPackage("res/sdkAssets/YmSdkUI");
                    YmSdkUIBinder.bindAll();
                    //设置组件
                    fgui.UIObjectFactory.setExtension(UI_SdkIconButtonAd.URL, SdkIconButtonAdComponent);
                    fgui.UIObjectFactory.setExtension(UI_SdkOneLineBanner.URL, SdkOneLineBannerComponent);

                    resolve(true);
                } else {
                    console.log("加载UI资源失败,重试");
                    await this.loadUI();
                }
            }));
        });
    }

    private async initSDK(data: Array<SdkPlatformConfig>): Promise<SdkConfig> {
        return new Promise<SdkConfig>((resolve, reject) => {
            let request = new HttpRequestExtension();
            let url = this.initApi + this.currentAppId;
            console.log(`[YMSDK]发送获取sdk:${url}`);
            request.Get(url, null, (res: SdkConfigResponse) => {
                console.log("[YMSDK]initSDK返回信息:", res);
                if (res.code == 0) {
                    //
                    if (GameEngine.inst.isLocal) { //本地用
                        this.sdkConfig = res.data;

                        this.enabled = this.sdkConfig.switch;
                        PlatformConfig.inst.currentPlatform.canAd = this.sdkConfig.ad;
                        if(this.enabled){
                            this.setMap(SdkSwitchEnum.开始ICON导出页面, this.sdkConfig.switches[0]);
                            this.setMap(SdkSwitchEnum.游戏格子, this.sdkConfig.switches[1]);
                            this.setMap(SdkSwitchEnum.结算ICON导出页面, this.sdkConfig.switches[2]);
                            this.setMap(SdkSwitchEnum.结算误点进度页面, this.sdkConfig.switches[3]);
                        }else{
                            this.setMap(SdkSwitchEnum.开始ICON导出页面, false);
                            this.setMap(SdkSwitchEnum.游戏格子, false);
                            this.setMap(SdkSwitchEnum.结算ICON导出页面, false);
                            this.setMap(SdkSwitchEnum.结算误点进度页面, false);
                        }
                        
                        let apps = this.getApps();

                        if (apps && apps.length == 0) {
                            this.setMap(SdkSwitchEnum.开始ICON导出页面, false);
                            this.setMap(SdkSwitchEnum.游戏格子, false);
                            this.setMap(SdkSwitchEnum.结算ICON导出页面, false);
                        } else {
                            for (let index = 0; index < apps.length; index++) {
                                const appInfo = apps[index];
                                appInfo.name = appInfo.name.slice(0, 6);
                            }
                        }
                        resolve(this.sdkConfig);
                        console.log("是否开启广告:", PlatformConfig.inst.currentPlatform.canAd);
                        console.log("是否开启导流:", this.enabled);

                    } else {
                        if (this.wx) {
                            console.log("微信版本");
                            // if (this.sdkConfig.umaId) {
                            //     this.wx.uma.init({ appKey: this.sdkConfig.umaId, debug: true, useOpenid: false, autoGetOpenid: false, uploadUserInfo: false });
                            // }
                            this.sdkConfig = res.data;
                            this.enabled = this.sdkConfig.switch;
                            PlatformConfig.inst.currentPlatform.canAd = this.sdkConfig.ad;
                            this.setMap(SdkSwitchEnum.开始ICON导出页面, this.enabled);
                            this.setMap(SdkSwitchEnum.游戏格子, this.enabled);
                            this.setMap(SdkSwitchEnum.结算ICON导出页面, this.enabled);
                            this.setMap(SdkSwitchEnum.结算误点进度页面, this.enabled);
                            let apps = this.getApps();
                            if (apps && apps.length == 0) {
                                this.setMap(SdkSwitchEnum.开始ICON导出页面, false);
                                this.setMap(SdkSwitchEnum.游戏格子, false);
                                this.setMap(SdkSwitchEnum.结算ICON导出页面, false);
                            } else {
                                for (let index = 0; index < apps.length; index++) {
                                    const appInfo = apps[index];
                                    appInfo.name = appInfo.name.slice(0, 6);
                                }
                            }
                            resolve(this.sdkConfig);
                            console.log("是否开启广告:", PlatformConfig.inst.currentPlatform.canAd);
                            console.log("是否开启导流:", this.enabled);
                        } else {
                            this.enabled = false;
                            resolve(null);
                        }
                    }
                } else {
                    this.enabled = false;
                    resolve(null);
                }
            });
        });

    }

    /**
     * 发送事件
     * @param obj 
     */
    public sendEvent(obj: { key: string, data: any }) {
        if (this.wx && this.wx.uma) {
            console.log("[YMSDK]发送事件111111:", JSON.stringify(obj));
            if (obj.data) {
                this.wx.uma.trackEvent(obj.key, obj.data);
            } else {
                this.wx.uma.trackEvent(obj.key);
            }
        }
    }

    /**
     * 导流按钮点击记录
     * @param appid 
     */
    public clickEvent(scene: string, appInfo:AppInfo) {
        Platforms.inst.navigateToMiniGame({ appId: appInfo.appId });
        let request = new HttpRequestExtension();
        let url = `${this.sendEventApi}?gameid=${this.currentAppId}&appid=${appInfo.appId}&iconId=${appInfo.iconId}`;
        console.log(`[YMSDK]点击sdk:${url}`);
        request.Post(url, null, this, (res) => { console.warn(res) });
        this.sendEvent({ key: "SDKIconClickEvent", data: { gameId: this.currentAppId, appName:appInfo.name, scene: scene, appId:appInfo.appId,iconId:appInfo.iconId } });
    }
}

//#region 接口返回类
export class BaseResponse {
    public msg: string;
    public code: number;
}

export class SdkPlatformConfig {
    public platform: number;
    public appId: string;

    public constructor(appId: string, platform: number) {
        this.platform = platform;
        this.appId = appId;
    }

}
//#endregion

//#region 数据类
/** SDK返回 */
export class SdkConfigResponse extends BaseResponse {
    public data: SdkConfig;
}

/** SDK配置 */
export class SdkConfig {
    /**广告开关 */
    public ad: boolean;
    /**导流总控开关 */
    public switch: boolean;
    /**友盟的appId */
    public umaId: string;
    /** 跳转列表 */
    public apps: Array<AppInfo>;
    /**其他开关 */
    public switches:Array<boolean>;
}

/** 跳转APP信息 */
export class AppInfo {
    /** 跳转ID */
    public appId: string;
    /** 图标地址 */
    public icon: string;
    /** 显示名字 */
    public name: string;
    /** 统计用ID */
    public iconId:string;
}
//#endregion