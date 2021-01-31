import MathHelper from "./MathHelper";

/**
 * V3工具类
 */
export default class Vector3Helper {
    public static readonly kEpsilon: number = 0.00001;
    public static readonly kEpsilonNormalSqrt: number = 1e-15;
    public static v3Temp1: Laya.Vector3 = new Laya.Vector3();
    
    /** 获取两向量角度 */
    public static angle(from: Laya.Vector3, to: Laya.Vector3): number {
        // sqrt(a) * sqrt(b) = sqrt(a * b) -- valid for real numbers
        var denominator: number = Math.sqrt(Laya.Vector3.scalarLengthSquared(from) * Laya.Vector3.scalarLengthSquared(to));
        if (denominator < this.kEpsilonNormalSqrt)
            return 0;
        var dot: number = MathHelper.clamp(Laya.Vector3.dot(from, to) / denominator, -1, 1);
        return Math.acos(dot) * MathHelper.Rad2Deg;

        // Laya.Vector3.normalize(v2, this.v3Temp1);
        // var dot = Laya.Vector3.dot(v1, this.v3Temp1);
        // var angle = Math.acos(dot) * MathHelper.Rad2Deg;
        // return angle;
    }

    /**
     * 
     * @param from 
     * @param to 
     * @param angle 
     */
    public static RotateTo(from: Laya.Vector3, to: Laya.Vector3, angle: number): Laya.Vector3 {
        //如果两向量角度为0
        if (this.angle(from, to) == 0) {
            return from;
        }

        //旋转轴
        var n: Laya.Vector3 = new Laya.Vector3();
        Laya.Vector3.cross(from, to, n);
        //旋转轴规范化
        Laya.Vector3.normalize(n, n);
        //旋转的弧度
        var radian: number = angle * Math.PI / 180;
        var cosAngle: number = Math.cos(radian);
        var sinAngle: number = Math.sin(radian);
        //矩阵的数据
        //旋转矩阵
        var rotateMatrix: Laya.Matrix4x4 = new Laya.Matrix4x4
            (
                n.x * n.x * (1 - cosAngle) + cosAngle, n.x * n.y * (1 - cosAngle) + n.z * sinAngle, n.x * n.z * (1 - cosAngle) - n.y * sinAngle, 0,
                n.x * n.y * (1 - cosAngle) - n.z * sinAngle, n.y * n.y * (1 - cosAngle) + cosAngle, n.y * n.z * (1 - cosAngle) + n.x * sinAngle, 0,
                n.x * n.z * (1 - cosAngle) + n.y * sinAngle, n.y * n.z * (1 - cosAngle) - n.x * sinAngle, n.z * n.z * (1 - cosAngle) + cosAngle, 0,
                0, 0, 0, 1
            );

        var v: Laya.Vector4 = this.toVector4(from);
        var vector: Laya.Vector3 = new Laya.Vector3();
        for (var i: number = 0; i < 3; ++i) {
            for (var j: number = 0; j < 3; j++) {
                vector[i] += v[j] * rotateMatrix.getElementByRowColumn(j, i);
            }
        }
        return vector;
    }

    public static toVector4(from: Laya.Vector3, out: Laya.Vector4 = null): Laya.Vector4 {
        !out && (out = new Laya.Vector4());
        out.setValue(from.x, from.y, from.z, 0);
        return out;
    }

    public static lerp(a: Laya.Vector3, b: Laya.Vector3, t: number, out?: Laya.Vector3): Laya.Vector3 {
        !out && (out = new Laya.Vector3());
        t = MathHelper.clamp(t, 0, 1);
        out.setValue(
            a.x + (b.x - a.x) * t,
            a.y + (b.y - a.y) * t,
            a.z + (b.z - a.z) * t
        );
        return out;
    }

    public static slerpUnclamped(a: Laya.Vector3, b: Laya.Vector3, t: number, out?: Laya.Vector3): Laya.Vector3 {
        return this.lerp(a, b, t, out);
    }

    /**
     * 对比获取小的V3
     * @param a 
     * @param b 
     * @param out 
     */
    public static minV3(v1: Laya.Vector3, v2: Laya.Vector3, out: Laya.Vector3): void {
        out.x = Math.min(v1.x, v2.x);
        out.y = Math.min(v1.y, v2.y);
        out.z = Math.min(v1.z, v2.z);
    }

    /**
     * 对比获取大的V3
     * @param a 
     * @param b 
     * @param out 
     */
    public static maxV3(a: Laya.Vector3, b: Laya.Vector3, out: Laya.Vector3): void {
        out.x = Math.max(a.x, b.x);
        out.y = Math.max(a.y, b.y);
        out.z = Math.max(a.z, b.z);
    }

    /**
     * 计算2D向量距离
     * @param x1 起始x
     * @param y1 起始y
     * @param x2 终点x
     * @param y2 终点y
     */
    public static distance2D(x1:number,y1:number,x2:number,y2:number):number{
        let dx:number = x2 - x1;
        let dy:number = y2 - y1;
        let distance: number = Math.sqrt(dx * dx + dy * dy);
        return distance; 
    }

    /**
     * 计算2d角度
     * @param x1 
     * @param y1 
     * @param x2 
     * @param y2 
     */
    public static angle2D(x1:number,y1:number,x2:number,y2:number):number{
        var offsetX: number = x2 - x1;
        var offsetY: number = y2 - y1;
        var rad: number = Math.atan2(offsetX, offsetY);
        var degree: number = rad * 180 / Math.PI;
        return degree;
    }
}