// Learn TypeScript:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/typescript.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/manual/en/scripting/life-cycle-callbacks.html


export default class CustomEventType {

  /**
   * 金币发生改变时
   */
  public static CoinChange = "coinChange";

  /**
   * 人数发生改变时
   */
  public static PeopleChange = "PeopleChange";

  /**
  * boss血量发生改变时
  */
  public static BossVal = "BossVal";

  /**
  * 开始游戏
  */
  public static PassChange = "PassChange";
}
