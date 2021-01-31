
import UI_NativeIcon from "../../../views/GameAdUI/UI_NativeIcon";
import PlatformAdManager from "../PlatformAdManager";
import Platforms, { Platform } from "../Platforms";

export default class NativeIconComponent extends UI_NativeIcon {
    private ad: any;
    private key: string;
    private images: Array<string> = [];

    onConstruct() {
        super.onConstruct();
        this.on(Laya.Event.ADDED, this, this.addToScene);
        this.on(Laya.Event.UNDISPLAY, this, this.removeToScene);
    }

    private addToScene() {
        this.key = this.data as string;//此data数据在UI填写
        this.getAd(this.key);
    }

    private removeToScene() {
        this.off(Laya.Event.ADDED, this, this.addToScene);
        this.off(Laya.Event.UNDISPLAY, this, this.removeToScene);
    }

    /**获取原生广告 */
    public getAd(key?: string) {
        this.key = key;
        console.log("getAD:",this.key);
        Platforms.inst.onShowNativeIconAd((ad) => {
            if (ad) {
                this.ad = ad;
                PlatformAdManager.inst.nativeIconData = this.ad;
            } else {
                this.ad = PlatformAdManager.inst.nativeIconData;//读缓存
                console.log("读取缓存的广告数据");
            }
            console.log(NativeIconComponent.name, "获取原生图标数据:", JSON.stringify(this.ad));
            this.setData(this.ad);
        }, this.key);
    }

    /**设置数据 */
    public setData(ad) {
        if (ad == null) {
            this.visible = false;
            console.warn("没有原生图标广告数据!!!");
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
        }
        this.m_IconMask.icon = this.images[0];
        this.onClick(this, () => {
            Platforms.inst.onNativeIconAdClick(ad.adId);
            this.getAd(this.key);//点击后重新加载新的
        });
    }
}