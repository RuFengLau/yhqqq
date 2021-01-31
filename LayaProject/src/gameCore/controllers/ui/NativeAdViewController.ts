
import ViewControllerGeneric from './ViewControllerGeneric';
import Platforms, { Platform } from '../../platform/Platforms';
import UIManager from '../../managers/UIManager';
import UI_NativeAdView from '../../../views/GameAdUI/UI_NativeAdView';

export default class NativeAdViewController extends ViewControllerGeneric<UI_NativeAdView>{
    public get URL(): string {
        return UI_NativeAdView.URL;
    }

    public init() {
        this.onViewAdded = Laya.Handler.create(this, this.bind);
        super.init();
    }

    private bind() {
        this.view.m_CloseBtn.onClick(this, () => {
            Platforms.inst.onNativeAdClose();//务必调用关闭事件
            this.removeSelf();
        });
        UIManager.inst.topViewContainer.addChild(this.view);
    }

    public setData(ad) {
        if (Platforms.inst.platform == Platform.vivo_h5) {
            //vivo
            if (ad.imgUrlList && ad.imgUrlList.length > 0) {
                this.view.m_ImageLoader.icon = ad.imgUrlList[0];
            } else if (ad.icon && ad.icon != "") {
                this.view.m_ImageLoader.icon = ad.icon;
            }
        } else if (Platforms.inst.platform == Platform.oppo_h5) {
            if (ad.imgUrlList && ad.imgUrlList.length > 0) {
                this.view.m_ImageLoader.icon = ad.imgUrlList[0];
            } else if (ad.iconUrlList && ad.iconUrlList.length > 0) {
                this.view.m_ImageLoader.icon = ad.iconUrlList[0];
            }else if (ad.icon) {
                this.view.m_ImageLoader.icon = ad.icon;
            }
        }
        this.view.m_ClickBtn.onClick(this, () => {
            Platforms.inst.onNativeAdClick(ad.adId);
            this.removeSelf();
        });
        this.view.m_ConfirmBtn.onClick(this, () => {
            Platforms.inst.onNativeAdClick(ad.adId);
            this.removeSelf();
        });
    }

    public removeSelf(){
        UIManager.inst.topViewContainer.removeChild(this.view);
    }
}