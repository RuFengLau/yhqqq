
import DataManager from "../../managers/DataManager";
import EventManager from "../../managers/eventManager/EventManager";
import GameEngine from "../../managers/GameEngine";
import LocalStorageManager from "../../managers/LocalStorageManager";
import UIManager from "../../managers/UIManager";
import Platforms from "../../platform/Platforms";

export class GuideData {
    public _id: string;
    public key: string;
    public classId:string;
    public type: number;
    public prevId: string;
    public showLoop: number;
    public pageName: string;
    public desc: string;
    public nextId: string;
}

export class GuideSaveData {
    public currentGuideId: string;
    public completeGuides: Array<string>;//存放已完成的新手id
}


/**
 * 新手管理器
 */
export default class GuideManager {
    public static SHOW_GUIDE_EVENT:string = "showGuideEvent";
    public static HIDE_GUIDE_EVENT:string = "hideGuideEvent";
    private static _inst: GuideManager;
    public static get inst(): GuideManager {
        if (this._inst == null) {
            this._inst = new GuideManager();
        }
        return this._inst;
    }
    /**配置数据 */
    public datas: Array<GuideData> = [];
    private saveKey: string = "";
    /**当前新手任务id */
    public currentGuideId: string = "";
    private saveData: GuideSaveData;
    private view: fairygui.GComponent;
    public isShow:boolean = false;
    public init() {
        this.saveKey = LocalStorageManager.inst.guideRecordKey;
        let localData = GameEngine.inst.loadData(this.saveKey);
        console.log("读取本地新手记录:", localData);
        if (localData) {
            this.saveData = localData;
        } else {
            this.saveData = new GuideSaveData();
            this.saveData.currentGuideId = "1";
            this.saveData.completeGuides = [];
            GameEngine.inst.saveData(this.saveKey, this.saveData);
        }
        this.currentGuideId = this.saveData.currentGuideId;
        console.log("新手记录:", this.saveData);
    }
    private otherPage: fairygui.GObject;
    /**
     * 显示新手面板,返回是否完成
     * @param key 
     */
    public showGuide(key: string, otherContainer: fairygui.GComponent = null, point: Laya.Point = null): boolean {
        let data = this.getGuidDataWithKey(key);
        this.isShow = false;
        if (data) {
            if (this.checkComplete(data._id) == false) {
                //显示UI
                if (this.view == null) {
                    this.view = new fairygui.GComponent();
                    this.view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
                    UIManager.inst.topViewContainer.addChild(this.view);
                }
                if (this.view.numChildren > 0) {
                    this.view.removeChildAt(0);
                }
                this.view.visible = true;

                let page = fgui.UIPackage.createObject("GameUI", data.pageName);
                if (otherContainer) {
                    if (this.otherPage == null) {
                        this.otherPage = page;
                        otherContainer.addChild(page);
                    }
                } else {
                    this.view.addChild(page);
                }
                if (point) {
                    page["m_window"].x = point.x - page["m_window"].width * 0.5;
                    page["m_window"].y = point.y - page["m_window"].height;
                }
                page.setSize(this.view.width, this.view.height);
                console.log("显示新手面板:",key);
                EventManager.inst.SendEvent(GuideManager.SHOW_GUIDE_EVENT);
                this.isShow = true;
            } else {
                console.warn(data.desc, "完成");
            }
        } else {
            console.warn("没有该内容");
        }
        return false;
    }

    public finishGuide(key: string) {
        let data = this.getGuidDataWithKey(key);
        if (data) {
            if (this.checkComplete(data._id)) {
                console.warn(key, "已经完成");
                return;
            }
            let datas = this.saveData.completeGuides;
            datas.push(data._id);
            GuideManager.inst.hideGuide();
            if (data.nextId) {
                this.currentGuideId = data.nextId;
                this.saveData.currentGuideId = this.currentGuideId;
            }
            GameEngine.inst.saveData(this.saveKey, this.saveData);
            console.log("完成新手:",key);
            Platforms.inst.sendEvent({ key: "CompleteGuide", data: { uid: DataManager.inst.user.userInfo.openid, guideName: key } });
        } else {
            console.warn("没有", key);
        }
        
    }

    public hideGuide() {
        if (this.view && this.view.numChildren > 0) {
            this.view.removeChildAt(0);
            this.view.visible = false;
        }
        if (this.otherPage) {
            this.otherPage.removeFromParent();
            this.otherPage = null;
        }
        this.isShow = false;
        EventManager.inst.SendEvent(GuideManager.HIDE_GUIDE_EVENT);
    }

    public checkComplete(id: string): boolean {
        let datas = this.saveData.completeGuides;
        for (let index = 0; index < datas.length; index++) {
            const tid = datas[index];
            if (tid == id) {
                return true;
            }
        }
        return false;
    }

    public checkCompleteWithKey(key: string): boolean {
        let datas = this.saveData.completeGuides;
        for (let index = 0; index < datas.length; index++) {
            const tid = datas[index];
            let guideData = this.getGuidDataWithKey(key);
            if (guideData && tid == guideData._id) {
                return true;
            }
        }
        return false;
    }

    public checkCurrent(key: string): boolean {
        let data = this.getGuideDataWithId(this.currentGuideId);
        if (data && data.key == key) {
            return true;
        }
        return false;
    }

    public getCurrentClassId():string{
        let data = this.getGuideDataWithId(this.currentGuideId);
        return data.classId;
    }

    private getGuidDataWithKey(key: string): GuideData {
        for (let index = 0; index < this.datas.length; index++) {
            const d = this.datas[index];
            if (d.key == key) {
                return d;
            }
        }
        return null;
    }

    private getGuideDataWithId(id: string): GuideData {
        for (let index = 0; index < this.datas.length; index++) {
            const d = this.datas[index];
            if (d._id == id) {
                return d;
            }
        }
        return null;
    }
}