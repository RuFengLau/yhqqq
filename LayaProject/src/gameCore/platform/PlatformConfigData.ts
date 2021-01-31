/**
 * 渠道数据类
 */
export default class PlatformConfigData{
    /**对应enum */
    public key:number;
    /**渠道 */
    public channel:string;
    /**游戏ID */
    public appId:string;
    /**包名 */
    public packageName:string;
    /**cdn地址 */
    public basePath:string;
    /**是否可以广告 */
    public canAd:boolean=true;
    /**banner ID */
    public bannerAdId:string;
    /**banner列表 oppo */
    public bannerAdList:Array<AdData>;
    /**激励视频ID */
    public videoAdId:string;
    /**激励视频列表 oppo*/
    public videoAdList:Array<AdData>;
    /**插屏ID */
    public insertAdId:string;
    /**原生ID */
    public nativeAdId:string;
    /**原生List */
    public nativeAdList:Array<AdData>;
    /**原生iconID */
    public nativeIconAdId:string;
    /**原生icon List */
    public nativeIconAdList:Array<AdData>;
    /**QQ的广告盒子ID */
    public appBoxId:string;
    /**bannerAd准备时间 */
    public bannerAdReadyInterval:number;
    /**bannerAd cd时间 */
    public bannerAdShowCD:number;
    /**激励视频准备时间 */
    public rewardAdReadyInterval:number;
    /**激励视频cd时间 */
    public rewardAdShowCD:number;
    /**插屏类广告准备时间 */
    public insertAdReadyInterval:number;
    /**插屏类广告cd时间 */
    public insertAdShowCD:number;
    /**分享模板ID */
    public shareTemplateId:string;
    /**分享图片 */
    public shareImage:string;
    /**开关存储 */
    public switches:any;
    /**更多游戏 */
    public moreGameList:Array<any>;
}

export class AdData{
    public name:string;
    public key:string;
    public adId:string;
}