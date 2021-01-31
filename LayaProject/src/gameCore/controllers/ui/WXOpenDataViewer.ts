export default class WXOpenDataViewer extends Laya.Sprite {

    public constructor() {
        super();

        var tex = new Laya.Texture();
        if (Laya["Texture2D"]) {
            tex.bitmap = new Laya["Texture2D"]();
            this.texture = tex;
        } else {
            throw new Error("WXOpenDataViewer:webgl not found!");
        }
    }

    public onEnable() {
        this.postMsg({ type: "display", rate: Laya.stage.frameRate });
        let sharedCanvas = Laya.Browser.window.sharedCanvas;
        if (sharedCanvas) {
            sharedCanvas.width = Laya.stage.width;
            sharedCanvas.height = Laya.stage.height;
        }
        if (Laya.Browser.window.wx && Laya.Browser.window.sharedCanvas) Laya.timer.frameLoop(1, this, this._onLoop);
    }

    public onDisable() {
        this.postMsg({ type: "undisplay" });
        Laya.timer.clear(this, this._onLoop);
    }

    public onDestroy() {
        this.postMsg({ type: "undisplay" });
        Laya.timer.clear(this, this._onLoop);
    }

    private _onLoop() {
        this.texture.setTo(Laya.Browser.window.sharedCanvas)
        //this.texture.bitmap.loadImageSource(Laya.Browser.window.sharedCanvas);
    }

    public postMsg(msg) {
        if (Laya.Browser.window.wx && Laya.Browser.window.wx.getOpenDataContext) {
            var openDataContext = Laya.Browser.window.wx.getOpenDataContext();
            openDataContext.postMessage(msg);
        }
    }

    public sendInit(myOpenId:string){
            this.postMsg({ type: "init", openId: myOpenId });
    }

    /**
     * 获取好友排行
     * @param myOpenId 我的openId
     */
    public getFriendRank(myOpenId: string) {
        this.callLater(()=>{
            this.postMsg({ type: "friend", openId: myOpenId });
        });
    }

    /**向开放数据域发送消息*/
    private _postMsg() {
        var mat = new Laya.Matrix();
        mat.translate(this.x, this.y);
        var stage = Laya.stage;
        mat.scale(stage.clientScaleX * this.globalScaleX * stage.transform.getScaleX(), stage.clientScaleY * this.globalScaleY * stage.transform.getScaleY());
        this.postMsg({ type: "changeMatrix", a: mat.a, b: mat.b, c: mat.c, d: mat.d, tx: mat.tx, ty: mat.ty, w: this.width, h: this.height });
    }

    public setSize(x, y, w, h) {
        var stage = Laya.stage;
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
        this.callLater(this._postMsg);
    }

}