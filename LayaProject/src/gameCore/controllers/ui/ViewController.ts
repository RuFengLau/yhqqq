import UIManager from "../../managers/UIManager";
import EventManager from "../../managers/eventManager/EventManager";

/**
 * ...
 * @author FengLau
 * 页面控制器
 */
export default abstract class ViewController {


    public abstract get URL():string;

    public View: fairygui.GComponent;
    public ControllerName: string = "";
    /**
     * 显示后
     */
    public onViewAdded: Laya.Handler;
    /**
     * 移除前
     */
    public onViewWillDestory: Laya.Handler;
    public constructor() {
        this.init();
    }

    public doScaleIn() {
        this.View.setPivot(0.5, 0.5);
        this.View.setScale(0, 0);
        fairygui.GTween.to(0, 1, 0.35)
            .onUpdate((tweener: fairygui.GTweener) => {
                this.View.setScale(tweener.value.x, tweener.value.x);
            }, this)

    }

    public removeSelf() {
        UIManager.inst.hidePopupView(this.ControllerName);
    }

    public init() {
        // if (viewURL === "") {
        //     console.error("必须传入页面URL");
        //     return;
        // }
        this.ControllerName = this.URL;
        this.View = fairygui.UIPackage.createObjectFromURL(this.URL) as fairygui.GComponent;
        this.View.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        this.View.on(Laya.Event.ADDED, this, this.onViewAddedEvent);
        UIManager.inst.uiViewContainer.addChild(this.View);
    }

    private onViewAddedEvent() {
        this.View.off(Laya.Event.ADDED, this, this.onViewAddedEvent);
        Laya.timer.callLater(this, () => {
            if (this.onViewAdded) {
                this.onViewAdded.run();
            }
        });
    }

    public PresentViewController(): void {
        this.View.displayObject.visible = true;
    }

    public DismissViewController(destroy: boolean = false) {
        Laya.timer.clearAll(this);
        EventManager.inst.RemoveEventListenerWithCaller(this);
        if (this.onViewWillDestory) {
            this.onViewWillDestory.run();
        }
        if (destroy) {
            this.onViewAdded = null;
            this.onViewWillDestory = null;
            UIManager.inst.uiViewContainer.removeChild(this.View, destroy);
        } else {
            this.View.displayObject.visible = false;
        }

    }
}