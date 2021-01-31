import PlatformsAPI from "../PlatformsAPI";
import PlatformEvents from "../PlatformEvents";
import PlatformConfig from "../PlatformConfig";
import MathHelper from '../../plugins/tools/MathHelper';
import EventManager from '../../managers/eventManager/EventManager';
import DataManager from "../../managers/DataManager";
import { HttpRequestExtension } from "../../plugins/Http/HttpRequestExtension";
import LocalStorageManager from "../../managers/LocalStorageManager";
import PaymentData, { PaymentResutlData } from "../PaymentData";
import GameEngine from "../../managers/GameEngine";
import { AdData } from "../PlatformConfigData";
import DateHelper from "../../plugins/tools/DateHelper";

export default class OPPOH5GameAPI implements PlatformsAPI {
    userDataPath(): string {
        throw new Error("Method not implemented.");
    }
    downloadFile(url: string, callback: (success: boolean, res: any) => void) {
        throw new Error("Method not implemented.");
    }
    unzip(url: string, callback: (success: boolean) => void) {
        throw new Error("Method not implemented.");
    }
    readFile(filePath: string, callback: (success: boolean, data: string) => void) {
        throw new Error("Method not implemented.");
    }
    writeFileSync(filePath: string, data: string) {
        throw new Error("Method not implemented.");
    }


    public static inst: OPPOH5GameAPI;
    private qg: any = window['qg'];
    /**系统信息 */
    private systemInfo: any = null;
    /**平台版本号 */
    private platformVersionCode: number;

    private m_bannerAd: any = null;
    private m_bannerHeight: number = 170;
    private m_isBannerShow: boolean = false;

    private m_videoAd: any = null;
    private m_videoAdIsLoaded: boolean = false;
    /**激励视频成功回调 */
    private onVideoSuccessCallback: Function;
    /**激励视频失败回调 */
    private onVideoFailCallback: (code, msg) => void;
    private m_insertAd: any = null;
    private m_nativeAd: any = null;
    private nativeAdOnLoad: Function;

    /**原生icon广告 */
    private m_nativeIconAd: any = null;
    private nativeIconAdOnLoad: Function;

    /**是否能加载插屏广告 */
    private canLoadInsertAd: boolean = false;
    /**插屏类广告准备时间(小程序启动一定时间内不允许展示插屏广告) */
    private insertAdReadyInterval: number = 10000;
    /**N秒后才能加载插屏类广告 */
    private insertAdShowCD: number = 40000;
    /**是否允许插屏失败显示Banner */
    private canInsertAdErroShowBanner: boolean = false;

    /**本地图标获取信息 */
    private deskTopRecord: any;
    private deskTopRecordKey: string = "";
    /**banner记录 */
    private bannerRecord: any;
    private bannerRecordKey: string = "";

    /**
     * 开始游戏一分钟内不能加载广告
     */
    private adShowTime: number = 1000;
    private canShowAd: boolean = false;

    //#region 桌面图标
    /**是否创建了桌面图标 */
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

    /**安装桌面图标 */
    installShortcut(callback: (success: boolean) => void) {
        if (this.qg) {
            if (this.deskTopRecord.isGet == true) {
                GameEngine.inst.debug("今日已经领取了ICON奖励");
                return;
            }
            let self = this;
            this.qg.hasShortcutInstalled({
                success: function (res) {
                    // 判断图标未存在时，创建图标
                    if (res == false) {
                        self.qg.installShortcut({
                            success: function () {
                                GameEngine.inst.debug("OPPOH5GameAPI.installShortcut 安装图标成功");
                            },
                            fail: function (err) {
                                GameEngine.inst.debug(`OPPOH5GameAPI.installShortcut 安装图标失败 ${JSON.stringify(err)}`);
                            },
                            complete: function () { }
                        });
                        //延时判断是否安装了桌面图标
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
                    } else {
                        GameEngine.inst.debug(`OPPOH5GameAPI.hasShortcutInstalled 已安装图标`);
                        callback(false);
                    }
                },
                fail: function (err) {
                    GameEngine.inst.debug(`OPPOH5GameAPI.hasShortcutInstalled 安装桌面图标出错 ${JSON.stringify(err)}`);
                    callback(false);
                },
                complete: function () { }
            });
        } else {
            this.deskTopRecord.isGet = true;
            this.deskTopRecord.date = DateHelper.getTime();
            this.saveDataToCache(this.deskTopRecordKey, this.deskTopRecord);
            callback(true);
            GameEngine.inst.debug("OPPOH5GameAPI.installShortcut 安装图标成功");
        }
        GameEngine.inst.debug("OPPOH5GameAPI.installShortcut 安装图标");
    }

    /**获取桌面图标本地记录 */
    private checkDesktop() {
        //获取桌面图标本地记录
        this.deskTopRecordKey = LocalStorageManager.inst.shortcutKey;
        this.deskTopRecord = this.readDataFromCache(this.deskTopRecordKey);
        if (this.deskTopRecord == null || this.deskTopRecord == undefined) {
            this.deskTopRecord = {
                isGet: false, date: ""
            }
            this.saveDataToCache(this.deskTopRecordKey, this.deskTopRecord);
        } else {
            //判断是否超过一日
            let day = MathHelper.countDay(DateHelper.getTime(), this.deskTopRecord.date);
            if (day >= 1) {
                this.saveDataToCache(this.deskTopRecordKey, this.deskTopRecord);
            }
        }
        console.log("桌面图标本地记录信息:", this.deskTopRecord);
    }
    //#endregion

    //#region 设置游戏加载进度页面
    setLoadingProgress(progress: number) {
        if (this.qg) {
            this.qg.setLoadingProgress({
                progress: progress
            });
        }
    }

    loadingComplete() {
        if (this.qg) {
            this.qg.loadingComplete({});
            GameEngine.inst.debug("OPPOH5GameAPI.loadingComplete");
        }
    }
    //#endregion

    /**对比最小平台号 */
    private versionCompareUsage(version: number): boolean {
        if (this.platformVersionCode >= version) {
            return true;
        }
        return false;
    }

    /**初始化 */
    onInit(_callback: Function) {
        this.checkDesktop();
        this.checkBanner();
        //广告准备时间
        this.canShowAd = false;
        Laya.timer.once(this.adShowTime, this, () => {
            this.canShowAd = true;
            GameEngine.inst.debug("倒计结束,广告可以显示了");
        });
        if (this.qg) {
            OPPOH5GameAPI.inst = this;
            this.systemInfo = this.qg.getSystemInfoSync();
            GameEngine.inst.debug(`OPPO系统信息:${JSON.stringify(this.systemInfo)}`);
            this.platformVersionCode = this.systemInfo.platformVersionCode;
            //this.insertAdReadyInterval = PlatformConfig.inst.currentPlatform.insertAdReadyInterval;
            //this.insertAdShowCD = PlatformConfig.inst.currentPlatform.insertAdShowCD;

            this.qg.setEnableDebug({
                enableDebug: false, // true 为打开，false 为关闭
                success: function () {
                    // 以下语句将会在 vConsole 面板输出 
                    console.log("test consol log");
                    console.info("test console info");
                    console.warn("test consol warn");
                    console.debug("test consol debug");
                    console.error("test consol error");
                },
                complete: function () {
                },
                fail: function () {
                }
            });
            this.qg.onShow((res) => {
                Laya.timer.scale = 1;
            });
            this.qg.onHide(() => {
                Laya.timer.scale = 0;
            });
            this.reportMonitor("game_scene", 0);
        } else {
            this.qg = null;
        }
        _callback && _callback();
        GameEngine.inst.debug("OPPOH5GameAPI.onInit");
    }

    /**初始化Ad (部分渠道需要先初始化广告 如oppo)*/
    onInitAdService(callback: () => void) {
        if (this.qg) {
            // this.createBannerAd();
            // this.createRewardedVideoAd();
            // this.createInsertAd();
            // this.createNativeAd();
            // this.createNativeIconAd();
        }
        callback && callback()
        GameEngine.inst.debug('OPPOH5GameAPI onInitAdService');
    }

    /**
     * 数据上报
     * 游戏运行中上报数据，主要监控游戏崩溃等异常, 目前只支持进入到游戏主界面时上报数据
     * 注意：数据上报接口为平台必须接入的能力。接入后测试环境会默认弹出 "reportMonitor: 0"，正式环境下不会；
     * 并且需要在游戏加载的生命周期调用，只能调一次。
     * @param name 
     * @param value 
     */
    reportMonitor(name: string, value: number) {
        if (this.qg) {
            if (this.versionCompareUsage(1060) == false) {
                GameEngine.inst.debug("数据上报需要最小平台号1060");
                return;
            }
            this.qg.reportMonitor(name, value);
            GameEngine.inst.debug("OPPOH5GameAPI reportMonitor");
        }
    }

    /**登录 */
    onLogin(callback: (success) => void) {
        if (this.qg) {
            this.qg.login({
                success: function (res) {
                    var data = JSON.stringify(res.data)
                    GameEngine.inst.debug(`OPPOH5GameAPI.onLogin 成功:${JSON.stringify(data)}`);
                    DataManager.inst.user.userInfo.token = res.data.token;
                    DataManager.inst.save();
                    callback && callback(true);
                },
                fail: function (res) {
                    // errCode、errMsg
                    GameEngine.inst.debug(`OPPOH5GameAPI.onLogin 失败:${JSON.stringify(res)}`);
                    callback && callback(false);
                }
            });
        } else {
            callback && callback(true);
        }
    }

    /**原生音效 */
    createInnerAudioContext(): any {
        if (this.qg) {
            return this.qg.createInnerAudioContext();
        }
        return null;
    }

    /**
     * 支付
     * @param paymentData 
     * @param callback 
     */
    pay(paymentData: PaymentData, callback: (success: boolean, msg: string) => void) {
        if (this.qg) {
            paymentData.openId = DataManager.inst.user.userInfo.token;
            paymentData.engineVersion = this.platformVersionCode.toString();
            paymentData.appVersion = "1.0.0";
            //测试用=============================
            //paymentData.price = 1;
            //记得删
            let self = this;
            var xhp: HttpRequestExtension = new HttpRequestExtension();
            GameEngine.inst.debug(`发起支付:${JSON.stringify(paymentData)}`);
            xhp.Post("https://payment.coschat.com/api/Oppo/PreOrder", paymentData, this, function (res: PaymentResutlData) {
                GameEngine.inst.debug(`服务器验证返回${JSON.stringify(res)}`);
                this.saveDataToCache(LocalStorageManager.inst.payTempRecordKey, { orderNo: res.orderNo, token: paymentData.openId, point: paymentData.point });
                if (res.code == "200") {
                    GameEngine.inst.debug(`服务器验证成功`);
                    this.qg.pay(
                        {
                            appId: parseInt(PlatformConfig.inst.currentPlatform.appId),
                            // 登录接口返回的token
                            token: paymentData.openId,
                            // 时间戳
                            timestamp: res.timestamp,
                            paySign: res.paySign,
                            // 订单号
                            orderNo: res.orderNo,
                            // 成功回调函数，结果以 OPPO 小游戏平台通知CP的回调地址为准
                            success: function (payres) {
                                self.saveDataToCache(LocalStorageManager.inst.payTempRecordKey, null);
                                GameEngine.inst.debug(`支付成功:${JSON.stringify(payres.data)}`);
                                callback(true, "支付成功");
                            },
                            fail: function (payres) {
                                // errCode、errMsg
                                GameEngine.inst.debug(`支付失败:${JSON.stringify(payres)}`);
                                callback(false, payres.data);
                            }
                        }
                    )
                } else {
                    GameEngine.inst.debug(`服务器验证支付失败${JSON.stringify(res)}`);
                    callback(false, res.msg);
                }
            });
        } else {
            this.saveDataToCache(LocalStorageManager.inst.payTempRecordKey, null);
            callback && callback(true, "支付成功");
        }
    }

    //#region Banner广告
    /**检查每日Banner */
    private checkBanner() {
        this.bannerRecord = this.readDataFromCache(this.bannerRecordKey);
        if (this.bannerRecord == null || this.bannerRecord == undefined) {
            this.bannerRecord = { hideCount: 5, date: "" };
            this.saveDataToCache(this.bannerRecordKey, this.bannerRecord)
        } else {
            //判断是否超过一日
            let day = MathHelper.countDay(DateHelper.getTime(), this.bannerRecord.date);
            if (day >= 1) {
                this.bannerRecord = { hideCount: 5, date: "" };
                this.saveDataToCache(this.bannerRecordKey, this.bannerRecord)
            }
        }
        console.log("Banner本地记录:", this.bannerRecord);
    }

    /**创建广告 BannerAd */
    createBannerAd() { }

    /**展示Banner广告 */
    onShowBanner(key?: string) {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {GameEngine.inst.debug("没广告版本");return;}
        if (this.bannerRecord.hideCount <= 0) {GameEngine.inst.debug("今天已经关闭了Banner5次，不再显示Banner");return;}
        if (this.canShowAd == false) {GameEngine.inst.debug("开始游戏1分钟内不展示Banner广告");return;}
        let adData = PlatformConfig.inst.getBannerAdData(key);
        if (adData == null) {GameEngine.inst.debug("没有Banner广告数据");return;}
        console.log("Banner广告数据:", adData.key, adData.adId);
        if (this.qg) {
            this.onDestoryBanner(); //每次show的时候，销毁
            this.m_bannerAd = this.qg.createBannerAd({adUnitId: adData.adId});
            this.m_bannerAd.onShow(this.onBannerAdShow);
            this.m_bannerAd.onError(this.onBannerAdError);
            this.m_bannerAd.onHide(this.onBannerHide);
            this.m_bannerAd.show();
            GameEngine.inst.debug('OPPOH5GameAPI.onShowBanner');
        }
    }

    private onBannerAdShow() {
        OPPOH5GameAPI.inst.m_isBannerShow = true;
        OPPOH5GameAPI.inst.m_bannerHeight = 170;
        EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_SUCCESS_EVENT);
        GameEngine.inst.debug('OPPOH5GameAPI.onBannerAdShow 显示Banner广告成功');
    }

    private onBannerAdError(err) {
        OPPOH5GameAPI.inst.m_isBannerShow = false;
        OPPOH5GameAPI.inst.m_bannerHeight = 170;
        EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
        GameEngine.inst.debug(`OPPOH5GameAPI.onBannerAdError Banner广告错误 ${JSON.stringify(err)}`);
    }

    private onBannerHide() {
        if (OPPOH5GameAPI.inst.bannerRecord.hideCount > 0) {
            OPPOH5GameAPI.inst.bannerRecord.hideCount--;
            if (OPPOH5GameAPI.inst.bannerRecord.hideCount == 0) {
                OPPOH5GameAPI.inst.bannerRecord.date = DateHelper.getTime();
            }
            OPPOH5GameAPI.inst.saveDataToCache(OPPOH5GameAPI.inst.bannerRecordKey, OPPOH5GameAPI.inst.bannerRecord)
        }
        OPPOH5GameAPI.inst.m_isBannerShow = false;
        OPPOH5GameAPI.inst.m_bannerHeight = 170;
        EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
        console.log('BannerAd onHide,剩余隐藏次数:', OPPOH5GameAPI.inst.bannerRecord.hideCount);
    }

    /**隐藏Banner广告 */
    onHideBanner() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qg) {
            if (this.m_bannerAd) {
                this.m_bannerAd.hide();
                this.m_bannerHeight = 170;
                this.m_isBannerShow = false;
                EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
            }
            GameEngine.inst.debug('OPPOH5GameAPI.onHideBanner 隐藏Banner广告');
        }
    }

    /**销毁banner */
    onDestoryBanner() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qg) {
            if (this.m_bannerAd) {
                this.m_bannerHeight = 170;
                this.m_isBannerShow = false;
                this.m_bannerAd.offShow(this.onBannerAdShow);
                this.m_bannerAd.offError(this.onBannerAdError);
                this.m_bannerAd.offHide(this.onBannerHide);
                this.m_bannerAd.destroy();
                this.m_bannerAd = null;
                EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
                GameEngine.inst.debug('OPPOH5GameAPI.onDestoryBanner 销毁Banner广告');
            }
        }

    }
    //#endregion

    //#region 激励视频
    /**创建激励视频广告 RewardedVideoAd */
    createRewardedVideoAd() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
    }

    private clearVideoCallbacks() {
        this.onVideoSuccessCallback = null;
        this.onVideoFailCallback = null;
    }

    /**展示RewardedVideo激励视频广告 */
    onShowRewardedVideo(_successCallback: Function, _failCallback: (code, msg) => void, key?: string) {
        if (PlatformConfig.inst.currentPlatform.canAd == false){return;}
        if (this.qg == null || this.qg == undefined) {_successCallback && _successCallback();return;}
        let adData: AdData = null;
        if (key && key.length > 0) {adData = PlatformConfig.inst.getVideoAdData(key);}
        if (adData == null) {_failCallback && _failCallback(1, "");return;}
        if (this.m_videoAd) {
            this.clearVideoCallbacks();
            this.m_videoAd.offLoad(this.rewardVideoOnLoad);
            this.m_videoAd.offError(this.rewardVideoOnError);
            this.m_videoAd.offClose(this.rewardVideoOnClose);
            this.m_videoAd.destroy();
        }
        this.onVideoSuccessCallback = _successCallback;
        this.onVideoFailCallback = _failCallback;
        this.m_videoAd = this.qg.createRewardedVideoAd({
            adUnitId: adData.adId
        });

        this.m_videoAd.load();
        this.m_videoAd.onLoad(this.rewardVideoOnLoad);
        this.m_videoAd.onError(this.rewardVideoOnError);
        this.m_videoAd.onClose(this.rewardVideoOnClose);
        GameEngine.inst.debug("OPPOH5GameAPI.onShowRewardedVideo");
    }

    private rewardVideoOnLoad() {
        GameEngine.inst.debug("OPPOH5GameAPI.RewardedVideo.onLoad 激励视频加载成功");
        OPPOH5GameAPI.inst.m_videoAdIsLoaded = true;
        OPPOH5GameAPI.inst.m_videoAd.show();
    }

    private rewardVideoOnError(err) {
        GameEngine.inst.debug(`OPPOH5GameAPI.RewardedVideo.onError 激励视频加载错误 ${JSON.stringify(err)}`);
        OPPOH5GameAPI.inst.m_videoAdIsLoaded = false;
        OPPOH5GameAPI.inst.onVideoFailCallback && OPPOH5GameAPI.inst.onVideoFailCallback(1, "");
        OPPOH5GameAPI.inst.clearVideoCallbacks();
    }

    private rewardVideoOnClose(res) {
        if (res.isEnded) {
            GameEngine.inst.debug("OPPOH5GameAPI.RewardedVideo.onClose 激励视频广告完成，发放奖励");
            OPPOH5GameAPI.inst.onVideoSuccessCallback && OPPOH5GameAPI.inst.onVideoSuccessCallback();
            OPPOH5GameAPI.inst.m_videoAdIsLoaded = false;
            OPPOH5GameAPI.inst.clearVideoCallbacks();
        } else {
            GameEngine.inst.debug("OPPOH5GameAPI.RewardedVideo.onClose 激励视频广告取消关闭，不发放奖励");
            OPPOH5GameAPI.inst.onVideoFailCallback && OPPOH5GameAPI.inst.onVideoFailCallback(4, "激励视频广告取消关闭，不发放奖励");
            OPPOH5GameAPI.inst.clearVideoCallbacks();
        }
    }
    //#endregion

    //#region 插屏广告（废弃）
    /**创建插屏广告 createInsertAd */
    createInsertAd() {
        // if (PlatformConfig.inst.currentPlatform.canAd == false) {
        //     GameEngine.inst.debug("没广告版本");
        //     return;
        // }
        //this._createInsertAd();
    }
    private _createInsertAd() {
        // if (this.qg) {
        //     if (this.m_insertAd == null) {
        //         this.m_insertAd = this.qg.createInsertAd({
        //             adUnitId: PlatformConfig.inst.currentPlatform.insertAdId
        //         });
        //         this.m_insertAd.onLoad(this.onInsertAdLoaded);
        //         this.m_insertAd.onClose(this.onInsertAdClose);
        //         this.m_insertAd.onError(this.onInsertAdError);
        //         GameEngine.inst.debug('OPPOH5GameAPI createInsertAd');
        //     }
        // }
    }
    /**展示插屏广告 */
    onShowInsertAd() {
        // if (PlatformConfig.inst.currentPlatform.canAd == false) {
        //     GameEngine.inst.debug("没广告版本");
        //     return;
        // }
        // if (this.qg) {
        //     GameEngine.inst.debug(`检查是否可以显示插屏广告:${this.canLoadInsertAd}`);
        //     if (this.canLoadInsertAd == false) {
        //         GameEngine.inst.debug("OPPOH5GameAPI.onShowInsertAd 没到指定时间不能显示插屏广告");
        //         if (this.m_isBannerShow == false && this.canInsertAdErroShowBanner) {
        //             this.onShowBanner();
        //         }
        //         EventManager.inst.SendEvent(PlatformEvents.ON_INSERT_AD_ERROR_EVENT);
        //         return;
        //     }
        //     this.onDestoryInsertAd();
        //     this._createInsertAd();
        //     if (this.m_insertAd) {
        //         this.m_insertAd.load();
        //     }
        //     GameEngine.inst.debug("OPPOH5GameAPI.onShowInsertAd");
        // }
    }
    /**销毁插屏广告 */
    onDestoryInsertAd() {
        // if (PlatformConfig.inst.currentPlatform.canAd == false) {
        //     GameEngine.inst.debug("没广告版本");
        //     return;
        // }
        // if (this.qg) {
        //     if (this.m_insertAd) {
        //         this.m_insertAd.offLoad(this.onInsertAdLoaded);
        //         this.m_insertAd.offError(this.onInsertAdError);
        //         this.m_insertAd.offClose(this.onInsertAdClose);
        //         this.m_insertAd.destroy();
        //         this.m_insertAd = null;
        //         GameEngine.inst.debug("OPPOH5GameAPI.onDestoryInsertAd 销毁插屏广告");
        //     }
        // }
    }

    private onInsertAdLoaded() {
        // OPPOH5GameAPI.inst.onDestoryBanner();
        // OPPOH5GameAPI.inst.m_insertAd.show();
        // GameEngine.inst.debug('OPPOH5GameAPI 插屏广告加载成功');
    }

    private countDowwInsertTime() {
        // this.canLoadInsertAd = false;
        // Laya.timer.clear(this, this._countDownInsertTime);
        // Laya.timer.once(this.insertAdShowCD, this, this._countDownInsertTime);
        // GameEngine.inst.debug(`OPPOH5GameAPI 插屏需要倒计:${this.insertAdShowCD}秒`);
    }

    private _countDownInsertTime() {
        // this.canLoadInsertAd = true;
        // GameEngine.inst.debug(`OPPOH5GameAPI 插屏倒计完成 ${this.canLoadInsertAd}`);
    }

    private onInsertAdClose() {
        //关闭的时候倒计时开始
        // OPPOH5GameAPI.inst.countDowwInsertTime();
        // EventManager.inst.SendEvent(PlatformEvents.ON_INSERT_AD_CLOSE_EVENT);
        // GameEngine.inst.debug('OPPOH5GameAPI 插屏广告关闭');
    }

    private onInsertAdError(err) {
        // OPPOH5GameAPI.inst.canLoadInsertAd = true;
        // //显示banner
        // if (OPPOH5GameAPI.inst.m_isBannerShow == false && this.canInsertAdErroShowBanner) {
        //     OPPOH5GameAPI.inst.onShowBanner();
        // }
        // EventManager.inst.SendEvent(PlatformEvents.ON_INSERT_AD_ERROR_EVENT);
        // GameEngine.inst.debug(`OPPOH5GameAPI InsertAd load Error ${JSON.stringify(err)}`);
    }
    //#endregion

    //#region 原生广告
    /**创建原生广告 createNativeAd */
    createNativeAd() { }
    /**展示原生插屏广告 */
    onShowNativeAd(callback: (ad) => void, key?: string) {
        if (PlatformConfig.inst.currentPlatform.canAd == false) { GameEngine.inst.debug("没广告版本"); return; }
        if (this.canShowAd == false) { GameEngine.inst.debug("开始游戏1分钟内不展示原生广告"); return; }
        let adData: AdData = null;
        if (key && key.length > 0) { adData = PlatformConfig.inst.getNativeAdData(key); }
        if (adData == null) { GameEngine.inst.debug("原生AdData数据空"); return; }
        console.log("原生AdData数据:", adData.key, adData.adId);
        if (this.qg) {
            this.onDestroyNativeAd();
            this.m_nativeAd = this.qg.createNativeAd({
                adUnitId: adData.adId
            });
            this.m_nativeAd.onError(this.onNativeAdError);
            this.m_nativeAd.onLoad(this.onNativeAdLoad);
            if (this.m_nativeAd) {
                this.nativeAdOnLoad = callback;
                this.m_nativeAd.load();
            }
            GameEngine.inst.debug("OPPOH5GameAPI.onShowNativeAd");
        } else {
            callback && callback(null);
        }
    }
    /**销毁原生插屏广告 */
    onDestroyNativeAd() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qg) {
            if (this.m_nativeAd) {
                this.nativeAdOnLoad = null;
                this.m_nativeAd.offError(this.onNativeAdError);
                this.m_nativeAd.offLoad(this.onNativeAdLoad);
                this.m_nativeAd.destroy();
                this.m_nativeAd = null;
            }
            GameEngine.inst.debug("OPPOH5GameAPI.onDestroyNativeAd");
        }
    }

    /**原生广告点击 */
    onNativeAdClick(_id: string) {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qg) {
            if (this.m_nativeAd) {
                GameEngine.inst.debug(`OPPOH5GameAPI.reportAdClick 原生广告上报点击${_id}`);
                this.m_nativeAd.reportAdClick({
                    adId: _id
                });
                this.onNativeAdClose();
            }
            GameEngine.inst.debug(`OPPOH5GameAPI.onNativeAdClick ${_id}`);
        }
    }
    onNativeAdClose() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        this.onDestroyNativeAd();
        GameEngine.inst.debug(`OPPOH5GameAPI.onNativeAdClose 关闭原生广告`);
    }

    private countDownNativeAdTime() {
        this.canLoadInsertAd = false;
        Laya.timer.clear(this, this._countDownNativeAdTime);
        Laya.timer.once(this.insertAdShowCD, this, this._countDownNativeAdTime);
        GameEngine.inst.debug(`OPPOH5GameAPI 原生插屏需要倒计:${this.insertAdShowCD}秒`);
    }

    private _countDownNativeAdTime() {
        this.canLoadInsertAd = true;
        GameEngine.inst.debug(`OPPOH5GameAPI 原生插屏倒计完成 ${this.canLoadInsertAd}`);
    }

    /**原生广告加载事件 */
    private onNativeAdLoad(res) {
        if (res !== null && res !== undefined) {
            GameEngine.inst.debug(`OPPOH5GameAPI.onNativeAdLoad 原生广告加载成功 ${JSON.stringify(res.adList)}`);
            OPPOH5GameAPI.inst.onDestoryBanner();
            //上报显示
            let data = res.adList.pop();
            OPPOH5GameAPI.inst.m_nativeAd.reportAdShow({
                adId: data.adId
            });
            if (OPPOH5GameAPI.inst.nativeAdOnLoad) {
                OPPOH5GameAPI.inst.nativeAdOnLoad(data);
            }
        }
    }
    /**原生广告失败事件 */
    private onNativeAdError(err) {
        OPPOH5GameAPI.inst.canLoadInsertAd = true;
        //错误加载显示插屏
        //OPPOH5GameAPI.inst.onShowInsertAd();
        if (OPPOH5GameAPI.inst.nativeAdOnLoad) {
            OPPOH5GameAPI.inst.nativeAdOnLoad(null);
        }
        GameEngine.inst.debug(`OPPOH5GameAPI.onNativeAdError ${JSON.stringify(err)}`);
    }

    //#endregion

    //#region 原生icon
    createNativeIconAd() { }
    /**显示原生icon广告 */
    onShowNativeIconAd(callback: (ad: any) => void, key?: string) {
        if (PlatformConfig.inst.currentPlatform.canAd == false) { GameEngine.inst.debug("没广告版本"); return; }
        if (this.canShowAd == false) { GameEngine.inst.debug("开始游戏1分钟内不展示原生Icon广告"); return; }
        let adData: AdData = null;
        if (key && key.length > 0) { adData = PlatformConfig.inst.getNativeIconAdData(key); }
        if (adData == null) { GameEngine.inst.debug("原生图标AdData数据空"); return; }
        console.log("原生图标AdData:", adData.key, adData.adId);
        if (this.qg) {
            this.onDestroyNativeIconAd();
            this.m_nativeIconAd = this.qg.createNativeAd({
                adUnitId: adData.adId
            });
            this.m_nativeIconAd.onError(this.onNativeIconAdError);
            this.m_nativeIconAd.onLoad(this.onNativeIconAdLoad);
            if (this.m_nativeIconAd) {
                OPPOH5GameAPI.inst.nativeIconAdOnLoad = callback;
                this.m_nativeIconAd.load();
            }
            GameEngine.inst.debug('OPPOH5GameAPI.onShowNativeIconAd');
        } else {
            callback && callback(null);
        }

    }
    /**销毁原生icon广告 */
    onDestroyNativeIconAd() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qg) {
            if (this.m_nativeIconAd) {
                this.nativeIconAdOnLoad = null;
                this.m_nativeIconAd.offError(this.onNativeIconAdError);
                this.m_nativeIconAd.offLoad(this.onNativeIconAdLoad);
                this.m_nativeIconAd.destroy();
                this.m_nativeIconAd = null;
            }
            GameEngine.inst.debug('OPPOH5GameAPI.onDestroyNativeIconAd');
        }
    }

    private onNativeIconAdError(err) {
        GameEngine.inst.debug(`OPPOH5GameAPI.onNativeIconAdError ${JSON.stringify(err)}`);
    }

    private onNativeIconAdLoad(res) {
        if (res !== null && res !== undefined) {
            //上报显示
            let data = res.adList.pop();
            OPPOH5GameAPI.inst.m_nativeIconAd.reportAdShow({
                adId: data.adId
            });
            if (OPPOH5GameAPI.inst.nativeIconAdOnLoad) {
                OPPOH5GameAPI.inst.nativeIconAdOnLoad(data);
            }
        }
    }

    onNativeIconAdClick(_id: string) {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qg) {
            if (this.m_nativeIconAd) {
                this.m_nativeIconAd.reportAdClick({
                    adId: _id
                });
                this.onNativeIconAdClose();
            }
            GameEngine.inst.debug(`OPPOH5GameAPI.onNativeAdLoad 原生ICON广告加载成功 ${JSON.stringify(_id)}`);
        }
    }

    onNativeIconAdClose() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.qg) {
            this.onDestroyNativeIconAd();
            GameEngine.inst.debug(`OPPOH5GameAPI.onNativeIconAdClose`);
        }
    }
    //#endregion

    /**跳转小游戏 */
    navigateToMiniGame(object: any) {
        if (this.qg) {
            this.qg.navigateToMiniGame({
                pkgName: object,
                success: function () { },
                fail: function (res) {
                    console.log("跳转失败:", JSON.stringify(res))
                }
            });
        }
        console.log(`OPPOH5GameAPI navigateToMiniGame`, JSON.stringify(object));
    }

    /**震动 */
    vibrateShort() {
        this.qg.vibrateShort({
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { }
        })
    }

    /**存储数据
     * @param _key 索引 string
     * @param _value 值
     */
    saveDataToCache(_key: string, _value: any) {
        Laya.LocalStorage.setItem(_key, JSON.stringify(_value));
        //GameEngine.inst.debug('OPPOH5GameAPI saveDataToCache');
    }

    /**读取数据
     * @param _key 索引 string
     * @param _IsNumber 是否为数值类型
     */
    readDataFromCache(_key: string) {
        //console.log('OPPOH5GameAPI readDataFromCache');
        return JSON.parse(Laya.LocalStorage.getItem(_key));
    }

    bannerHeight(): number {
        return this.m_bannerHeight;
    }

    notchHeight(): number {
        if (this.qg) {
            let scale = Laya.Browser.height / this.systemInfo.screenHeight;
            return this.systemInfo.statusBarHeight * scale;
        }
        return 20;
    }

    getScreenSize(): Laya.Size {
        return new Laya.Size(750, 1334);
    }

    getPlatform(): string {
        return ""
    }

    getDevicePlatform(): string {
        return "";
    }

    isVertify(): boolean {
        return false;
    }

    //#region OPPO不需要的方法
    sendEvent(obj: any) { }
    onShare() { }
    updateHighScore(_score: number) { }
    createAppBox() { }
    onShowAppBox() { }
    onHideAppBox() { }
    createMoreGamesButton(inStyle?: { left: number; top: number; width: number; height: number; }) { }
    hideMoreGameButton() { }
    onShareVideo(callback: (success: any) => void) { }
    onStartRecord() { }
    onStopRecord() { }
    showMoreGamesModal() { }
    addColorSign() { }
    onHideInsertAd() { }
    vibrateLong() {
        this.qg && this.qg.vibrateLong();
    }
    //#endregion
}
