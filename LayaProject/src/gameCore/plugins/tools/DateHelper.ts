/**
 * 时间工具类
 */
export default class DateHelper {
    /**
    * 获取时间 (格式：年月日时分秒)
    */
    public static getSystemTime(): string {
        var curDate: Date = new Date();
        var year: number = curDate.getFullYear();
        var month: number = curDate.getMonth() + 1;
        var date: number = curDate.getDate();
        var hour: number = curDate.getHours();
        var minute: number = curDate.getMinutes();
        var second: number = curDate.getSeconds();
        var systemTime = year + "年" + month + "月" + date + "日" + hour + "时" + minute + "分" + second + "秒";
        return systemTime;
    }

    /**
     * 获取时间（格式：2018/12/31）
     */
    public static getTime(): string {
        let curDate: Date = new Date();
        let year: number = curDate.getFullYear();
        let month: number = curDate.getMonth() + 1;
        let date: number = curDate.getDate();
        if (month < 10) {

        }
        var systemTime = year + "/" + (month < 10 ? "0" + month : month) + "/" + (date < 10 ? "0" + date : date);
        return systemTime;
    }
}