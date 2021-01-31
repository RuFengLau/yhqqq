import PaymentData from "./PaymentData";

export default interface PlatformsAPI {
    /**初始化 */
    onInit(_callback: Function);
    /**登录 */
    onLogin(callback: (success) => void);
    /**初始化Ad (部分渠道需要先初始化广告 如oppo)*/
    onInitAdService(callback: () => void);

    //#region Banner广告接口
    /**创建广告 BannerAd */
    createBannerAd();
    /**展示Banner广告 */
    onShowBanner(key?: string);
    /**隐藏Banner广告 */
    onHideBanner();
    /**销毁Banner广告 */
    onDestoryBanner();
    //#endregion

    userDataPath(): string;
    downloadFile(url: string, callback: (success: boolean, res) => void);
    unzip(url: string, callback: (success: boolean) => void)

    readFile(filePath:string,callback:(success:boolean,data:string)=>void);
    writeFileSync(filePath:string,data:string);
    
    isVertify();
    /**获取设备平台 ios还是安卓 */
    getDevicePlatform(): string;
    /**获取屏幕宽高 */
    getScreenSize(): Laya.Size;

    /**分享 */
    onShare(callback: (success) => void);
    /**上传最高分(排行榜) */
    updateHighScore(_score: number);
    /**支付 */
    pay(paymentData: PaymentData, callback: (success: boolean, msg: string) => void);

    /**创建激励视频广告 RewardedVideoAd */
    createRewardedVideoAd();
    /**展示RewardedVideo激励视频广告 */
    onShowRewardedVideo(_successCallback: Function, _failCallback: Function,key?: string);

    /**创建插屏广告 createInsertAd */
    createInsertAd();
    /**展示InsertAd插屏广告 */
    onShowInsertAd();
    /**隐藏InsertAd插屏广告 */
    onHideInsertAd();
    /**销毁InsertAd插屏广告 */
    onDestoryInsertAd();

    /**创建原生广告 createNativeAd */
    createNativeAd();
    /**展示原生广告 */
    onShowNativeAd(callback: (ad) => void,key?:string);
    /**销毁原生广告 */
    onDestroyNativeAd();
    /**上报nativeAd */
    onNativeAdClick(_id: string);
    /**关闭原生广告 */
    onNativeAdClose();

    /**创建原生图标广告 createNativeIconAd */
    createNativeIconAd();
    /**展示原生图标广告 */
    onShowNativeIconAd(callback: (ad) => void,key?:string);
    /**销毁原生icon广告 */
    onDestroyNativeIconAd();
    /**上报nativeIconAd */
    onNativeIconAdClick(_id: string);
    /**关闭原生广告 */
    onNativeIconAdClose();

    /**头条-开始录频 */
    onStartRecord();
    /**头条-停止录频 */
    onStopRecord();
    /**震动 */
    vibrateShort();
    /**事件 */
    sendEvent(obj: any);
    /**存储数据
     * @param _key 索引 string
     * @param _value 值
     */
    saveDataToCache(_key: string, _value: any);
    /**读取数据
     * @param _key 索引 string
     */
    readDataFromCache(_key: string);
    /**刘海高度 */
    notchHeight(): number;
    /**banner高度 */
    bannerHeight(): number;
    /**是否已经安装了桌面图标 */
    hasShortcutInstalled(callback: (installed: boolean) => void)
    /**调用安装桌面图标 */
    installShortcut(callback: (success: boolean) => void);
    /**头条-更多游戏按钮 */
    createMoreGamesButton(inStyle?: { left: number, top: number, width: number, height: number });
    /**头条-隐藏更多游戏按钮 */
    hideMoreGameButton();
    /**更多游戏 */
    showMoreGamesModal();
    /**头条-分享视频 */
    onShareVideo(callback: (success) => void);
    /**QQ-创建游戏盒子 */
    createAppBox();
    /**QQ-显示游戏盒子 */
    onShowAppBox();
    /**QQ-销毁游戏盒子 */
    onHideAppBox();
    /**QQ-彩签 */
    addColorSign();
    /**oppo-上报监控
     * 最小平台号 1060
    */
    reportMonitor(name: string, value: number);
    /**获取平台系统 ios,android,devtool */
    getPlatform(): string;
    /**跳转小程序 */
    navigateToMiniGame(object: any);
    /**创建音频 */
    createInnerAudioContext(): any;
}