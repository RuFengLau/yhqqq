import PlatformsAPI from "../PlatformsAPI";
import PlatformConfig from "../PlatformConfig";
import PlatformEvents from "../PlatformEvents";
import EventManager from '../../managers/eventManager/EventManager';
import PaymentData from "../PaymentData";
import GameEngine from "../../managers/GameEngine";
import MathHelper from "../../plugins/tools/MathHelper";
/**
 * 插屏广告注意
 * 1 小程序启动一定时间内不允许展示插屏广告
 * 2 时间间隔不足，不允许展示插屏广告
 * 3 插屏广告仅今日头条安卓客户端支持
 */
export default class TouTiaoH5GameAPI implements PlatformsAPI {

    public static inst: TouTiaoH5GameAPI;
    private tt = window['tt'];
    /**系统信息 */
    private systemInfo: any;
    /**平台 */
    private platform: string = "";
    /**插屏广告仅今日头条安卓客户端支持 */
    private isToutiaio: boolean = true;
    /**屏幕宽 */
    private screenWidth: number;
    /**屏幕高 */
    private screenHeight: number;

    /**banner广告 */
    private m_bannerAd: any = null;
    /**Banner高度 */
    private m_bannerHeight: number = 220;

    //#region 激励视频广告相关
    /**激励视频广告 */
    private m_videoAd: any = null;
    /**激励视频是否加载完成 */
    private m_videoAdIsLoaded: boolean = false;
    /**激励视频成功回调 */
    private onVideoSuccessCallback: Function;
    /**激励视频失败回调 */
    private onVideoFailCallback: (code, msg) => void;
    //#endregion

    //#region 插屏相关
    /**插屏广告 */
    private m_insertAd: any = null;
    /**插屏类广告准备时间(小程序启动一定时间内不允许展示插屏广告) */
    private insertAdReadyInterval: number = 10000;
    /**是否能加载插屏广告 */
    private canLoadInsertAd: boolean = false;
    /**每隔10秒后才能加载插屏广告 */
    private insertAdShowCD: number = 10000;
    //#endregion

    //#region 录屏相关
    /**录屏组件 */
    private m_recorder: any;
    /**录屏地址 */
    public m_recordVideoPath: string;
    //#endregion

    private m_moreButton: any = null;
    private sdkVersion: string = "";

    private downloadTask: any
    downloadFile(url: string, callback: (success: boolean, res: any) => void) {
        if (this.tt) {
            if (this.downloadTask != null) {
                this.downloadTask.abort();
            }
            console.log("下载文件到本地:", url);
            this.downloadTask = this.tt.downloadFile({
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
    unzip(url: string, callback: (success: boolean) => void) {
        if (this.tt) {
            let targetP = this.tt.env.USER_DATA_PATH + "/";
            this.tt.getFileSystemManager().unzip({
                zipFilePath: url,
                targetPath: targetP,
                success(res) {
                    console.log(res);
                    callback && callback(true);
                }
            });
        } else {
            callback && callback(false);
        }
    }
    readFile(filePath: string, callback: (success: boolean, data: string) => void) {
        if (this.tt) {
            let url = this.userDataPath() + filePath;
            console.log("readFileSync:", url);
            this.tt.getFileSystemManager().readFile({
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
            return "";
        }
    }
    writeFileSync(filePath: string, data: string) {
        if (this.tt) {
            let url = this.userDataPath() + filePath;
            console.log("writeFileSync:", url, data);
            this.tt.getFileSystemManager().writeFileSync(url, data, "utf-8");
        }
    }
    userDataPath(): string {
        if (this.tt) {
            return this.tt.env.USER_DATA_PATH + "/";
        }
        return "";
    }

    /**检查是否可以使用功能 */
    private versionCompareUsage(useVersion: string): boolean {
        let versionFlag = MathHelper.CompareVersion(this.sdkVersion, useVersion);
        if (versionFlag != 1) {
            GameEngine.inst.debug(`SDK版本过低！你的版本为：${this.sdkVersion}`);
            return false;
        }
        return true;
    }

    /**初始化 */
    onInit(_callback: Function) {
        if (this.tt) {
            TouTiaoH5GameAPI.inst = this;
            this.systemInfo = this.tt.getSystemInfoSync();
            console.log("头条系统信息:", JSON.stringify(this.systemInfo));
            this.isToutiaio = this.systemInfo.appName === "Toutiao";
            this.platform = this.systemInfo.platform;
            this.sdkVersion = this.systemInfo.SDKVersion;
            this.onCheckForUpdate();
            this.onInitRecorder();
            this.tt.onShareAppMessage(function (res) {
                // do something
                return {
                    templateId: PlatformConfig.inst.currentPlatform.shareTemplateId,
                    title: '英雄冲突',
                    desc: '',
                    imageUrl: '',
                    query: '',
                    success() {
                        //callback(true);
                    },
                    fail(e) {
                        //callback(false);
                    }

                }
            });
            this.tt.onShow(function (res) {
                console.log('TouTiaoH5GameAPI onShow');
                EventManager.inst.SendEvent(PlatformEvents.ON_SHOW);
            });
            this.tt.onHide(function () {
                console.log('TouTiaoH5GameAPI onHide');
                EventManager.inst.SendEvent(PlatformEvents.ON_HIDE);
            });
            this.insertAdReadyInterval = PlatformConfig.inst.currentPlatform.insertAdReadyInterval;
            this.insertAdShowCD = PlatformConfig.inst.currentPlatform.insertAdShowCD;
            Laya.timer.once(this.insertAdReadyInterval, this, () => {
                this.canLoadInsertAd = true;
            });
        }
        console.log('TouTiaoH5GameAPI onInit');
    }

    private onCheckForUpdate() {
        const updateManager = this.tt.getUpdateManager();
        updateManager.onCheckForUpdate(function (res) {
            // 请求完新版本信息的回调
            console.log('onCheckForUpdate', res.hasUpdate);
            if (res.hasUpdate) {
                this.tt.showToast({
                    title: '即将有更新请留意'
                });
            }
        });
        updateManager.onUpdateReady(() => {
            this.tt.showModal({
                title: '更新提示',
                content: '新版本已经准备好，是否立即使用？',
                success: function (res) {
                    if (res.confirm) {
                        // 调用 applyUpdate 应用新版本并重启
                        updateManager.applyUpdate();
                    } else {
                        this.tt.showToast({
                            icon: 'none',
                            title: '小程序下一次「冷启动」时会使用新版本',
                        });
                    }
                }
            });
        });
        updateManager.onUpdateFailed(() => {
            this.tt.showToast({
                title: '更新失败，下次启动继续...'
            });
        });
    }

    /**初始化录屏组件 */
    private onInitRecorder() {
        if (this.tt) {
            if (this.versionCompareUsage("1.4.1") == false) {
                GameEngine.inst.debug("录屏需要1.4.1以上");
                return;
            }
            this.m_recorder = this.tt.getGameRecorderManager();
            this.m_recorder.onStart(res => {
                GameEngine.inst.debug(`开始录屏${JSON.stringify(res)}`);
            });
            this.m_recorder.onStop(res => {
                this.m_recordVideoPath = res.videoPath;
                GameEngine.inst.debug(`录屏结束,视频地址：${this.m_recordVideoPath}`);
            });
            this.m_recorder.onError(err => {
                GameEngine.inst.debug(`录屏错误${JSON.stringify(err)}`);
            });
        }
        console.log('TouTiaoH5GameAPI onInitRecorder');
    }

    /**初始化广告组件 (部分渠道需要先初始化广告 如oppo)*/
    onInitAdService(callback: () => void) {
        this.createBannerAd();
        if (this.platform != "devtools") {
            this.createRewardedVideoAd();
        }
        this.createInsertAd();
        callback && callback();
        console.log('TouTiaoH5GameAPI onInitAdService');
    }

    /**分享 */
    onShare(callback: (success) => void) {
        if (this.tt) {
            this.tt.shareAppMessage({
                templateId: PlatformConfig.inst.currentPlatform.shareTemplateId,
                title: '',
                desc: '',
                imageUrl: '',
                query: '',
                success() {
                    callback(true);
                },
                fail(e) {
                    callback(false);
                }
            })
        }
        console.log('TouTiaoH5GameAPI onShare');
    }

    /**banner高度 */
    bannerHeight(): number {
        return this.m_bannerHeight;
    }

    /**留海高度 */
    notchHeight(): number {
        if (this.tt) {
            let layout = this.tt.getMenuButtonLayout();
            return layout.bottom + 40;
        }
        return 40;
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
    onLogin(callback: (success: boolean) => void) {
        callback && callback(true);
        console.log('TouTiaoH5GameAPI onLogin:');
    }

    onShareVideo(callback: (success) => void) {
        if (this.tt && this.platform != "devtools") {
            console.log("录屏视频路径：", this.m_recordVideoPath);
            let self = this;
            this.tt.shareAppMessage({
                templateId: PlatformConfig.inst.currentPlatform.shareTemplateId,
                channel: 'video',
                title: '英雄冲突',
                desc: "加入英雄冲突，拯救这个世界！",
                imageUrl: '',
                query: '',
                extra: {
                    videoPath: self.m_recordVideoPath, // 可替换成录屏得到的视频地址
                    videoTopics: ['对面太强了，老铁快来帮忙啊！']
                },
                success() {
                    console.log('分享视频成功');
                    callback(true);
                },
                fail(e) {
                    console.log('分享视频失败', JSON.stringify(e));
                    callback(false);
                }
            })
        } else {
            callback(true);
        }

        console.log('TouTiaoH5GameAPI onShareVideo');
    }

    /**
     * 显示更多游戏
     * 1.33.0
     */
    showMoreGamesModal() {
        if (this.tt && this.platform != "ios") {
            if (this.versionCompareUsage("1.33.0") == false) {
                GameEngine.inst.debug("更多游戏需要1.33.0以上");
                return;
            }
            let list = [];
            for (let index = 0; index < PlatformConfig.inst.currentPlatform.moreGameList.length; index++) {
                const app = PlatformConfig.inst.currentPlatform.moreGameList[index];
                list.push({
                    appId: app.appId,
                    query: "foo=bar&baz=qux",
                    extraData: {}
                })
            }
            this.tt.showMoreGamesModal({
                appLaunchOptions: list,
                success(res) {
                    console.log("success", res.errMsg);
                },
                fail(res) {
                    console.log("fail", res.errMsg);
                }
            });

            this.tt.onNavigateToMiniProgram(function (res) {
                console.log("open other games", res);
            });
        } else {
            GameEngine.inst.debug("头条ios版本不支持更多游戏");
        }
    }

    /**开始录屏
     * 1.4.1
     */
    onStartRecord() {
        if (this.tt && this.platform != "devtools") {
            if (this.versionCompareUsage("1.4.1") == false) {
                GameEngine.inst.debug("录屏需要1.4.1以上");
                return;
            }
            this.m_recorder.start({
                duration: 30,
            });

        }
        GameEngine.inst.debug("TouTiaoH5GameAPI.onStartRecord 开始录屏30秒");
    }

    /**录屏结束 */
    onStopRecord() {
        if (this.tt) {
            if (this.versionCompareUsage("1.4.1") == false) {
                GameEngine.inst.debug("录屏需要1.4.1以上");
                return;
            }
            this.m_recorder.stop();

        }
        GameEngine.inst.debug("TouTiaoH5GameAPI.onStopRecord 停止录屏");
    }

    //#region Banner广告
    /**创建广告 BannerAd */
    createBannerAd() { }
    /**展示Banner广告 */
    onShowBanner(key?: string) {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.tt) {
            if (this.versionCompareUsage("1.3.0") == false) {
                GameEngine.inst.debug("Banner广告需要1.3.0以上");
                return;
            }
            //每次show的时候，销毁
            this.onDestoryBanner();
            let style = { left: 0, top: 0, width: 128, height: 0 };
            this.screenWidth = this.systemInfo.screenWidth / 2;
            this.screenHeight = this.systemInfo.screenHeight;
            style.top = this.screenHeight - (style.width / 1334) * 750;
            this.m_bannerAd = this.tt.createBannerAd({
                adUnitId: PlatformConfig.inst.currentPlatform.bannerAdId,
                style: style
            });

            this.m_bannerAd.onResize(this.onBannerResize);
            this.m_bannerAd.onLoad(this.onBannerLoaded);
            this.m_bannerAd.onError(this.onBannerError);
        }
        console.log('TouTiaoH5GameAPI onShowBanner');
    }

    private onBannerLoaded() {
        console.log("Banner广告加载完成================");
        TouTiaoH5GameAPI.inst.m_bannerAd.show()
            .then(() => {
                console.log('onBannerLoaded 广告显示成功');
                TouTiaoH5GameAPI.inst.m_bannerHeight = 220;
                EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_SUCCESS_EVENT);
            })
            .catch(err => {
                console.log('onBannerLoaded 广告组件出现问题', err);
                TouTiaoH5GameAPI.inst.m_bannerHeight = 20;
                EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
            });
    }

    private onBannerError(err) {
        console.log("Banner广告加载失败:", JSON.stringify(err));
        TouTiaoH5GameAPI.inst.m_bannerHeight = 20;
        EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
    }

    private onBannerResize(size) {
        TouTiaoH5GameAPI.inst.m_bannerAd.style.left = TouTiaoH5GameAPI.inst.screenWidth - size.width / 2;
        TouTiaoH5GameAPI.inst.m_bannerAd.style.top = TouTiaoH5GameAPI.inst.screenHeight - size.height;
    }

    /**隐藏Banner广告 */
    onHideBanner() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.m_bannerAd) {
            if (this.versionCompareUsage("1.3.0") == false) {
                GameEngine.inst.debug("Banner广告需要1.3.0以上");
                return;
            }
            this.m_bannerHeight = 20;
            this.m_bannerAd.hide();
            EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
        }
        console.log('TouTiaoH5GameAPI onHideBanner');
    }

    /**销毁Banner广告 */
    onDestoryBanner() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.m_bannerAd) {
            if (this.versionCompareUsage("1.3.0") == false) {
                GameEngine.inst.debug("Banner广告需要1.3.0以上");
                return;
            }
            this.m_bannerHeight = 20;
            this.m_bannerAd.offResize(this.onBannerResize);
            this.m_bannerAd.offLoad(this.onBannerLoaded);
            this.m_bannerAd.offError(this.onBannerError);
            this.m_bannerAd.destroy();
            this.m_bannerAd = null;
            EventManager.inst.SendEvent(PlatformEvents.ON_BANNER_FAIL_EVENT);
        }
        console.log('TouTiaoH5GameAPI onDestoryBanner');
    }
    //#endregion

    //#region 激励视频广告
    /**创建激励视频广告 RewardedVideoAd */
    createRewardedVideoAd() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.tt) {
            if (this.versionCompareUsage("1.3.0") == false) {
                GameEngine.inst.debug("激励视频广告1.3.0以上");
                return;
            }
            //全局只有一个videoAd实例，重复创建没有用。
            this.m_videoAd = this.tt.createRewardedVideoAd({
                adUnitId: PlatformConfig.inst.currentPlatform.videoAdId
            });
            // this.m_videoAd.load().then(() => {
            //     GameEngine.inst.debug("TouTiaoH5GameAPI 激励广告显示成功");
            //     this.m_videoAdIsLoaded = true;
            // }).catch(err => {
            //     GameEngine.inst.debug(`TouTiaoH5GameAPI 激励广告组件出现问题,${JSON.stringify(err)}`);
            //     this.onVideoFailCallback && this.onVideoFailCallback(1, "广告组件出现问题");
            //     this.m_videoAd = null;
            //     this.m_videoAdIsLoaded = false;
            // });
            this.m_videoAd.onLoad(() => {
                GameEngine.inst.debug("TouTiaoH5GameAPI 激励广告加载成功");
                this.m_videoAdIsLoaded = true;
            });
            this.m_videoAd.onError((err) => {
                GameEngine.inst.debug(`TouTiaoH5GameAPI.onError 激励广告组件出现问题,${JSON.stringify(err)}`);
                this.onVideoFailCallback && this.onVideoFailCallback(1, "广告组件出现问题");
                this.m_videoAdIsLoaded = false;
                this.clearVideoCallback();
            });
            this.m_videoAd.onClose((res) => {
                this.m_videoAdIsLoaded = false;
                if (res.isEnded) {
                    GameEngine.inst.debug("TouTiaoH5GameAPI 激励视频广告完成，发放奖励");
                    this.onVideoSuccessCallback && this.onVideoSuccessCallback();
                    //播放完毕再次预加载一次
                    this.m_videoAd.load();
                } else {
                    GameEngine.inst.debug("激励视频广告取消关闭，不发放奖励");
                    this.onVideoFailCallback && this.onVideoFailCallback(4, "激励视频广告取消关闭，不发放奖励");
                }
                this.clearVideoCallback();

            });
        }
        GameEngine.inst.debug("TouTiaoH5GameAPI.createRewardedVideoAd 创建激励视频广告");
    }

    /**展示RewardedVideo激励视频广告 */
    onShowRewardedVideo(_successCallback: Function, _failCallback: (code, msg) => void, key?: string) {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            _successCallback && _successCallback();
            return;
        }
        if (this.tt && this.platform != "devtools") {
            if (this.versionCompareUsage("1.3.0") == false) {
                GameEngine.inst.debug("激励视频广告1.3.0以上");
                _failCallback && _failCallback(1, "广告组件有问题");
                return;
            }
            this.onVideoSuccessCallback = _successCallback;
            this.onVideoFailCallback = _failCallback;
            if (this.m_videoAd == null) {
                //如果为空，重新创建一次
                this.createRewardedVideoAd();
            }
            if (this.m_videoAd) {
                // if (this.m_videoAdIsLoaded) {
                //     this.m_videoAd.show().catch(err=>{
                //         _failCallback && _failCallback(1, "广告组件有问题");
                //     });
                // } else {
                //     this.m_videoAd.load().catch(err=>{
                //         _failCallback && _failCallback(1, "广告组件有问题");
                //     });
                // }
                this.m_videoAd
                    .show()
                    .then(() => {
                        console.log("广告显示成功");
                    })
                    .catch((err) => {
                        console.log("广告组件出现问题", err);
                        // 可以手动加载一次
                        this.m_videoAd.load().then(() => {
                            console.log("手动加载成功");
                            // 加载成功后需要再显示广告
                            this.m_videoAd.show();
                        });
                    });
            } else {
                _failCallback && _failCallback(1, "广告组件有问题");
            }
        } else {
            _successCallback && _successCallback();
        }
        GameEngine.inst.debug("TouTiaoH5GameAPI.onShowRewardedVideo 显示激励视频广告");
    }

    private clearVideoCallback() {
        TouTiaoH5GameAPI.inst.onVideoSuccessCallback = null;
        TouTiaoH5GameAPI.inst.onVideoFailCallback = null;
    }
    //#endregion

    //#region 插屏广告
    /**创建插屏广告 createInsertAd */
    createInsertAd() { }
    /**展示InsertAd插屏广告 */
    onShowInsertAd() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.canLoadInsertAd == false) {
            GameEngine.inst.debug("TouTiaoH5GameAPI.onShowInsertAd 没到指定时间不能显示插屏广告");
            EventManager.inst.SendEvent(PlatformEvents.ON_INSERT_AD_ERROR_EVENT);
            return;
        }

        if (this.tt && this.isToutiaio) {
            this.onDestoryInsertAd();
            // 插屏广告仅今日头条安卓客户端支持
            // 经测试，create后可以直接show，不需要load
            this.m_insertAd = this.tt.createInterstitialAd({
                adUnitId: PlatformConfig.inst.currentPlatform.insertAdId
            });
            this.m_insertAd.onLoad(this.onInsertAdLoaded);
            this.m_insertAd.onError(this.onInsertAdError);
            this.m_insertAd.onClose(this.onInsertAdClose);
        }
        if (this.m_insertAd) {
            this.m_insertAd.show()
                .then(() => {
                    GameEngine.inst.debug(`TouTiaoH5GameAPI.onShowInsertAd 插屏广告显示成功`);
                    this.canLoadInsertAd = false;
                })
                .catch(err => {
                    GameEngine.inst.debug(`TouTiaoH5GameAPI.onShowInsertAd 插屏广告显示失败 ${JSON.stringify(err)}`);
                });;

            // Laya.timer.once(this.insertAdLoadTime, this, () => {
            //     //自动销毁
            //     this.onDestoryInsertAd();
            // });
            GameEngine.inst.debug("TouTiaoH5GameAPI.onShowInsertAd 显示插屏广告");
        }
    }

    onHideInsertAd() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        GameEngine.inst.debug("TouTiaoH5GameAPI.onHideInsertAd 头条的插屏没有hide方法");
    }

    onDestoryInsertAd() {
        if (PlatformConfig.inst.currentPlatform.canAd == false) {
            GameEngine.inst.debug("没广告版本");
            return;
        }
        if (this.tt) {
            if (this.m_insertAd) {
                this.canLoadInsertAd = true;
                this.m_insertAd.offLoad(this.onInsertAdLoaded);
                this.m_insertAd.offError(this.onInsertAdError);
                this.m_insertAd.offClose(this.onInsertAdClose);
                this.m_insertAd.destroy();
                this.m_insertAd = null;
                GameEngine.inst.debug("TouTiaoH5GameAPI.onDestoryInsertAd 移除插屏广告");
            }
        }
    }

    private onInsertAdLoaded() {
        GameEngine.inst.debug("TouTiaoH5GameAPI.onInsertAdLoaded 插屏广告加载成功");
    }

    private onInsertAdError(err) {
        GameEngine.inst.debug(`TouTiaoH5GameAPI.onInsertAdError 插屏广告加载失败,${JSON.stringify(err)}`);
    }

    private onInsertAdClose() {
        Laya.timer.once(TouTiaoH5GameAPI.inst.insertAdShowCD, TouTiaoH5GameAPI.inst, () => {
            TouTiaoH5GameAPI.inst.canLoadInsertAd = true;
        });
        TouTiaoH5GameAPI.inst.onDestoryInsertAd();
        TouTiaoH5GameAPI.inst.canLoadInsertAd = false;
        GameEngine.inst.debug(`TouTiaoH5GameAPI.onInsertAdClose 关闭插屏广告 ${TouTiaoH5GameAPI.inst.insertAdShowCD, TouTiaoH5GameAPI.inst.canLoadInsertAd} `);
    }
    //#endregion

    /**原生音效 */
    createInnerAudioContext(): any {
        if (this.tt) {
            return this.tt.createInnerAudioContext();
        }
        return null;
    }

    /**存储数据
     * @param _key 索引 string
     * @param _value 值
     * @param _IsNumber 是否为数值类型
     */
    saveDataToCache(_key: string, _value: any) {
        Laya.LocalStorage.setJSON(_key, _value);
        //console.log('TouTiaoH5GameAPI saveDataToCache');
    }

    /**读取数据
     * @param _key 索引 string
     */
    readDataFromCache(_key: string): any {
        //console.log('TouTiaoH5GameAPI readDataFromCache');
        return Laya.LocalStorage.getJSON(_key);
    }

    /**原生震动 */
    vibrateShort() {
        if (this.tt) {
            this.tt.vibrateShort();
        }
    }

    /**发送事件
     * 1.8.0
     */
    sendEvent(obj: { key: string, data: any }) {
        if (this.tt) {
            if (this.versionCompareUsage("1.8.0") == false) {
                GameEngine.inst.debug("发送事件需要1.8.0以上");
                return;
            }
            this.tt.reportAnalytics(obj.key, obj.data);
        }
        console.log('TouTiaoH5GameAPI sendEvent');
    }

    getDevicePlatform(): string {
        return "";
        //throw new Error("Method not implemented.");
    }

    getPlatform(): string {
        return this.platform;
    }

    /**创建更多游戏按钮 */
    createMoreGamesButton(inStyle?: { left: number, top: number, width: number, height: number }) {
        if (this.tt) {
            if (this.m_moreButton) {
                this.m_moreButton.show();
                return;
            }
            let scale = Laya.Browser.clientWidth / fairygui.GRoot.inst.width;
            let style = {
                left: 0,
                top: 0,
                width: 108 * scale,
                height: 117 * scale,
                lineHeight: 0,
                backgroundColor: "#ff000000",
                textColor: "#ff0000",
                textAlign: "center",
                fontSize: 12,
                borderRadius: 0,
                borderWidth: 0,
                borderColor: '#ff0000'
            }
            if (inStyle) {
                style.left = inStyle.left * scale;
                style.top = inStyle.top * scale;
                style.width = inStyle.width * scale;
                style.height = inStyle.height * scale;
            }
            this.m_moreButton = this.tt.createMoreGamesButton({
                type: "image",
                image: "images/moregame.png",
                style: style,
                appLaunchOptions: [],
                onNavigateToMiniGame(res) {
                    console.log('跳转其他小游戏', res)
                }
            });

            this.m_moreButton.onTap(() => {
                console.log('点击更多游戏')
            });
        }
    }

    /**隐藏更多游戏按钮 */
    hideMoreGameButton() {
        if (this.m_moreButton) {
            this.m_moreButton.hide();
        }
    }

    //#region 没用到的方法
    pay(paymentData: PaymentData, callback: (success: boolean, msg: string) => void) {
        //throw new Error("Method not implemented.");
    }
    navigateToMiniGame(object: any) {
        //throw new Error("Method not implemented.");
    }
    /**上传最高分(排行榜) */
    updateHighScore(_score: number) {
        console.log('TouTiaoH5GameAPI updateHighScore');
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
    /**创建原生广告 createNativeAd */
    createNativeAd() {
        //console.log('TouTiaoH5GameAPI createNativeAd');
    }
    onShowNativeAd() {
        //console.log('TouTiaoH5GameAPI onShowNativeAd');
    }
    onNativeAdClick(_id: string) {
        //console.log('TouTiaoH5GameAPI onNativeAdClick:' + _id);
    }
    onNativeAdClose() {
        //throw new Error("Method not implemented.");
    }
    addColorSign() {
        //throw new Error("Method not implemented.");
    }
    createAppBox() {
        //throw new Error("Method not implemented.");
    }
    onShowAppBox() {
        //throw new Error("Method not implemented.");
    }
    onHideAppBox() {
        //throw new Error("Method not implemented.");
    }
    hasShortcutInstalled(callback: (installed: boolean) => void) {
        callback(false);
    }
    installShortcut(callback: (success: boolean) => void) {
        callback(false);
    }
    onDestroyNativeAd() {

    }
    onDestroyNativeIconAd() {

    }
    //#endregion
}
