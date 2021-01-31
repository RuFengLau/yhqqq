import GameAdUIBinder from "../../../views/GameAdUI/GameAdUIBinder";
import UI_MoreGameBtn from "../../../views/GameAdUI/UI_MoreGameBtn";
import UI_NativeIcon from "../../../views/GameAdUI/UI_NativeIcon";
import UI_NativeImage from "../../../views/GameAdUI/UI_NativeImage";
import UI_ShortcutBtn from "../../../views/GameAdUI/UI_ShortcutBtn";
import MoreGameBtnComponent from "./MoreGameBtnComponent";
import NativeIconComponent from "./NativeIconComponent";
import NativeImageComponent from "./NativeImageComponent";
import ShortcutBtnComponent from "./ShortcutBtnComponent";

/**
 * 游戏管理类
 */
export default class YmAdSdk {
    private static _inst: YmAdSdk;
    public static get inst(): YmAdSdk {
        if (this._inst == null) {
            this._inst = new YmAdSdk();
        }
        return this._inst;
    }

    public init(){
        this.addFguiExtends();
    }

    /**设置fgui的插件 */
    private addFguiExtends() {
        fairygui.UIPackage.addPackage("res/ui/GameAdUI");
        GameAdUIBinder.bindAll();
        //广告
        fgui.UIObjectFactory.setExtension(UI_NativeIcon.URL, NativeIconComponent);
        fgui.UIObjectFactory.setExtension(UI_MoreGameBtn.URL, MoreGameBtnComponent);
        fgui.UIObjectFactory.setExtension(UI_NativeImage.URL, NativeImageComponent);
        fgui.UIObjectFactory.setExtension(UI_ShortcutBtn.URL, ShortcutBtnComponent);
    }
}