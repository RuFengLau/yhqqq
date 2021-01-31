import ViewControllerGeneric from "../../../gameCore/controllers/ui/ViewControllerGeneric";
import CustomEventDispatcher from "../../../script/core/CustomEventDispatcher";
import TruckGameManager from "../../managers/TruckGameManager";
import UI_ResultView from "../../../views/GameUI/UI_ResultView";
import DataManager from "../../../gameCore/managers/DataManager";
import PlatformAdManager from "../../../gameCore/platform/PlatformAdManager";
import Platforms, { Platform } from "../../../gameCore/platform/Platforms";
import YMSDK from "../../../gameCore/ymsdk/YMSDK";
import SoundManager from "../../../gameCore/managers/soundManager/SoundManager";
import { SoundType } from "../../../gameCore/models/GameEnum";
import PlatformConfig from "../../../gameCore/platform/PlatformConfig";

export default class ResultViewController extends ViewControllerGeneric<UI_ResultView> {
    public get URL(): string {
        return UI_ResultView.URL;
    }

    private count:number = 5;

    public init() {
        this.onViewWillDestory = Laya.Handler.create(this, this.unbind);
        this.onViewAdded = Laya.Handler.create(this, this.bind);
        super.init();
    }

    private unbind() {
        Laya.timer.clear(this,this.onCountTime);
        YMSDK.inst.hideResultIconListView();
    }

    private bind() {
        this.view.m_GetCoinBtn.onClick(this, this.onGetCoinBtnClick);
        this.view.m_FreeGetCoinBtn.onClick(this, this.onFreeGetCoinBtnClick);

        this.view.m_ContinueBtn.onClick(this, this.onContinuBtnClick);
        this.view.m_NextBtn.onClick(this,this.onNextBtnClick);

        this.view.m_State.selectedIndex = TruckGameManager.instance().isWin ? 0 : 1;
        this.view.m_CoinLabel.text = "+100";
        TruckGameManager.instance().loadLevel();

        if(TruckGameManager.instance().isWin == false){
            Laya.timer.loop(1000,this,this.onCountTime);
            SoundManager.inst.Play(SoundType.SE_Lose);
        }else{
            SoundManager.inst.Play(SoundType.SE_Win);
        }

        this.view.m_adState.selectedIndex = PlatformConfig.inst.currentPlatform.canAd?1:0;

        if (Platforms.inst.platform != Platform.weixin_h5) {
            PlatformAdManager.inst.showBanner();
        } else {
            YMSDK.inst.showResultIconListView((s) => {

            });
        }
    }

    private onCountTime() {
        this.count--;
        this.view.m_CountTimeLabel.text = this.count.toString();
        if(this.count == 0){
            this.onContinuBtnClick();
        }
    }

    private onFreeGetCoinBtnClick() {
        Laya.timer.clear(this,this.onCountTime);
        PlatformAdManager.inst.showRewardedVideo((success:boolean)=>{
            if(success){
                let reward = 200;
                DataManager.inst.addCoins(reward);
                this.removeAfter(()=>{
                    CustomEventDispatcher.instance.event("gameUI");
                });
            }
            Laya.timer.loop(1000,this,this.onCountTime);
        });
    }

    private onGetCoinBtnClick() {
        this.removeAfter(()=>{
            CustomEventDispatcher.instance.event("gameUI");
        });
        CustomEventDispatcher.instance.event("gameUI");
    }

    private onNextBtnClick() {
        Laya.timer.clear(this,this.onCountTime);
        PlatformAdManager.inst.showRewardedVideo((success:boolean)=>{
            if(success){
                DataManager.inst.clearStage();
                TruckGameManager.instance().loadLevel();
                this.removeAfter(()=>{
                    CustomEventDispatcher.instance.event("gameUI");
                });
            }else{
                Laya.timer.loop(1000,this,this.onCountTime);
            }
        });
        
    }

    private onContinuBtnClick() {
        this.removeAfter(()=>{
            CustomEventDispatcher.instance.event("gameUI");
        });
    }

    private removeAfter(callback: () => void) {
        if (YMSDK.inst.enabled) {
            if (Platforms.inst.platform == Platform.weixin_h5) {
                YMSDK.inst.showPowerView((success: boolean) => {
                    if (success) {
                        this.removeSelf();
                        Laya.timer.once(1000,this,()=>{
                            callback && callback();
                        });
                       
                    }
                });
            } else {
                this.removeSelf();
                Laya.timer.once(1000,this,()=>{
                    callback && callback();
                });
            }
        } else {
            this.removeSelf();
            Laya.timer.once(1000,this,()=>{
                callback && callback();
            });
        }

    }

}