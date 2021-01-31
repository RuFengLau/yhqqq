
import MathHelper from "../../../plugins/tools/MathHelper";
import UI_SdkIconButtonAd from "../../views/YmSdkUI/UI_SdkIconButtonAd";

import YMSDK, { AppInfo, SdkSwitchEnum } from "../../YMSDK";

/**
 * YMSDK单个格子广告
 */
export default class SdkIconButtonAdComponent extends UI_SdkIconButtonAd {
    onConstruct() {
        super.onConstruct();
        this.on(Laya.Event.ADDED, this, this.addToScene);
        this.on(Laya.Event.UNDISPLAY, this, this.removeToScene);
    }
    private appInfo: AppInfo;
    private addToScene() {
        if(YMSDK.inst.enabled == false){
            this.visible = false;
            return;
        }
        this.onClick(this, this.onClickHandler);
        this.randomIcon();
        Laya.timer.loop(5000, this, this.randomIcon);
        this.visible = YMSDK.inst.getKeyValue(SdkSwitchEnum.游戏格子);
    }

    private randomIcon() {
        let rand = MathHelper.random(0, YMSDK.inst.getApps().length-1);
        this.appInfo = YMSDK.inst.getApps()[rand];
        this.icon = this.appInfo.icon;
        this.title = this.appInfo.name;
    }

    private onClickHandler() {
        console.log("[YMSDK]点击跳转:", this.appInfo.appId);
        let s = this.data as string;
        console.log("附带数据:",s);
        if(s){
            YMSDK.inst.clickEvent(s,this.appInfo);
        }else{
            YMSDK.inst.clickEvent("SDKICON点击",this.appInfo);
        }
       
    }

    private removeToScene() {
        Laya.timer.clear(this, this.randomIcon);
        this.off(Laya.Event.ADDED, this, this.addToScene);
        this.off(Laya.Event.UNDISPLAY, this, this.removeToScene);
    }


}