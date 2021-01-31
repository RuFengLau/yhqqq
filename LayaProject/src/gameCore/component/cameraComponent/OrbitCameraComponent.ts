/*
* OrbitCamera 360观察物体相机
* unity需要取巧处理，将摄像机放到一个空的GameObject里
*/

import MathHelper from "../../plugins/tools/MathHelper";
import LayaScript3D from "../LayaScript3D";

export class OrbitCameraComponent extends LayaScript3D {

    private readonly factor: number = 0.1;
    /**设置目标 */
    public Target: Laya.Sprite3D;
    /**设置旋转速度 */
    public RotateSpeed: number = 2;
    /**设置缓冲时间 */
    public SmoothTime: number = 1;
    public YMinLimit: number = -180;
    public YMaxLimit: number = 180;
    /**距离 */
    public Distance: number = 8;
    public DistanceMin: number = 5;
    public DistanceMax: number = 16;
    /**暂停 */
    public Pause: boolean = false;
    public isTweening = false;
    public Radius: number = 0;

    private modleParent: Laya.Transform3D;

    private AngleH: number = 0;
    private AngleV: number = 0;
    private downX: number = 0;
    private downY: number = 0;
    private isDown: boolean = false;
    private mouseX: number = 0;
    private mouseY: number = 0;
    private isMoved: boolean = false;
    private tmpOutRotation: Laya.Quaternion = new Laya.Quaternion(0, 0, 0, 0);
    private tmp2OutRotation: Laya.Quaternion = new Laya.Quaternion(0, 0, 0, 0);
    private lastDistance: number = 0;
    private targetOffsetMoveY: number = 0;
    private area: any;

    onAwake() {
        super.onAwake();
        this.modleParent =(this.gameObject.parent as Laya.Sprite3D).transform;
        var angles = this.modleParent.localRotationEuler;
        this.AngleH = angles.y;
        this.AngleV = angles.x;
        this.initEvents();
    }

    onDestroy(): void {
        super.onDestroy();
        this.removeEvents();
    }

    public getRotation(): Laya.Quaternion {
        return this.modleParent.localRotation;
    }

    public setRotation(h: number, v: number, useTween: boolean = false) {
        let t = new Laya.Quaternion(this.modleParent.localRotation.x, this.modleParent.localRotation.y, this.modleParent.localRotation.z, this.modleParent.localRotation.w);
        this.AngleH = h;
        this.AngleV = v;
        Laya.Quaternion.createFromYawPitchRoll(this.AngleH * 0.005 * this.RotateSpeed, this.AngleV * 0.005 * this.RotateSpeed, 0, this.tmpOutRotation);
        if (useTween) {
            this.isTweening = true;
            fairygui.GTween.to4(t.x, t.y, t.z, t.w, this.tmpOutRotation.x, this.tmpOutRotation.y, this.tmpOutRotation.z, this.tmpOutRotation.w, 1)
                .onUpdate(this.onTweenRotationUpdate, this)
                .onComplete(this.onTweenRotationCompelte, this)
        } else {
            this.modleParent.localRotation = this.tmpOutRotation;
        }
    }
    private tweenRotation = new Laya.Quaternion(0, 0, 0, 0);
    private onTweenRotationUpdate(tween: fairygui.GTweener) {
        this.tmpOutRotation = new Laya.Quaternion(tween.value.x, tween.value.y, tween.value.z, tween.value.w);
        this.modleParent.localRotation = this.tmpOutRotation;
    }

    private onTweenRotationCompelte() {
        this.isTweening = false;
        this.Pause = false;
    }

    up: Laya.Vector3 = new Laya.Vector3();
    onUpdate(): void {
        if (this.Pause || this.isTweening) {
            return;
        }

        this.modleParent.getUp(this.up);
        if (this.up.y > 0) {
            if (Laya.Browser.window.conch) {
                this.AngleH += this.mouseX;
            } else {
                this.AngleH -= this.mouseX;
            }
        } else {
            if (Laya.Browser.window.conch) {
                this.AngleH -= this.mouseX;
            } else {
                this.AngleH += this.mouseX;
            }
        }
        if (Laya.Browser.window.conch) {
            this.AngleV += this.mouseY;
        } else {
            this.AngleV -= this.mouseY;
        }
        this.mouseX = 0;
        this.mouseY = 0;
    }

    onLateUpdate(): void {
        if (this.Pause || this.isTweening) { return; }
        if (this.Target != null) {

            this.Target.transform.localPosition = new Laya.Vector3(0, this.targetOffsetMoveY, 0);
            this.camereRotate();
            //this.cameraZoom();
        }
    }

    private camereRotate() {
        if (this.Pause || this.isTweening) {
            return;
        }
        //if (this.isDown) {
        //this.AngleV = MathHelper.Clamp(this.AngleV, this.YMinLimit, this.YMaxLimit);
        Laya.Quaternion.createFromYawPitchRoll(this.AngleH * 0.005 * this.RotateSpeed, this.AngleV * 0.005 * this.RotateSpeed, 0, this.tmpOutRotation);
        Laya.Quaternion.slerp(this.modleParent.localRotation, this.tmpOutRotation, 0.1, this.tmp2OutRotation);
        this.modleParent.localRotation = this.tmp2OutRotation;
        //}

    }

    private cameraZoom() {
        if (this.Pause || this.isTweening) {
            return;
        }
        if (this.transform.localPosition.z != this.Distance) {
            this.transform.localPosition = new Laya.Vector3(0, this.targetOffsetMoveY, this.Distance);
        }
    }
    
    /**
     * 设置某个容器点击
     * @param area 
     */
    public setDrag(area: any) {
        this.area = area;
        this.removeEvents();
        this.area.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDownHandler);
        this.area.on(Laya.Event.MOUSE_UP, this, this.onMouseUpHandler);
        this.area.on(Laya.Event.MOUSE_WHEEL, this, this.onMouserWheelHandler);
    }

    private initEvents() {
        Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDownHandler);
        Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onMouseUpHandler);
        Laya.stage.on(Laya.Event.MOUSE_WHEEL, this, this.onMouserWheelHandler);
    }

    private removeEvents() {
        if (this.area) {
            this.area.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDownHandler);
            this.area.off(Laya.Event.MOUSE_UP, this, this.onMouseUpHandler);
            this.area.off(Laya.Event.MOUSE_WHEEL, this, this.onMouserWheelHandler);
        }

        Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDownHandler);
        Laya.stage.off(Laya.Event.MOUSE_UP, this, this.onMouseUpHandler);
        Laya.stage.off(Laya.Event.MOUSE_WHEEL, this, this.onMouserWheelHandler);
    }


    onMouserWheelHandler(e: Laya.Event) {
        if (this.Pause || this.isTweening) {
            return;
        }
        var distance: number = this.lastDistance + e.delta;
        this.Distance -= (distance - this.lastDistance) * this.factor;
        this.Distance = MathHelper.clamp(this.Distance, this.DistanceMin, this.DistanceMax);
        this.lastDistance = distance;
        this.targetOffsetMoveY = -(this.Distance - 8) / this.DistanceMin * this.Radius;
        this.targetOffsetMoveY = MathHelper.clamp(this.targetOffsetMoveY, 0, this.Radius);
    }

    onMouseDownHandler(e: Laya.Event) {
        if (this.Pause || this.isTweening) {
            return;
        }
        if (e.touches) {
            var touches: Array<any> = e.touches;
            if (touches && touches.length == 2) {
                this.lastDistance = this.getDistance(touches);
                Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMoveHandler);
            } else {
                this.downX = e.stageX;
                this.downY = e.stageY;
                Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMoveHandler);
            }
        } else {
            this.downX = Laya.MouseManager.instance.mouseX;
            this.downY = Laya.MouseManager.instance.mouseY;
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMoveHandler);
        }

        this.isDown = true;
        this.isMoved = false;

    }

    onMouseUpHandler() {
        if (this.Pause || this.isTweening) {
            return;
        }
        this.isDown = false;
        this.isMoved = false;
        this.mouseX = 0;
        this.mouseY = 0;
        Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMoveHandler);
    }

    onMouseMoveHandler(e: Laya.Event) {
        if (this.Pause || this.isTweening) {
            return;
        }
        if (e.touches) {
            var touches: Array<any> = e.touches;
            if (touches && touches.length == 2) {
                var distance: number = this.getDistance(e.touches);
                const factor: number = 0.01;
                this.Distance -= (distance - this.lastDistance) * factor;
                this.Distance = MathHelper.clamp(this.Distance, this.DistanceMin, this.DistanceMax);
                this.lastDistance = distance;
                this.targetOffsetMoveY = -(this.Distance - 8) / this.DistanceMin * this.Radius;
                this.targetOffsetMoveY = MathHelper.clamp(this.targetOffsetMoveY, 0, this.Radius);
            } else {
                if (this.isDown) {
                    this.mouseX = e.stageX - this.downX;
                    this.mouseY = e.stageY - this.downY;
                    if (this.downX !== Laya.MouseManager.instance.mouseX || this.downY !== Laya.MouseManager.instance.mouseY) {
                        this.isMoved = true;
                    }
                    this.downX = e.stageX;
                    this.downY = e.stageY;
                }
            }
        } else {

            if (this.isDown) {
                this.mouseX = Laya.MouseManager.instance.mouseX - this.downX;
                this.mouseY = Laya.MouseManager.instance.mouseY - this.downY;
                if (this.downX !== Laya.MouseManager.instance.mouseX || this.downY !== Laya.MouseManager.instance.mouseY) {
                    this.isMoved = true;
                }
                this.downX = Laya.MouseManager.instance.mouseX;
                this.downY = Laya.MouseManager.instance.mouseY;
            }
        }
    }

    /**计算两个触摸点之间的距离*/
    private getDistance(points: Array<any>): number {
        var distance: number = 0;
        if (points && points.length == 2) {
            var dx: number = points[0].stageX - points[1].stageX;
            var dy: number = points[0].stageY - points[1].stageY;
            distance = Math.sqrt(dx * dx + dy * dy);
        }
        return distance;
    }
}