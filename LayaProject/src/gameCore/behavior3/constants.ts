export const VERSION = '0.2.2';
// export const SUCCESS = 1;
// export const FAILURE = 2;
// export const RUNNING = 3;
// export const ERROR = 4;
// export const COMPOSITE = 'composite';
// export const DECORATOR = 'decorator';
// export const ACTION = 'action';
// export const CONDITION = 'condition';

export enum B3Status {
    NONE = 0,
    SUCCESS = 1,
    FAILURE = 2,
    RUNNING = 3,
    ERROR = 4
}

export enum B3Category {
    NONE = "",
    COMPOSITE = 'composite',
    DECORATOR = 'decorator',
    ACTION = 'action',
    CONDITION = 'condition',
}