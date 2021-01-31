import UI_ShortcutBtn from "../../../views/GameAdUI/UI_ShortcutBtn";
import DataManager from "../../managers/DataManager";
import EventManager from "../../managers/eventManager/EventManager";
import UIManager from "../../managers/UIManager";
import PlatformEvents from "../PlatformEvents";
import Platforms, { Platform } from "../Platforms";

/**
 * 桌面按钮
 */
export default class ShortcutBtnComponent extends UI_ShortcutBtn{

    onConstruct() {
        super.onConstruct();
        EventManager.inst.AddEventListener(PlatformEvents.onShortCutInstallEvent, this, this.onShortCutInstallEvent);
        this.on(Laya.Event.ADDED, this, this.addToScene);
        this.on(Laya.Event.UNDISPLAY, this, this.removeToScene);
    }

    private removeToScene() {
        EventManager.inst.RemoveEventListener(PlatformEvents.onShortCutInstallEvent, this, this.onShortCutInstallEvent);
        this.off(Laya.Event.ADDED, this, this.addToScene);
        this.off(Laya.Event.UNDISPLAY, this, this.removeToScene);
    }

    private onShortCutInstallEvent() {
        this.visible = false;
    }

    private addToScene() {
        this.visible = false;
        if (Platforms.inst.platform == Platform.oppo_h5 || Platforms.inst.platform == Platform.vivo_h5) {
            Platforms.inst.hasShortcutInstalled((install: boolean) => {
                if (install == false) {
                    this.visible = true;
                    this.onClick(this, () => {
                        this.install();
                    });
                }
            });
        }
    }

    private install() {
        //每次进入打开桌面图标
        Platforms.inst.hasShortcutInstalled((installed: boolean) => {
            if (installed == false) {
                Platforms.inst.installShortcut((success: boolean) => {
                    if (success) {
                        DataManager.inst.addCoins(50);
                        UIManager.inst.showToast("添加桌面图标成功，获得50钻石");
                        EventManager.inst.SendEvent(PlatformEvents.onShortCutInstallEvent);
                    }
                });
            }
        });
    }

    
}