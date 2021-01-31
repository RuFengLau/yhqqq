export default class ColorHelper {
     /**
     * 获取Color3
     * @param red 0-255
     * @param green 0-255
     * @param blue 0-255
     */
    public static getD3Color(red: number, green: number, blue: number): Laya.Vector3 {
        var result: Laya.Vector3 = new Laya.Vector3(red / 255, green / 255, blue / 255);
        return result;
    }

    /**
     * 获取Color4
     * @param red 0-255
     * @param green 0-255
     * @param blue 0-255
     * @param alpha 0-255
     */
    public static getD3Color4(red: number, green: number, blue: number, alpha: number): Laya.Vector4 {
        var result: Laya.Vector4 = new Laya.Vector4(red / 255, green / 255, blue / 255, alpha / 255);
        return result;
    }

    /**
     * 改变颜色滤镜
     * @param r R
     * @param g G
     * @param b B
     * @param target 源 
     */
    public static ChangeColorFilter(r: number, g: number, b: number, target: any) {
        var colorMatrix =
            [
                r, 0, 0, 0, 0, //R
                0, g, 0, 0, 0, //G
                0, 0, b, 0, 0, //B
                0, 0, 0, 1, 0, //A
            ];
        var colorFilter = new Laya.ColorFilter(colorMatrix);
        target.filters = [colorFilter];
    }

    /**
     * 过渡两个颜色
     * @param a 
     * @param b 
     * @param persent 
     */
    public static lerpColor(a:number,b:number,persent:number):number{
        var ab = a&0xFF;
        var ag = (a>>8)&0xFF;
        var ar = (a>>16)&0xFF;
        var bb = b&0xFF;
        var bg = (b>>8)&0xFF;
        var br = (b>>16)&0xFF;

        var r = ar+(br-ar)*persent;
        var g = ag+(bg-ag)*persent;
        var b = ab+(bb-ab)*persent;
        return (r<<16)+(g<<8)+b;
    }

    /**
     * 转色(255,255,255)->FFFFFF
     * @param r 
     * @param g 
     * @param b 
     */
    public static rgb2Str(r:number,g:number,b:number):string{
        return ((r<<16)+(g<<8)+b).toString(16);
    }

    /**
     * (255,255,255)->16777215‬
     * @param r 
     * @param g 
     * @param b 
     */
    public static rgb2Number(r:number,g:number,b:number):number{
        return ((r<<16)+(g<<8)+b);
    }


    /**
     * FFFFFF->(255,255,255)
     * @param str 
     */
    public static str2RGB(str:string):Laya.Vector3{
        let value = parseInt("0x"+str);
        var color = new Laya.Vector3((value>>16)&0xFF,(value>>8)&0xFF,value&0xFF);
        return color;
    }

    /**
     * FFFFFF->16777215‬
     * @param str 
     */
    public static str2Number(str:string):number{
        let value = parseInt("0x"+str);
        return value;
    }
}