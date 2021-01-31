/**
 * 字符类处理
 */
export default class StringHelper {
    /**
     * 格式化时间 (00:00)
     * @param time 
     */
    public static timeFormat(time: number): string {
        let min = Math.floor(time / 60);
        let sec = time % 60;
        return `${min < 10 ? ("0" + min) : min}:${sec < 10 ? ("0" + sec) : sec}`;
    }

    /**
     * 修改名字为小写
     * @param root 
     */
    public static toLowerName(root: Laya.Sprite3D): void {
        if (root.name) root.name = root.name.toLocaleLowerCase();
        let len = root.numChildren;
        for (var i = 0; i < len; i++) {
            let child = root.getChildAt(i) as Laya.Sprite3D;
            StringHelper.toLowerName(child);
        }
    }
}