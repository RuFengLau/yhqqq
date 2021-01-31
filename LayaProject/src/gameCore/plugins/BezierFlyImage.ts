import ResourcesManager from "../managers/ResourcesManager";
import BezierObject from "./BezierObject";

export default class BezierFlyImage {
    private static images: Array<fairygui.GLoader> = [];
    private static conatiner: fairygui.GComponent;
    public static doAnimation(image:string,count: number, startPoint: Laya.Point, endPoint: Laya.Point,pointCount:number=60) {
        if (this.conatiner == null) {
            this.conatiner = new fairygui.GComponent();
        }
        Laya.stage.addChild(this.conatiner.displayObject);
        this.conatiner.setSize(Laya.stage.width, Laya.stage.height);

        for (let index = 0; index < count; index++) {
            let loader = new fairygui.GLoader();
            loader.icon = ResourcesManager.inst.getImageThumb(image);
            let a = loader.displayObject.addComponent(BezierObject) as BezierObject;
            a.setData(startPoint, endPoint,pointCount);
            this.conatiner.addChild(loader);
            this.images.push(loader);
        }

    }

}