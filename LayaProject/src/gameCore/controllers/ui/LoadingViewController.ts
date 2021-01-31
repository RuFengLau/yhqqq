import ViewControllerGeneric from './ViewControllerGeneric';
import UI_LoadingView from '../../../views/GameLoadingUI/UI_LoadingView';
import EventManager from '../../managers/eventManager/EventManager';
import GameEvents from '../../events/GameEvents';
import Platforms, { Platform } from '../../platform/Platforms';


export default class LoadingViewController extends ViewControllerGeneric<UI_LoadingView> {
    public get URL(): string {
        return UI_LoadingView.URL;
    }
    public init() {
        super.init();
        this.bind();
    }

    private bind() {
        //this.view.m_LoadingBar.value = 0;
        EventManager.inst.AddEventListener(GameEvents.ON_LOAD_PROGRESS_EVENT, this, this.loadProgress);
    }

    private loadProgress(p) {
        this.view.m_LoadingBar.tweenValue(Math.ceil(p),0.35);
    }
}