import ViewControllerGeneric from "../../../controllers/ui/ViewControllerGeneric";
import UI_SdkIconButton from "../../views/YmSdkUI/UI_SdkIconButton";
import UI_SdkStartIconListView from "../../views/YmSdkUI/UI_SdkStartIconListView";
import YMSDK, { AppInfo, SdkSwitchEnum } from "../../YMSDK";


export default class SdkStartIconListViewController extends ViewControllerGeneric<UI_SdkStartIconListView> {
    public get URL(): string {
        return UI_SdkStartIconListView.URL;
    }

    public closeHandler: Laya.Handler;
    private list1: Array<AppInfo> = new Array<AppInfo>();
    private list2: Array<AppInfo> = new Array<AppInfo>();
    public init() {
        this.onViewWillDestory = Laya.Handler.create(this, this.unbind);
        this.onViewAdded = Laya.Handler.create(this, this.bind);
        super.init();
    }

    private unbind() {
        Laya.timer.clear(this, this.onJumpPage);
        this.closeHandler && this.closeHandler.runWith(true);
        
    }

    private index = 0;

    private bind() {

        this.view.m_CloseBtn.onClick(this, this.onClose);
        let apps = YMSDK.inst.getApps();
        let middle = Math.ceil(apps.length / 2);
        for (let index = 0; index < apps.length; index++) {
            const app = apps[index];
            if (index < middle) {
                this.list1.push(app);
            } else {
                this.list2.push(app);
            }
        }
        this.view.m_List0.itemRenderer = Laya.Handler.create(this, this.onList1Renderer, null, false);
        this.view.m_List0.numItems = this.list1.length;
        this.view.m_List1.itemRenderer = Laya.Handler.create(this, this.onList2Renderer, null, false);
        this.view.m_List1.numItems = this.list2.length;
        this.view.m_List0.on(fairygui.Events.CLICK_ITEM, this, this.onItemClick0);
        this.view.m_List1.on(fairygui.Events.CLICK_ITEM, this, this.onItemClick1);
        if (YMSDK.inst.getKeyValue(SdkSwitchEnum.开始ICON导出页面) == false) {
            this.removeSelf();
        }
        let page = Math.ceil(middle / 6);
        if (page > 1) {
            Laya.timer.loop(3000, this, this.onJumpPage);
        }

    }

    private onJumpPage() {
        console.log("1111");
        this.index += 6;
        let apps = YMSDK.inst.getApps();
        let middle = Math.ceil(apps.length / 2);
        let page = Math.ceil(middle / 6);
        if(this.index >= page * 6){
            this.index = 0;
        }
        this.view.m_List0.scrollToView(this.index,true);
        this.view.m_List1.scrollToView(this.index,true);
    }

    private onList1Renderer(index: number, ui: UI_SdkIconButton) {
        ui.icon = this.list1[index].icon;
        ui.title = this.list1[index].name;
        ui.data = this.list1[index];
    }

    private onList2Renderer(index: number, ui: UI_SdkIconButton) {
        ui.icon = this.list2[index].icon;
        ui.title = this.list2[index].name;
        ui.data = this.list2[index];
    }

    private onItemClick0(ui: UI_SdkIconButton) {
        console.log("[YMSDK]点击跳转:", ui.data);
        YMSDK.inst.clickEvent("开始页面导流按钮", ui.data as AppInfo);
    }

    private onItemClick1(ui: UI_SdkIconButton) {
        console.log("[YMSDK]点击跳转:", ui.data);
        YMSDK.inst.clickEvent("开始页面导流按钮", ui.data as AppInfo);
    }

    private onClose() {
        this.removeSelf();
    }



}