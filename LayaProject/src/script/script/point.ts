import TruckGameManager from '../../gameLogic/managers/TruckGameManager'
import model from './model'

export default class point extends Laya.Script3D {

  pointIndexByName
  parentRoadScript
  onAwake() {
    this.pointIndexByName = Number.parseInt(this.owner.name.replace("p", ""))
    this.parentRoadScript = this.owner.parent.getComponent(model)
  }
  onTriggerEnter(e) {
    console.log("@hit waypoint %d", this.pointIndexByName);
    var t = this.parentRoadScript.getNextPointPosInWorld(this.pointIndexByName);
    TruckGameManager.instance().carScript.SetTarget(t);
    this.owner.removeSelf()
  }
}