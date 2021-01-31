import PlatformsAPI from "./PlatformsAPI";
import WeiXinH5GameAPI from "./WeiXinH5GameAPI/WeiXinH5GameAPI";
import QQPlayH5GameAPI from "./QQPlayH5GameAPI/QQPlayH5GameAPI";
import OPPOH5GameAPI from "./OPPOH5GameAPI/OPPOH5GameAPI";
import VivoH5GameAPI from "./VivoH5GameAPI/VivoH5GameAPI";
import BaiduH5GameAPI from "./BaiduH5GameAPI/BaiduH5GameAPI";
import XiaoMiH5GameAPI from "./XiaoMiH5GameAPI/XiaoMiH5GameAPI";
import X4399H5GameAPI from "./X4399H5GameAPI/X4399H5GameAPI";
import AppGameAPI from "./AppGameAPI/AppGameAPI";
import TouTiaoH5GameAPI from "./TouTiaoH5GameAPI/TouTiaoH5GameAPI";
import WebH5GameAPI from "./WebH5GameAPI/WebH5GameAPI";
import PaymentData from "./PaymentData";

export enum Platform {
    /**自行判断渠道 */
    NotSet = 999,
    weixin_h5 = 0,
    qqplay_h5,
    oppo_h5,
    vivo_h5,
    baidu_h5,
    xiaomi_h5,
    x4399_h5,
    toutiao_h5,
    game_app,
    web_h5,
    huawei_h5
}

export default class Platforms {
    private static m_instance: Platforms = null;
    public static get inst(): Platforms {
        if (this.m_instance === null) {
            this.m_instance = new Platforms();
        }
        return this.m_instance;
    }

    private platformAPI: PlatformsAPI = null;
    private _platform: Platform = Platform.NotSet;

    /**发布前需要修改渠道 */
    public get platform(): Platform {
        if (this._platform === Platform.NotSet) {
            if (window["tt"]) {
                this._platform = Platform.toutiao_h5;
            }
            else if (Laya.Browser.onQQMiniGame) {
                this._platform = Platform.qqplay_h5;
            }
            else if (Laya.Browser.onWeiXin) {
                this._platform = Platform.weixin_h5;
            }
            else if (Laya.Browser.onKGMiniGame) {
                this._platform = Platform.xiaomi_h5;
            }
            else if (Laya.Browser.onBDMiniGame) {
                this._platform = Platform.baidu_h5;
            }
            else if (Laya.Browser.onQGMiniGame) {
                this._platform = Platform.oppo_h5;
            }
            else if (Laya.Browser.onVVMiniGame) {
                this._platform = Platform.vivo_h5;
            }
            else if (window["hbs"]) {
                this._platform = Platform.huawei_h5;
            }
            else {
                this._platform = Platform.web_h5;
            }
        }
        return this._platform;
    }

    public set platform(value: Platform) {
        this._platform = value;
    }

    public get platformDisplayName():string{
        let disName = "web";
        switch (this.platform) {
            case Platform.weixin_h5:
                disName = "微信小游戏";
                break;
            case Platform.qqplay_h5:
                disName = "手Q小游戏";
                break;
            case Platform.oppo_h5:
                disName = "OPPO小游戏";
                break;
            case Platform.vivo_h5:
                disName = "VIVO小游戏";
                break;
            case Platform.baidu_h5:
                break;
            case Platform.xiaomi_h5:
                break;
            case Platform.x4399_h5:
                break;
            case Platform.toutiao_h5:
                disName = "头条小游戏";
                break;
            case Platform.game_app:
                disName = "APP";
                break;
        }
        return disName;
    }

    public init() {
        switch (this.platform) {
            case Platform.weixin_h5:
                this.platformAPI = new WeiXinH5GameAPI();
                break;
            // case Platform.qqplay_h5:
            //     this.platformAPI = new QQPlayH5GameAPI();
            //     break;
            case Platform.oppo_h5:
                this.platformAPI = new OPPOH5GameAPI();
                break;
            case Platform.vivo_h5:
                this.platformAPI = new VivoH5GameAPI();
                break;
            // case Platform.baidu_h5:
            //     this.platformAPI = new BaiduH5GameAPI();
            //     break;
            // case Platform.xiaomi_h5:
            //     this.platformAPI = new XiaoMiH5GameAPI();
            //     break;
            // case Platform.x4399_h5:
            //     this.platformAPI = new X4399H5GameAPI();
            //     break;
            case Platform.toutiao_h5:
                this.platformAPI = new TouTiaoH5GameAPI();
                break;
            // case Platform.game_app:
            //     this.platformAPI = new AppGameAPI();
            //     break;
            case Platform.web_h5:
                this.platformAPI = new WebH5GameAPI();
                break;
        }
    }

    /**用户文件夹 */
    public userDataPath(): string {
        return this.platformAPI && this.platformAPI.userDataPath();
    }

    public downloadFile(url: string, callback: (success: boolean, res) => void) {
        this.platformAPI && this.platformAPI.downloadFile(url, callback);
    }

    /**
     * readFile
     */
    public readFile(filePath: string, callback: (success: boolean, data: string) => void): string {
        return this.platformAPI && this.platformAPI.readFile(filePath, callback);
    }

    /**
     * writeFileSync
     */
    public writeFileSync(filePath: string, data: string) {
        this.platformAPI && this.platformAPI.writeFileSync(filePath, data);
    }

    public unzip(zipUrl: string, callback: (success: boolean) => void) {
        this.platformAPI && this.platformAPI.unzip(zipUrl, callback);
    }

    /**初始化一些渠道信息 */
    public onInit(_callback: Function) {
        if (this.platformAPI && this.platformAPI !== null) {
            this.platformAPI.onInit(_callback);
        }
    }

    /**震动 */
    public vibrateShort() {
        this.platformAPI && this.platformAPI.vibrateShort();
    }

    /**开始录屏 */
    public startRecord() {
        this.platformAPI && this.platformAPI.onStartRecord();
    }

    /**暂停录屏 */
    public stopRecord() {
        this.platformAPI && this.platformAPI.onStopRecord();
    }

    /**登录 */
    public onLogin(callback: (success: boolean) => void) {
        this.platformAPI && this.platformAPI.onLogin(callback);
    }

    /**分享 */
    public onShare(callback: (success) => void) {
        this.platformAPI && this.platformAPI.onShare(callback);
    }

    /**头条 - 分享视频 */
    public onShareVideo(callback: (success: boolean) => void) {
        let ttPlatform = this.platformAPI as TouTiaoH5GameAPI;
        ttPlatform && ttPlatform.onShareVideo(callback);
    }

    /**QQ - 显示AppBox */
    public onShowAppBoxAd() {
        this.platformAPI && this.platformAPI.onShowAppBox();
    }

    /**头条 - 创建更多游戏按钮 */
    public createMoreGamesButton(inStyle?: { left: number, top: number, width: number, height: number }) {
        let ttPlatform = this.platformAPI as TouTiaoH5GameAPI;
        ttPlatform && ttPlatform.createMoreGamesButton(inStyle);
    }

    /**头条 - 隐藏更多游戏按钮 */
    public hideMoreGameButton() {
        let ttPlatform = this.platformAPI as TouTiaoH5GameAPI;
        ttPlatform && ttPlatform.hideMoreGameButton();
    }

    public updateHighScore(_score: number) {
        this.platformAPI && this.platformAPI.updateHighScore(_score);
    }

    /**初始化广告 */
    public onInitAdService(callback: () => void) {
        this.platformAPI && this.platformAPI.onInitAdService(callback);
    }

    /**创建Banner广告 */
    public createBannerAd() {
        this.platformAPI && this.platformAPI.createBannerAd();
    }

    /**显示Banner广告 */
    public onShowBanner(key?: string) {
        this.platformAPI && this.platformAPI.onShowBanner(key);
    }

    /**隐藏Banner广告 */
    public onHideBanner() {
        this.platformAPI && this.platformAPI.onHideBanner();
    }

    /**销毁banner广告 */
    public onDestoryBanner() {
        this.platformAPI && this.platformAPI.onDestoryBanner();
    }

    /**创建激励视频广告 */
    public createRewardedVideoAd() {
        this.platformAPI && this.platformAPI.createRewardedVideoAd();
    }

    /**显示激励视频广告 */
    public onShowRewardedVideo(_successCallback: Function, _failCallback: (code, msg) => void,key?: string) {
        this.platformAPI && this.platformAPI.onShowRewardedVideo(() => {
            Laya.timer.scale = 1;
            _successCallback && _successCallback();
        }, (code, msg) => {
            Laya.timer.scale = 1;
            _failCallback && _failCallback(code, msg);
        },key);
    }

    public createInsertAd() {
        this.platformAPI && this.platformAPI.createInsertAd();
    }

    public onShowInsertAd() {
        this.platformAPI && this.platformAPI.onShowInsertAd();
    }

    public onDestoryInsertAd() {
        this.platformAPI && this.platformAPI.onDestoryInsertAd();
    }

    public createNativeAd() {
        this.platformAPI && this.platformAPI.createNativeAd();
    }
    public onShowNativeAd(callback: (ad) => void,key?:string) {
        this.platformAPI && this.platformAPI.onShowNativeAd(callback,key);
    }
    public onNativeAdClick(_id: string) {
        this.platformAPI && this.platformAPI.onNativeAdClick(_id);
    }
    public onNativeAdClose() {
        this.platformAPI && this.platformAPI.onNativeAdClose();
    }
    public onDestroyNativeAd() {
        this.platformAPI && this.platformAPI.onDestroyNativeAd();
    }


    public createNativeIconAd() {
        this.platformAPI && this.platformAPI.createNativeIconAd();
    }
    public onShowNativeIconAd(callback: (ad) => void, key?: string) {
        this.platformAPI && this.platformAPI.onShowNativeIconAd(callback, key);
    }
    public onNativeIconAdClick(_id: string) {
        this.platformAPI && this.platformAPI.onNativeIconAdClick(_id);
    }
    public onNativeAdIconClose() {
        this.platformAPI && this.platformAPI.onNativeIconAdClose();
    }
    public onDestroyNativeIconAd() {
        this.platformAPI && this.platformAPI.onDestroyNativeIconAd();
    }

    public reportMonitor(name: string, value: number) {
        this.platformAPI && this.platformAPI.reportMonitor(name, value);
    }




    public saveDataToCache(_key: string, _value: any) {
        this.platformAPI && this.platformAPI.saveDataToCache(_key, _value);
    }
    public readDataFromCache(_key: string) {
        return this.platformAPI && this.platformAPI.readDataFromCache(_key);
    }

    /** OPPO 需要特殊屏幕适配*/
    public canRetinalCanvas(): boolean {
        let arr = [Platform.oppo_h5];
        for (let i = 0; i < arr.length; ++i) {
            if (arr[i] === this.platform) {
                return true;
            }
        }
        return false;
    }

    public sendEvent(obj: { key: string, data: any }) {
        this.platformAPI && this.platformAPI.sendEvent(obj);
    }

    /**oppo设置加载 */
    public setLoadingProgress(progress: number) {
        // if (this.platform == Platform.oppo_h5) {
        //     let oppo = this.platformAPI as OPPOH5GameAPI;
        //     oppo.setLoadingProgress(progress);
        //     if (progress >= 100) {
        //         oppo.loadingComplete();
        //     }
        // }
    }

    public notchHeight(): number {
        return this.platformAPI && this.platformAPI.notchHeight();
    }

    public bannerHeight(): number {
        return this.platformAPI && this.platformAPI.bannerHeight();
    }

    public hasShortcutInstalled(callback: (installed: boolean) => void) {
        this.platformAPI && this.platformAPI.hasShortcutInstalled(callback);
    }

    public installShortcut(callback: (success: boolean) => void) {
        this.platformAPI && this.platformAPI.installShortcut(callback);
    }

    public isVertify() {
        return this.platformAPI && this.platformAPI.isVertify();
    }

    public addColorSign() {
        return this.platformAPI && this.platformAPI.addColorSign();
    }

    public getDevicePlatform(): string {
        return this.platformAPI && this.platformAPI.getDevicePlatform();
    }

    public showMoreGamesModal() {
        this.platformAPI && this.platformAPI.showMoreGamesModal();
    }

    public getPlatform(): string {
        return this.platformAPI && this.platformAPI.getPlatform();
    }

    public pay(paymentData: PaymentData, callback: (success: boolean, msg: string) => void) {
        this.platformAPI && this.platformAPI.pay(paymentData, callback);
    }

    public navigateToMiniGame(object: any) {
        this.platformAPI && this.platformAPI.navigateToMiniGame(object);
    }

    public createInnerAudioContext(): any {
        return this.platformAPI && this.platformAPI.createInnerAudioContext();
    }

}