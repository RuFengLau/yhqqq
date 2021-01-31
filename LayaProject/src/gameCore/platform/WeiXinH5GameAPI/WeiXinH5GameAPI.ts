import PlatformsAPI from "../PlatformsAPI";
import PlatformConfig from "../PlatformConfig";
import EventManager from "../../managers/eventManager/EventManager";
import PlatformEvents from "../PlatformEvents";
import MathHelper from "../../plugins/tools/MathHelper";
import PaymentData from "../PaymentData";
import YMSDK from "../../ymsdk/YMSDK";

export default class WeiXinH5GameAPI implements PlatformsAPI {
    private wx: any = window['wx'];
    private m_bannerAd: any = null;
    private m_videoAd: any = null;
    /**插屏广告 */
    private m_insertAd: any = null;
    private m_gridAd: any = null;
    private m_videoAdIsLoaded: boolean = false;

    private onSuccessCallback: Function;
    private onFailCallback: (code, msg) => void;
    private onShareCallback: (success) => void;

    public m_recordVideoPath: string;
    private m_moreButton: any = null;
    private m_bannerHeight: number = 220;
    private m_recorder: any;

    private shareStartTime: number = 0;
    private systemInfo: any;

    userDataPath(): string {
        if (this.wx) {
            return this.wx.env.USER_DATA_PATH + "/";
        }
        return "";
    }
    private downloadTask: any
    downloadFile(url: string, callback: (success: boolean, res) => void) {
        if (this.wx) {
            if (this.downloadTask != null) {
                this.downloadTask.abort();
            }
            this.downloadTask = this.wx.downloadFile({
                url: url,
                success(res) {
                    if (res.statusCode === 200) {
                        callback && callback(true, res);
                    } else {
                        callback && callback(false, null);
                    }
                }
            })
        } else {
            callback && callback(false, null);
        }
    }

    readFile(filePath: string, callback: (success: boolean, data: string) => void) {
        if (this.wx) {
            let url = this.userDataPath() + filePath;
            //console.log("readFileSync:", url);
            this.wx.getFileSystemManager().readFile({
                filePath: url,
                encoding: "utf-8",
                success(res) {
                    callback && callback(true, res.data);
                },
                fail(err) {
                    callback && callback(false, "");
                }
            });
        } else {
            callback && callback(false, "");
        }
    }
    writeFileSync(filePath: string, data: string) {
        if (this.wx) {
            let url = this.userDataPath() + filePath;
            //console.log("writeFileSync:", url, data);
            this.wx.getFileSystemManager().writeFileSync(url, data, "utf-8");
        }
    }

    unzip(url: string, callback: (success: boolean) => void) {
        if (this.wx) {
            this.wx.getFileSystemManager().unzip({
                zipFilePath: url,
                targetPath: this.wx.env.USER_DATA_PATH,
                success(res) {
                    console.log(res);
                    callback && callback(true);
                }
            });
        } else {
            callback && callback(false);
        }
    }

    /**初始化 */
    onInit(_callback: Function) {
        if (this.wx) {
            let self = this;
            this.systemInfo = this.wx.getSystemInfoSync();
            this.onCheckForUpdate();

            this.wx.showShareMenu({
                withShareTicket: true
            });
            this.wx.onShareAppMessage(function (res) {
                // do something
                return {
                    title: '一起来勇闯世界遗迹吧',
                    desc: '一起来勇闯世界遗迹吧',
                    imageUrl: PlatformConfig.inst.currentPlatform.shareImage,
                    imageUrlId: PlatformConfig.inst.currentPlatform.shareTemplateId,
                    query: ''
                }
            });


            this.wx.onShow(function (res) {
                console.log("wx.onShow=====================================");
                if (self.shareStartTime > 0 && Date.now() - self.shareStartTime >= 2000) {
                    if (self.onShareCallback) {
                        self.onShareCallback(true);
                    }
                } else {
                    if (self.onShareCallback) {
                        self.onShareCallback(false);
                    }
                }
                self.onShareCallback = null;
                self.shareStartTime = 0;
            });

            this.wx.onHide(function () {
                console.log("wx.onHide=====================================");

            });
        }
        console.log('WeiXinH5GameAPI onInit');
    }

    private onCheckForUpdate() {
        let self = this;
        const updateManager = this.wx.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log('onCheckForUpdate', res.hasUpdate);
            if (res.hasUpdate) {
                self.wx.showToast({
                    title: '即将有更新请留意'
                });
            }
        });
        updateManager.onUpdateReady(() => {
            self.wx.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否立即使用？',
                success: function (res) {
                    if (res.confirm) {
                        // 调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate();
                    } else {
                        self.wx.showToast({
                            icon: 'none',
                            title: '小程序下一次「冷启动」时会使用新版本',
                        });
                    }
                }
            });
        });
        updateManager.onUpdateFailed(() => {
            self.wx.showToast({
                title: '更新失败，下次启动继续...'
            });
        });
    }

    /**初始化Ad (部分渠道需要先初始化广告 如oppo)*/
    onInitAdService(callback: () => void) {
        this.createBannerAd();
        this.createRewardedVideoAd();
        this.createInsertAd();
        callback();
        console.log('WeiXinH5GameAPI onInitAdService');
    }

    /**分享 */
    onShare(callback: (success) => void) {
        if (this.wx) {
            //记录时间
            this.shareStartTime = Date.now();
            this.onShareCallback = callback;
            this.wx.shareAppMessage({
                title: '一起来勇闯世界遗迹吧',
                desc: '一起来勇闯世界遗迹吧',
                imageUrl: PlatformConfig.inst.currentPlatform.shareImage,
                imageUrlId: PlatformConfig.inst.currentPlatform.shareTemplateId,
                query: ''
            });
        } else {
            callback && callback(true);
        }
        console.log('WeiXinH5GameAPI onShare');
    }

    createAppBox() {
        throw new Error("Method not implemented.");
    }
    onShowAppBox() {

        throw new Error("Method not implemented.");
    }
    onHideAppBox() {
        throw new Error("Method not implemented.");
    }
    hasShortcutInstalled(callback: (installed: boolean) => void) {
        callback(true);
    }
    installShortcut(callback: (success: boolean) => void) {
        callback(true);
    }
    createMoreGamesButton(inStyle?: { left: number; top: number; width: number; height: number; }) {

    }
    hideMoreGameButton() {

    }
    onShareVideo(callback: (success: any) => void) {

    }
    bannerHeight(): number {
        return this.m_bannerHeight;
    }
    notchHeight(): number {
        if (this.wx) {
            let scale = Laya.Browser.height / this.systemInfo.screenHeight;
            return this.systemInfo.statusBarHeight * scale;
        }
        return 20;
    }
    sendEvent(obj: any) {
        YMSDK.inst.sendEvent(obj);
    }
    vibrateShort() {

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
        return true;
    }

    /**登录 */
    onLogin() {
        console.log('WeiXinH5GameAPI onLogin');
    }

    /**上传最高分(排行榜) */
    updateHighScore(_score: number) {
        console.log('WeiXinH5GameAPI updateHighScore');
    }

    /**创建广告 BannerAd */
    createBannerAd() {
        console.log('WeiXinH5GameAPI createBannerAd');
    }
    /**展示Banner广告 */
    onShowBanner() {
        if (this.wx && PlatformConfig.inst.currentPlatform.canAd) {
            if (this.m_bannerAd) {
                this.m_bannerAd.destroy();
                this.m_bannerAd = null;
            }
            let self = this;
            let style = { left: 0, top: 0, width: 200, height: 0 };
            var phone = this.wx.getSystemInfoSync();
            let phoneModel = phone.model;
            let w = phone.screenWidth / 2;
            let h = phone.screenHeight;
            if (phoneModel.search("iPhone X") != -1) {   //要处理的机型
                style.width = w * 1.1;
            } else {
                style.width = w * 1.71;
            }

            this.m_bannerAd = this.wx.createBannerAd({
                adUnitId: PlatformConfig.inst.currentPlatform.bannerAdId,
                style: style
            });

            this.m_bannerAd.onResize(function (size) {
                self.m_bannerAd.style.left = w - size.width / 2;
                self.m_bannerAd.style.top = h - size.height;
            });

            this.m_bannerAd.onLoad(function () {
                console.log("Banner广告加载完成================");
                self.m_bannerAd.show()
                    .then(() => {
                        console.log('广告显示成功');
                        self.m_bannerHeight = 220;
                        EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_SUCCESS_EVENT);
                    })
                    .catch(err => {
                        console.log('广告组件出现问题', err);
                        self.m_bannerHeight = 20;
                        EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
                    });
            });

            this.m_bannerAd.onError(function (res) {
                console.log("Banner广告加载失败=================");
                self.m_bannerHeight = 20;
                EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
            });
        }
        console.log('WeiXinH5GameAPI onShowBanner');
    }
    /**隐藏Banner广告 */
    onHideBanner() {
        if (this.m_bannerAd) {
            this.m_bannerHeight = 20;
            EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
            this.m_bannerAd.destroy();
            this.m_bannerAd = null;
        }
        console.log('WeiXinH5GameAPI onHideBanner');
    }
    /**创建激励视频广告 RewardedVideoAd */
    createRewardedVideoAd() {
        if (this.wx && PlatformConfig.inst.currentPlatform.canAd) {
            this.m_videoAd = this.wx.createRewardedVideoAd({
                adUnitId: PlatformConfig.inst.currentPlatform.videoAdId
            });
            if(this.m_videoAd == null)return;
            this.m_videoAd.load().then(() => {
                console.log('广告显示成功');
            }).catch(err => {
                console.log('广告组件出现问题', err);
                this.onFailCallback && this.onFailCallback(1, "激励视频广告取消关闭，不发放奖励");
            });
            this.m_videoAd.onLoad(() => {
                console.log('WeiXinH5GameAPI RewardedVideo load success');
                this.m_videoAdIsLoaded = true;
            });
            this.m_videoAd.onError((err) => {
                console.log('WeiXinH5GameAPI RewardedVideo load Error:' + err);
                this.m_videoAdIsLoaded = false;
            });
            this.m_videoAd.onClose((res) => {
                if (res.isEnded) {
                    console.log('激励视频广告完成，发放奖励')
                    this.onSuccessCallback && this.onSuccessCallback();
                    this.m_videoAdIsLoaded = false;
                } else {
                    console.log('激励视频广告取消关闭，不发放奖励')
                    this.onFailCallback && this.onFailCallback(4, "激励视频广告取消关闭，不发放奖励");
                }
                this.clearVideoCallback();
            });
        }
        console.log('WeiXinH5GameAPI createRewardedVideoAd');
    }

    private clearVideoCallback() {
        this.onSuccessCallback = null;
        this.onFailCallback = null;
    }

    /**展示RewardedVideo激励视频广告 */
    onShowRewardedVideo(_successCallback: Function, _failCallback: (code, msg) => void) {
        if (this.wx && this.m_videoAd) {
            this.onSuccessCallback = _successCallback;
            this.onFailCallback = _failCallback;
            if (this.m_videoAd) {
                if (this.m_videoAdIsLoaded) {
                    this.m_videoAd.show();
                } else {
                    this.m_videoAd.load();
                }
            }else{
                _failCallback && _failCallback(1, "激励视频广告取消关闭，不发放奖励");
            }
        } else {
            _successCallback && _successCallback();
        }
        console.log('WeiXinH5GameAPI onShowRewardedVideo');
    }

    /**创建插屏广告 createInsertAd */
    createInsertAd() {
        //需要判断版本
        if (this.wx && MathHelper.CompareVersion(this.systemInfo.SDKVersion, "2.6.0") == 1) {
            let self = this;
            this.m_insertAd = this.wx.createInterstitialAd({
                adUnitId: PlatformConfig.inst.currentPlatform.insertAdId
            });
            // this.m_insertAd.onLoad(function(){
            //     self.m_insertAd.show();
            //     console.log('WeiXinH5GameAPI InsertAd onLoad');
            // });
        }
        console.log('WeiXinH5GameAPI createInsertAd');
    }
    /**展示InsertAd插屏广告 */
    onShowInsertAd() {
        if (this.m_insertAd) {
            this.m_insertAd.show().then(() => {
                console.log('WeiXinH5GameAPI InsertAd 展示成功');
            }).catch((err) => {
                console.log('WeiXinH5GameAPI InsertAd 展示失败:', JSON.stringify(err));
            });
        }
        console.log('WeiXinH5GameAPI onShowInsertAd');
    }
    /**创建原生广告 createNativeAd */
    createNativeAd() {
        console.log('WeiXinH5GameAPI createNativeAd');
    }
    onShowNativeAd() {
        console.log('WeiXinH5GameAPI onShowNativeAd');
    }
    onNativeAdClick(_id: string) {
        console.log('WeiXinH5GameAPI onNativeAdClick:' + _id);
    }
    /**存储数据
     * @param _key 索引 string
     * @param _value 值
     */
    saveDataToCache(_key: string, _value: any) {
        Laya.LocalStorage.setItem(_key, JSON.stringify(_value));
    }
    /**读取数据
     * @param _key 索引 string
     */
    readDataFromCache(_key: string): any {
        let data = Laya.LocalStorage.getItem(_key);
        if (data) {
            if (typeof data == "string") {
                return JSON.parse(Laya.LocalStorage.getItem(_key));
            }

        }

        return null;
    }

    onDestroyNativeAd() {

    }
    onDestroyNativeIconAd() {

    }
    onDestoryBanner() {
        if(this.wx && this.m_bannerAd){
            this.m_bannerAd.destroy();
        }
    }
    onDestoryInsertAd() {

    }
    createInnerAudioContext(): any {
        return null;
    }
    onHideInsertAd() {
        //throw new Error("Method not implemented.");
    }
    navigateToMiniGame(object: any) {
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
    onNativeAdClose() {
        //throw new Error("Method not implemented.");
    }
}
