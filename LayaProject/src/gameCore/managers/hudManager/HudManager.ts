import HudObject from "./HudObject";
import UIManager from "../UIManager";

export default class HudManager {
    private static instance: HudManager;

    public static get inst(): HudManager {
        if (this.instance == null) {
            this.instance = new HudManager();
        }
        return this.instance;
    }

    public camera: Laya.Camera;
    public hudRoot: fairygui.GComponent;
    private hudObjects: Array<HudObject> = new Array<HudObject>();
    public init() {
        Laya.timer.frameLoop(1, this, this.update);
        this.hudRoot = new fairygui.GComponent();
        this.hudRoot.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
        
        //fairygui.GRoot.inst.addChild(this.hudRoot);
    }

    private update() {
        if(this.camera == null){
            return;
        }
        if (this.hudObjects.length > 0) {
            for (var i = 0; i < this.hudObjects.length; i++) {
                this.hudObjects[i].update();
            }
        }
    }

    public addHud(hudObject: HudObject) {
        for (let index = 0; index < this.hudObjects.length; index++) {
            if (hudObject == this.hudObjects[index]) {
                console.log("已有");
                return;
            }

        }
        this.hudObjects.push(hudObject);
        if (hudObject.view) {
            this.hudRoot.addChild(hudObject.view);
            UIManager.inst.uiViewContainer.addChild(this.hudRoot);
        }

    }

    public removeHud(hudObject: HudObject) {
        for (var i = 0; i < this.hudObjects.length; i++) {
            if (hudObject == this.hudObjects[i]) {
                //fairygui.GRoot.inst.removeChild(hudObject.view, true);
                this.hudRoot.removeChild(hudObject.view, true);
                hudObject.view = null;
                this.hudObjects.slice(i, 1);
            }
        }
    }
}