import MathHelper from '../plugins/tools/MathHelper';
import LayaScript3D from './LayaScript3D';

/**
 * 左右拖动物体旋转组件
 */
export default class RotateTargetComponent extends LayaScript3D {
    /**旋转速度 */
    public rotateSpeed: number = 0.05;
    public pause: boolean = false;

    private dragContainer: any;
    private distance: number = 5;
    private downX: number = 0;
    private downY: number = 0;
    private isDown: boolean = false;
    private mouseX: number = 0;
    private mouseY: number = 0;
    private xSpeed: number = 120.0;
    private ySpeed: number = 120.0;
    private distanceMin: number = .5;
    private distanceMax: number = 15;
    private mouseScrollWheel: number = 0;

    onAwake() {
        super.onAwake();
    }


    onLateUpdate() {
        if (this.pause) {
            return;
        }
        if (this.gameObject != null && this.isDown) {
            this.rotateObject();
        }
    }

    onDestroy() {
        super.onDestroy();
        this.removeEvents();
    }

    /**
     * 设置拖动容器
     * @param area 容器
     */
    public setDrag(area: any) {
        this.dragContainer = area;
        this.initEvents();
    }

    private rotateObject() {
        let delta = Laya.timer.delta * 0.001;
        this.distance = MathHelper.clamp(this.distance - this.mouseScrollWheel * 5, this.distanceMin, this.distanceMax);
        let f = this.mouseX * this.xSpeed * this.distance * this.rotateSpeed * delta;
        this.gameObject.transform.rotate(new Laya.Vector3(0, f, 0), false, false);
        //console.log(this.mouseX * this.xSpeed * this.distance * this.rotateSpeed * delta);
        this.mouseX = 0;
        this.mouseY = 0;
        
    }

    private initEvents() {
        this.dragContainer.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDownEvent);
        this.dragContainer.on(Laya.Event.MOUSE_UP, this, this.onMouseUpEvent);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUpEvent);
        //this.dragContainer.on(Laya.Event.MOUSE_OUT, this, this.onMouseUpEvent);
    }

    private removeEvents() {
        if (this.dragContainer) {
            this.dragContainer.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDownEvent);
            this.dragContainer.off(Laya.Event.MOUSE_UP, this, this.onMouseUpEvent);
            //this.dragContainer.off(Laya.Event.MOUSE_OUT, this, this.onMouseUpEvent);
        }
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMoveEvent);
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onMouseUpEvent);
    }

    private onMouseDownEvent() {
        if (this.pause) {
            return;
        }
        this.isDown = true;
        this.downX = Laya.MouseManager.instance.mouseX;
        this.downY = Laya.MouseManager.instance.mouseY;
        Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMoveEvent);
    }

    private onMouseUpEvent() {
        if (this.pause) {
            return;
        }
        this.isDown = false;
        this.mouseX = 0;
        this.mouseY = 0;
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMoveEvent);
    }

    private onMouseMoveEvent() {
        if (this.pause) {
            return;
        }
        
        if (this.isDown) {
            this.mouseX = Laya.MouseManager.instance.mouseX - this.downX;
            this.mouseY = Laya.MouseManager.instance.mouseY - this.downY;
            this.downX = Laya.MouseManager.instance.mouseX;
            this.downY = Laya.MouseManager.instance.mouseY;
        }
    }
}



