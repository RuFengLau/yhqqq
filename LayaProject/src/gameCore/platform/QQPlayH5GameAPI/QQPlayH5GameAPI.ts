import PlatformsAPI from "../PlatformsAPI";
import PlatformConfig from "../PlatformConfig";
import PlatformEvents from "../PlatformEvents";
import EventManager from '../../managers/eventManager/EventManager';
import MathHelper from "../../plugins/tools/MathHelper";
import PaymentData from "../PaymentData";
import GameEngine from "../../managers/GameEngine";
import LocalStorageManager from "../../managers/LocalStorageManager";
import OPPOH5GameAPI from "../OPPOH5GameAPI/OPPOH5GameAPI";
import DateHelper from "../../plugins/tools/DateHelper";

export default class QQPlayH5GameAPI implements PlatformsAPI {
    userDataPath(): string {
        
    }
    private static inst: QQPlayH5GameAPI;
    private qq = window['qq'];
    /**系统信息 */
    private systemInfo: any = null;
    /**Banner广告 */
    private m_bannerAd: any = null;
    private m_bannerHeight: number = 170;
    /**激励视频广告 */
    private m_videoAd: any = null;
    /**激励视频回调 */
    private onVideoSuccessCallback: Function;
    private onVideoFailCallback: (code, msg) => void;
    /**盒子广告 */
    private m_appBoxAd: any = null;
    /**插屏广告 */
    private m_insertAd: any = null;
    /**分享回调 */
    private onShareCallback: (success) => void;
    /**分享可成功的事件 */
    private shareStartTime: number = 0;
    private platform: string = "";
    //本地桌面图标记录key
    private deskTopRecordKey: string = "";
    /**本地图标获取信息 */
    private deskTopRecord: any;
    /**彩签记录Key */
    private colorSignRecordKey: string = "";
    private isInstallColorSign: boolean = false;
    /**插屏类广告准备时间(小程序启动一定时间内不允许展示插屏广告) */
    private insertAdReadyInterval: number = 10000;
    /**是否能加载插屏广告 */
    private canLoadInsertAd: boolean = false;
    /**每隔10秒后才能加载插屏广告 */
    private insertAdShowCD: number = 10000;
    private sdkVersion: string = "";
    /**检查本地桌面图标数据 */
    private checkDesktop() {
        //获取桌面图标本地记录
        this.deskTopRecord = this.readDataFromCache(this.deskTopRecordKey);
        if (this.deskTopRecord == null || this.deskTopRecord == undefined || this.deskTopRecord == "") {
            this.deskTopRecord = {
                isGet: false, date: ""
            }
            this.saveDataToCache(this.deskTopRecordKey, this.deskTopRecord);
        }
        GameEngine.inst.debug(`QQPlayH5GameAPI.checkDesktop ${JSON.stringify(this.deskTopRecord)}`);
    }

    /**检查本地彩签数据 */
    private checkColorSign() {
        this.isInstallColorSign = this.readDataFromCache(this.colorSignRecordKey);
        if (this.isInstallColorSign == null || this.isInstallColorSign == undefined) {
            this.isInstallColorSign = false;
            this.saveDataToCache(this.colorSignRecordKey, this.isInstallColorSign);
        }
        GameEngine.inst.debug(`QQPlayH5GameAPI.checkColorSign 是否已安装${this.isInstallColorSign}`);
    }

    /**检查是否可以使用功能 */
    private versionCompareUsage(useVersion:string):boolean {
        let versionFlag = MathHelper.CompareVersion(this.sdkVersion, useVersion);
        if (versionFlag != 1) {
            GameEngine.inst.debug(`SDK版本过低！你的版本为：${this.sdkVersion}`);
            return false;
        }
        return true;
    }

    /**初始化 */
    onInit(_callback: Function) {
        this.deskTopRecordKey = LocalStorageManager.inst.shortcutKey;
        this.colorSignRecordKey = LocalStorageManager.inst.colorSignKey;
        this.checkDesktop();
        this.checkColorSign();
        if (this.qq) {
            QQPlayH5GameAPI.inst = this;
            this.systemInfo = this.qq.getSystemInfoSync();
            GameEngine.inst.debug(`QQ系统信息:${JSON.stringify(this.systemInfo)}`);
            this.platform = this.systemInfo.platform;
            this.sdkVersion = this.systemInfo.SDKVersion;
            this.onCheckForUpdate();
            // 打开调试
            this.qq.setEnableDebug({
                enableDebug: PlatformConfig.inst.globalConfigs.enableDebug
            });
            this.qq.onShareAppMessage(function () {
                // 用户点击了“转发”按钮
                return {
                    title: PlatformConfig.inst.globalConfigs.projectName,
                    imageUrl: PlatformConfig.inst.currentPlatform.shareImage,
                    query: ''
                }
            });
            this.qq.onShow(res => {
                //判断大于2秒，算成功分享
                if (this.shareStartTime > 0 && Date.now() - this.shareStartTime >= 2000) {
                    this.onShareCallback && this.onShareCallback(true);
                } else {
                    this.onShareCallback && this.onShareCallback(false);
                }
                this.onShareCallback = null;
                this.shareStartTime = 0;
                Laya.timer.scale = 1;
                GameEngine.inst.debug('QQPlayH5GameAPI 进入前台');
            });
            this.qq.onHide(() => {
                Laya.timer.scale = 0;
                GameEngine.inst.debug('QQPlayH5GameAPI 进入后台台');
            });

            this.insertAdReadyInterval = PlatformConfig.inst.currentPlatform.insertAdReadyInterval;
            this.insertAdShowCD = PlatformConfig.inst.currentPlatform.insertAdShowCD;
            Laya.timer.once(this.insertAdReadyInterval, this, () => {
                this.canLoadInsertAd = true;
            });
        }
        GameEngine.inst.debug('QQPlayH5GameAPI onInit');
    }

    /**登录 */
    onLogin() { }

    private onCheckForUpdate() {
        let self = this;
        const updateManager = this.qq.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log('onCheckForUpdate', res.hasUpdate);
            if (res.hasUpdate) {
                self.qq.showToast({
                    title: '即将有更新请留意'
                });
            }
        });
        updateManager.onUpdateReady(() => {
            self.qq.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否立即使用？',
                success: function (res) {
                    if (res.confirm) {
                        // 调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate();
                    } else {
                        self.qq.showToast({
                            icon: 'none',
                            title: '小程序下一次「冷启动」时会使用新版本',
                        });
                    }
                }
            });
        });
        updateManager.onUpdateFailed(() => {
            self.qq.showToast({
                title: '更新失败，下次启动继续...'
            });
        });
    }

    /**初始化Ad (部分渠道需要先初始化广告 如oppo)*/
    onInitAdService(callback: () => void) {
        this.createBannerAd();
        this.createRewardedVideoAd();
        this.createAppBox();
        this.createInsertAd();
        callback && callback();
        GameEngine.inst.debug('QQPlayH5GameAPI onInitAdService');
    }

    //#region Banner广告
    /**创建广告 BannerAd */
    createBannerAd() { }
    /**展示Banner广告 */
    onShowBanner() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qq) {
            //每次调用销毁
            this.onDestoryBanner();
            let self = this;
            let w = this.systemInfo.screenWidth / 2;
            let h = this.systemInfo.screenHeight;
            let style = {
                left: w - 150,
                top: h - 90,
                width: 300,
            };

            this.m_bannerAd = this.qq.createBannerAd({
                adUnitId: PlatformConfig.inst.currentPlatform.bannerAdId,
                style: style
            });

            this.m_bannerAd.onResize(this.onBannerResize);
            this.m_bannerAd.onLoad(this.onBannerLoad);
            this.m_bannerAd.onError(this.onBannerError);

        }
        console.log('QQPlayH5GameAPI onShowBanner');
    }

    private onBannerResize(size) {
        let w = QQPlayH5GameAPI.inst.systemInfo.screenWidth / 2;
        let h = QQPlayH5GameAPI.inst.systemInfo.screenHeight;
        QQPlayH5GameAPI.inst.m_bannerAd.style.left = w - size.width / 2 + 0.1;
        QQPlayH5GameAPI.inst.m_bannerAd.style.top = h - size.height + 0.1;
    }

    private onBannerLoad() {
        QQPlayH5GameAPI.inst.m_bannerAd.show();
        QQPlayH5GameAPI.inst.m_bannerHeight = 220;
        EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_SUCCESS_EVENT);
        GameEngine.inst.debug("QQPlayH5GameAPI.onBannerLoad Banner广告加载完成");
    }

    private onBannerError(res) {
        QQPlayH5GameAPI.inst.m_bannerHeight = 20
        EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
        GameEngine.inst.debug(`QQPlayH5GameAPI.onBannerError Banner广告加载失败,${JSON.stringify(res)}`);
    }

    /**隐藏Banner广告 */
    onHideBanner() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qq) {
            if (this.m_bannerAd) {
                this.m_bannerHeight = 20
                EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
                GameEngine.inst.debug('QQPlayH5GameAPI.onHideBanner 隐藏Banner广告');
            }
        }
    }

    /**销毁Banner广告 */
    onDestoryBanner() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qq) {
            if (this.m_bannerAd) {
                this.m_bannerAd.offResize(this.onBannerResize);
                this.m_bannerAd.offLoad(this.onBannerLoad);
                this.m_bannerAd.offError(this.onBannerError);
                this.m_bannerAd.destroy();
                this.m_bannerAd = null;
                this.m_bannerHeight = 20
                EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
                GameEngine.inst.debug('QQPlayH5GameAPI.onDestoryBanner 销毁Banner广告');
            }
        }
    }
    //#endregion

    //#region 激励视频广告
    /**创建激励视频广告 RewardedVideoAd */
    createRewardedVideoAd() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qq) {
            this.m_videoAd = this.qq.createRewardedVideoAd({
                adUnitId: PlatformConfig.inst.currentPlatform.videoAdId
            });
            this.m_videoAd.load();
            this.m_videoAd.onLoad(() => {
                GameEngine.inst.debug('QQPlayH5GameAPI RewardedVideo.onLoad 激励视频广告加载成功');
            });
            this.m_videoAd.onError((err) => {
                
                this.onVideoFailCallback && this.onVideoFailCallback(1, "激励视频广告取消关闭，不发放奖励");
                GameEngine.inst.debug(`QQPlayH5GameAPI RewardedVideo.onError 激励视频广告加载失败,${JSON.stringify(err)}`);
            });
            this.m_videoAd.onClose(res => {
                if (res.isEnded) {
                    GameEngine.inst.debug('QQPlayH5GameAPI RewardedVideo.onClose 激励视频广告完成，发放奖励');
                    this.onVideoSuccessCallback && this.onVideoSuccessCallback();
                } else {
                    GameEngine.inst.debug('QQPlayH5GameAPI RewardedVideo.onClose 激励视频广告取消关闭，不发放奖励');
                    this.onVideoFailCallback && this.onVideoFailCallback(4, "激励视频广告取消关闭，不发放奖励");
                }
                this.clearVideoCallback();
            });
        }
        GameEngine.inst.debug('QQPlayH5GameAPI.createRewardedVideoAd 创建激励视频广告');
    }
    /**展示RewardedVideo激励视频广告 */
    onShowRewardedVideo(_successCallback: Function, _failCallback: (code, msg) => void) {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            _successCallback && _successCallback();
            return;
        }
        if (this.qq) {
            this.onVideoSuccessCallback = _successCallback;
            this.onVideoFailCallback = _failCallback;
            if (this.m_videoAd) {
                this.m_videoAd.show().catch((err) => {
                    this.onVideoFailCallback && this.onVideoFailCallback(1, "激励视频广告取消关闭，不发放奖励");
                    GameEngine.inst.debug(`QQPlayH5GameAPI RewardedVideo.show 激励视频广告显示失败,${JSON.stringify(err)}`);
                });
            }
        } else {
            _successCallback && _successCallback();
        }
        GameEngine.inst.debug('QQPlayH5GameAPI.createRewardedVideoAd 显示激励视频广告');
    }

    private clearVideoCallback() {
        this.onVideoSuccessCallback = null;
        this.onVideoFailCallback = null;
    }
    //#endregion

    //#region 插屏广告
    /**创建插屏广告 createInsertAd
     * 基础库 1.12.0
     * 插屏广告组件默认是隐藏的，因此可以提前创建，以提前初始化组件。建议在小程序页面的 onReady 事件回调中创建广告实例，并在该页面的生命周期内重复调用该广告实例。
     * 插屏广告组件是自动拉取广告并进行更新的，即在调用qq.createInterstitialAd之后会立马触发一次load。在组件创建后会拉取一次广告，用户关闭广告后会去拉取下一条广告，即在用户关闭广告之后，会立马触发一次load。
     */
    createInsertAd() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qq) {
            if(this.versionCompareUsage("1.12.0") == false){
                GameEngine.inst.debug("插屏需要1.12.0以上");
                return;
            }
            if (this.m_insertAd == null) {
                this.m_insertAd = this.qq.createInterstitialAd({
                    adUnitId: PlatformConfig.inst.currentPlatform.insertAdId
                });
                this.m_insertAd.onLoad(this.onInsertAdLoaded);
                this.m_insertAd.onError(this.onInsertAdError);
                this.m_insertAd.onClose(this.onInsertAdClose);
            }
        }
        GameEngine.inst.debug("QQPlayH5GameAPI.createInsertAd 创建插屏广告");
    }
    /**展示InsertAd插屏广告 
     * 小程序启动一定时间内不允许展示插屏广告(10-15秒)
     * 播放时间间隔不足，不允许展示插屏广告
    */
    onShowInsertAd() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
       
        if (this.canLoadInsertAd == false) {
            GameEngine.inst.debug("QQPlayH5GameAPI.onShowInsertAd 没到指定时间不能显示插屏广告");
            EventManager.inst.SendEvent(PlatformEvents.ON_INSERT_AD_ERROR_EVENT);
            return;
        }
        if (this.qq) {
            if(this.versionCompareUsage("1.12.0") == false){
                GameEngine.inst.debug("插屏需要1.12.0以上");
                return;
            }
            this.createInsertAd();
            if (this.m_insertAd) {
                this.m_insertAd.show()
                    .then(() => {
                        GameEngine.inst.debug(`QQPlayH5GameAPI.onShowInsertAd 插屏广告显示成功`);
                        this.canLoadInsertAd = false;
                    }).catch(err => {
                        GameEngine.inst.debug(`QQPlayH5GameAPI.onInsertAdError show 插屏广告错误,${JSON.stringify(err)}`);
                    });
            }
        }
        console.log('QQPlayH5GameAPI onShowInsertAd');
    }
    onDestoryInsertAd() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qq) {
            if(this.versionCompareUsage("1.12.0") == false){
                GameEngine.inst.debug("插屏需要1.12.0以上");
                return;
            }
            if (this.m_insertAd) {
                this.canLoadInsertAd = true;
                this.m_insertAd.offLoad(this.onInsertAdLoaded);
                this.m_insertAd.offError(this.onInsertAdError);
                this.m_insertAd.offClose(this.onInsertAdClose);
                this.m_insertAd.destroy();
                this.m_insertAd = null;
                GameEngine.inst.debug("QQPlayH5GameAPI.onDestoryInsertAd 移除插屏广告");
            }
        }
    }
    private onInsertAdLoaded() {
        GameEngine.inst.debug("QQPlayH5GameAPI.onInsertAdLoaded 插屏广告加载成功");
    }

    private onInsertAdError(err) {
        GameEngine.inst.debug(`QQPlayH5GameAPI.onInsertAdError 插屏广告错误,${JSON.stringify(err)}`);
    }

    private onInsertAdClose() {
        Laya.timer.once(QQPlayH5GameAPI.inst.insertAdShowCD, QQPlayH5GameAPI.inst, () => {
            QQPlayH5GameAPI.inst.canLoadInsertAd = true;
        });
        QQPlayH5GameAPI.inst.canLoadInsertAd = false;
        GameEngine.inst.debug(`TouTiaoH5GameAPI.onInsertAdClose 关闭插屏广告`);
    }
    //#endregion

    //#region 广告盒子
    createAppBox() { }
    /**显示广告盒子
     * 1.7.1
     */
    onShowAppBox() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qq) {
            if(this.versionCompareUsage("1.7.1") == false){
                GameEngine.inst.debug("游戏盒子需要1.7.0以上");
                return;
            }
            this.onHideAppBox();
            this.m_appBoxAd = this.qq.createAppBox({
                adUnitId: PlatformConfig.inst.currentPlatform.appBoxId
            });
            this.m_appBoxAd.onClose(this.onAppBoxClose);
            this.m_appBoxAd.load().then(() => {
                this.m_appBoxAd.show();
                GameEngine.inst.debug(`QQPlayH5GameAPI.onShowAppBox 广告盒子显示成功`);
            }).catch(err => {
                GameEngine.inst.debug(`QQPlayH5GameAPI.onShowAppBox.err 加载广告盒子报错 ${JSON.stringify(err)}`);
            });
        }
        console.log('QQPlayH5GameAPI onShowAppBox');
    }
    /**销毁广告盒子 */
    onHideAppBox() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qq) {
            if(this.versionCompareUsage("1.7.1") == false){
                GameEngine.inst.debug("游戏盒子需要1.7.0以上");
                return;
            }
            if (this.m_appBoxAd) {
                this.m_appBoxAd.offClose(this.onAppBoxClose);
                this.m_appBoxAd.destroy();
                this.m_appBoxAd = null;
            }
        }
        GameEngine.inst.debug(`QQPlayH5GameAPI.onHideAppBox 销毁广告盒子`);
    }

    private onAppBoxClose() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qq) {
            if(this.versionCompareUsage("1.7.1") == false){
                GameEngine.inst.debug("游戏盒子需要1.7.0以上");
                return;
            }
            QQPlayH5GameAPI.inst.onHideAppBox();
            GameEngine.inst.debug(`QQPlayH5GameAPI.onAppBoxClose 关闭广告盒子`);
        }
    }
    //#endregion

    /**分享 */
    onShare(callback: (success) => void) {
        if (this.qq) {
            this.onShareCallback = callback;
            this.shareStartTime = Date.now();
            this.qq.shareAppMessage({
                title: PlatformConfig.inst.globalConfigs.projectName,
                imageUrl: PlatformConfig.inst.currentPlatform.shareImage,
                query: ''
            });
            GameEngine.inst.debug('QQPlayH5GameAPI.onShare');
        } else {
            callback && callback(true);
        }

    }
    /**
     * 彩签
     * 1.10.0
     */
    addColorSign() {
        if (this.qq) {
            if(this.versionCompareUsage("1.10.0") == false){
                GameEngine.inst.debug("彩签需要版本1.10.0以上");
                return;
            }
            if (this.isInstallColorSign == false) {
                let self = this;
                //IOS正常返回succee和false
                //安卓都返回success
                this.qq.addColorSign({
                    success: function () {
                        console.log("添加彩签成功");
                        if (self.platform == "ios") {
                            this.isInstallColorSign = true;
                            this.saveDataToCache(this.colorSignRecordKey, this.isInstallColorSign);
                        }
                    },
                    fail: function () {
                        console.log("添加彩签失败");
                    }
                });
            }

        }
        console.log('QQPlayH5GameAPI addColorSign');
    }

    //#region 桌面图标
    /**是否安装过桌面图标 */
    hasShortcutInstalled(callback: (installed: boolean) => void) {
        console.log("this.deskTopRecord.isGet", this.deskTopRecord.isGet)
        if (this.deskTopRecord.isGet == true) {
            console.log("已经领取了ICON奖励");
            callback(true);
        } else {
            callback(false);
        }
    }

    /**安装桌面图标
     * 1.7.1
     */
    installShortcut(callback: (success: boolean) => void) {
        // ios版本不支持，点击是直接跳转页面，按页面上的图片操作添加一个书签到桌面；只要你点击了这个 添加桌面按钮，都视为成功
        // 如果此时ios版本做自动弹出，会不合适，因为会跳转页面
        // 安卓版本支持安装图标，有个选项对话框，是否安装，怎么选都成功
        // 没接口能获得是否安装了图标
        // 方案：
        // 桌面安装成功，本地保存一个变量当他已经安装过了，后面将无法显示，不管他删没删掉桌面上的图标
        // 判断是否ios，如果是ios平台 取消自动弹出
        if (this.qq) {
            if(this.versionCompareUsage("1.7.1") == false){
                GameEngine.inst.debug("桌面图标需要1.7.1以上");
                return;
            }
            let self = this;
            if (this.platform == "devtools") {
                //模拟器
                this.saveDesktop();
                callback && callback(true);
            } else {
                this.qq.saveAppToDesktop({
                    success: function () {
                        console.log("添加图标成功");
                        self.saveDesktop();
                        callback && callback(true);
                        EventManager.inst.SendEvent(PlatformEvents.onShortCutInstallEvent);
                        callback = null;
                    },
                    fail: function () {
                        console.log("添加图标失败");
                        callback && callback(false);
                        callback = null;
                    },
                    complete: function (res) {
                        console.log("添加图标完成：complete",res);
                    }
                });
            }
        } else {
            this.saveDesktop();
            callback && callback(true);
        }
    }

    private saveDesktop() {
        this.deskTopRecord.isGet = true;
        this.deskTopRecord.date = DateHelper.getTime();
        this.saveDataToCache(this.deskTopRecordKey, this.deskTopRecord);
    }
    //#endregion

    /**原生音效 */
    createInnerAudioContext(): any {
        if (this.qq) {
            let auido = this.qq.createInnerAudioContext();
            return auido;
        }
        return null;
    }

    /**存储数据
     * @param _key 索引 string
     * @param _value 值
     */
    saveDataToCache(_key: string, _value: any) {
        Laya.LocalStorage.setItem(_key, JSON.stringify(_value));
        console.log('QQPlayH5GameAPI saveDataToCache:');
    }
    /**读取数据
     * @param _key 索引 string
     */
    readDataFromCache(_key: string): any {
        console.log('QQPlayH5GameAPI readDataFromCache');
        let data = Laya.LocalStorage.getItem(_key);
        if (data) {
            if (typeof data == "string") {
                return JSON.parse(Laya.LocalStorage.getItem(_key));
            }
        }
        return null;
    }

    /**原生震动 */
    vibrateShort() {
        if (this.qq) {
            this.qq.vibrateShort();
        }
    }

    getPlatform(): string {
        return this.platform;
    }

    getDevicePlatform(): string {
        return "";
    }

    /**发送事件 */
    sendEvent(obj: { key: string, data: any }) {
        if (this.qq) {
            this.qq.reportAnalytics(obj.key, obj.data);
        }
        GameEngine.inst.debug(`QQPlayH5GameAPI.sendEvent 发送事件${JSON.stringify(obj)}`);
    }

    bannerHeight(): number {
        return this.m_bannerHeight;
    }
    notchHeight(): number {
        if (this.qq) {
            let h = this.qq.getSystemInfoSync().statusBarHeight;
            console.log("状态栏高度:", h);
            return h + 30;
        }
        return 30;
    }
    /**获取屏幕宽高 */
    getScreenSize(): Laya.Size {
        return new Laya.Size(720, 1280);
    }
    /**获取是否审核 */
    isVertify(): boolean {
        return false;
    }


    //#region 渠道没用到的方法
    createMoreGamesButton(inStyle?: { left: number; top: number; width: number; height: number; }) { }
    hideMoreGameButton() { }
    onShareVideo(callback: (success: any) => void) { }
    onStartRecord() { }
    onStopRecord() { }
    /**上传最高分(排行榜) */
    updateHighScore(_score: number) { }
    /**创建原生广告 createNativeAd */
    createNativeAd() { }
    onShowNativeAd() { }
    onNativeAdClick(_id: string) { }
    onHideInsertAd() { }
    navigateToMiniGame(object: any) { }
    pay(paymentData: PaymentData, callback: (success: boolean, msg: string) => void) { }
    showMoreGamesModal() { }
    reportMonitor(name: string, value: number) { }
    createNativeIconAd() { }
    onShowNativeIconAd(callback: (ad: any) => void) { }
    onNativeIconAdClick(_id: string) { }
    onNativeIconAdClose() { }
    onHideNativeAd() { }
    onNativeAdClose() { }
    onDestroyNativeAd() {}
    onDestroyNativeIconAd() {}
    //#endregion
}
