import UI_NativeImage from "../../../views/GameAdUI/UI_NativeImage";
import PlatformAdManager from "../PlatformAdManager";
import PlatformConfig from "../PlatformConfig";
import Platforms, { Platform } from "../Platforms";

/**
 * OPPO小游戏原生三图嵌套广告
 */
export default class NativeImageComponent extends UI_NativeImage {
    private images: Array<string> = [];
    private index: number = 0;
    private ad: any;
    private key:string;

    onConstruct() {
        super.onConstruct();
        this.on(Laya.Event.ADDED, this, this.addToScene);
        this.on(Laya.Event.UNDISPLAY, this, this.removeToScene);
    }

    private addToScene() {
        this.key = this.data as string;//此data数据在UI填写
        // let v = Platforms.inst.platform == Platform.oppo_h5 || Platforms.inst.platform == Platform.vivo_h5;
        // v = PlatformConfig.inst.currentPlatform.canAd;
        // this.visible = v;
        this.visible = false;
        this.getAd(this.key);
    }

    private removeToScene() {
        this.off(Laya.Event.ADDED, this, this.addToScene);
        this.off(Laya.Event.UNDISPLAY, this, this.removeToScene);
        Laya.timer.clear(this, this.loadImage);
    }

    /**
     * 获取原生广告
     * @param key 
     */
    public getAd(key?: string) {
        this.visible = false;
        if(Platforms.inst.platform == Platform.oppo_h5 || Platforms.inst.platform == Platform.vivo_h5){
            this.key = key;
            this.index = 0;
            Platforms.inst.onShowNativeAd((ad) => {
                if (ad) {
                    this.ad = ad;
                    PlatformAdManager.inst.nativeImageAdData = this.ad;
                    this.visible = PlatformConfig.inst.currentPlatform.canAd;
                }else{
                    this.ad = PlatformAdManager.inst.nativeImageAdData;//读取缓存的
                    console.log("读取缓存的广告数据");
                }
                console.log("获取原生三图数据:", JSON.stringify(this.ad) );
                this.setData(this.ad);
            }, this.key);
        }
        
    }

    public setData(ad: any) {
        if(ad == null){
            this.visible = false;
            console.warn("没有原生三图广告数据!!!");
            return;
        }
        this.visible = true;
        if (Platforms.inst.platform == Platform.oppo_h5) {
            if (ad.imgUrlList && ad.imgUrlList.length > 0) {
                this.images = ad.imgUrlList;
            } else if (ad.iconUrlList && ad.iconUrlList.length > 0) {
                this.images = ad.iconUrlList;
            } else if (ad.icon) {
                this.images.push(ad.icon);
            }
        }else if (Platforms.inst.platform == Platform.vivo_h5) {
            if (ad.imgUrlList && ad.imgUrlList.length > 0) {
                this.images = ad.imgUrlList;
            } else if (ad.iconUrlList && ad.iconUrlList.length > 0) {
                this.images = ad.iconUrlList;
            } else if (ad.icon) {
                this.images.push(ad.icon);
            }

            //vivo
            if (ad.imgUrlList && ad.imgUrlList.length > 0) {
                this.images = ad.imgUrlList;
            } else if (ad.icon && ad.icon != "") {
                this.images.push(ad.icon);
            }
        }

        this.onClick(this, () => {
            console.log("原生广告点击");
            Laya.timer.clear(this, this.loadImage);
            Platforms.inst.onNativeAdClick(ad.adId);
            this.getAd(this.key);//点击后重新加载新的
        });

        Laya.timer.loop(2500, this, this.loadImage);
        this.loadImage();
    }

    private loadImage() {
        this.m_ImageLoader.m_icon.url = this.images[this.index];
        this.index++;
        if (this.index >= this.images.length - 1) {
            this.index = 0;
        }
    }
}