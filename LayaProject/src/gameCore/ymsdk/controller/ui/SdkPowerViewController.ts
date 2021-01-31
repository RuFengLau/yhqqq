import ViewControllerGeneric from "../../../controllers/ui/ViewControllerGeneric";
import EventManager from "../../../managers/eventManager/EventManager";
import PlatformAdManager from "../../../platform/PlatformAdManager";
import PlatformEvents from "../../../platform/PlatformEvents";
import Platforms from "../../../platform/Platforms";
import MathHelper from "../../../plugins/tools/MathHelper";
import UI_SdkPowerView from "../../views/YmSdkUI/UI_SdkPowerView";
import YMSDK, { SdkSwitchEnum } from "../../YMSDK";

export default class SdkPowerViewController extends ViewControllerGeneric<UI_SdkPowerView> {
    public get URL(): string {
        return UI_SdkPowerView.URL;
    }

    private isShowBanner: boolean = false;
    private currentP: number = 0;
    private randShowBanner: number = 0;

    public closeHander:Laya.Handler;

    public init() {
        this.onViewWillDestory = Laya.Handler.create(this, this.unbind);
        this.onViewAdded = Laya.Handler.create(this, this.bind);
        super.init();
    }

    private unbind() {
        PlatformAdManager.inst.destroyBanner();
        Laya.timer.clear(this, this.onSubProgress);
    }

    private bind() {
        if(YMSDK.inst.enabled == false){
            this.removeSelf();
            return;
        }
        if (YMSDK.inst.getKeyValue(SdkSwitchEnum.结算误点进度页面) == false) {
            this.removeSelf();
            return;
        }
        EventManager.inst.AddEventListener(PlatformEvents.ON_BANNER_SUCCESS_EVENT,this,this.onBannerShowSuccess);
        PlatformAdManager.inst.destroyBanner();
        this.randShowBanner = MathHelper.random(30, 50);
        this.view.m_ClickBtn.onClick(this, this.onClick)
        Laya.timer.loop(1000, this, this.onSubProgress);
    }

    private onBannerShowSuccess() {
        this.view.m_ButtomBar.height = Platforms.inst.bannerHeight();
    }

    private onSubProgress() {
        this.currentP -= 3;
        if (this.currentP <= 0) {
            this.currentP = 0;
        }
        this.view.m_ProgressBar.tweenValue(this.currentP, 0.3);
    }

    private onClick() {
        this.currentP += 10;
        if (this.currentP >= 100) {
            this.currentP = 100;
            this.removeSelf();
            this.closeHander && this.closeHander.runWith(true);
            return;
        } else if (this.currentP >= this.randShowBanner) {
            this.showBanner();
        }
        this.view.m_ProgressBar.tweenValue(this.currentP, 0.3);
    }

    private showBanner() {
        if (this.isShowBanner == false) {
            this.isShowBanner = true;
            PlatformAdManager.inst.showBanner();
        }
    }

}