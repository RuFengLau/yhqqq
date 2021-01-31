import ViewControllerGeneric from "../../../gameCore/controllers/ui/ViewControllerGeneric";
import DataManager from "../../../gameCore/managers/DataManager";
import ResourcesManager from "../../../gameCore/managers/ResourcesManager";
import SoundManager from "../../../gameCore/managers/soundManager/SoundManager";
import UIManager from "../../../gameCore/managers/UIManager";
import { SoundType } from "../../../gameCore/models/GameEnum";
import PlatformAdManager from "../../../gameCore/platform/PlatformAdManager";
import PlatformConfig from "../../../gameCore/platform/PlatformConfig";
import MultiLanguageManager from "../../../gameCore/plugins/multiLanguages/MultiLanguageManager";
import UI_CarShopList from "../../../views/GameUI/UI_CarShopList";
import UI_ShopView from "../../../views/GameUI/UI_ShopView";
import TruckGameManager from "../../managers/TruckGameManager";


export default class ShopViewController extends ViewControllerGeneric<UI_ShopView> {
    public get URL(): string {
        return UI_ShopView.URL;
    }

    public init() {
        this.onViewWillDestory = Laya.Handler.create(this, this.unbind);
        this.onViewAdded = Laya.Handler.create(this, this.bind);
        super.init();
    }

    private unbind() {
        this.view.m_List.off(fairygui.Events.CLICK_ITEM, this, this.onItemClick);
    }

    private bind() {
        this.view.m_BackBtn.onClick(this, this.onBackBtnClick);
        this.view.m_BuyBtn.onClick(this, this.onBuyBtnClick);
        this.view.m_FreeGetBtn.onClick(this, this.onFreeGetBtnClick);
        this.view.m_UseBtn.onClick(this, this.onUseBtnClick);
        this.view.m_adState.selectedIndex = PlatformConfig.inst.currentPlatform.canAd ? 1 : 0;
        this.view.m_List.itemRenderer = Laya.Handler.create(this, this.onItemRenderer, null, false);
        this.view.m_List.on(fairygui.Events.CLICK_ITEM, this, this.onItemClick);
        this.view.m_List.numItems = DataManager.inst.carConfigs.length;
        this.view.m_List.selectedIndex = DataManager.inst.getCarIndex(DataManager.inst.user.currentCarId);
        this.selectCar(this.view.m_List.selectedIndex);
        this.updateUserInfo();
    }

    private onUseBtnClick() {
        let index = this.view.m_List.selectedIndex;
        let data = DataManager.inst.carConfigs[index];
        let oldId = DataManager.inst.user.currentCarId;
        let oldIndex = DataManager.inst.getCarIndex(oldId);
        DataManager.inst.useCar(data._id);
        UIManager.inst.showToast(MultiLanguageManager.inst.getLanguage("使用" + data.name));
        this.selectCar(oldIndex);

        
        TruckGameManager.instance().nowCarIndex = index;
        TruckGameManager.instance().changeCar(index);
       
        this.selectCar(index);
    }

    private onFreeGetBtnClick() {
        PlatformAdManager.inst.showRewardedVideo((s: boolean) => {
            if (s) {
                this.buyCar();
            }
        });
    }

    private buyCar() {
        let index = this.view.m_List.selectedIndex;
        let data = DataManager.inst.carConfigs[index];
        DataManager.inst.buyCar(data._id);
        this.selectCar(index);
        SoundManager.inst.Play(SoundType.SE_BuyItem);
    }

    private onBuyBtnClick() {
        let index = this.view.m_List.selectedIndex;
        let data = DataManager.inst.carConfigs[index];
        if (DataManager.inst.user.coins >= data.cost) {
            this.buyCar();
        } else {
            UIManager.inst.showToast(MultiLanguageManager.inst.getLanguage("金币不足"));
        }
    }

    private selectCar(index: number) {
        let data = DataManager.inst.carConfigs[index];
        this.view.m_UseBtn.visible = false;
        this.view.m_BuyBtn.visible = true;
        this.view.m_ImageLoader.url = ResourcesManager.inst.getImageThumb(data.icon);
        this.view.m_FreeGetBtn.visible = PlatformConfig.inst.currentPlatform.canAd;
        let ui = this.view.m_List.getChildAt(index) as UI_CarShopList;
        ui.m_state.selectedIndex = 2;
        if (DataManager.inst.isUnlockCar(data._id)) {
            this.view.m_BuyBtn.visible = false;
            this.view.m_FreeGetBtn.visible = false;
            if (data._id != DataManager.inst.user.currentCarId) {
                this.view.m_UseBtn.visible = true;
            }
            ui.m_state.selectedIndex = 1;
        }

        if (data._id == DataManager.inst.user.currentCarId) {
            ui.m_state.selectedIndex = 0;
        }
       
    }

    private onItemClick(ui: UI_CarShopList) {
        let index = this.view.m_List.selectedIndex;
        this.selectCar(index);
    }

    private onItemRenderer(index: number, ui: UI_CarShopList) {
        let data = DataManager.inst.carConfigs[index];
        ui.icon = ResourcesManager.inst.getImageThumb(data.icon);
        ui.m_CoinLabel.text = data.cost.toString();
        ui.m_NameLabel.text = data.name;
        ui.m_state.selectedIndex = 2;
        if (DataManager.inst.isUnlockCar(data._id)) {
            ui.m_state.selectedIndex = 1;
        }
        if (data._id == DataManager.inst.user.currentCarId) {
            ui.m_state.selectedIndex = 0;
        }
    }

    private updateUserInfo() {
        this.view.m_CoinBar.title = DataManager.inst.user.coins.toString();
    }

    private onBackBtnClick() {
        this.removeSelf();
    }
}