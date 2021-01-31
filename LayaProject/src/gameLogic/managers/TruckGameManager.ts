
import UIManager from "../../gameCore/managers/UIManager";
import ResultViewController from "../controller/ui/ResultViewController";
import CustomEventDispatcher from "../../script/core/CustomEventDispatcher";
import GameData from "../../script/GameData/GameData"
import CameraFollow from "../../script/script/CameraFollow";
import Car from "../../script/script/Car";

import model from "../../script/script/model";
import DataManager from "../../gameCore/managers/DataManager";


export enum GameState {
  开始游戏 = 0,
  游戏中 = 1,
  游戏结算 = 2
}

export default class TruckGameManager {

  public static _instance: TruckGameManager;
  public carScene: Laya.Sprite3D;
  public sceneBasePath = "sub1/res/LayaScene_map0/Conventional/";
  public carsScenePath = "sub1/res/cars/Cars.lh";
  public cargosPath = "sub1/res/LayaScene_cargos/Conventional/cargos.lh";

  public nowLevel: number;

  public maxLeveLCount = 20;
  public gameScene
  public cfollow: CameraFollow
  public nowCarIndex:number
  public nowCoin:number
  public nowCarData
  public vv = 3
  public car: Laya.Sprite3D;
  public carScript: Car
  public nowCargos = []
  public genPositons = []
  public prefabs

  public gameState: GameState = GameState.开始游戏;
  public isWin:boolean = false;
  static instance() {
    if (TruckGameManager._instance == null)
      TruckGameManager._instance = new TruckGameManager();
    return TruckGameManager._instance;
  }

  constructor() {
      Laya.Physics3DUtils.gravity = new Laya.Vector3(0, -15, 0);
      this.nowLevel = DataManager.inst.user.currentStage;
      this.nowCoin = DataManager.inst.user.coins;
      this.nowCarData = GameData.getStorage(`drivehill_${this.vv}nowCarData`, GameData.getDefaultCarLockData());
      this.nowCarIndex = GameData.getStorage(`drivehill_${this.vv}nowCarIndex`, 0)
  }

  public loadLevel() {
    if (this.gameScene) this.gameScene.destroy();
    Laya.Resource.destroyUnusedResources();
    let t = this.nowLevel % this.maxLeveLCount
    let a = this.sceneBasePath + `map${t}.ls`;
    Laya.Scene3D.load(a, Laya.Handler.create(this, (t) => {
      Laya.stage.addChildAt(t, 0);
      this.gameScene = t;
      this.init();
    }))
  }

  public init() {
    this.gameState = GameState.开始游戏;
    this.carScene = Laya.loader.getRes(this.carsScenePath);
    var e = GameData.getEnvColor();
    this.gameScene.enableFog = true;
    this.gameScene.fogStart = 15;
    this.gameScene.fogRange = 200;
    this.gameScene.fogColor = e.p;
    this.gameScene.getChildByName("roadLong").getChildByName("road").meshRenderer.sharedMaterial.albedoColor = e.r;
    this.gameScene.getChildByName("Plane").meshRenderer.sharedMaterial.albedoColor = e.p;
    var t = this.gameScene.getChildByName("camera");
    t.getChildByName("Main Camera").clearColor = e.p;
    this.cfollow = t.addComponent(CameraFollow) as CameraFollow;
    this.setup()
    this.initRoads();
    this.changeCar(this.nowCarIndex);
  }

  public setup() {
    this.prefabs = new Array
    this.genPositons = []
    this.nowCargos = [];
    var e = Laya.loader.getRes(this.cargosPath);
    for (var t in e._children) {
      var a = e._children[t];
      a.name.startsWith("cargo") && this.prefabs.push(a)
    }
  }
  public addLevel() {
    this.nowLevel += 1;
    DataManager.inst.clearStage();
    this.nowLevel = DataManager.inst.user.currentStage;
    CustomEventDispatcher.instance.event("addLevel");
  }

  public unlockCar(e) {
    if (this.nowCarData[e]) {
      this.nowCarData[e].s = false;
      GameData.setStorage(`drivehill_${this.vv}nowCarData`, this.nowCarData)
    }
  }
  public removeCargos() {
    var e = [], t = this.gameScene._children;
    for (var a in t) {
      var n = t[a];
      n.name.startsWith("cargo") && e.push(n)
    }
    for (var r = e.length, i = 0; i < r; i++) {
      e[i].destroy();
    }
    this.nowCargos = []
  }
  public addCargo(e) {
    this.nowCargos.push(e)
  }
  public removeCargo(e) {
    this.nowCargos.splice(this.nowCargos.indexOf(e), 1)
  }
  public recoveryCargos() {
    var e = this.nowCargos.length;
    // 成功
    if (e > 0) {
      var t = 0;
      for (var a in this.nowCargos) {
        t++;
        let r = this.nowCargos[a];
        Laya.timer.once(200 * t, this, () => {
          this.handleOneCargo(r, e);
          console.log(this.nowCargos.length)
          if (this.nowCargos.length == 1) {
            Laya.timer.once(500, this, () => {
              this.result(true);
            })
          }
        })
      }
    }
    else {
      //失败
      this.result(false)
    }
  }

  public result(isWin: boolean) {
    if (this.gameState == GameState.游戏结算) return;
    this.gameState = GameState.游戏结算;
    console.log("游戏胜利失败:", isWin);
    this.isWin = isWin;
    if(this.isWin){
      DataManager.inst.addCoins(100);
      TruckGameManager.instance().addLevel();
    }
    UIManager.inst.showPopupView(new ResultViewController());
  }

  public handleOneCargo(e, t) {
    if (e.getChildAt(0)) e.getChildAt(0).getComponent(Laya.Rigidbody3D).enabled = false;
    var a = e.transform
      , n = a.localPositionY + 7
      , r = a.localPositionX
      , i = a.localPositionZ;
    Laya.Tween.to(a, {
      localPositionY: n,
      localPositionX: r,
      localPositionZ: i
    }, 500, null, Laya.Handler.create(this, () => {
      e.destroy()
    }))
  }

  public makeCargos(e) {
    var t = GameData.getRandomInArr(this.prefabs)
      , a = e.getChildByName("CargoPosition")
      , n = 4;
    for (var r in a._children) {
      var i = a._children[r].transform.position;
      this.genPositons.push(i);
      var s = t.clone();
      s.transform.position = new Laya.Vector3(i.x, i.y + 3 + Math.random(), i.z)
      this.gameScene.addChild(s);
      var h = s.getChildAt(0).getComponent(Laya.Rigidbody3D);
      if (h.linearDamping = .5,
        h.friction = 3,
        h.linearVelocity = new Laya.Vector3,
        h.applyImpulse(new Laya.Vector3(0, -5, 0)),
        --n <= 0)
        break
    }
  }

  public changeCar(e) {
    this.removeCargos();
    this.car && this.car.parent && this.car.removeSelf();
    this.car = (this.carScene.getChildByName("Car" + e) as Laya.Sprite3D).clone() as Laya.Sprite3D;
    var t = this.gameScene.getChildByName("carPos");
    if (t) this.car.transform.position = t.transform.position;
    this.car.transform.localRotationEulerY = 0
    this.gameScene.addChild(this.car)
    Laya.timer.frameOnce(10, this, () => {
      this.makeCargos(this.car)
    });
    this.carScript = this.car.addComponent(Car) as Car;
    this.carScript.SetTarget(this.getDefaultTartget())
    this.carScript.SetShutDown();
    this.cfollow.SetTarget(this.car);
    this.nowCarIndex = e;
    GameData.setStorage(`drivehill_${this.vv}nowCarIndex`, this.nowCarIndex)
  }

  public initRoads() {
    var e = this.gameScene._children;
    for (var t in e) {
      var a = e[t];
      if (a.name.startsWith("roadS1")) {
        var n = model.createWithPoint(3);
        a.addComponentIntance(n)
        n.addWayPoints()
      }
      if (a.name.startsWith("roadS2")) {
        n = model.createWithPoint(3);
        a.addComponentIntance(n)
        n.addWayPoints()
      }
      if (a.name.startsWith("k_k3")) {
        n = model.createWithPoint(3);
        a.addComponentIntance(n)
        n.addWayPoints()
      }
      if (a.name.startsWith("k_k14")) {
        n = model.createWithPoint(14);
        a.addComponentIntance(n)
        n.addWayPoints()
      }
      if (a.name.startsWith("k_k4")) {
        n = model.createWithPoint(4);
        a.addComponentIntance(n)
        n.addWayPoints()
      }
      if (a.name.startsWith("k_k2")) {
        n = model.createWithPoint(2);
        a.addComponentIntance(n)
        n.addWayPoints()
      }
      if (a.name.startsWith("k_k5")) {
        n = model.createWithPoint(5);
        a.addComponentIntance(n)
        n.addWayPoints()
      }
      if (a.name.startsWith("k_k6")) {
        n = model.createWithPoint(6);
        a.addComponentIntance(n)
        n.addWayPoints()
      }
      a.name.startsWith("endingObj")
    }
  }
  public getDefaultTartget() {
    var e = new Laya.Vector3;
    Laya.Vector3.add(this.car.transform.position, new Laya.Vector3(0, 0, 500), e)
    return e
  }

  public OnSpeedDownEnter() {
    this.carScript.OnSpeedDownEnter()
  }
}
