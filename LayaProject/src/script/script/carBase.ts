
import GameData from '../GameData/GameData';
import LayaBehavior3D from '../core/LayaBehavior3D';
import TruckGameManager from '../../gameLogic/managers/TruckGameManager';
import c from './c';


export default class carBase extends LayaBehavior3D {
  layerMask = 5
  axleInfos = []
  rigidbody: Laya.Rigidbody3D = null
  SuspensionForce = 2000
  SuspensionLength = 1
  AntiRollForce = 2000
  m_groundForward = null
  get transform() {
    return this.gameObject.transform
  }
  onAwake() {
    this.rigidbody = this.owner.getComponent(Laya.Rigidbody3D) as Laya.Rigidbody3D
    this.rigidbody.mass = 70
    this.rigidbody.linearDamping = .9
    this.rigidbody.angularDamping = .999
    this.rigidbody.overrideGravity = true
    this.rigidbody.gravity = new Laya.Vector3(0, -30, 0)
    // Laya.stage.on(Laya.Event.MOUSE_UP, this, this.onRelease)
  }

  AddFrontWheel(e, t) {
    var a = { IsFront: false, LeftWheel: '', RightWheel: "" };
    a.IsFront = true;
    a.LeftWheel = e;
    a.RightWheel = t;
    this.axleInfos.push(a)
  }
  AddBackWheel(e, t) {
    var a = { LeftWheel: '', RightWheel: "", IsBack: false };
    a.IsBack = true;
    a.LeftWheel = e;
    a.RightWheel = t;
    this.axleInfos.push(a)
  }

  GetGroundBasedForward() {
    var e = new Laya.Vector3().clone(), t = new Laya.Vector3().clone();
    for (var a = 0; a < this.axleInfos.length; a++) {
      var n = this.axleInfos[a];
      if (null != n.LastLeftWheelResult && null != n.LastRightWheelResult) {
        var r = new Laya.Vector3;
        Laya.Vector3.add(n.LastLeftWheelResult.ImpactPoint, n.LastRightWheelResult.ImpactPoint, r),
          Laya.Vector3.scale(r, .5, r),
          n.IsFront && (e = r),
          n.IsBack && (t = r)
      }
    }
    var i = new c;
    return i.Front = e,
      i.Back = t,
      i
  }
  HandleWheel(e) {
    var t = this.GetTransformUp(e)
      , a = e.transform.position.clone()
      , n = new Laya.Vector3;
    Laya.Vector3.scale(t, -1, n);
    var r = new Laya.Ray(a, n)
      , i = new Laya.HitResult;
    if (!TruckGameManager.instance().gameScene.physicsSimulation.rayCast(r, i, this.SuspensionLength, 1, 1))
      return null;
    var s = Laya.Vector3.distance(r.origin, i.point)
      , h = this.Round(1 - s / this.SuspensionLength, 2)
      , c = { Hit: new Laya.HitResult(), CompressionRatio: 0, ImpactPoint: "" };
    c.Hit = i
    c.CompressionRatio = h
    c.ImpactPoint = i.point.clone();
    var d = new Laya.Vector3;
    Laya.Vector3.scale(t, this.SuspensionForce * h, d);
    var g = e.transform.localPosition.clone();
    Laya.Vector3.subtract(g, new Laya.Vector3(0, 5, 0), g), GameData.TransformPoint(e.transform, g, g);
    var p = g;
    return Laya.Vector3.subtract(p, this.transform.position, p),
      this.rigidbody.applyForce(d, p),
      c
  }
  HandleBalance(e) {
    var t = 1
      , a = 1
      , n = e.LastLeftWheelResult;
    n && (t = n.CompressionRatio);
    var r = e.LastLeftWheelResult;
    r && (a = n.CompressionRatio);
    var i = (t - a) * this.AntiRollForce;
    if (n) {
      var o = new Laya.Vector3;
      Laya.Vector3.scale(this.GetTransformUp(e.LeftWheel), -i, o);
      var s = e.LeftWheel.transform.position.clone();
      Laya.Vector3.subtract(s, this.transform.position, s),
        this.rigidbody.applyForce(o, s)
    }
    if (r) {
      o = new Laya.Vector3;
      Laya.Vector3.scale(this.GetTransformUp(e.RightWheel), i, o);
      s = e.RightWheel.transform.position.clone();
      Laya.Vector3.subtract(s, this.transform.position, s),
        this.rigidbody.applyForce(o, s)
    }
  }
  GetTransformUp(e) {
    var t = new Laya.Vector3;
    return e.transform.getUp(t),
      t
  }
  Round(e, t) {
    var a = Math.pow(10, t);
    return Math.round(e * a) / a
  }
}