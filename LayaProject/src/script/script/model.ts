
import LayaBehavior3D from "../core/LayaBehavior3D";
import TruckGameManager from "../../gameLogic/managers/TruckGameManager";
import point from "./point";
export default class model extends LayaBehavior3D {
  roadObj
  maxPoint

  onAwake() {
    this.roadObj = this.gameObject;
  }

  static createWithPoint(e) {
    var t = new model;
    return t.setMaxPointCount(e), t
  }

  addWayPoints() {
    for (var e = 0; e < this.maxPoint; e++) {
      var t = e + 1;
      this.owner.getChildByName("p" + t).addComponent(point)
    }
  }
  setMaxPointCount(e) {
    this.maxPoint = e;
  }
  getNextPointPosInWorld(e) {
    var t = "p" + (e + 1)
    var a = this.roadObj.getChildByName(t);
    return null == a ? TruckGameManager.instance().getDefaultTartget() : a.transform.position
  }
}
