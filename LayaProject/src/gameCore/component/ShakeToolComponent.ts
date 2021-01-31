import MathHelper from "../plugins/tools/MathHelper";
import LayaScript3D from "./LayaScript3D";
export default class ShakeToolComponent extends LayaScript3D {
    private shakeTime: number = 0.3;
    private shakeScale: Laya.Vector3 = new Laya.Vector3(0, 0, 0);
    private shakeSwitch: boolean = false;
    private m_owner: Laya.Sprite3D;
    private tempPos: Laya.Vector3;
    /**
     * 震动
     * @param shakeDuration 振动时间
     * @param scale 幅度
     */
    public DoShake(shakeDuration: number = 0.3, scale: Laya.Vector3) {
        this.shakeTime = shakeDuration;
        this.shakeScale = scale;
        this.shakeSwitch = true;
    }


    public onAwake() {
        this.m_owner = this.owner as Laya.Sprite3D;
        this.tempPos = this.m_owner.transform.localPosition.clone();
    }

    public onUpdate() {
        let delta = Laya.timer.delta * 0.001;
        if (this.shakeSwitch == true && this.m_owner) {

            let xRand = MathHelper.randomFloat(0, 2 * this.shakeScale.x) - this.shakeScale.x;
            let yRand = MathHelper.randomFloat(0, 2 * this.shakeScale.y) - this.shakeScale.y;
            let zRand = MathHelper.randomFloat(0, 2 * this.shakeScale.z) - this.shakeScale.z;

            this.m_owner.transform.localPositionX = this.tempPos.x + xRand;
            this.m_owner.transform.localPositionY = this.tempPos.y + yRand;
            this.m_owner.transform.localPositionZ = this.tempPos.z + zRand;
            this.shakeTime -= delta;
            if (this.shakeTime <= 0) {
                this.shakeSwitch = false;
                this.m_owner.transform.localPositionX = this.tempPos.x;
                this.m_owner.transform.localPositionY = this.tempPos.y;
                this.m_owner.transform.localPositionZ = this.tempPos.z;
            }

        }
    }

}