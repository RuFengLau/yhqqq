/**支付数据 */
export default class PaymentData{
    /**用户token */
    public openId:string;
    /**付费点 */
    public point:string;
    /**产品名 */
    public productName:string;
    /**产品说明 */
    public productDesc:string;
    /**购买数量 */
    public count:number;
    /**价格，单位分 */
    public price:number;
    /**对应的游戏版本 */
    public appVersion:string;
    /**对应的系统版本 */
    public engineVersion:string;

}

/**支付返回数据 */
export class PaymentResutlData{
    public code:string;
    public msg:string;
    public orderNo:string;
    public paySign:string;
    public timestamp:number;
}