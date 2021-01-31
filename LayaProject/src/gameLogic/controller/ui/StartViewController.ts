import ViewControllerGeneric from "../../../gameCore/controllers/ui/ViewControllerGeneric";
import CustomEventDispatcher from "../../../script/core/CustomEventDispatcher";
import TruckGameManager from "../../managers/TruckGameManager";
import UI_StartView from "../../../views/GameUI/UI_StartView";
import DataManager from "../../../gameCore/managers/DataManager";
import EventManager from "../../../gameCore/managers/eventManager/EventManager";
import GameEvents from "../../../gameCore/events/GameEvents";
import UIManager from "../../../gameCore/managers/UIManager";
import ShopViewController from "./ShopViewController";

export default class StartViewController extends ViewControllerGeneric<UI_StartView> {
    public get URL(): string {
        return UI_StartView.URL;
    }

    public init() {
        this.onViewWillDestory = Laya.Handler.create(this, this.unbind);
        this.onViewAdded = Laya.Handler.create(this, this.bind);
        super.init();
    }

    private unbind() {
        this.view.m_Bot.displayObject.off(Laya.Event.MOUSE_DOWN,this,this.onTouchStart);
        this.view.m_Bot.displayObject.off(Laya.Event.MOUSE_UP,this,this.onRelease);
       
        CustomEventDispatcher.instance.off("gameUI", this, this.showPage);
        
    }

    private bind() {
        EventManager.inst.AddEventListener(GameEvents.ON_UPDATE_USERINFO_EVENT,this,this.updateUserInfo);
        this.view.m_Bot.displayObject.on(Laya.Event.MOUSE_DOWN,this,this.onTouchStart);
        this.view.m_Bot.displayObject.on(Laya.Event.MOUSE_UP,this,this.onRelease);
        CustomEventDispatcher.instance.on("gameUI", this, this.showPage);

        this.view.m_ShopBtn.onClick(this,this.onShopBtnClick);
        this.updateUserInfo();
    }

    private onShopBtnClick() {
        UIManager.inst.showPopupView(new ShopViewController());
    }

    private updateUserInfo() {
        this.view.m_StageLabel.text =`第${DataManager.inst.user.currentStage + 1}关`;
        this.view.m_CoinBar.title = DataManager.inst.user.coins.toString();
    }

    private onRelease() {
        if(TruckGameManager.instance().carScript){
            TruckGameManager.instance().carScript.pause = true;
        }
    }

    private onTouchStart() {
        TruckGameManager.instance().OnSpeedDownEnter();
        this.view.m_gameState.selectedIndex = 1;
    }

    private showPage() {
        this.view.m_gameState.selectedIndex = 0;
    }

}