import ViewControllerGeneric from "../../../controllers/ui/ViewControllerGeneric";
import PlatformAdManager from "../../../platform/PlatformAdManager";
import UI_SdkResultIconListView from "../../views/YmSdkUI/UI_SdkResultIconListView";
import YMSDK, { SdkSwitchEnum } from "../../YMSDK";


export default class SdkResultIconListViewController extends ViewControllerGeneric<UI_SdkResultIconListView> {
    public get URL(): string {
        return UI_SdkResultIconListView.URL;
    }
    public init() {
        this.onViewWillDestory = Laya.Handler.create(this, this.unbind);
        this.onViewAdded = Laya.Handler.create(this, this.bind);
        super.init();
    }

    private unbind() {
        PlatformAdManager.inst.destroyBanner();
    }

    private bind() {
        if(YMSDK.inst.enabled == false){
            this.removeSelf();
            return;
        }
        if(YMSDK.inst.getKeyValue(SdkSwitchEnum.结算ICON导出页面) == false){
            this.removeSelf();
            return;
        }

        PlatformAdManager.inst.showBanner();
    }

}