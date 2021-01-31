import HudManager from "./HudManager";

export default class HudObject extends Laya.Script3D {
    public view: fairygui.GComponent;
    public target: Laya.Sprite3D;
    public offset: Laya.Vector3;
    private hudPos: Laya.Vector4 = new Laya.Vector4();
    private once: boolean = false;
    private onceFollow: boolean = false;
    private offsetTemp: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
    constructor() {
        super();
    }

    public bind(view: fairygui.GComponent, target: Laya.Sprite3D, offset: Laya.Vector3, once: boolean = false) {
        this.view = view;
        this.target = target;
        this.offset = offset;
        this.once = once;
    }

    public show() {
        this.view.visible = true;
    }

    public hide() {
        this.view.visible = false;
    }


    public update() {
        if (this.target.transform != null) {
            if (this.view) {
                Laya.Vector3.add(this.target.transform.position, this.offset, this.offsetTemp);
                HudManager.inst.camera.viewport.project(this.offsetTemp, HudManager.inst.camera.projectionViewMatrix, this.hudPos);
                this.view.setXY((this.hudPos.x - this.view.width * 0.5) * Laya.stage.clientScaleX, (this.hudPos.y - this.view.height + this.offset.y) * Laya.stage.clientScaleY);
            }

        }
    }

}