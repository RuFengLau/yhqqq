import ResourcesManager from "../managers/ResourcesManager";
import BezierPath from "./tools/BezierPath";
import MathHelper from "./tools/MathHelper";

export default class BezierObject extends Laya.Script {
    onAwake() {

    }
    private index: number = 0;
    private bArray: any[];
    public setData(startPoint: Laya.Point, endPoint: Laya.Point,pointCount:number = 60) {
        let points = []
        let point1 = new Laya.Point(MathHelper.randomFloat(startPoint.x - 100, startPoint.x + 100), MathHelper.randomFloat(startPoint.y - 100, startPoint.y + 100));
        let point2 = new Laya.Point((startPoint.x + endPoint.x), (startPoint.y + endPoint.y) * 0.5)//一个顶点 还可以继续添加 点
        point2.x = MathHelper.randomFloat(point2.x - 100, point2.x + 100);
        point2.y = MathHelper.randomFloat(point2.y - 100, point2.y + 100);
        let point3 = endPoint;
        points.push(point1)
        points.push(point2)
        points.push(point3)
        this.bArray = BezierPath.CreateBezierPoints(points, pointCount)
        this.index = 0;
        Laya.timer.frameLoop(1, this, this.move);
    }

    private move() {
        if (this.index > this.bArray.length - 1) {
            Laya.timer.clear(this, this.move);
            this.owner.removeSelf();
        } else {
            (this.owner as Laya.Sprite).pos(this.bArray[this.index].x, this.bArray[this.index].y);
            this.index++;
        }
    }
}