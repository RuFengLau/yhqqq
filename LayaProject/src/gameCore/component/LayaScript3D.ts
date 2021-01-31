import D3Helper from "../plugins/tools/D3Helper";
import EventManager from "../managers/eventManager/EventManager";

export default class LayaScript3D extends Laya.Script3D {
    /**获取GameObject */
    public get gameObject(): Laya.Sprite3D{
        return this.owner as Laya.Sprite3D;
    }
    
    public get transform(): Laya.Transform3D {
        return this.gameObject.transform;
    }

    private _forward: Laya.Vector3 = new Laya.Vector3();
    /**获取前方向 */
    public get forward(): Laya.Vector3 {
        this.transform.getForward(this._forward);
        return this._forward;
    }

    private _up: Laya.Vector3 = new Laya.Vector3();
    /**获取上方向 */
    public get up(): Laya.Vector3 {
        this.transform.getUp(this._up);
        return this._up;
    }

    private _right: Laya.Vector3 = new Laya.Vector3();
    /**获取右方向 */
    public get right(): Laya.Vector3 {
        this.transform.getRight(this._right);
        return this._right;
    }

    /**
     * 查找子节点
     * @param {string} childName
     * @returns {Laya.Sprite3D | null}
     */
    findChild(childName: string): Laya.Sprite3D {
        if (!childName) {
            return null;
        }
        return D3Helper.findChild(this.owner, childName) as Laya.Sprite3D;
    }

    /**
     * onAwake
     */
    onAwake() {
        super.onAwake();
    }

    /**
     * onDestroy
     */
    onDestroy(): void {
        Laya.timer.clearAll(this);
        EventManager.inst.RemoveEventListenerWithCaller(this);
        super.onDestroy();
    }
}