
import GameData from '../GameData/GameData';
import carBase from './carBase';
import TruckGameManager, { GameState } from '../../gameLogic/managers/TruckGameManager';
import CustomEventDispatcher from '../core/CustomEventDispatcher';
import cargo from './cargo';


export default class Car extends carBase {
  private radius: number = .5
  TurnStrength = 5000
  ForwardAcceleration = 4000
  loadedCargos = []
  m_forward = new Laya.Vector3
  defRotateSpeed = 50
  rotateSpeed = 50
  head = null
  buffers = {}
  frontWheels = []
  backWheels = []
  backTrails = []
  speedUpdaPosition = null
  danqiEffect = null
  targetPosition = new Laya.Vector3
  dummyTarPos = new Laya.Vector3
  cargoTrigger: Laya.Sprite3D = null
  findTargetComplete = null
  offsetPosition = new Laya.Vector3

  public pause: boolean = true;

  onAwake() {
    super.onAwake();
    this.SuspensionLength = 1;
    this.frontWheels[0] = GameData.FindChild(this.owner, "Wheels/FL");
    this.frontWheels[1] = GameData.FindChild(this.owner, "Wheels/FR");
    this.backWheels[0] = GameData.FindChild(this.owner, "Wheels/BL")
    this.backWheels[1] = GameData.FindChild(this.owner, "Wheels/BR")
    this.head = (this.gameObject.getChildByName("Head") as Laya.Sprite3D).transform;
    var e = this.owner.getChildByName("Raycasts") as Laya.Sprite3D;
    this.SuspensionLength = e.transform.localPositionY + this.radius;
    var t = e.getChildByName("FL")
      , a = e.getChildByName("FR")
      , n = e.getChildByName("BL")
      , r = e.getChildByName("BR");
    this.AddFrontWheel(t, a)
    this.AddBackWheel(n, r)
    this.speedUpdaPosition = this.owner.getChildByName("SpeedUpPosition");
    this.cargoTrigger = this.owner.getChildByName("CargoTrigger") as Laya.Sprite3D;
    this.cargoTrigger.addComponent(cargo);
  }
  SetTarget(e) {
    e.cloneTo(this.targetPosition)
  }

  SetShutDown() {
    this.rigidbody.linearFactor = new Laya.Vector3(0, 1, 0);
    var i = this.rigidbody.linearVelocity;
    i.setValue(0, i.y, 0)
    this.rigidbody.linearVelocity = i
  }

  OnSpeedDownEnter() {
    //GameData.isStart = false;
    this.pause = false;
    this.rotateSpeed = 0;
    if (this.backWheels.length > 0) {
      for (var e = 0; e < this.backWheels.length; e++) {
        this.backWheels[e].transform.localRotationEulerX = 0
      }
    }

    this.rotateSpeed = this.defRotateSpeed
    this.axleInfos[1];
    var i = new Laya.Vector3;
    Laya.Vector3.normalize(this.m_forward, i);
    var t = new Laya.Vector3;
    Laya.Vector3.normalize(this.rigidbody.linearVelocity, t);
  }

  addForce() {
    //if (GameData.isStart && GameData.gameOver) {
    if (this.pause == false) {
      if (this.m_groundForward && this.m_groundForward.IsOr) {
        this.rigidbody.linearFactor = new Laya.Vector3(1, 1, 1)
        var a = new Laya.Vector3;
        Laya.Vector3.scale(this.m_forward, this.ForwardAcceleration, a);
        var b = new Laya.Vector3;
        Laya.Vector3.subtract(this.speedUpdaPosition.transform.position, this.transform.position, b);
        this.rigidbody.applyForce(a, b);
      }
    }

    //}
  }

  onUpdate() {
    this.addForce();
    for (var e = 0; e < this.axleInfos.length; e++) {
      var t = this.axleInfos[e];
      t.LastLeftWheelResult = this.HandleWheel(t.LeftWheel);
      t.LastRightWheelResult = this.HandleWheel(t.RightWheel)
    }
    for (e = 0; e < this.axleInfos.length; e++)
      this.HandleBalance(this.axleInfos[e]);
    this.OnCarTransform()
  }

  OnCarTransform() {
    this.UpdateBuffers();
    this.UpdateCurrentGroundForward();
    this.OrientationTarget(this.targetPosition)
    this.CorrectionWheelRotation(this.frontWheels, true)
    this.CorrectionWheelRotation(this.backWheels, false)
    this.CorrectionWheelPosition(this.frontWheels, this.axleInfos[0])
    this.CorrectionWheelPosition(this.backWheels, this.axleInfos[1])
  }
  UpdateCurrentGroundForward() {
    var e = this.GetGroundBasedForward();
    if (e.IsSet)
      e.Heading.cloneTo(this.m_forward);
    else {
      var t = new Laya.Vector3;
      this.transform.getForward(t)
      Laya.Vector3.normalize(t, t)
      Laya.Vector3.scale(t, -1, t)
      t.cloneTo(this.m_forward)
    }
    this.m_groundForward = e
  }
  AddTurnForce(e) {
    var t = new Laya.Vector3;
    Laya.Vector3.subtract(this.head.position, this.transform.position, t)
    this.rigidbody.applyForce(e, t)
  }
  OrientationTarget(e) {
    var a = new Laya.Vector3;
    Laya.Vector3.normalize(this.m_forward, a);
    var n = new Laya.Vector3;
    Laya.Vector3.normalize(this.rigidbody.linearVelocity, n);
    var r = Laya.Vector3.scalarLength(this.rigidbody.linearVelocity)
      , i = Laya.Vector3.dot(n, a);
    if (r > 2 && i > .1) {
      var s = new Laya.Vector3;
      GameData.InverseTransformPoint(this.transform, new Laya.Vector3(e.x, this.transform.position.y, e.z), s),
        s.y = 0;
      var h = s.x / Laya.Vector3.scalarLength(s)
        , c = new Laya.Vector3(1, 0, 0);
      GameData.QuaternionVector3(this.transform.rotation, c, c)
      Laya.Vector3.scale(c, h * this.TurnStrength, c)
      this.AddTurnForce(c)
    }

    //if (GameData.isStart && GameData.gameOver) {

    if (this.pause == false && this.m_groundForward && this.m_groundForward.IsSet) {
      var l = new Laya.Quaternion;
      GameData.FromToRotation(n, a, l)
      GameData.QuaternionVector3(l, n, n)
      Laya.Vector3.scale(n, r, n)
      this.rigidbody.linearVelocity = n
    }
    //}
  }
  CorrectionWheelPosition(e, t) {
    for (var a = 0; a < e.length; a++) {
      var n = e[a], r = null, i = new Laya.Vector3;
      0 == a && (r = t.LastLeftWheelResult),
        1 == a && (r = t.LastRightWheelResult),
        null != r ? (r.ImpactPoint.cloneTo(i),
          GameData.InverseTransformPoint(n.transform._parent, i, i),
          Laya.Vector3.add(i, new Laya.Vector3(0, this.radius, 0), i)) : n.transform.localPosition.cloneTo(i);
      var s = n.transform.localPosition;
      Laya.Vector3.lerp(s, i, .5, s)
      n.transform.localPosition = s
    }
  }
  CorrectionWheelRotation(e, t) {
    var a = new Laya.Vector3
      , n = Laya.Vector3.scalarLength(this.rigidbody.linearVelocity);
    if (0 != n) {
      Laya.Vector3.scale(this.rigidbody.linearVelocity, 1 / n, a);
      var r = n * Laya.Vector3.dot(a, this.m_forward) * (Laya.timer.delta / 1e3) * this.rotateSpeed
      for (var i = 0; i < e.length; i++)
        e[i].transform.localRotationEulerX += r;
      if (t) {
        var s = new Laya.Vector3;
        GameData.InverseTransformPoint(this.transform, new Laya.Vector3(this.targetPosition.x, this.transform.position.y, this.targetPosition.z), s),
          s.y = 0,
          Laya.Vector3.normalize(s, s);
        var h = GameData.Vector3Angle(new Laya.Vector3(0, 0, 1), s, 1);
        h = Math.max(-45, Math.min(45, h));
        var c = e[0].transform.localRotationEulerY;
        c = GameData.LerpNumber(c, h, .2);
        for (i = 0; i < e.length; i++)
          e[i].transform.localRotationEulerY = c
      }
    }
  }
  UpdateBuffers() {
    for (var e in this.buffers) {
      if (this.buffers[e].TryUpdateBuffer(this) || (this.buffers[e].Stop(this))) {
        delete this.buffers[e]
      }
    }
  }


  onTriggerEnter(e) {
    if ("endTrigger" == e.owner.name) {
      console.log("@stop the car")
      this.SetShutDown();
      TruckGameManager.instance().recoveryCargos()
      e.enabled = false;
      this.pause = true;
      //GameData.isStart = false
      //GameData.gameOver = false
    }
    if ("zoomCameraObj" == e.owner.name) {
      CustomEventDispatcher.instance.event("Default")
      e.enabled = false
    }
    if ("endingCamera" == e.owner.name) {
      CustomEventDispatcher.instance.event("Ending")
      e.enabled = false
    }
  }

  onCollisionEnter(e) {
    if (TruckGameManager.instance().gameState == GameState.游戏结算) return;
    var t = e.other.owner.name.toLocaleLowerCase();
    if ("plane" == t) {
      TruckGameManager.instance().result(false);
    }

  }
}