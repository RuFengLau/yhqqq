import PlatformsAPI from "../PlatformsAPI";
import PaymentData from "../PaymentData";

export default class WebH5GameAPI implements PlatformsAPI {
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
    createInnerAudioContext() {
        return null;
    }
    onHideInsertAd() {
        //throw new Error("Method not implemented.");
    }
    navigateToMiniGame(object: any) {
       // throw new Error("Method not implemented.");
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
        return 20;
    }
    notchHeight(): number {
        return 20;
    }
    sendEvent(obj: any) {

    }
    vibrateShort() {

    }
    onStartRecord() {

    }
    onStopRecord() {

    }
    /**获取屏幕宽高 */
    getScreenSize(): Laya.Size {
        return new Laya.Size(720, 1280);
    }
    /**获取是否审核 */
    isVertify(): boolean {
        return true;
    }
    /**初始化 */
    onInit(_callback: Function) {
        console.log('WebH5GameAPI onInit');
    }
    /**登录 */
    onLogin(callback: (success: boolean) => void) {
        callback && callback(true);
        console.log('WebH5GameAPI onLogin');
    }
    /**分享 */
    onShare() {
        console.log('WebH5GameAPI onShare');
    }
    /**上传最高分(排行榜) */
    updateHighScore(_score: number) {
        console.log('WebH5GameAPI updateHighScore');
    }
    /**初始化Ad (部分渠道需要先初始化广告 如oppo)*/
    onInitAdService(callback: () => void) {
        console.log('WebH5GameAPI onInitAdService');
        callback && callback();
        console.log('WebH5GameAPI onInitAdService');
    }
    /**创建广告 BannerAd */
    createBannerAd() {
        console.log('WebH5GameAPI createBannerAd');
    }
    /**展示Banner广告 */
    onShowBanner() {
        console.log('WebH5GameAPI onShowBanner');
    }
    /**隐藏Banner广告 */
    onHideBanner() {
        console.log('WebH5GameAPI onHideBanner');
    }
    /**创建激励视频广告 RewardedVideoAd */
    createRewardedVideoAd() {
        console.log('WebH5GameAPI createRewardedVideoAd');
    }
    /**展示RewardedVideo激励视频广告 */
    onShowRewardedVideo(_successCallback: Function, _failCallback: Function) {
        _successCallback && _successCallback();
        console.log('WebH5GameAPI onShowRewardedVideo');
    }
    /**创建插屏广告 createInsertAd */
    createInsertAd() {
        console.log('WebH5GameAPI createInsertAd');
    }
    /**展示InsertAd插屏广告 */
    onShowInsertAd() {
        console.log('WebH5GameAPI onShowInsertAd');
    }
    /**创建原生广告 createNativeAd */
    createNativeAd() {
        console.log('WebH5GameAPI createNativeAd');
    }
    onShowNativeAd() {
        console.log('WebH5GameAPI onShowNativeAd');
    }
    onNativeAdClick(_id: string) {
        console.log('WebH5GameAPI onNativeAdClick:' + _id);
    }
    /**存储数据
     * @param _key 索引 string
     * @param _value 值
     */
    saveDataToCache(_key: string, _value: any) {
        Laya.LocalStorage.setItem(_key, JSON.stringify(_value));
        //console.log('WebH5GameAPI saveDataToCache');
    }
    /**读取数据
     * @param _key 索引 string
     */
    readDataFromCache(_key: string) {
        //console.log('WebH5GameAPI readDataFromCache');
        return JSON.parse(Laya.LocalStorage.getItem(_key));
    }
}
