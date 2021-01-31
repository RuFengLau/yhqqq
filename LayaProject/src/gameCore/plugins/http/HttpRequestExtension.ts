
export class WWWResultData {
	public static readonly SUCCESS: number = 1;//成功
	public static readonly FAIL: number = 0;//失败

	public resultCode: number = 1;
	public data: any;
	public msg: string;

}

export class HttpRequestExtension extends Laya.HttpRequest {
    private httpRequest: Laya.HttpRequest;
    private caller: any;
    private GetHeaders(): Array<any> {
        var arr: Array<any> = [
            "Content-Type", "application/json"
        ]
        return arr;
    }
    public constructor() {
        super();
        this.httpRequest = new Laya.HttpRequest();
    }

    public Get(url: string, caller: any, callback: Function): HttpRequestExtension {
        this.httpRequest.once(Laya.Event.COMPLETE, this, function (e: any) {
            callback.apply(caller, [JSON.parse(e)]);
        });
        this.httpRequest.once(Laya.Event.ERROR, this, function (e: any) {
            var result: WWWResultData = new WWWResultData();
            result.msg = "获取失败";
            result.data = null;
            result.resultCode = WWWResultData.FAIL;
            callback.apply(caller, [result]);
        });
        this.httpRequest.send(url, null, 'get', 'application/json', this.GetHeaders());
        return this;
    }


    public Post(url: string, data: any, caller: any, callback: Function): HttpRequestExtension {
        this.httpRequest.once(Laya.Event.COMPLETE, this, function (e: any) {
            callback.apply(caller, [JSON.parse(e)]);
        });
        this.httpRequest.once(Laya.Event.ERROR, this, function (e: any) {
            var result: WWWResultData = new WWWResultData();
            result.msg = "获取失败";
            result.data = null;
            result.resultCode = WWWResultData.FAIL;
            callback.apply(caller, [result]);
        });
        this.httpRequest.send(url, JSON.stringify(data), 'post', 'application/json', this.GetHeaders());
        return this;
    }

}