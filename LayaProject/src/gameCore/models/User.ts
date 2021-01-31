import { CarBagData, StageBagData } from "../../gameLogic/managers/GameModels";
import UserInfo from "./UserInfo";

export default class User {
    public coins: number;
    public gems: number;
    public score: number;
    public userInfo: UserInfo;


    public currentStage:number;
    public currentCarId:string;
    public carBags:Array<CarBagData>;

    public stageBags:Array<StageBagData>;
    
}