import PlatformConfigData, { AdData } from "./PlatformConfigData";
import Platforms, { Platform } from "./Platforms";
import GameEngine from "../managers/GameEngine";

export default class PlatformConfig {
    private static _inst: PlatformConfig;
    public static get inst(): PlatformConfig {
        if (this._inst == null) {
            this._inst = new PlatformConfig();
        }
        return this._inst;
    }
    public get PlatfromConfig(): string { return "localRes/data/platformConfigs.json"; }
    private data: any;
    private platforms: Array<PlatformConfigData> = [];
    public currentPlatform: PlatformConfigData;

    public init(platform: Platform) {
        this.data = Laya.loader.getRes(PlatformConfig.inst.PlatfromConfig);
        this.platforms = this.data["Platforms"];
        this.currentPlatform = this.platforms[platform];
        GameEngine.inst.debug(`平台信息:${JSON.stringify(this.currentPlatform)}`);
    }

    /**获取通用配置 */
    public get globalConfigs(): any {
        return this.data["GlobalConfigs"];
    }

    /**开关 */
    public get switches(): any {
        return this.currentPlatform.switches;
    }

    //不通用
    //显示免费金币按钮
    public useFreeCoinBtn(): boolean {
        if (this.currentPlatform.switches) {
            if (typeof this.currentPlatform.switches.useGetFreeCoinBtn !== "undefined") {
                return this.currentPlatform.switches.useGetFreeCoinBtn;
            }
        }
        return true;
    }

    public useLotteryShareBtn(): boolean {
        if (this.currentPlatform.switches) {
            if (typeof this.currentPlatform.switches.useLotteryShareBtn !== "undefined") {
                return this.currentPlatform.switches.useLotteryShareBtn;
            }
        }
        return false;
    }

    /**
     * 获取bannerAd
     * @param key 
     */
    public getBannerAdData(key:string):AdData{
        for (let index = 0; index < this.currentPlatform.bannerAdList.length; index++) {
            let d = this.currentPlatform.bannerAdList[index];
            if(d.key == key){
                return d;
            }
        }
        return null;
    }

    /**
     * 获取videoAd
     * @param key 
     */
    public getVideoAdData(key:string):AdData{
        for (let index = 0; index < this.currentPlatform.videoAdList.length; index++) {
            let d = this.currentPlatform.videoAdList[index];
            if(d.key == key){
                return d;
            }
        }
        return null;
    }

    /**
     * 获取原生广告
     * @param key 
     */
    public getNativeAdData(key:string):AdData{
        for (let index = 0; index < this.currentPlatform.nativeAdList.length; index++) {
            let d = this.currentPlatform.nativeAdList[index];
            if(d.key == key){
                return d;
            }
        }
        return null;
    }

    public getNativeIconAdData(key:string):AdData{
        for (let index = 0; index < this.currentPlatform.nativeIconAdList.length; index++) {
            let d = this.currentPlatform.nativeIconAdList[index];
            if(d.key == key){
                return d;
            }
        }
        return null;
    }



    /**是否审核状态 */
    public isReview(): boolean {
        if (Platforms.inst.platform == Platform.game_app) {
            return Platforms.inst.isVertify();
        } else {
            if (this.currentPlatform.switches) {
                if (typeof this.currentPlatform.switches.review !== "undefined") {
                    return this.currentPlatform.switches.review;
                }
            }
        }

        return false;
    }


}