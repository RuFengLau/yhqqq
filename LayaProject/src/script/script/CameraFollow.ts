import GameData from "../GameData/GameData";
import LayaBehavior3D from "../core/LayaBehavior3D";
import CustomEventDispatcher from "../core/CustomEventDispatcher";

export default class CameraFollow extends LayaBehavior3D {

  followSpeed = 10
  offsetPosition = new Laya.Vector3
  stateMachine = null
  camera
  animator
  target

  get transform() {
    return this.gameObject.transform
  }
  onAwake() {
    this.camera = this.gameObject.getChildByName("Main Camera");
    this.animator = this.camera.getComponent(Laya.Animator);
    CustomEventDispatcher.instance.on("Default", this, this.OnDefaultEnter)
    CustomEventDispatcher.instance.on("Ending", this, this.OnEndingEnter)
  }
  OnDefaultEnter() {
    this.animator.play("zoomout")
  }
  OnEndingEnter() {
    this.animator.play("ending")
  }
  SetTarget(e) {
    if (e) {
      var t = e.transform.position;
      Laya.Vector3.subtract(this.transform.position, t, this.offsetPosition);
      e.transform.position.cloneTo(t)
      this.transform.position = t
      this.target = e
    }
  }
  onLateUpdate() {
    if (this.target) {
      var e = this.target.transform.position.clone();
      Laya.Vector3.add(e, this.offsetPosition, e);
      var t = this.transform.position.clone();
      Laya.Vector3.lerp(t, e, 1, e)
      this.transform.position = e
    }
  }
}