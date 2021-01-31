import PlatformsAPI from "../PlatformsAPI";
import NativeHelper from "./NativeHelper";
import PaymentData from "../PaymentData";
import PlatformConfig from "../PlatformConfig";
import GameEngine from "../../managers/GameEngine";

export default class AppGameAPI implements PlatformsAPI {
    downloadFile(url: string, callback: (success: boolean, res: any) => void) {
        //throw new Error("Method not implemented.");
    }
    unzip(url: string, callback: (success: boolean) => void) {
        //throw new Error("Method not implemented.");
    }
    readFile(filePath: string, callback: (success: boolean, data: string) => void) {
        //throw new Error("Method not implemented.");
    }
    writeFileSync(filePath: string, data: string) {
        //throw new Error("Method not implemented.");
    }
    userDataPath(): string {
        return "";
        //throw new Error("Method not implemented.");
    }
    /**掌上方舟SDK返回的广告标识值 */
    private GGType: number = 0;
    /**N秒后才能加载插屏类广告 */
    private insertAdShowCD: number = 40000;
    /**是否能加载插屏广告 */
    private canLoadInsertAd: boolean = false;

    /**初始化 */
    onInit(_callback: Function) {
        if (Laya.Browser.window.conch) {
            NativeHelper.init();
        }
        _callback && _callback();
        console.log('AppGameAPI onInit');
    }

    onDestroyNativeAd() {
        //throw new Error("Method not implemented.");
    }
    onDestroyNativeIconAd() {
        //throw new Error("Method not implemented.");
    }
    onDestoryBanner() {
        //throw new Error("Method not implemented.");
    }
    onDestoryInsertAd() {
        //throw new Error("Method not implemented.");
    }
    createInnerAudioContext():any {
        return null;
        //throw new Error("Method not implemented.");
    }
    onHideInsertAd() {
        //throw new Error("Method not implemented.");
    }
    pay(paymentData: PaymentData, callback: (success: boolean, msg: string) => void) {
        //throw new Error("Method not implemented.");
    }
    getPlatform(): string {
        return "";
    }
    showMoreGamesModal() {
        //throw new Error("Method not implemented.");
    }
    reportMonitor(name: string, value: number) {
        //throw new Error("Method not implemented.");
    }
    createNativeIconAd() {
        //throw new Error("Method not implemented.");
    }
    onShowNativeIconAd(callback: (ad: any) => void) {
        //throw new Error("Method not implemented.");
    }
    onNativeIconAdClick(_id: string) {
        //throw new Error("Method not implemented.");
    }
    onNativeIconAdClose() {
        //throw new Error("Method not implemented.");
    }
    getDevicePlatform(): string {
        return "";
        //throw new Error("Method not implemented.");
    }
    addColorSign() {
        //throw new Error("Method not implemented.");
    }
    notchHeight(): number {
        return 20;
        //throw new Error("Method not implemented.");
    }
    bannerHeight(): number {
        return 120
        //throw new Error("Method not implemented.");
    }
    hasShortcutInstalled(callback: (installed: boolean) => void) {
        //throw new Error("Method not implemented.");
    }
    installShortcut(callback: (success: boolean) => void) {
        //throw new Error("Method not implemented.");
    }
    createMoreGamesButton(inStyle?: { left: number; top: number; width: number; height: number; }) {
        //throw new Error("Method not implemented.");
    }
    hideMoreGameButton() {
        //throw new Error("Method not implemented.");
    }
    onShareVideo(callback: (success: any) => void) {
        //throw new Error("Method not implemented.");
    }
    hasMoreGame(): boolean {
        console.log('AppGameAPI hasMoreGame');
        return false;
        //return NativeHelper.hasMoreGame();
    }
    onNativeAdClose() {
        //throw new Error("Method not implemented.");
    }
    //关闭了banner
    createAppBox() {
        //throw new Error("Method not implemented.");
    }
    onShowAppBox() {
        console.log('AppGameAPI onShowAppBox');
        NativeHelper.moreGame();
    }
    onHideAppBox() {
        //throw new Error("Method not implemented.");
    }
    navigateToMiniGame(object: any) {
        //throw new Error("Method not implemented.");
    }
    sendEvent(obj: any) {

    }
    vibrateShort() {
        NativeHelper.vibrate();
    }
    onStartRecord() {

    }
    onStopRecord() {

    }
    /**获取屏幕宽高 */
    getScreenSize(): Laya.Size {
        return new Laya.Size(750, 1334);
    }
    /**获取是否审核 */
    isVertify(): boolean {
        return false;
    }

    /**登录 */
    onLogin() {
        console.log('AppGameAPI onLogin');
    }
    /**分享 */
    onShare() {
        console.log('AppGameAPI onShare');
    }
    /**上传最高分(排行榜) */
    updateHighScore(_score: number) {
        console.log('AppGameAPI updateHighScore');
    }
    /**初始化Ad (部分渠道需要先初始化广告 如oppo)*/
    onInitAdService(callback: () => void) {
        if (Laya.Browser.window.conch) {
            this._getCGType();
        }

        callback && callback();
        console.log('AppGameAPI onInitAdService');
    }

    private _getCGType() {
        NativeHelper.getGGType((type: number) => {
            this.GGType = type;
            console.log("cgtype:", this.GGType);
            if (this.GGType == 1) {
                this.insertAdShowCD = 60000;
                PlatformConfig.inst.currentPlatform.canAd = true;
            } else if (this.GGType == 2) {
                this.insertAdShowCD = 30000;
                PlatformConfig.inst.currentPlatform.canAd = true;
            } else if (this.GGType == 3) {
                this.insertAdShowCD = 0;
                PlatformConfig.inst.currentPlatform.canAd = true;
            } else {
                //ggtype
                //123 显示广告
                //0 不显示广告标识，不弹广告，能走正常逻辑
                PlatformConfig.inst.currentPlatform.canAd = false;
                this.insertAdShowCD = 0;
            }
        });
    }
    /**创建广告 BannerAd */
    createBannerAd() {
        console.log('AppGameAPI createBannerAd');
    }
    /**展示Banner广告 */
    onShowBanner() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            return;
        }
        GameEngine.inst.debug('AppGameAPI.onShowBanner');
        if (Laya.Browser.window.conch) {
            NativeHelper.showBanner(this, (result) => {
                if (result.code == 4) {
                    //关闭了banner
                    //Laya.timer.once(30000, this, this.onShowBanner);
                }
            });
        }
    }
    /**隐藏Banner广告 */
    onHideBanner() {
        console.log('AppGameAPI onHideBanner');
    }
    /**创建激励视频广告 RewardedVideoAd */
    createRewardedVideoAd() {
        console.log('AppGameAPI createRewardedVideoAd');
    }
    /**展示RewardedVideo激励视频广告 */
    onShowRewardedVideo(_successCallback: Function, _failCallback: (code, msg) => void) {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            _successCallback && _successCallback();
            return;
        }
        if (Laya.Browser.window.conch) {
            // 0 成功
            // 1 拉取失败
            // 2 
            // 3 点击
            // 4 关闭
            if (PlatformConfig.inst.currentPlatform.canAd) {
                GameEngine.inst.debug('AppGameAPI.onShowRewardedVideo');
                NativeHelper.showRewardedVideo(this, (result) => {
                    if (result.code == 0) {
                        _successCallback && _successCallback();
                    } else if (result.code == 1 || result.code == 4) {
                        _failCallback && _failCallback(result.code, result.msg);
                    }
                });
            } else {
                _successCallback && _successCallback();
            }
        } else {
            _successCallback && _successCallback();
        }

        
    }
    /**创建插屏广告 createInsertAd */
    createInsertAd() {}

    /**展示InsertAd插屏广告 */
    onShowInsertAd() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            return;
        }
        if (this.canLoadInsertAd == false) {
            GameEngine.inst.debug('AppGameAPI.onShowInsertAd 插屏广告处理冷却时间');
            return
        }
        if (Laya.Browser.window.conch) {
            GameEngine.inst.debug('AppGameAPI onShowInsertAd');
            this.canLoadInsertAd = false;
            NativeHelper.showInsertAd(this, (result) => {
                if (result.code != 1) {
                    this.canLoadInsertAd = false;
                }
                if (result.code == 4) {
                    //关闭时，才开始计算时间
                    GameEngine.inst.debug("AppGameAPI 关闭插屏广告");
                    Laya.timer.once(this.insertAdShowCD, this, () => {
                        this.canLoadInsertAd = true;
                    });
                }
            });
        }
    }
    /**创建原生广告 createNativeAd */
    createNativeAd() {}
    onShowNativeAd() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            return;
        }
        if (Laya.Browser.window.conch) {
            if (this.canLoadInsertAd == false) {
                GameEngine.inst.debug('AppGameAPI.onShowInsertAd 插屏广告处理冷却时间');
                return
            }
            this.onShowInsertAd();
            GameEngine.inst.debug('AppGameAPI onShowNativeAd');
        }
    }
    onNativeAdClick(_id: string) {
        GameEngine.inst.debug('AppGameAPI onNativeAdClick:' + _id);
    }
    /**存储数据
    * @param _key 索引 string
    * @param _value 值
    */
    saveDataToCache(_key: string, _value: any) {
        Laya.LocalStorage.setItem(_key, JSON.stringify(_value));
        console.log('OPPOH5GameAPI saveDataToCache:');
    }
    /**读取数据
     * @param _key 索引 string
     * @param _IsNumber 是否为数值类型
     */
    readDataFromCache(_key: string) {
        console.log('OPPOH5GameAPI readDataFromCache');
        return JSON.parse(Laya.LocalStorage.getItem(_key));
    }
}
