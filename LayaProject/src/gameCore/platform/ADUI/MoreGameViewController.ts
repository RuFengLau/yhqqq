
import ViewControllerGeneric from "../../controllers/ui/ViewControllerGeneric";
import PlatformConfig from "../PlatformConfig";
import Platforms from "../Platforms";
import UI_MoreGameView from "../../../views/GameAdUI/UI_MoreGameView";
import UI_MoreGameIcon from "../../../views/GameAdUI/UI_MoreGameIcon";


export default class MoreGameViewController extends ViewControllerGeneric<UI_MoreGameView>{
    public get URL(): string {
        return UI_MoreGameView.URL
    }

    public init() {
        this.onViewAdded = Laya.Handler.create(this, this.bind);
        this.onViewWillDestory = Laya.Handler.create(this, this.unbind);
        super.init();
    }

    private unbind() {
        if(this.view.m_List.itemRenderer){
            this.view.m_List.itemRenderer.clear();
        }
        this.view.m_List.off(fairygui.Events.CLICK_ITEM,this,this.onItemClick);
    }

    private bind() {
        this.view.m_CloseBtn.onClick(this,this.onClose);
        this.view.m_List.itemRenderer = Laya.Handler.create(this,this.onItemRenderer,null,false);
        this.view.m_List.numItems = PlatformConfig.inst.currentPlatform.moreGameList.length;
        this.view.m_List.on(fairygui.Events.CLICK_ITEM,this,this.onItemClick);
    }

    private onItemRenderer(index:number,ui:UI_MoreGameIcon){
        let data = PlatformConfig.inst.currentPlatform.moreGameList[index];
        ui.icon = data.icon;
    }

    private onItemClick(ui:UI_MoreGameIcon) {
        let data = PlatformConfig.inst.currentPlatform.moreGameList[this.view.m_List.selectedIndex];
        let packageName = data.packageName;
        Platforms.inst.navigateToMiniGame(packageName);
    }
   
    onClose(){
        this.removeSelf();
    }

}