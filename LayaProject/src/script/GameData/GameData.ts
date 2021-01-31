
export default class GameData {
  static getDefaultCarLockData() {
    return {
      0: {
        p: 100,
        s: false
      },
      1: {
        p: 100,
        s: false
      },
      2: {
        p: 100,
        s: false
      },
      3: {
        p: 100,
        s: false
      },
      4: {
        p: 100,
        s: false
      },
      5: {
        p: 100,
        s: false
      }
    }
  }

  static getRandomInArr(e) {
    var t = ~~(Math.random() * e.length * 2);
    return e[t %= e.length]
  }
  static getEnvColor() {
    return {
      p: this.getRandomInArr(this.fogColors),
      r: this.getRandomInArr(this.roadColors)
    }
  }
  static getStorage(e, t) {
    var a = Laya.LocalStorage.getJSON(e);
    return "" == a || null == a || null == a || "undefined" == a ? (this.setStorage(e, t),
      t) : a
  }
  static setStorage(e, t) {
    Laya.LocalStorage.setJSON(e, t)
  }
  static TransformPoint(e, t, a) {
    var n = e.worldMatrix;
    Laya.Vector3.transformV3ToV3(t, n, a)
  }
  static InverseTransformPoint(e, t, a) {
    var n = new Laya.Matrix4x4;
    e.worldMatrix.invert(n),
      Laya.Vector3.transformV3ToV3(t, n, a)
  }
  static QuaternionEuler(e, t, a, n) {
    var r = 180 / Math.PI;
    Laya.Quaternion.createFromYawPitchRoll(t / r, e / r, a / r, n)
  }
  static getQueryVariable(e, t) {
    for (var a = window.location.search.substring(1).split("&"), n = 0; n < a.length; n++) {
      var r = a[n].split("=");
      if (r[0] == e)
        return r[1]
    }
    return t
  }
  static FindChild(e, t) {
    for (var a = t.split("/"), n = 0; n < a.length; n++)
      if (t = a[n],
        null == (e = e.getChildByName(t)))
        return null;
    return e
  }
  static QuaternionVector3(e, t, a) {
    var n = new Laya.Matrix4x4;
    return Laya.Matrix4x4.createFromQuaternion(e, n),
      Laya.Vector3.transformV3ToV3(t, n, a),
      a
  }
  static FromToRotation(e, t, a) {
    Laya.Vector3.normalize(e, e),
      Laya.Vector3.normalize(t, t);
    var n = Laya.Vector3.dot(e, t);
    if (n >= 1)
      return new Laya.Quaternion;
    if (n < 1e-6 - 1) {
      var r = new Laya.Vector3;
      Laya.Vector3.cross(new Laya.Vector3(1, 0, 0), e, r),
        this.isVectorZeroLength(r),
        Laya.Vector3.cross(new Laya.Vector3(0, 1, 0), e, r),
        Laya.Vector3.normalize(r, r),
        Laya.Quaternion.createFromAxisAngle(r, 180, a)
    } else {
      var i = Math.sqrt(2 * (1 + n))
        , s = 1 / i
        , h = new Laya.Vector3;
      Laya.Vector3.cross(e, t, h),
        a.x = h.x * s,
        a.y = h.y * s,
        a.z = h.z * s,
        a.w = .5 * i,
        a.normalize(a)
    }
    return a
  }
  static isVectorZeroLength(e) {
    return e.x * e.x + e.y * e.y + e.z * e.z < 1e-12
  }
  static LerpNumber(e, t, a) {
    return e + a * (t - e)
  }
  static Vector3Angle(e, t, a) {
    void 0 === a && (a = 1),
      e = e.clone(),
      Laya.Vector3.normalize(e, e),
      t = t.clone(),
      Laya.Vector3.normalize(t, t);
    var n = Laya.Vector3.dot(e, t);
    n = Math.max(-1, Math.min(1, n)),
      this.isZero(n) && (n = 0);
    var r = Math.acos(n) * (180 / Math.PI)
      , i = new Laya.Vector3;
    switch (Laya.Vector3.cross(e, t, i),
    a) {
      case 0:
        i.x < 0 && (r *= -1);
        break;
      case 1:
        i.y < 0 && (r *= -1);
        break;
      case 2:
        i.z < 0 && (r *= -1);
        break;
      default:
        i.y < 0 && (r *= -1)
    }
    return this.isZeroByValue(r, .1) ? 0 : r
  }
  static isZero(e) {
    return Math.abs(e) < 1e-6
  }
  static isZeroByValue(e, t) {
    return Math.abs(e) < t
  }
  static fogColors = [new Laya.Vector3(.3795415, .7941176, .3824006), new Laya.Vector3(.3633218, .5783081, .7058823), new Laya.Vector3(.6524901, .3986267, .7426471)]
  static roadColors = [new Laya.Vector3(.3412, .4431, .7922), new Laya.Vector3(.6431, .2745, .5608), new Laya.Vector3(.8353, .4745, .1686), new Laya.Vector3(.2353, .6824, .2902), new Laya.Vector3(.5922, .3059, .8667), new Laya.Vector3(.3961, .2157, .7373), new Laya.Vector3(.4235, .6745, .4118), new Laya.Vector3(.7059, .251, .2745), new Laya.Vector3(.2667, .4157, .6549), new Laya.Vector3(.1843, .5843, .5294)]
  static colorTable = [{
    p: new Laya.Vector3(.3795415, .7941176, .3824006),
    r: new Laya.Vector3(.5382891, .245026, .7573529)
  }, {
    p: new Laya.Vector3(.3633218, .5783081, .7058823),
    r: new Laya.Vector3(.7867647, .2661116, .7508579)
  }, {
    p: new Laya.Vector3(.6524901, .3986267, .7426471),
    r: new Laya.Vector3(.8970588, .4606297, .1253244)
  }];
}