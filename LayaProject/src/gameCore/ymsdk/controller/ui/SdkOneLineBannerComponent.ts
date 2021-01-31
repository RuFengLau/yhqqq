

import UI_SdkIconButton from "../../views/YmSdkUI/UI_SdkIconButton";
import UI_SdkOneLineBanner from "../../views/YmSdkUI/UI_SdkOneLineBanner";
import YMSDK, { SdkSwitchEnum } from "../../YMSDK";

/**
 * YMSDK单个格子广告
 */
export default class SdkOneLineBannerComponent extends UI_SdkOneLineBanner {
    onConstruct() {
        super.onConstruct();
        this.on(Laya.Event.ADDED, this, this.addToScene);
        this.on(Laya.Event.UNDISPLAY, this, this.removeToScene);
    }

    private index:number = 0;
    private addToScene() {
        if (YMSDK.inst.enabled == false) {
            this.visible = false;
            return;
        }
        this.m_List.itemRenderer = Laya.Handler.create(this, this.onItemRenderer, null, false);
        this.m_List.numItems = YMSDK.inst.getApps().length;
        this.m_List.on(fairygui.Events.CLICK_ITEM, this, this.onClickHandler);
        this.visible = YMSDK.inst.getKeyValue(SdkSwitchEnum.结算ICON导出页面);
        Laya.timer.loop(3000,this,this.onScroll);
    }

    private onScroll() {
        this.index++;
        if(this.index >= YMSDK.inst.getApps().length ){
            this.index = 0;
        }
        this.m_List.scrollToView(this.index,true);
    }

    private onItemRenderer(index: number, ui: UI_SdkIconButton) {
        let data = YMSDK.inst.getApps()[index];
        ui.title = data.name;
        ui.icon = data.icon;
    }

    private onClickHandler() {
        let data = YMSDK.inst.getApps()[this.m_List.selectedIndex];
        console.log("[YMSDK]点击跳转:", data.appId);
        let s = this.data as string;
        console.log("附带数据:", s);
        if (s) {
            YMSDK.inst.clickEvent(s, data);
        } else {
            YMSDK.inst.clickEvent("SDKICONBanner点击", data);
        }
    }

    private removeToScene() {
        this.off(Laya.Event.ADDED, this, this.addToScene);
        this.off(Laya.Event.UNDISPLAY, this, this.removeToScene);
        Laya.timer.clear(this,this.onScroll);
    }


}