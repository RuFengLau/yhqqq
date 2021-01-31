import { LanguageData } from "./LanguageData";
/**
 * LanguageType
 */
export enum LanguageType {
    CN = 0,//中文简体
    EN,//英语
    RU,//俄语
    AR,//阿拉伯语
    ZH_CN,//中文简体
    KO,
    JA,
    PT,
    ES,//西班牙语
    DE,//德语
    FR,//法语
    BN,
    MS,
    HI,//印地文
    VI
}
export default class MultiLanguageManager {
    private static _inst: MultiLanguageManager;
    public static get inst(): MultiLanguageManager {
        if (this._inst == null) {
            this._inst = new MultiLanguageManager();
        }
        return this._inst;
    }

    private m_data: Array<LanguageData> = new Array<LanguageData>();
    public get data(): Array<LanguageData> {
        return this.m_data;
    }

    public set data(d: Array<LanguageData>) {
        this.m_data = d;
    }

    public languageType: LanguageType = LanguageType.CN;

    //fgui不是中文就是英文
    public getLanguageString(type: LanguageType): string {
        var label = "";
        switch (type) {
            case LanguageType.CN:
                label = "";
                break;
            default:
                label = "en";
                break;


        }
        return label;
    }

    /**
     * 改变语言
     * @param key 
     */
    public getLanguage(key: string, repaceStr: string = "") {
        var label = key;
        switch (this.languageType) {
            case LanguageType.CN:
                label = key;
                break;
            case LanguageType.EN:
                label = this.getLanguageData(key).en;
                break;
            case LanguageType.RU:
                label = this.getLanguageData(key).ru;
                break;
            case LanguageType.ZH_CN:
                label = key;
                break;
            case LanguageType.FR:
                label = this.getLanguageData(key).fr;
                break;
            case LanguageType.DE:
                label = this.getLanguageData(key).de;
                break;
            case LanguageType.AR:
                label = this.getLanguageData(key).ar;
                break;
            case LanguageType.ES:
                label = this.getLanguageData(key).es;
                break;
            case LanguageType.HI:
                label = this.getLanguageData(key).hi;
                break;
            default:
                label = this.getLanguageData(key).en;
                break;


        }
        if (repaceStr.length > 0) {
            label = label.replace("{0}", repaceStr);
        }
        return label;
    }

    private getLanguageData(key: string): LanguageData {
        for (let index = 0; index < this.m_data.length; index++) {
            const item = this.m_data[index];
            if (item.key == key) {
                return item;
            }
        }
        return null;
    }
}