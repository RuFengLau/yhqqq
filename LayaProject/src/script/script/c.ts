export default class c {

  Front
  Back
  get Heading() {
    var e = new Laya.Vector3;
    return Laya.Vector3.subtract(this.Front, this.Back, e),
      Laya.Vector3.normalize(e, e),
      e
  }
  get IsSet() {
    var e = Laya.Vector3.equals(this.Front, new Laya.Vector3())
      , t = Laya.Vector3.equals(this.Back, new Laya.Vector3());
    return !e && !t
  }
  get IsOr() {
    var e = Laya.Vector3.equals(this.Front, new Laya.Vector3())
      , t = Laya.Vector3.equals(this.Back, new Laya.Vector3());
    return !e || !t
  }
}