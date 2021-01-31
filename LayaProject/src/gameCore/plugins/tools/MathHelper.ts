
import Vector3Helper from "./Vector3Helper";
/*
* 数学库;
*/
export default class MathHelper {
    /**
     * Deg2Rad = 0.01745329
     */
    public static Deg2Rad: number = 0.01745329;
    /**
     * Rad2Deg = 57.29578
     */
    public static Rad2Deg: number = 57.29578;

    /**获取某点半径的点 */
    public static getRoundPoint(center: Laya.Point, count: number, r: number) {
        let results = new Array<Laya.Point>();
        let perAngle = 360 / count * MathHelper.Deg2Rad;
        for (let i = 0; i < count; i++) {
            results.push(new Laya.Point(Math.sin(perAngle * i) * r + center.x, Math.cos(perAngle * i) * r+center.y));
        }
        return results;
    }

    /**
     * 获取两个角度之间差距
     * @param a 
     * @param b 
     */
    public static getAngleSpace(a: number, b: number): number {
        let s = Math.abs(a - b);
        if (s < 180) {
            return s;
        }
        else {
            return (a + b + 360) % 360;
        }
    }

    /** 球表面随机 */
    public static onUnitSphere(radius: number): Laya.Vector3 {
        var p1: number = this.random(-radius, radius);
        var p2: number = this.random(-radius, radius);
        var p3: number = this.random(-radius, radius);
        var v3: Laya.Vector3 = new Laya.Vector3(p1, p2, p3);
        //Laya.Vector3.normalize(v3,v3);
        Laya.Vector3.scale(v3, radius, v3);
        return v3;
    }

    /**返回浮点随机值 */
    public static randomFloat(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    /**
     * 总数随机分成n份
     * @param total 总数
     * @param n 
     */
    public static randomTotal2N(total: number, n: number): number[] {
        var aryRet = [];
        var fSumTmp = n;
        var iAcc = 0;
        for (var i = 0; i < (total - 1); i++) {
            var iTmp = Math.ceil(Math.random() * (fSumTmp / 2));
            aryRet.push(iTmp);
            fSumTmp -= iTmp;
            iAcc += iTmp;
        }
        aryRet.push(n - iAcc);
        return aryRet;
    }

    /**
     * 随机生成不重复的数字
     * @param total
     * @param n 
     */
    public static getRandomSequence(total: number, n: number): number[] {
        //随机总数组
        let sequence: number[] = [total];
        //取到的不重复数字的数组长度
        let output: number[] = [n];
        for (let i = 0; i < total; i++) {
            sequence[i] = i;
        }

        let end = total - 1;
        for (let i = 0; i < n; i++) {
            let num = this.random(0, end);
            output[i] = sequence[num];
            sequence[num] = sequence[end];
            end--;
        }
        return output;
    }

    /**
     * 随机范围获取整数数值 min<= value <=max 
     * */
    public static random(min: number, max: number) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    /**
     * 随机中间一个值
     * @param arr 
     */
    public static randomValue(arr: Array<any>): any {
        let len = arr.length;
        let index = (len * Math.random()) >> 0;
        if (index < len) {
            return arr[index];
        }

        return null;
    }

    /**
     * 几率数组随机
     * 使用方法 Debug.Log(rand(new int[] { 10, 5, 15, 20, 30, 5, 5,10 }, 100));
     * @param rate 几率数组（百分比值）
     * @param total 几率总和（100%）
     * 
     */
    public static randRate(rate: Array<number>, total: number) {
        let r = this.random(1, total);
        let t = 0;
        for (let i = 0; i < rate.length; i++) {
            t += rate[i];
            if (r < t) {
                return i;
            }
        }
        return 0;
    }

    /**
     * 角度限制
     * @param angle 
     * @param min 
     * @param max 
     */
    public static clampAngle(angle: number, min: number, max: number): number {
        if (angle < min) {
            angle = min;
        }
        else if (angle > max) {
            angle = max;
        }
        return angle;
    }

    /**
     * 数值限制
     */
    public static clamp(value: number, min: number, max: number): number {
        if (value < min) {
            value = min;
        }
        else if (value > max) {
            value = max;
        }
        return value;
    }

    // Loops the value t, so that it is never larger than length and never smaller than 0.
    public static repeat(t: number, length: number): number {
        return this.clamp(t - Math.floor(t / length) * length, 0.0, length);
    }

    // PingPongs the value t, so that it is never larger than length and never smaller than 0.
    public static pingPong(t: number, length: number): number {
        t = this.repeat(t, length * 2);
        return length - Math.abs(t - length);
    }

    public static Approximately(a: number, b: number): boolean {
        // If a or b is zero, compare that the other is less or equal to epsilon.
        // If neither a or b are 0, then find an epsilon that is good for
        // comparing numbers at the maximum magnitude of a and b.
        // Floating points have about 7 significant digits, so
        // 1.000001f can be represented while 1.0000001f is rounded to zero,
        // thus we could use an epsilon of 0.000001f for comparing values close to 1.
        // We multiply this epsilon by the biggest magnitude of a and b.
        // return Math.abs(b - a) < Math.max(0.000001 * Math.max(Math.abs(a), Math.abs(b)), Epsilon * 8);
        return Laya.MathUtils3D.nearEqual(a, b);
    }

    /**
     * 转大数值字符
     * @param n 数值
     * @param maxLen 位数
     */
    public static number2BigNumber(n: any, maxLen: number = 4): string {
        let outNum: string;
        let k = 1000;
        let base: number = k;
        let pow = 0;

        for (pow = 0; ; pow++) {
            if (n < base) {
                break;
            }
            base *= k;
        }
        let unit = "";
        if (pow < 5) {
            unit = pow == 0 ? "" : (pow == 1 ? "K" : (pow == 2 ? "M" : (pow == 3 ? "B" : "T")));
        }
        else {
            let l_a = 97;
            let l_A = 65;
            let div = Math.floor((pow - 5) / 26);
            let mod = (pow - 5) % 26;
            unit = div == 0 ? String.fromCharCode(l_a + mod, l_a + mod) : (div == 1 ? String.fromCharCode(l_A + mod, l_a + mod) : String.fromCharCode(l_A + mod, l_A + mod));
        }
        outNum = String(n / (base * 0.001));
        return "." == (outNum = outNum.substr(0, maxLen)).charAt(outNum.length - 1) ? outNum.replace(".", unit) : outNum + unit;
    }

    /**大数相加 */
    public static SumString(a, b) {
        a = a.split('');
        b = b.split('');
        var jinwei = 0, result = '';

        while (a.length || b.length || jinwei) {
            var temp = parseInt(a.pop() || 0) + parseInt(b.pop() || 0) + jinwei;
            result = temp % 10 + result;
            jinwei = Math.floor(temp / 10);
        }
        return result;
    }

    /**大数相减 */
    public static SubString(a, b) {
        a = a.split('');
        b = b.split('');
        var aMaxb = a.length > b.length;
        if (a.length == b.length) {
            for (var i = 0, len = a.length; i < len; i++) {
                if (a[i] == b[i]) continue;
                aMaxb = a[i] > b[i];
                break;
            }
        }
        if (!aMaxb) a = [b, b = a][0];
        var result = '';
        while (a.length) {
            var temp = parseInt(a.pop()) - parseInt(b.pop() || 0);
            if (temp >= 0) result = temp + result;
            else {
                result = temp + 10 + result;
                a[a.length - 1]--;
            }
        }
        result = (aMaxb ? '' : '-') + result.replace(/^0*/g, '');
        if (result == "-") {
            result = "0";
        }
        return result
    }

    /**
     * 比对字符串大小
     * @param a 
     * @param b 
     */
    public static CompareString(a, b) {
        let result = this.SubString(a, b);
        if (result == "0") {
            return 0;
        } else if (result.indexOf("-") == 0) {
            return -1;
        } else {
            return 1;
        }
    }

    /**
     * GUID
     */
    public static newGuid() {
        return 'xxxxxxxxxxxx4xxxyxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    /**
     * 计算日期字符
     * @param newDate 新日期(2018/9/9)
     * @param oldDate 旧日期(2018/9/9)
     */
    public static countDay(newDate: string, oldDate: string): number {
        let s1 = new Date(newDate);
        let s2 = new Date(oldDate);
        var days = s1.getTime() - s2.getTime();
        var time = days / (1000 * 60 * 60 * 24);
        return time;
    }

    /**
     * 版本字符对比
     * @param v1 
     * @param v2 
     */
    public static CompareVersion(v1: string, v2: string): number {
        var arr1 = v1.split('.');
        var arr2 = v2.split('.');
        var len = Math.max(arr1.length, arr2.length);
        while (arr1.length < len) {
            arr1.push('0');
        }
        while (arr2.length < len) {
            arr2.push('0');
        }
        for (var i = 0; i < len; i++) {
            var num1 = parseInt(arr1[i]);
            var num2 = parseInt(arr2[i]);
            if (num1 > num2) {
                return 1;
            } else if (num1 < num2) {
                return -1;

            }
        }
        return 0;
    }

    /**
     * 插值
     * @param numStart 
     * @param numEnd 
     * @param t 
     */
    public static lerp(numStart: number, numEnd: number, t: number): number {
        if (t > 1) {
            t = 1;
        } else if (t < 0) {
            t = 0
        }

        return numStart * (1 - t) + (numEnd * t);
    }

    /**
     * 
     * @param angle1 角度插值
     * @param angle2 
     * @param t 
     */
    public static lerpAngle(current: number, target: number, t: number): number {
        current %= 360;
        target %= 360;

        var dAngle: number = target - current;

        if (dAngle > 180) {
            target = current - (360 - dAngle);
        } else if (dAngle < -180) {
            target = current + (360 + dAngle);
        }

        return (this.lerp(current, target, t) % 360 + 360) % 360;
    }

    /**
     * 按一定的速度从一个角度转向令一个角度
     * @param current 
     * @param target 
     * @param speed 
     */
    public static angleTowards(current: number, target: number, speed: number): number {
        current %= 360;
        target %= 360;

        var dAngle: number = target - current;

        if (dAngle > 180) {
            target = current - (360 - dAngle);
        } else if (dAngle < -180) {
            target = current + (360 + dAngle);
        }

        var dir = target - current;

        if (speed > Math.abs(dir)) {
            return target;
        }

        return ((current + speed * this.sign(dir)) % 360 + 360) % 360;

    }

    /**
     * 获得随机方向
     */
    public static sign(x: number) {
        if (x > 0) {
            return 1;
        }

        if (x < 0) {
            return -1;
        }

        return 0;
    }

    /**
     * 
     * @param value 获得一个值的概率
     */
    public static probability(value: number) {
        return Math.random() < value;
    }


    


}