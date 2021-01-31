import TruckGameManager from "../../gameLogic/managers/TruckGameManager"
export default class cargo extends Laya.Script3D {

  cargosCnt: number

  onAwake() {
    this.cargosCnt = 0
  }
  onDisable() {
    Laya.timer.clear(this, this.checkIfFail)
  }
  onTriggerEnter(e) {
    if (e.owner.name.startsWith("cargox")) {
      this.cargosCnt++
      TruckGameManager.instance().addCargo(e.owner.parent)
    }
  }
  onTriggerExit(e) {
    if (e.owner.name.startsWith("cargox")) {
      this.cargosCnt--
      TruckGameManager.instance().removeCargo(e.owner.parent)
      Laya.timer.once(500, this, this.checkIfFail)
    }
  }
  checkIfFail() {
    // if (this.cargosCnt <= 0) PagesManager.GameOverUI(false)
  }
  canStartGame() {
    return this.cargosCnt > 0
  }
}