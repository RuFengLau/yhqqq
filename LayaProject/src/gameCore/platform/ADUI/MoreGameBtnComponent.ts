import UI_MoreGameBtn from "../../../views/GameAdUI/UI_MoreGameBtn";
import MoreGameViewController from "./MoreGameViewController";
import UIManager from "../../managers/UIManager";
import Platforms, { Platform } from "../Platforms";

/**
 * 更多按钮组件
 */
export default class MoreGameBtnComponent extends UI_MoreGameBtn {
    onConstruct() {
        super.onConstruct();
        this.on(Laya.Event.ADDED, this, this.init);
        this.on(Laya.Event.UNDISPLAY, this, this.removeToScene);
    }

    private init() {
        if (Platforms.inst.platform == Platform.oppo_h5) {
            this.visible = true;
        }else if(Platforms.inst.platform == Platform.toutiao_h5 && Platforms.inst.getPlatform()=="ios"){
            this.visible = true;
        }else{
            this.visible = false;
        }
        this.onClick(this, () => {
            if (Platforms.inst.platform == Platform.oppo_h5) {
                UIManager.inst.showPopupView(new MoreGameViewController());
            } else if (Platforms.inst.platform == Platform.toutiao_h5) {
                Platforms.inst.showMoreGamesModal();
            }
        });
    }

    private removeToScene() {
        this.off(Laya.Event.ADDED, this, this.init);
        this.off(Laya.Event.UNDISPLAY, this, this.removeToScene);
    }
}