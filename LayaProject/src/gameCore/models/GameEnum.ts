
/**
 * Sound类型
 */
export enum SoundType {
    None,
    BGM,
    MainViewBGM,
    SE_BuyItem,
    SE_Win,
    SE_Lose,
}

/**
 * 奖励类型
 */
export enum RewardType {
    /**金币 */
    Coin,
    /**人物 */
    Role,
    /**buff */
    Buff,
    /**木材 */
    Woods,
    /**钻石 */
    Diamond
}



/**
 * 解锁类型
 */
export enum UnlockType {
    /**免费解锁 */
    Free,
    /**金币解锁 */
    Coin,
    /**金币或视频解锁 */
    CoinOrVideo,
    /**视频解锁 */
    Video,
    /**钻石解锁 */
    Diamond,
    /**关卡解锁 */
    Stage,
    /**关卡且视频解锁 */
    StageAndVideo,
    /**关卡且人民币解锁 */
    StageAndRMB,
    Other = 11,
    Y_野怪Boss = 12,
}

export enum GameState {
    StandBy,
    Play,
    Result
}

export enum FriendType {
    None,
    Enemy,
    Friend
}

export enum RoleClass {
    Solider,
    Hero
}

/**建筑类型，也对应建筑_id */
export enum BuildingType{
    空 = "",
    主城 = "1",
    近战兵营 = "2",
    远程兵营 = "3",
    祭坛 = "4",
    金矿 = "5",
    伐木场 = "6"
}

/**
 * 兵种
 */
export enum RangeType{
    /**近战 */
    近战,
    /**远程 */
    远程
}

/**
 * 兵种类型
 */
export enum ArmType {
    None,
    /**步兵 */
    Infantry,
    /**枪兵 */
    Spear,
    /**弓兵 */
    Bow,
    /**法师 */
    Magic,
    /**骑兵 */
    Cavalry,
    /**重装 */
    Mechine,
    /**建筑 */
    Building,
    /**英雄 */
    Hero,
}

/**地图块 */
export enum MapGripType{
    J_金币 = 3,
    M_木材 = 4,
    Z_钻石 = 5,
    Z_主角出生点 = 6,
    B_Boss出生点 = 7,
    G_关卡 = 8,
    T_体力 = 9,
    C_藏宝图 = 10,
    P_普通宝箱 = 11,
    S_视频宝箱 = 12,
    B_补充兵力 = 13
}

/**增益类型 */
export enum BuffType{
    G_攻击力 = 0,
    F_防御力,
    H_恢复,
    Z_召唤,
    S_伤害,
    B_冰冻,
    S_生命,
    J_技能伤害,
    Y_移动速度,
    G_攻击速度
}

/**效益类型 */
export enum BenefitType{
    Up = 0,
    Down = 1
}

/**
 * 目标类型
 */
export enum TargetType{
    K_空,
    Z_自身,
    D_敌方单体,
    Y_友方单体,
    F_范围友军,
    D_敌方全体,
    D_友方全体,
    Z_子弹范围敌军,
    Z_自身范围敌军
}






