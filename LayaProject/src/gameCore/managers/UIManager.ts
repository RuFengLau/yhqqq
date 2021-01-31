import ViewController from "../controllers/ui/ViewController";
import { Toast } from "../controllers/ui/Toast";
import Platforms, { Platform } from "../platform/Platforms";
import PlatformConfig from "../platform/PlatformConfig";
import { TextureScreenData } from "./simpleSplashScreen/TextureScreenData";
import SimpleSplashScreen from "./simpleSplashScreen/SimpleSplashScreen";
import NativeAdViewController from '../controllers/ui/NativeAdViewController';
import UI_FadeView from "../../views/GameCommandUI/UI_FadeView";
// import GameLoadingViewController from "../../gameLogic/controllers/ui/GameLoadingViewController";

/**
 * UI管理器
 * @author FengLau
 */

export default class UIManager {
    private static _inst: UIManager;
    public static get inst(): UIManager {
        if (this._inst == null) {
            this._inst = new UIManager();
        }
        return this._inst;
    }
    //页面
    private views: Array<any> = new Array();
    //游戏层
    public gameViewContainer: fairygui.GComponent;
    //UI层
    public uiViewContainer: fairygui.GComponent;
    //放置一些顶层UI
    public topViewContainer: fairygui.GComponent;

    //渐变 UI
    public fadeViewContainer: fairygui.GComponent;


    /**记录打开次数 */
    private record: Array<{ name: string, count: number }> = [];
    private fadeView: UI_FadeView;
    public init() {
        Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
        this.gameViewContainer = new fairygui.GComponent();
        this.gameViewContainer.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        this.uiViewContainer = new fairygui.GComponent();
        this.uiViewContainer.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        this.topViewContainer = new fairygui.GComponent();
        this.topViewContainer.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        this.fadeViewContainer = new fairygui.GComponent();
        this.fadeViewContainer.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        fairygui.GRoot.inst.addChild(this.gameViewContainer);
        fairygui.GRoot.inst.addChild(this.uiViewContainer);
        fairygui.GRoot.inst.addChild(this.topViewContainer);
        fairygui.GRoot.inst.addChild(this.fadeViewContainer);
    }

    public addFadeView() {
        this.fadeView = fairygui.UIPackage.createObjectFromURL(UI_FadeView.URL) as UI_FadeView;
        this.fadeView.setSize(Laya.stage.width, Laya.stage.height);
        this.fadeViewContainer.addChild(this.fadeView);
        this.fadeView.visible = false;
    }

    public doFadeIn(complete: Laya.Handler) {
        this.fadeView.visible = true;
        this.fadeView.touchable = true;
        this.fadeView.m_fadeIn.play(Laya.Handler.create(this,()=>{
            complete && complete.run();
            UIManager.inst.doFadeOut();
        }));
    }

    public doFadeOut(){
        this.fadeView.m_fadeOut.play(Laya.Handler.create(this,()=>{
            this.fadeView.visible = false;
            this.fadeView.touchable = false;
        }));
    }

    /**
	* 根据名字获取页面
	*/
    public getView(name: string): ViewController {
        for (var i = 0; i < this.views.length; i++) {
            if (name === this.views[i].name) {
                return this.views[i].viewController;
            }
        }

        return null;
    }

    /**
     * 显示页面
     * @param viewController 页面控制器
     */
    public showPopupView(viewController: ViewController): void {
        this.views.push({ name: viewController.ControllerName, viewController: viewController });
        if (this.checkRecord(viewController.ControllerName)) {
            this.addRecordCount(viewController.ControllerName);
        } else {
            this.addRecord(viewController.ControllerName);
        }
    }


    /**
     * 获取页面显示次数
     * @param name 
     */
    public getViewRecordCount(name: string): number {
        for (let index = 0; index < this.record.length; index++) {
            const viewInfo = this.record[index];
            if (viewInfo.name == name) {
                return viewInfo.count;
            }
        }
        return 0;
    }

    /**
     * 隐藏页面
     * @param name 根据名字隐藏页面
     */
    public hidePopupView(name: string) {
        let index = -1;
        for (var i = 0; i < this.views.length; i++) {
            if (name == this.views[i].name) {
                var viewC: ViewController = this.views[i].viewController;
                viewC.DismissViewController(true);
                index = i;
            }
        }
        if (index != -1) {
            this.views.splice(index, 1);
        }
    }

    /**
     * 显示Loading
     * @param title 标题
     */
    public showLoading(title: string = "请稍等") {
        //TODO.
    }

    /**
     * 隐藏Loading
     */
    public hideLoading() {
        //TODO.
    }

    /**
     * 显示Toast
     * @param title 标题
     * @param duration 时间
     */
    public showToast(title: string, duration: number = 3000, mask: boolean = false) {
        // if (title == "观看完整视频即可获得奖励") {
        //     return;
        // }
        Toast.inst.show(title, mask);
    }

    /**
     * 对话框
     * @param title 标题
     * @param content 内容
     * @param caller 接收者
     * @param callback 返回
     */
    public showModal(title: string, content: string, caller: any, callback: (confirm: boolean) => void) {
        //TODO.
    }

    /**显示原生广告 */
    public showNativeAd() {
        if (PlatformConfig.inst.isReview()) {
            return;
        }
        Platforms.inst.onShowNativeAd((ad) => {
            let view = new NativeAdViewController();
            UIManager.inst.showPopupView(view);
            view.setData(ad);
        });
    }

    public showNativeIconButton(btn) {
        //原生小ICON
        btn.visible = false;
        //新手完成后
        if (Platforms.inst.platform == Platform.oppo_h5) {
            Platforms.inst.onShowNativeAd((ad) => {
                btn.visible = true;
                console.log("addata:", JSON.stringify(ad));
                let adId: string = ad.adId;
                let title: string = ad.title;
                let desc: string = ad.desc;
                let icon: string = "";
                if (Platforms.inst.platform == Platform.vivo_h5) {
                    if (ad.icon && ad.icon.length > 0) {
                        icon = ad.icon;
                    } else if (ad.imgUrlList) {
                        icon = ad.imgUrlList[0];
                    }
                } else if (Platforms.inst.platform == Platform.oppo_h5) {
                    if (ad.iconUrlList.length > 0) {
                        icon = ad.iconUrlList[0];
                    } else if (ad.imgUrlList) {
                        icon = ad.imgUrlList[0];
                    }
                }

                btn.icon = icon;
                btn.title = title;
                btn.onClick(this, () => {
                    btn.visible = false;
                    Platforms.inst.onNativeAdClick(adId);
                });
            });
        }
    }

    public showSplashScreen() {
        let screenDatas: Array<TextureScreenData> = new Array<TextureScreenData>();
        let screenData = new TextureScreenData();
        screenData.backgroundImage = "res/images/splash.jpg";
        screenData.duration = 2;
        screenDatas.push(screenData);
        SimpleSplashScreen.inst.setData(screenDatas);
    }

    public loadingView: ViewController;
    public createLoadingView(view: ViewController) {
        this.loadingView = view;
        this.topViewContainer.addChild(this.loadingView.View);
        this.loadingView.View.visible = false;

    }
    public showGameLoading(callback:()=>void,anim:boolean = true) {
        if (this.loadingView == null) {
            // this.loadingView = new GameLoadingViewController();
            // this.topViewContainer.addChild(this.loadingView.View);
            // this.loadingView.View.visible = false;
        }
        if (this.loadingView && anim) {
            this.loadingView.View.visible = true;
            this.loadingView.View.alpha = 0;
            Laya.Tween.to(this.loadingView.View,{alpha:1},500,Laya.Ease.linearNone,Laya.Handler.create(this,()=>{
                callback && callback();
            }));
        }else{
            callback && callback();
        }
    }

    public hideGameLoading(delay:number = 1000,callbakc:Laya.Handler = null) {
        if (this.loadingView) {
            Laya.Tween.to(this.loadingView.View,{alpha:0},500,Laya.Ease.linearNone,Laya.Handler.create(this,()=>{
                this.loadingView.View.visible = false;
                callbakc && callbakc.run();
            }),delay);
        }else{
            callbakc && callbakc.run();
        }
    }

    private addRecord(name: string) {
        this.record.push({ name: name, count: 1 });
    }

    private checkRecord(name): boolean {
        for (let index = 0; index < this.record.length; index++) {
            const viewInfo = this.record[index];
            if (viewInfo.name == name) {
                return true;
            }
        }
        return false;
    }

    private addRecordCount(name: string) {
        for (let index = 0; index < this.record.length; index++) {
            const viewInfo = this.record[index];
            if (viewInfo.name == name) {
                viewInfo.count++;
            }
        }
    }

}