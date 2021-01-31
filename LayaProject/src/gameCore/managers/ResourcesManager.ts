import UIManager from './UIManager';
import GameLoadingUIBinder from '../../views/GameLoadingUI/GameLoadingUIBinder';
import EventManager from './eventManager/EventManager';
import GameEvents from '../events/GameEvents';
import GameUIBinder from '../../views/GameUI/GameUIBinder';
import LoadingViewController from '../controllers/ui/LoadingViewController';
import GameEngine from './GameEngine';
import Platforms, { Platform } from '../platform/Platforms';
import DataManager from './DataManager';
import GameCommandUIBinder from '../../views/GameCommandUI/GameCommandUIBinder';
/**
 * 资源加载类
 */
export default class ResourcesManager {

    private static _inst: ResourcesManager;
    public static get inst(): ResourcesManager {
        if (this._inst == null) {
            this._inst = new ResourcesManager();
        }
        return this._inst;
    }

    public get GameConfigRes(): string { return "res/data/configs.json"; }
    /**用来加载zip的 */
    public fileConfigs: any;
    private hashData: Array<string> = [];
    public async readHashFile(): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            let file = Platforms.inst.userDataPath() + "downloadHash.json"
            Laya.loader.load(file, Laya.Handler.create(this, (res) => {
                if (res) {
                    this.hashData = Laya.loader.getRes(file)
                    resolve(JSON.stringify(this.hashData));
                } else {
                    Platforms.inst.writeFileSync("downloadHash.json", JSON.stringify([]));
                    resolve("[]");
                }
            }));
        });
    }

    private gameUIPacakge: string = "";
    private gameURLS = [];
    public registerGameUIInfo(packageURL: string, resUrls: any[]) {
        this.gameUIPacakge = packageURL;
        this.gameURLS = resUrls;
    }

    private gameModelURLS = [];
    public registerModels(resUrls: any[]) {
        this.gameModelURLS = resUrls;
    }

    /**
     * 加载资源
     */
    async loadResource() {
        console.log("[ResourcesManager loadResource] 加载系统所需资源");
        if (GameEngine.inst.useZipAssets) {
            let list = DataManager.inst.deepCopy(this.fileConfigs.systemFileList) as Array<any> ;
            let p = 100 / list.length;
            for (let index = 0; index < list.length; index++) {
                const item = list[index];
                EventManager.inst.SendEvent(GameEvents.ON_LOAD_PROGRESS_EVENT, (index + 1) * p);
                await this.LoadZipAndUnZip(item.url);
            }
            if (Platforms.inst.platform == Platform.weixin_h5 
                || Platforms.inst.platform == Platform.toutiao_h5
                || Platforms.inst.platform == Platform.vivo_h5) {
                Laya.URL.basePath = Platforms.inst.userDataPath();
            }
            await this.loadUI();
            await this.loadModel();
            console.log("[ResourcesManager loadResource] 加载资源完成");
        } else {
            await this.loadUI();
            await this.loadModel();
            console.log("[ResourcesManager loadResource] 加载资源完成");
        }
    }

    public getZipURL(key:string):string{
        for (let index = 0; index < this.fileConfigs.fileList.length; index++) {
            const d = this.fileConfigs.fileList[index];
            if(d.key== key){
                return d.url;
            }
        }
        return "";
    }

    public getZipData(key:string):any{
        for (let index = 0; index < this.fileConfigs.fileList.length; index++) {
            const d = this.fileConfigs.fileList[index];
            if(d.key== key){
                return d;
            }
        }
        return null;
    }

    /**
     * 加载游戏UI
     */
    private async loadUI(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            Laya.loader.load(this.gameURLS, Laya.Handler.create(this, async (res) => {
                if (res) {
                    console.log("加载UI资源完成");
                    fairygui.UIPackage.addPackage(this.gameUIPacakge);
                    GameUIBinder.bindAll();
                    fairygui.UIPackage.addPackage("res/ui/GameCommandUI");
                    GameCommandUIBinder.bindAll();
                    resolve(true);
                } else {
                    console.log("加载UI资源失败,重试");
                    await this.loadUI();
                }
            }), Laya.Handler.create(this, (p) => {
                //EventManager.inst.SendEvent(GameEvents.ON_LOAD_PROGRESS_EVENT, p * 50);
            }, null, false));
        });
    }

    /**
     * 加载模型资源
     */
    private async loadModel(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            if (this.gameModelURLS.length == 0) {
                EventManager.inst.SendEvent(GameEvents.ON_LOAD_PROGRESS_EVENT, 100);
                resolve(true);
            } else {
                Laya.loader.create(this.gameModelURLS, Laya.Handler.create(this, async (res) => {
                    if (res) {
                        console.log("加载模型资源完成");
                        //this.autoLock();
                        resolve(true);
                    } else {
                        console.log("加载模型资源失败,重试");
                        //await this.loadModel();
                    }
                }), Laya.Handler.create(this, (p) => {
                    EventManager.inst.SendEvent(GameEvents.ON_LOAD_PROGRESS_EVENT, 50 + p * 50);
                }, null, false));
            }
        });
    }

    /**
     * 加载本地内容
     */
    public async loadLocalFiles(): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            //Loading-放本地
            GameEngine.inst.debug("ResourceManager - 加载本地内容");
            fgui.UIConfig.packageFileExtension = "bin";
            let urls = [];
            urls.push({ url: "localRes/ui/GameLoadingUI_atlas0.png", type: Laya.Loader.IMAGE });
            urls.push({ url: "localRes/ui/GameLoadingUI.bin", type: Laya.Loader.BUFFER });
            //urls.push({ url: "localRes/ui/GameLoadingUI_atlas_nqsz4g.jpg", type: Laya.Loader.IMAGE });
            urls.push({ url: "localRes/data/platformConfigs.json", type: Laya.Loader.JSON });
            Laya.loader.load(urls, Laya.Handler.create(this, (res) => {
                if (res) {
                    GameEngine.inst.debug("加载本地内容成功");
                    fairygui.UIPackage.addPackage("localRes/ui/GameLoadingUI");
                    GameLoadingUIBinder.bindAll();
                    UIManager.inst.showPopupView(new LoadingViewController());
                    resolve(true);
                } else {
                    GameEngine.inst.debug("加载本地内容失败");
                    resolve(false);
                }
            }));
        });


    }

    /**
     * 获取模型
     * @param url 
     * @param callback 返回Sprite3d
     */
    public getSprite3d(url: string, callback: Laya.Handler) {
        if (this.gameModelURLS.indexOf(url) != -1) {
            callback.runWith(Laya.loader.getRes(url));
        } else {
            Laya.loader.create(url, Laya.Handler.create(this, () => {
                this.gameModelURLS.push(url);
                callback.runWith(Laya.loader.getRes(url));
            }));
        }
    }

    /**获取图集图片 */
    public getImageThumb(resName: string): string {
        let url = fairygui.UIPackage.getItemURL("GameUI", resName);
        return url;
    }

    /**
     * 获取zip二进制包
     * @param path 
     */
    public getZipBundlePath(path: string): string {
        let s = path.split('/');
        let fileName = s[s.length - 1].split('.')[0];
        let url = "res/assets/" + fileName + ".zip";
        return url;
    }

    public getJsonPath(path: string): string {
        let s = path.split('/');
        let fileName = s[s.length - 1].split('.')[0];
        let url = "res/assets/" + fileName + ".json";
        return url;
    }

    /**
     * 完整清理lh文件所有显存
     * @param url lh文件路径
     */
    public clearResAll(url: string, callback: Laya.Handler) {
        let assetURL = url.split('.')[0] + "_asset.json";
        console.log("清理lh文件所有显存:", assetURL);
        let urls = [];
        urls.push({ url: assetURL, type: Laya.Loader.JSON });
        Laya.loader.load(urls, Laya.Handler.create(this, (success) => {
            if (success) {
                let json = Laya.loader.getRes(assetURL);
                let assets = json.assets;
                for (let index = 0; index < assets.length; index++) {
                    const url = Laya.URL.basePath + assets[index];
                    for (const key in Laya.Loader.loadedMap) {
                        let item = Laya.Loader.loadedMap[key];
                        if (item.url && item.url.indexOf(url) != -1) {
                            if (item instanceof Laya.Texture2D) {
                                item.destroy();
                            } else if (item instanceof Laya.Mesh) {
                                item.destroy();
                            }
                            Laya.Loader.clearRes(item.url);//模型资源路径移除
                        }

                    }
                }
                callback && callback.run();
            }

        }));
    }

    public getZipPath(path: string) {
        let s = path.split('/');
        let fileName = s[s.length - 1].split('.')[0];
        let url = this.getZipURL(fileName);
        //let url = "https://projects-1257427557.file.myqcloud.com/yxwd/h5Assets/toutiao/zip/" + fileName + ".zip";
        return url;
    }

    public async LoadZipAndUnZip(zipUrl: string): Promise<boolean> {
        return new Promise<boolean>(async (resolve, reject) => {
            if (Platforms.inst.platform == Platform.weixin_h5 
                || Platforms.inst.platform == Platform.toutiao_h5
                || Platforms.inst.platform == Platform.vivo_h5
                ) {
                //检查本地Hash文件是否有存在同版本的路径
                let candownLoad = true;
                if (this.hashData && this.hashData.length > 0) {
                    for (let index = 0; index < this.hashData.length; index++) {
                        const url = this.hashData[index];
                        if (zipUrl == url) {
                            console.log(zipUrl, " 已经有了");
                            resolve(true);
                            candownLoad = false;
                        }
                    }
                }
                if (candownLoad) {
                    //没有就重新下载
                    Platforms.inst.downloadFile(zipUrl, (success: boolean, res) => {
                        if (success) {
                            let tmpFile = res.tempFilePath;
                            console.log("tmpfile:",tmpFile);
                            Platforms.inst.unzip(tmpFile, (success) => {
                                if (success) {
                                    console.log("解压zip包成功!!!!!");
                                    //覆写本地Hash文件
                                    this.hashData.push(zipUrl);
                                    Platforms.inst.writeFileSync("downloadHash.json", JSON.stringify(this.hashData));
                                    resolve(true);
                                } else {
                                    console.warn("解压zip包失败");
                                    resolve(false);
                                }
                            });

                        } else {
                            console.warn("下载zip包失败");
                            resolve(false);
                        }
                    });
                }



            } else {
                resolve(true);
            }
        });
    }

    /**
     * 加载文件
     * @param urls 
     */
    public async loadFiles(urls): Promise<boolean> {
        return new Promise<boolean>((resolve, reject) => {
            Laya.loader.load(urls, Laya.Handler.create(this, (res) => {
                if (res) {
                    resolve(true);
                } else {
                    reject(false);
                }
            }));
        });

    }

}