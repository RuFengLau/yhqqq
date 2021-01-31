import CustomEventDispatcher from '../core/CustomEventDispatcher'
import CustomEventType from '../core/CustomEventType'

export default class LayaBehavior3D extends Laya.Script3D {

  private _transform: Laya.Transform3D = null;
  initPos: Laya.Vector3;
  initRotate: Laya.Vector3;

  public get transform(): Laya.Transform3D {
    if (!this._transform) {
      this._transform = (this.owner as Laya.Sprite3D).transform;
    }
    return this._transform;
  }

  onEnable() {
    CustomEventDispatcher.instance.on(CustomEventType.PassChange, this, this.setStartPos);
    this.initPos = this.transform.localPosition.clone();
    this.initRotate = this.transform.localRotationEuler.clone();
  }

  /**
   * 设置开始位置
   */
  setStartPos() {
    this.transform.localPosition = this.initPos;
    this.transform.localRotationEuler = this.initRotate;
  }

  private _gameObject: Laya.Sprite3D;

  protected get gameObject(): Laya.Sprite3D {
    if (!this._gameObject)
      this._gameObject = this.owner as Laya.Sprite3D;

    return this._gameObject;
  }

  protected GetRandomFloat(min: number, max: number) {
    return Math.random() * (max - min) + min
  }

  protected getForwardVector(): Laya.Vector3 {
    let targetForward = new Laya.Vector3();
    this.transform.getForward(targetForward);

    return targetForward;
  }
}