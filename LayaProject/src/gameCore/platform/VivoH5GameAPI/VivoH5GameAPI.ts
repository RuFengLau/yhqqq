import PlatformsAPI from "../PlatformsAPI";
import SoundManager from "../../managers/soundManager/SoundManager";
import UIManager from "../../managers/UIManager";
import PlatformConfig from "../PlatformConfig";
import MathHelper from "../../plugins/tools/MathHelper";
import EventManager from "../../managers/eventManager/EventManager";
import PlatformEvents from "../PlatformEvents";
import PaymentData from "../PaymentData";
import GameEngine from "../../managers/GameEngine";
import LocalStorageManager from "../../managers/LocalStorageManager";
import DateHelper from "../../plugins/tools/DateHelper";

export default class VivoH5GameAPI implements PlatformsAPI {
    private downloadTask: any
    downloadFile(url: string, callback: (success: boolean, res: any) => void) {
        if (this.qg) {
            if (this.downloadTask != null) {
                this.downloadTask.abort();
            }
            this.downloadTask = this.qg.download({
                url: url,
                success(res) {
                    console.log("下载资源zip成功:",res);
                    callback && callback(true, res);
                },
                fail: function (data, code) {
                    callback && callback(false, null);
                }
            })
        } else {
            callback && callback(false, null);
        }
    }
    unzip(url: string, callback: (success: boolean) => void) {
        if (this.qg) {
            this.qg.unzipFile({
                srcUri: url,
                dstUri: this.userDataPath(),
                success: function (uri) {
                    console.log(`handling success: ${uri}`);
                    callback && callback(true);
                },
                fail: function (data, code) {
                    console.log(`handling fail, code = ${code}`);
                    callback && callback(false);
                }
            });
        } else {
            callback && callback(false);
        }
    }
    readFile(filePath: string, callback: (success: boolean, data: string) => void) {
        if (this.qg) {
            let url = this.userDataPath() + filePath;
            console.log("readFileSync:", url);
            const result = this.qg.readFileSync({
                uri: url,
                encoding: 'utf8'
            });

            if (typeof result === 'string') {
                console.log(`handling fail, error message = ${result}`)
                callback && callback(false, "");
            }
            else {
                callback && callback(true, result.text);
            }
        } else {
            callback && callback(false, "");
        }
    }
    writeFileSync(filePath: string, data: string) {
        if(this.qg){
            let url =  this.userDataPath() + filePath;
            const result = this.qg.writeFileSync({
                uri: url,
                text: data
            })
            
            if (result === 'success') {
                console.log(`handling success`)
            }
            else {
                console.log(`handling fail, result = ${result}`)
            }
        }
        
    }
    userDataPath(): string {
        return "internal://files/assets/";
    }
    public static inst: VivoH5GameAPI;
    private qg: any = window['qg'];
    /**系统信息 */
    private systemInfo: any = null;
    /**平台版本号 */
    private platformVersionCode: number;
    /**banner广告 */
    private m_bannerAd: any = null;
    /**激励广告 */
    private m_videoAd: any = null;
    /**插屏广告 */
    private m_insertAd: any = null;
    /**原生广告 */
    private m_nativeAd: any = null;
    /**原生广告onLoad事件 */
    private nativeAdOnLoad: Function;
    /**原生icon广告 */
    private m_nativeIconAd: any = null;
    /**原生icon广告加载事件 */
    private nativeIconAdOnLoad: Function;
    /**激励广告成功事件 */
    private onVideoAdSuccessCallback: Function;
    /**激励广告失败事件 */
    private onVideoAdFailCallback: (code, msg) => void;
    /**激励广告是否加载 */
    private m_videoAdIsLoaded: boolean = false;
    private isVideoAdPlaying:boolean = false;
    /**banner高度 */
    private m_bannerHeight: number = 170;
    private m_bannerIsShow: boolean = false;
    /**是否进入过后台 */
    private ishide: boolean = false;
    /**是否第一次播放广告 */
    private isVideoAdFirstPlay: boolean = true;
    /**本地图标获取信息 */
    private deskTopRecord: any;
    private deskTopRecordKey: string = "";

    /**是否能加载插屏广告 */
    private canLoadInsertAd: boolean = false;
    /**banner调用间隔 */
    private bannerAdShowCD: number = 10000;
    /**是否可以显示BannerAd */
    private canShowBannerAd: boolean = true;
    /**激励视频调用间隔 */
    private rewardAdShowCD: number = 60000;
    /**N秒后才能加载插屏类广告 */
    private insertAdShowCD: number = 40000;
    /**是否可以显示激励视频 */
    private canShowRewardAd: boolean = true;
    /**插屏类广告准备时间(小程序启动一定时间内不允许展示插屏广告) */
    private insertAdReadyInterval: number = 10000;

    /**对比最小平台号 */
    private versionCompareUsage(version: number): boolean {
        if (this.platformVersionCode >= version) {
            return true;
        }
        return false;
    }

    /**进入后台 */
    private onHide() {
        SoundManager.inst.setVolume(0);
        Laya.timer.scale = 0;
    }

    /**进入前台 */
    private onShow() {
        Laya.timer.scale = 1;
        //判断声音开关
        if (SoundManager.inst.getMusicMuted() == false) {
            if(this.isVideoAdPlaying == false){
                SoundManager.inst.setVolume(1);
                SoundManager.inst.PlayCurrentMusic();
            }
        }
    }

    /**初始化 */
    onInit(_callback: Function) {
        this.checkDesktop();
        if (this.qg) {
            VivoH5GameAPI.inst = this;
            this.systemInfo = this.qg.getSystemInfoSync();
            GameEngine.inst.debug(`VIVO系统信息:${JSON.stringify(this.systemInfo)}`);
            this.platformVersionCode = this.systemInfo.platformVersionCode;
            this.insertAdReadyInterval = PlatformConfig.inst.currentPlatform.insertAdReadyInterval;
            this.bannerAdShowCD = PlatformConfig.inst.currentPlatform.bannerAdShowCD;
            this.rewardAdShowCD = PlatformConfig.inst.currentPlatform.rewardAdShowCD;
            this.insertAdShowCD = PlatformConfig.inst.currentPlatform.insertAdShowCD;
            //插屏准备时间
            Laya.timer.once(this.insertAdReadyInterval, this, () => {
                this.canLoadInsertAd = true;
            });
            this.qg.onShow(() => {
                this.onShow();
                GameEngine.inst.debug(`VivoH5GameAPI.onShow 进入前台`);
            });
            this.qg.onHide(() => {
                this.onHide();
                GameEngine.inst.debug(`VivoH5GameAPI.onHide 进入后台`);
            });
        }
        GameEngine.inst.debug('VivoH5GameAPI.onInit');
    }

    /**登录 */
    onLogin(callback: (success: boolean) => void) {
        callback && callback(true);
        console.log('VivoH5GameAPI onLogin');
    }

    /**
     * 初始化Ad (部分渠道需要先初始化广告 如oppo)
     */
    onInitAdService(callback: () => void) {
        if (this.qg) {
            this.createBannerAd();
            this.createRewardedVideoAd();
            this.createInsertAd();
            this.createNativeAd();
            this.createNativeIconAd();
        }
        callback();
        GameEngine.inst.debug('VivoH5GameAPI.onInitAdService');
    }

    /**支付 */
    pay(paymentData: PaymentData, callback: (success: boolean, msg: string) => void) {
        //throw new Error("Method not implemented.");
    }

    /**原生音效 */
    createInnerAudioContext(): any {
        if (this.qg) {
            return this.qg.createInnerAudioContext();
        }
        return null;
    }

    //#region 桌面图标
    /**获取桌面图标本地记录 */
    private checkDesktop() {
        //获取桌面图标本地记录
        this.deskTopRecordKey = LocalStorageManager.inst.shortcutKey;
        this.deskTopRecord = this.readDataFromCache(this.deskTopRecordKey);
        if (this.deskTopRecord == null || this.deskTopRecord == undefined || this.deskTopRecord == "") {
            this.deskTopRecord = {
                isGet: false, date: ""
            }
            this.saveDataToCache(this.deskTopRecordKey, this.deskTopRecord);
            //Laya.LocalStorage.setJSON(this.deskTopRecordKey, this.deskTopRecord);
        } else {
            //判断是否超过一日
            let day = MathHelper.countDay(DateHelper.getTime(), this.deskTopRecord.date);
            console.log("判断图标是否已经超过一日:", day);
            if (day >= 1) {
                this.saveDataToCache(this.deskTopRecordKey, this.deskTopRecord);
            }
        }
        console.log("桌面图标本地记录信息:", this.deskTopRecord);
    }
    /**
     * 是否有桌面图标
     * @param callback 
     */
    hasShortcutInstalled(callback: (installed: boolean) => void) {
        if (this.deskTopRecord.isGet == true) {
            GameEngine.inst.debug("今日已经领取了ICON奖励");
            callback(true);
            return;
        }
        if (this.qg) {
            this.qg.hasShortcutInstalled({
                success: function (status) {
                    if (status) {
                        GameEngine.inst.debug('桌面图标已创建');
                        callback(true);
                    } else {
                        GameEngine.inst.debug('桌面图标未创建');
                        callback(false);
                    }
                }
            })
        } else {
            callback(false);
        }
    }

    private delayCheckShortCut(callback: (success: boolean) => void) {
        //延时判断是否安装了桌面图标
        let self = this;
        Laya.timer.once(1000, this, () => {
            self.qg.hasShortcutInstalled({
                success: (res) => {
                    if (res == false) {
                        callback(false);
                    }
                    else {
                        self.deskTopRecord.isGet = true;
                        self.deskTopRecord.date = DateHelper.getTime();
                        self.saveDataToCache(self.deskTopRecordKey, self.deskTopRecord);
                        callback(true);
                        GameEngine.inst.debug("OPPOH5GameAPI.hasShortcutInstalled 安装图标成功");
                    }
                },
                fail: function (err) {
                    GameEngine.inst.debug(`OPPOH5GameAPI.hasShortcutInstalled 安装图标失败 ${JSON.stringify(err)}`);
                    callback(false);
                },
                complete: function () { }
            });
        })
    }

    /**
     * 安装桌面图标
     * @param callback 
     */
    installShortcut(callback: (success: boolean) => void) {
        if (this.qg) {
            if (this.deskTopRecord.isGet == true) {
                console.log("今日已经领取了ICON奖励");
                return;
            }
            let self = this;
            this.qg.hasShortcutInstalled({
                success: function (res) {
                    console.log("没有安装过图标");
                    // 判断图标未存在时，创建图标
                    if (res == false) {
                        self.qg.installShortcut({
                            success: function (ss) {
                                GameEngine.inst.debug("VivoH5GameAPI.installShortcut 安装图标成功");
                                self.delayCheckShortCut(callback);
                            },
                            fail: function (err) {
                                GameEngine.inst.debug(`VivoH5GameAPI.installShortcut 安装图标失败 ${JSON.stringify(err)}`);
                                self.delayCheckShortCut(callback);
                            },
                            complete: function () { }
                        });
                        
                    } else {
                        GameEngine.inst.debug(`VivoH5GameAPI.hasShortcutInstalled 已安装图标`);
                        callback(false);
                    }
                },
                fail: function (err) {
                    GameEngine.inst.debug(`VivoH5GameAPI.hasShortcutInstalled 安装桌面图标出错 ${JSON.stringify(err)}`);
                    callback(false);
                },
                complete: function () { }
            });
        } else {
            this.deskTopRecord.isGet = true;
            this.deskTopRecord.date = DateHelper.getTime();
            this.saveDataToCache(this.deskTopRecordKey, this.deskTopRecord);
            callback(true);
            GameEngine.inst.debug("VivoH5GameAPI.installShortcut 安装图标成功");
        }

        console.log("installShortcut");
    }
    //#endregion

    //#region Banner广告
    /**创建广告 BannerAd */
    createBannerAd() { }

    /**展示Banner广告 */
    onShowBanner() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qg) {
            let bannerId = PlatformConfig.inst.currentPlatform.bannerAdId;
            if (bannerId == undefined || bannerId == "") {
                GameEngine.inst.debug("bannerId不能为空");
                return;
            }
            if (this.canShowBannerAd == false) {
                GameEngine.inst.debug("11秒内调用广告次数超过1次，11秒后再调用");
                return;
            }
            //创建前先销毁一次
            this.onDestoryBanner();
            this.m_bannerAd = this.qg.createBannerAd({
                posId: bannerId,
                style: {}
            });
            let adshow = this.m_bannerAd.show();
            // 调用then和catch之前需要对show的结果做下判空处理，防止出错（如果没有判空，在平台版本为1052以及以下的手机上将会出现错误）
            adshow && adshow.then(() => {
                EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_SUCCESS_EVENT);
                GameEngine.inst.debug("banner广告展示成功");
                this.m_bannerIsShow = true;
            }).catch((err) => {
                GameEngine.inst.debug(`banner广告展示失败 ${JSON.stringify(err)}`);
                EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
                this.m_bannerIsShow = false;
            });
            this.resetBannerCDTimer();
        }
    }

    private resetBannerCDTimer() {
        this.canShowBannerAd = false;
        Laya.timer.once(this.bannerAdShowCD, this, () => {
            this.canShowBannerAd = true;
            GameEngine.inst.debug("banner广告可以再次显示了");
        });
    }

    /**隐藏Banner广告 */
    onHideBanner() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qg) {
            if (this.m_bannerIsShow &&this.m_bannerAd) {
                var adhide = this.m_bannerAd.hide();
                // 调用then和catch之前需要对hide的结果做下判空处理，防止出错（如果没有判空，在平台版本为1052以及以下的手机上将会出现错误）
                adhide && adhide.then(() => {
                    GameEngine.inst.debug(`banner广告隐藏成功`);
                    this.m_bannerAd = null;
                    EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
                }).catch(err => {
                    GameEngine.inst.debug(`banner广告隐藏失败 ${JSON.stringify(err)}`);
                });
                this.m_bannerAd = null;
                this.m_bannerIsShow = false;
                this.resetBannerCDTimer();
            }
        }
    }

    /**销毁Banner广告 */
    onDestoryBanner() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qg) {
            if (this.m_bannerIsShow &&this.m_bannerAd) {
                var addestroy = this.m_bannerAd.destroy();
                // 调用then和catch之前需要对show的结果做下判空处理，防止出错（如果没有判空，在平台版本为1052以及以下的手机上将会出现错误）
                addestroy && addestroy.then(() => {
                    GameEngine.inst.debug(`banner广告销毁成功`);
                    this.m_bannerAd = null;
                    EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
                }).catch(err => {
                    GameEngine.inst.debug(`banner广告销毁失败 ${JSON.stringify(err)}`);
                    //尝试使用隐藏
                    this.onHideBanner();
                });
                this.resetBannerCDTimer();

            }
        }
    }
    //#endregion

    //#region 激励视频
    /**
     * 创建激励视频广告
     * 注意： 第一次创建视频广告对象时，已自动加载一次广告，请勿重新加载
     * 视频广告展示间隔不得少于60s
     * vivo的激励视频并不会进入前后台
     */
    createRewardedVideoAd() { }

    /**
     * 显示激励视频
     * @param _successCallback 
     * @param _failCallback 
     */
    onShowRewardedVideo(_successCallback: Function, _failCallback: (code, msg) => void) {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            _successCallback && _successCallback();
            return;
        }
        
        if (this.qg) {
            if (this.versionCompareUsage(1041) == false) {
                GameEngine.inst.debug("激励视频需要最小平台号1041");
                _failCallback && _failCallback(1,"没到指定时间不能显示视频广告");
                return;
            }
            let videoId = PlatformConfig.inst.currentPlatform.videoAdId;
            if (videoId == undefined || videoId == "") {
                GameEngine.inst.debug("videoId不能为空");
                return;
            }
            if (this.canShowRewardAd == false) {
                GameEngine.inst.debug("VivoH5GameAPI.onShowRewardedVideo 没到指定时间不能显示视频广告");
                _failCallback && _failCallback(1,"没到指定时间不能显示视频广告");
                return;
            }
            // 第一次creat后广告可以在onload里面直接show
            if (this.m_videoAd == null) {
                this.m_videoAd = this.qg.createRewardedVideoAd({
                    posId: videoId
                });
                this.m_videoAd.onLoad(this.onRewardAdLoad);
                this.m_videoAd.onError(this.onRewardAdError);
                this.m_videoAd.onClose(this.onRewardAdClose);
            }
            // 后续的加载必须要load才能触发onload接着才能show出广告
            this.onVideoAdSuccessCallback = _successCallback;
            this.onVideoAdFailCallback = _failCallback;

            if (this.m_videoAdIsLoaded) {
                this.m_videoAd.show().then(() => {
                    GameEngine.inst.debug('VivoH5GameAPI.show 激励广告显示成功');
                    this.isVideoAdPlaying = true;
                    VivoH5GameAPI.inst.onHide();
                }).catch(err => {
                    this.onVideoAdFailCallback && this.onVideoAdFailCallback(1, "");
                    this.clearVideoCallbacks();
                    GameEngine.inst.debug("激励广告展示失败" + JSON.stringify(err));
                });
            } else {
                this.m_videoAd.load().catch(err => {
                    this.m_videoAdIsLoaded = false;
                    this.onVideoAdFailCallback && this.onVideoAdFailCallback(1, "");
                    this.clearVideoCallbacks();
                    GameEngine.inst.debug("激励广告加载失败" + JSON.stringify(err));
                });
            }
        } else {
            _successCallback && _successCallback();
        }
        console.log('VivoH5GameAPI onShowRewardedVideo');
    }

    private onRewardAdLoad() {
        let adshow = VivoH5GameAPI.inst.m_videoAd.show();
        // 捕捉show失败的错误
        GameEngine.inst.debug('VivoH5GameAPI.onRewardAdLoad 视频加载成功');
        adshow && adshow.then(() => {
            GameEngine.inst.debug('VivoH5GameAPI.show 激励广告显示成功');
            VivoH5GameAPI.inst.isVideoAdPlaying = true;
            VivoH5GameAPI.inst.onHide();
        }).catch(err => {
            GameEngine.inst.debug(`VivoH5GameAPI.show 激励广告显示错误${JSON.stringify(err)}`);
            VivoH5GameAPI.inst.onVideoAdFailCallback && VivoH5GameAPI.inst.onVideoAdFailCallback(1, "");
            VivoH5GameAPI.inst.clearVideoCallbacks();
        });
    }

    private onRewardAdError(err) {
        VivoH5GameAPI.inst.m_videoAdIsLoaded = false;
        VivoH5GameAPI.inst.isVideoAdPlaying = false;
        GameEngine.inst.debug(`VivoH5GameAPI.onRewardAdError ${JSON.stringify(err)}`);
    }

    private onRewardAdClose(res) {
        if (res.isEnded) {
            GameEngine.inst.debug('激励视频广告完成，发放奖励')
            VivoH5GameAPI.inst.onVideoAdSuccessCallback && VivoH5GameAPI.inst.onVideoAdSuccessCallback();
        } else {
            GameEngine.inst.debug('激励视频广告取消关闭，不发放奖励');
            VivoH5GameAPI.inst.onVideoAdFailCallback && VivoH5GameAPI.inst.onVideoAdFailCallback(4, "激励视频广告取消关闭，不发放奖励");
        }
        VivoH5GameAPI.inst.isVideoAdPlaying = false;
        VivoH5GameAPI.inst.m_videoAdIsLoaded = false;
        VivoH5GameAPI.inst.onShow();
        VivoH5GameAPI.inst.clearVideoCallbacks();
        //倒计时
        VivoH5GameAPI.inst.canShowRewardAd = false;
        Laya.timer.once(VivoH5GameAPI.inst.rewardAdShowCD, this, () => {
            GameEngine.inst.debug('激励视频倒计完成，可以再次显示');
            VivoH5GameAPI.inst.canShowRewardAd = true;
        });
    }

    /**
     * 清除激励视频的事件函数
     */
    private clearVideoCallbacks() {
        this.onVideoAdSuccessCallback = null;
        this.onVideoAdFailCallback = null;
    }
    //#endregion

    private countDowwInsertTime() {
        this.canLoadInsertAd = false;
        Laya.timer.clear(this, this._countDownInsertTime);
        Laya.timer.once(this.insertAdShowCD, this, this._countDownInsertTime);
        GameEngine.inst.debug(`VivoH5GameAPI 插屏需要倒计:${this.insertAdShowCD}秒`);
    }

    private _countDownInsertTime() {
        this.canLoadInsertAd = true;
        GameEngine.inst.debug(`VivoH5GameAPI 插屏倒计完成 ${this.canLoadInsertAd}`);
    }

    //#region 插屏广告
    /**创建插屏广告 */
    createInsertAd() { }
    /**展示插屏广告
     * 经测试，一天只能3次，之后就会报【检测到用户频繁关闭广告，插屏广告暂时不展示】
     */
    onShowInsertAd() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.versionCompareUsage(1031) == false) {
            GameEngine.inst.debug("插屏广告需要最小平台号1031");
            return;
        }
        if (this.qg) {
            let insertAdId = PlatformConfig.inst.currentPlatform.insertAdId;
            if (insertAdId == undefined || insertAdId == "") {
                GameEngine.inst.debug("insertAdId不能为空");
                return;
            }
            GameEngine.inst.debug(`检查是否可以显示插屏广告:${this.canLoadInsertAd}`);
            if (this.canLoadInsertAd == false) {
                GameEngine.inst.debug("VivoH5GameAPI.onShowInsertAd 没到指定时间不能显示插屏广告");
                EventManager.inst.SendEvent(PlatformEvents.ON_INSERT_AD_ERROR_EVENT);
                return;
            }
            //先销毁一次
            //this.onDestoryInsertAd();
            if(this.m_insertAd != null){
                this.m_insertAd.offClose(this.onInsertAdClose);
                this.m_insertAd.offError(this.onInsertAdError);
                this.m_insertAd = null;
            }
            this.m_insertAd = this.qg.createInterstitialAd({
                posId: insertAdId
            });
            this.m_insertAd.onClose(this.onInsertAdClose);
            this.m_insertAd.onError(this.onInsertAdError);

            var adShow = this.m_insertAd.show();
            adShow && adShow.then(() => {
                GameEngine.inst.debug("插屏广告展示成功");
                //this.countDowwInsertTime();
            }).catch((err) => {
                // GameEngine.inst.debug(`插屏广告展示失败:${JSON.stringify(err)}`);
                // this.countDowwInsertTime();
                // EventManager.inst.SendEvent(PlatformEvents.ON_INSERT_AD_ERROR_EVENT);
            });
        }
    }
    private onInsertAdClose() {
        //关闭的时候倒计时开始
        VivoH5GameAPI.inst.countDowwInsertTime();
        EventManager.inst.SendEvent(PlatformEvents.ON_INSERT_AD_CLOSE_EVENT);
        //VivoH5GameAPI.inst.onDestoryInsertAd();
        GameEngine.inst.debug('VivoH5GameAPI.onInsertAdClose 插屏广告关闭');
    }
    private onInsertAdError(err) {
        //错误得时候倒计时开始
        VivoH5GameAPI.inst.countDowwInsertTime();
        EventManager.inst.SendEvent(PlatformEvents.ON_INSERT_AD_ERROR_EVENT);
        GameEngine.inst.debug(`VivoH5GameAPI.onInsertAdError 插屏广告错误 ${JSON.stringify(err)}`);
    }
    /**销毁插屏广告 */
    onDestoryInsertAd() {
        GameEngine.inst.debug("暂时不提供销毁插屏广告方法");
        return;
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.versionCompareUsage(1031) == false) {
            GameEngine.inst.debug("插屏广告需要最小平台号1031");
            return;
        }
        if (this.qg) {
            if (this.m_insertAd && this.m_insertAd.destroy) {
                // this.m_insertAd.offClose(this.onInsertAdClose);
                // this.m_insertAd.offError(this.onInsertAdError);
                this.m_insertAd.destroy();
                this.m_insertAd = null;
            } else {
                GameEngine.inst.debug("VIVO没有销毁插屏广告方法");
            }
        }

    }
    /**隐藏插屏广告 */
    onHideInsertAd() {
        GameEngine.inst.debug("暂时不提供隐藏插屏广告方法");
        return;
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.versionCompareUsage(1031) == false) {
            GameEngine.inst.debug("插屏广告需要最小平台号1031");
            return;
        }
        if (this.qg) {
            if (this.m_insertAd && this.m_insertAd.hide) {
                this.m_insertAd.hide();
            } else {
                GameEngine.inst.debug("VIVO没有隐藏插屏广告方法");
            }
        }
    }
    //#endregion

    //#region 原生广告
    /**
     * 创建原生广告
     * 注意项
     * 原生广告的曝光和点击事件需要开发者自己处理，建议在广告展示时使用reportAdShow()上报曝光事件，
     * 并在广告被点击时使用reportAdClick()上报点击事件，
     * 并且严格保证先上报曝光后上报点击的顺序。（
     * 切记，load()和onLoad()并不是用于上报展示，而是分别用于加载广告和监听加载状态，请勿错误使用。）
     */
    private currentNativeAd: any = null;
    createNativeAd() {
    }
    private onNativeAdError(err) {
        GameEngine.inst.debug(`VivoH5GameAPI.NativeAd.OnError 原生广告错误${JSON.stringify(err)}`);
    }
    private onNativeAdLoad(res) {
        console.log('原生广告加载完成-onload触发', JSON.stringify(res));
        let nativeCurrentAd;
        if (res && res.adList) {
            nativeCurrentAd = res.adList.pop();
            VivoH5GameAPI.inst.currentNativeAd = nativeCurrentAd;
            VivoH5GameAPI.inst.m_nativeAd.reportAdShow({ adId: nativeCurrentAd.adId.toString() });
            VivoH5GameAPI.inst.nativeAdOnLoad(VivoH5GameAPI.inst.currentNativeAd);
            VivoH5GameAPI.inst.countDownNativeAdTime();
        } else {
            console.log("不存在原生广告列表");
        }
    }

    /**
     * 显示原生广告
     * @param callback 
     */
    onShowNativeAd(callback: (ad) => void, key?: string) {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qg) {
            if (this.canLoadInsertAd == false) {
                EventManager.inst.SendEvent(PlatformEvents.ON_NATIVE_AD_READY_EVENT);
                EventManager.inst.SendEvent(PlatformEvents.ON_INSERT_AD_ERROR_EVENT);
                GameEngine.inst.debug("VivoH5GameAPI.onShowNativeAd 没到指定时间不能显示原生插屏广告");
                return;
            }
            let nativeAdId = PlatformConfig.inst.currentPlatform.nativeAdId;
            if (nativeAdId == undefined || nativeAdId == "") {
                GameEngine.inst.debug("nativeAdId不能为空");
                return;
            }
            if (this.m_nativeAd == null) {
                this.m_nativeAd = this.qg.createNativeAd({
                    posId: nativeAdId
                });
            } else {
                this.m_nativeAd.load();
            }
            VivoH5GameAPI.inst.nativeAdOnLoad = callback;
            this.m_nativeAd.offLoad(this.onNativeAdLoad);
            this.m_nativeAd.offLoad(this.onNativeAdError);
            this.m_nativeAd.onLoad(this.onNativeAdLoad);
            this.m_nativeAd.onError(this.onNativeAdError);
        }
    }

    private countDownNativeAdTime() {
        this.canLoadInsertAd = false;
        Laya.timer.clear(this, this._countDownNativeAdTime);
        Laya.timer.once(this.insertAdShowCD, this, this._countDownNativeAdTime);
        GameEngine.inst.debug(`VivoH5GameAPI 原生插屏需要倒计:${this.insertAdShowCD}秒`);
    }

    private _countDownNativeAdTime() {
        this.canLoadInsertAd = true;
        GameEngine.inst.debug(`VivoH5GameAPI 原生插屏倒计完成 ${this.canLoadInsertAd}`);
    }

    /**
     * 原生广告点击
     * @param _id 
     */
    onNativeAdClick(_id: string) {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qg && this.m_nativeAd) {
            this.m_nativeAd.reportAdClick({
                adId: _id
            });
            GameEngine.inst.debug(`点击上报原生id:${JSON.stringify(_id)}`);
        }
    }

    /**关闭原生广告 */
    onNativeAdClose() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        GameEngine.inst.debug(`VivoH5GameAPI.onNativeAdClose 关闭原生广告-暂时没执行什么内容`);
    }

    onDestroyNativeAd() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        GameEngine.inst.debug(`VivoH5GameAPI.onDestroyNativeAd 没有销毁原生广告方法`);
    }
    //#endregion

    //#region 原生图标广告
    private currentNativeIconAd: any = null;
    createNativeIconAd() {

    }
    private onNativeIconAdError(err) {
        GameEngine.inst.debug(`VivoH5GameAPI.NativeIconAd.OnError 原生图标广告错误${JSON.stringify(err)}`);
    }
    private onNativeIconAdLoad(res) {
        console.log('原生图标广告加载完成-onload触发', JSON.stringify(res));
        let nativeCurrentAd;
        if (res && res.adList) {
            nativeCurrentAd = res.adList.pop();
            VivoH5GameAPI.inst.m_nativeIconAd.reportAdShow({ adId: nativeCurrentAd.adId.toString() });
            VivoH5GameAPI.inst.nativeIconAdOnLoad(nativeCurrentAd);
        } else {
            console.log("不存在原生广告列表");
        }
    }
    onShowNativeIconAd(callback: (ad: any) => void) {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qg) {
            let nativeAdId = PlatformConfig.inst.currentPlatform.nativeIconAdId;
            if (nativeAdId == undefined || nativeAdId == "") {
                GameEngine.inst.debug("nativeAdId不能为空");
                return;
            }
            if (this.m_nativeIconAd == null) {
                this.m_nativeIconAd = this.qg.createNativeAd({
                    posId: nativeAdId
                });
            } else {
                this.m_nativeIconAd.load();
            }
            VivoH5GameAPI.inst.nativeIconAdOnLoad = callback;
            this.m_nativeIconAd.offError(this.onNativeIconAdError);
            this.m_nativeIconAd.offLoad(this.onNativeIconAdLoad);

            this.m_nativeIconAd.onLoad(this.onNativeIconAdLoad);
            this.m_nativeIconAd.onError(this.onNativeIconAdError);

        }
    }
    onNativeIconAdClick(_id: string) {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qg && this.m_nativeIconAd) {
            this.m_nativeIconAd.reportAdClick({
                adId: _id
            });
            GameEngine.inst.debug(`点击上报原生图标id:${JSON.stringify(_id)}`);
        }
    }
    onNativeIconAdClose() { }
    onDestroyNativeIconAd() { }
    //#endregion

    /**存储数据
     * @param _key 索引 string
     * @param _value 值
     */
    saveDataToCache(_key: string, _value: any) {
        if (this.qg) {
            this.qg.setStorageSync({ key: _key, value: JSON.stringify(_value) });
        } else {
            Laya.LocalStorage.setItem(_key, JSON.stringify(_value));
        }

    }
    /**读取数据
     * @param _key 索引 string
     */
    readDataFromCache(_key: string): any {
        if (this.qg) {
            var data = this.qg.getStorageSync({ key: _key });
            if (data) {
                return JSON.parse(data);
            }
            return null;
        } else {
            let data = Laya.LocalStorage.getItem(_key);
            if (data) {
                return JSON.parse(data);
            } else {
                return null;
            }

        }
    }

    getDevicePlatform(): string {
        return "";
    }


    getPlatform(): string {
        return "";
    }

    /**
     * 获取屏幕宽高
     */
    getScreenSize(): Laya.Size {
        return new Laya.Size(720, 1280);
    }

    /**
     * 获取是否审核
     */
    isVertify(): boolean {
        return true;
    }

    /**
     * 返回banner高度
     */
    bannerHeight(): number {
        return this.m_bannerHeight;
    }

    /**
     * 返回留海高度
     */
    notchHeight(): number {
        if (this.qg) {
            return this.qg.getNotchHeightSync().height;
        }
        return 20;
    }

    /**
     * 正东
     */
    vibrateShort() {
        if (this.qg) {
            this.qg.vibrateShort();
        }
    }

    //#region 该渠道没用到的方法
    showMoreGamesModal() { }
    addColorSign() { }
    reportMonitor(name: string, value: number) { }
    navigateToMiniGame(object: any) { }
    createAppBox() { }
    onShowAppBox() { }
    onHideAppBox() { }
    createMoreGamesButton(inStyle?: { left: number; top: number; width: number; height: number; }) { }
    hideMoreGameButton() { }
    onShareVideo(callback: (success: any) => void) { }
    onStartRecord() { }
    onStopRecord() { }
    sendEvent(obj: any) { }
    onShare() { }
    updateHighScore(_score: number) { }
    //#endregion

}
