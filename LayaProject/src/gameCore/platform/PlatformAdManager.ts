import Platforms, { Platform } from "../../gameCore/platform/Platforms";
import UIManager from "../../gameCore/managers/UIManager";
import NativeAdViewController from "../../gameCore/controllers/ui/NativeAdViewController";
import NativeIconComponent from "./ADUI/NativeIconComponent";

/**
 * 根据策划定制的逻辑广告类
 */
export default class PlatformAdManager {
    private static _inst: PlatformAdManager;
    public static get inst(): PlatformAdManager {
        if (this._inst == null) {
            this._inst = new PlatformAdManager();
        }
        return this._inst;
    }

    public init() {}

    public nativeIconData:any;//缓存原生图标广告数据
    public nativeImageAdData:any;//缓存原生三图广告数据

    /**显示Banner */
    public showBanner(forceShow: boolean = false, key?: string) {
        let isShow: boolean = true;
        if ((Platforms.inst.platform == Platform.oppo_h5 
            || Platforms.inst.platform == Platform.vivo_h5 
            //|| Platforms.inst.platform == Platform.toutiao_h5
            ) && forceShow == false) {
            isShow = false;
        }
        console.log("是否显示banner：",isShow);
        if (isShow) Platforms.inst.onShowBanner(key);
    }

    /**销毁banner */
    public destroyBanner() {
        Platforms.inst.onDestoryBanner();
    }

    /**显示原生广告 */
    public showNativeAd() {
        Platforms.inst.onShowNativeAd((ad) => {
            let view = new NativeAdViewController();
            UIManager.inst.showPopupView(view);
            view.setData(ad);
        });
    }

    /**销毁原生广告 */
    public destroyNativeAd() {
        Platforms.inst.onDestroyNativeAd();
    }

    /**根据渠道自动选择
     * qq和头条只有插屏广告
     */
    public showNativeOrInsertAd() {
        if (Platforms.inst.platform == Platform.qqplay_h5 || Platforms.inst.platform == Platform.toutiao_h5) {
            Platforms.inst.onShowInsertAd();
        } else {
            this.showNativeAd();
        }
    }

    /**
     * 原生按钮图标广告
     * @param nativeButton NativeIconComponent组件
     * @param key 界面类型
     */
    public showNativeIconAd(btn: NativeIconComponent, key?: string) {
        if (Platforms.inst.platform == Platform.oppo_h5 || Platforms.inst.platform == Platform.vivo_h5) {
            btn.getAd(key);
        }
    }

    /**销毁原生图标 */
    public destroyNativeIconAd() {
        if (Platforms.inst.platform == Platform.oppo_h5) {
            Platforms.inst.onDestroyNativeIconAd();
        }
    }

    public sendEvent(obj: { key: string, data: any }){
        Platforms.inst.sendEvent(obj)
    }

    public showRewardedVideo(callback:(success:boolean)=>void){
        UIManager.inst.showToast("视频正在加载中", 3000, true);
        Laya.timer.once(1000, this, () => {
            Platforms.inst.onShowRewardedVideo(
                () => {
                    UIManager.inst.showToast("获得奖励");
                    callback&&callback(true);
                }, (code, msg) => {
                    if (code == 1) {
                        UIManager.inst.showToast("视频尚未准备好，请稍后再试");
                    } else if (code == 4) {
                        UIManager.inst.showToast("未完整看完视频无法获得奖励");
                    }
                    callback&&callback(false);
                }
            );
        });
    }
}