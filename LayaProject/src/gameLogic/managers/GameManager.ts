import GameEngine from '../../gameCore/managers/GameEngine';
import UIManager from '../../gameCore/managers/UIManager';
import ResourcesManager from '../../gameCore/managers/ResourcesManager';
import SoundManager from '../../gameCore/managers/soundManager/SoundManager';
import {SoundType } from '../../gameCore/models/GameEnum';
import Platforms, { Platform } from '../../gameCore/platform/Platforms';
import TimeManager from '../../gameCore/managers/timeManager/TimeManager';
import LocalStorageManager from '../../gameCore/managers/LocalStorageManager';
import UI_LoadingView from '../../views/GameLoadingUI/UI_LoadingView';
import YMSDK from '../../gameCore/ymsdk/YMSDK';
import StartViewController from '../controller/ui/StartViewController';
import TruckGameManager from './TruckGameManager';
/**
 * 游戏管理类
 */
export default class GameManager {
    private static _inst: GameManager;
    public static get inst(): GameManager {
        if (this._inst == null) {
            this._inst = new GameManager();
        }
        return this._inst;
    }

    public async init() {
        Laya.Shader3D.debugMode = false;//开启Shader3D调试
        GameEngine.inst.isLocal = true;//读取本地资源
        GameEngine.inst.useZipAssets = false;//启用zip加载
        GameEngine.inst.platform = Platform.weixin_h5;//设置渠道,渠道配置表在 bin/localRes/data/platformConfigs.json
        Platforms.inst.init();//初始化Platform
        if (GameEngine.inst.useZipAssets) {
            await ResourcesManager.inst.readHashFile();
            let url = "";
            // switch (Platforms.inst.platform) {
            //     case Platform.weixin_h5:
            //         url = "https://projects-1257427557.file.myqcloud.com/yxwd/h5Assets/wx/zip/downloadFileList_9.json";
            //         break;
            //     case Platform.vivo_h5:
            //         url = "https://projects-1257427557.file.myqcloud.com/yxwd/h5Assets/vivo/zip/downloadFileList_6.json";
            //         break;
            //     case Platform.toutiao_h5:
            //         url = "https://projects-1257427557.file.myqcloud.com/yxwd/h5Assets/toutiao/zip/downloadFileList_9.json";
            //         break;
            //     case Platform.oppo_h5:
            //         url = "https://projects-1257427557.file.myqcloud.com/yxwd/h5Assets/oppo/zip/downloadFileList_2.json";
            //         break;
            //     default:
            //         break;
            // }
            await ResourcesManager.inst.loadFiles(url);
            ResourcesManager.inst.fileConfigs = Laya.loader.getRes(url);
        }
        //引擎初始化
        await GameEngine.inst.init();
        this.initConfigs();
    }

    private async initConfigs() {
        //#region 使用说明
        //音频注册：SoundManager.inst.registerSound(SoundType.BGM, "res/sounds/bgm.mp3");
        //背景音使用：SoundManager.inst.PlayMusic(SoundType.BGM);
        //音效使用：SoundManager.inst.Play(SoundType.ChangeSkinSE)

        //数据保存请写到：User.ts 增加对应的属性
        //保存数据：DataManager.inst.save();
        //读取数据：DataManager.inst.load();
        //所有配置调用请写到DataManager里

        //事件发送：EventManager.inst.SendEvent(CustomEvents.ON_DEMO_EVENT);
        //事件接收：EventManager.inst.AddEventListener(CustomEvents.ON_DEMO_EVENT,this,this.onDemoEvent);
        //事件移除：EventManager.inst.RemoveEventListener(CustomEvents.ON_DEMO_EVENT,this,this.onDemoEvent);
        //事件名：请写到CustomEvents.ts里面

        //UI调用(需要自行创建controller来管理)：UIManager.inst.showPopupView(new StartViewController());
        //UI移除(利用view页面的URL来移除)：UIManager.inst.hidePopupView(UI_StartView.URL);

        //游戏的scene用这个来addChild  UIManager.inst.gameViewContainer.displayObject.addChild("你的3d场景");
        //游戏物体可以继承 LayaScript3D

        //#endregion
        this.addSounds();//通用音频注册
        //配置UI和数据
        let urls = [];
        
        urls.push({ url: "res/ui/GameCommandUI.bin", type: Laya.Loader.BUFFER });
        urls.push({ url: "res/ui/GameCommandUI_atlas0.png", type: Laya.Loader.IMAGE });

        urls.push({ url: "res/ui/GameAdUI.bin", type: Laya.Loader.BUFFER });
        urls.push({ url: "res/ui/GameAdUI_atlas0.png", type: Laya.Loader.IMAGE });

        urls.push({ url: "res/ui/GameUI.bin", type: Laya.Loader.BUFFER });
        urls.push({ url: "res/ui/GameUI_atlas0.png", type: Laya.Loader.IMAGE });

        urls.push({ url: "res/data/configs.json", type: Laya.Loader.JSON });
        urls.push({ url: "res/data/shader.json", type: Laya.Loader.JSON });

        ResourcesManager.inst.registerGameUIInfo("res/ui/GameUI", urls);

        //公用模型资源
        let urls2 = [];
        urls2.push( "sub1/res/LayaScene_map0/Conventional/map0.ls");
        urls2.push( "sub1/res/cars/Cars.lh");
        urls2.push( "sub1/res/LayaScene_cargos/Conventional/cargos.lh");
        ResourcesManager.inst.registerModels(urls2);
        GameEngine.inst.initAsync(() => {
            GameEngine.inst.debug("初始化游戏");
            LocalStorageManager.inst.enterGame();
            //this.compileShader();//预编译Shader
            TimeManager.inst.init();//时间
            //Behavior3Manager.inst.init();//AI行为树
            //CheckInManager.inst.init();//签到
            //GuideManager.inst.init();//引导
            UIManager.inst.addFadeView();
            //HudManager.inst.init();//HUD
            Laya.timer.once(200, this, () => { SoundManager.inst.PlayMusic(SoundType.BGM); });//延迟播放音乐
            //延迟1秒进入游戏
            Laya.timer.once(1000, this, () => {
                UIManager.inst.doFadeIn(Laya.Handler.create(this, () => {
                    UIManager.inst.hidePopupView(UI_LoadingView.URL);
                    Laya.loader.clearRes("localRes/ui/GameLoadingUI_atlas_nqsz4g.jpg");//首屏loading贴图释放
                    if(Platforms.inst.platform == Platform.weixin_h5){
                        YMSDK.inst.showStartIconListView((success:boolean)=>{
                            if(success){
                                this.showStartView();
                            }
                        });
                    }else{
                        this.showStartView();
                    }
                }));
            });
        });
    }

    private showStartView() {
        // UIManager.inst.showPopupView(new StartViewController());
        // GameConfig.startScene && Laya.Scene.open(GameConfig.startScene);
        UIManager.inst.showPopupView(new StartViewController());
        TruckGameManager.instance().loadLevel();
    }

    //预编译shader
    private compileShader() {
        let data = Laya.loader.getRes("res/data/shader.json");
        for (let index = 0; index < data.length; index++) {
            const obj = data[index];
            Laya.Shader3D.compileShaderByDefineNames(obj.shaderName, obj.passIndex, obj.subShaderIndex, obj.defineNames);
        }
    }

    /**增加通用声效 */
    private addSounds() {
        //Native 音效需要用wav或者ogg，背景音乐要用mp3
        let soundExtendtion = Laya.Browser.window.conch ? ".ogg" : ".mp3";
        //注册声音
        SoundManager.inst.registerSound(SoundType.BGM, "res/sounds/bgm.mp3");
        SoundManager.inst.registerSound(SoundType.SE_BuyItem, "res/sounds/buyButtonSE.ogg");
        SoundManager.inst.registerSound(SoundType.SE_Win, "res/sounds/win.ogg");
        SoundManager.inst.registerSound(SoundType.SE_Lose, "res/sounds/fail.ogg");
    }

    
}