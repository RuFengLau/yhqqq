import D3Helper from './D3Helper';
/**
 * 鼠标拖动类
 */
export default class MouseDragHelper {
    public static XY: number = 0;
    public static XZ: number = 1;
    public static YZ: number = 2;

    private static plane: number;
    private static target: Laya.Sprite3D;
    private static startPos: Laya.Vector3;
    private static isDrag: boolean = false;
    private static camera: Laya.Camera;
    private static offsetPos: Laya.Vector2 = new Laya.Vector2();

    private static tv3: Laya.Vector3 = new Laya.Vector3();
    private static tv2: Laya.Vector2 = new Laya.Vector2();
    private static ray: Laya.Ray = new Laya.Ray(new Laya.Vector3(), new Laya.Vector3());

    public static v3ZeroTemp: Laya.Vector3 = new Laya.Vector3(0, 0, 0);

    public static startDrag(obj: Laya.Sprite3D, planeType: number, camera: Laya.Camera): void {
        let me = MouseDragHelper;
        Laya.stage.on(Laya.Event.MOUSE_DOWN, me, me.onMouseDown);
        Laya.stage.on(Laya.Event.MOUSE_MOVE, me, me.onMouseMove);
        Laya.stage.on(Laya.Event.MOUSE_UP, me, me.onMouseUp);
        me.target = obj;
        me.plane = planeType;
        me.isDrag = false;
        me.camera = camera;
        if (camera.orthographic) {
            throw ("未支持正交相机内拖动")
        }
    }


    public static stopDrag(): void {
        MouseDragHelper.target = null;
        MouseDragHelper.tv3 = this.v3ZeroTemp.clone();
        MouseDragHelper.tv2 = this.v3ZeroTemp.clone();
        MouseDragHelper.offsetPos = this.v3ZeroTemp.clone();
        Laya.stage.off(Laya.Event.MOUSE_DOWN, MouseDragHelper, MouseDragHelper.onMouseDown);
        Laya.stage.off(Laya.Event.MOUSE_MOVE, MouseDragHelper, MouseDragHelper.onMouseMove);
        Laya.stage.off(Laya.Event.MOUSE_UP, MouseDragHelper, MouseDragHelper.onMouseUp);
    }

    /**
     * 设置立即开始拖动模式。前提必须是已经调用了startDrag
     * @param e 
     */
    public static setDragNow(e: Laya.Event, offsetX: number, offsetY: number): void {
        let me = MouseDragHelper;
        me.onMouseDown(e);
        me.offsetPos.setValue(offsetX, offsetY);
        me.onMouseMove(e);
    }


    /**
     * 2d坐标转3d,2d坐标必须是全局的
     * @param x 
     * @param y 
     * @param out 
     * @param type 
     */
    public static d2tod3(x: number, y: number, out: Laya.Vector3, type: number): void {
        let me = MouseDragHelper;
        if (type == me.XY) {
            let ray: Laya.Ray = me.ray;
            me.camera.viewportPointToRay(me.tv2, ray);
            let pos = me.target.transform.position;
            let scale: number = (pos.z - ray.origin.z) / ray.direction.z;
            Laya.Vector3.scale(ray.direction, scale, ray.direction);
            Laya.Vector3.add(ray.origin, ray.direction, ray.direction);
            me.tv3.x = ray.direction.x;
            me.tv3.y = ray.direction.y;
            me.tv3.z = pos.z;
            // me.target.transform.localPosition = me.tv3;
        }
        else if (type == me.XZ) {
            let ray: Laya.Ray = me.ray;
            me.camera.viewportPointToRay(me.tv2, ray);
            let pos = me.target.transform.position;
            let scale: number = (pos.y - ray.origin.y) / ray.direction.y;
            Laya.Vector3.scale(ray.direction, scale, ray.direction);
            Laya.Vector3.add(ray.origin, ray.direction, ray.direction);
            me.tv3.x = ray.direction.x;
            me.tv3.y = pos.y;
            me.tv3.z = ray.direction.z;
            // me.target.transform.localPosition = me.tv3;
        }
        else if (type == me.YZ) {
            let ray: Laya.Ray = me.ray;
            me.camera.viewportPointToRay(me.tv2, ray);
            let pos = me.target.transform.position;
            let scale: number = (pos.x - ray.origin.x) / ray.direction.x;
            Laya.Vector3.scale(ray.direction, scale, ray.direction);
            Laya.Vector3.add(ray.origin, ray.direction, ray.direction);
            me.tv3.x = pos.x;
            me.tv3.y = ray.direction.y;
            me.tv3.z = ray.direction.z;
            // me.target.transform.localPosition = me.tv3;
        }
        else {
            throw ("unkwon type");
        }

        me.tv3.cloneTo(out);
    }

    private static onMouseDown(e: Laya.Event): void {
        let me = MouseDragHelper;
        me.startPos = me.target.transform.position.clone();
        me.camera.worldToViewportPoint(me.startPos, me.tv3);
        me.isDrag = true;
        me.offsetPos.setValue(e.stageX - me.tv3.x, e.stageY - me.tv3.y);
    }

    private static onMouseMove(e: Laya.Event): void {
        let me = MouseDragHelper;
        if (!me.isDrag) return;

        me.tv2.setValue(e.stageX - me.offsetPos.x, e.stageY - me.offsetPos.y);
        me.d2tod3(me.tv2.x, me.tv2.y, me.tv3, me.plane);
        me.target.transform.localPosition = me.tv3;
    }

    private static onMouseUp(e: Laya.Event): void {
        let me = MouseDragHelper;
        me.isDrag = false;
    }

    /**
     * 获取最大
     * @param x 
     * @param y 
     * @param camera 
     */
    public static getBastPlane(x: number, y: number, camera: Laya.Camera): number {
        let me = MouseDragHelper;
        let ray: Laya.Ray = me.ray;
        camera.viewportPointToRay(me.tv2, ray);
        let ax: number = Math.abs(ray.direction.x);
        let ay: number = Math.abs(ray.direction.y);
        let az: number = Math.abs(ray.direction.z);
        if (az >= ay && az >= ax) {
            return MouseDragHelper.XY;
        }
        else if (ax >= az && ax >= ay) {
            return MouseDragHelper.YZ;
        }

        return MouseDragHelper.XZ;
    }
}