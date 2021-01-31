import { RewardType } from "../../models/GameEnum";

export class CheckInData {
    public day: string;
    public desc: string;
    public rewards: Array<CheckInRewardData>;
    public icon:string;
}

export class CheckInInfoData {
    /**签到次数 */
    public signNum: number;
    /** */
    public getDay: number;
    //签到日期
    public signDate: string;
}

export class CheckInRewardData {
    public rewardType: RewardType
    public id: string;
    public reward: number;
}