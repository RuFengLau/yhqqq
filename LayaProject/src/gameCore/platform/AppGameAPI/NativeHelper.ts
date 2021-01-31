
import SoundManager from '../../managers/soundManager/SoundManager';
/**
 * 原生Native通讯工具类
 */
export default class NativeHelper {
    private static readonly conchIOS: string = "Conch-ios";
    private static readonly conchAndroid: string = "Conch-android";
    private static os: string = "";
    private static bridge: any = null;
    public static isShowInserAd:boolean = false;
    public static onShow() {
        Laya.SoundManager.setMusicVolume(SoundManager.inst.getMusicMuted() ? 0 : 1);
        Laya.SoundManager.setSoundVolume(SoundManager.inst.getSoundMuted() ? 0 : 1);
    }

    public static onHide() {
        Laya.SoundManager.setMusicVolume(0);
        Laya.SoundManager.setSoundVolume(0);
    }

    public static init() {
        if (Laya.Browser.window.conch) {
            this.os = Laya.Browser.window["conchConfig"].getOS();
            if (this.os == NativeHelper.conchIOS) {
                this.bridge = Laya.Browser.window["PlatformClass"].createClass("NativeHelper");
            }
            else if (this.os == NativeHelper.conchAndroid) {
                this.bridge = Laya.Browser.window["PlatformClass"].createClass("nativeTools.NativeHelper");
            }

            if (this.os == NativeHelper.conchIOS) {
                this.bridge.call("initGame:");
            }
            else if (this.os == NativeHelper.conchAndroid) {
                this.bridge.call("initGame");
            }
            this.setOnBackPressed();
        }

    }

    public static showBanner(caller: any, callback: (jsonRes) => void) {
        if (Laya.Browser.window.conch) {
            if (this.os == NativeHelper.conchIOS) {
                this.bridge.call("showBanner:");
            }
            else if (this.os == NativeHelper.conchAndroid) {
                this.bridge.callWithBack((jsonRes) => {
                    callback.call(caller, jsonRes);
                }, "showBanner");
            }
        }
    }

    public static showRewardedVideo(caller: any, callback: (jsonRes) => void) {
        if (Laya.Browser.window.conch) {
            if (this.os == NativeHelper.conchIOS) {
                this.bridge.call("showRewardedVideo:");
            }
            else if (this.os == NativeHelper.conchAndroid) {
                this.bridge.callWithBack((jsonRes) => {
                    callback.call(caller, jsonRes);
                }, "showRewardedVideo");
            }
        }
    }

    public static showInsertAd(caller: any, callback: (jsonRes) => void) {
        if (Laya.Browser.window.conch) {
            if (this.os == NativeHelper.conchIOS) {
                this.bridge.call("showInsertAd:");
            }
            else if (this.os == NativeHelper.conchAndroid) {
                this.bridge.callWithBack((jsonRes) => {
                    callback.call(caller, jsonRes);
                }, "showInsertAd");
            }
        }
    }

    public static vibrate() {
        if (Laya.Browser.window.conch) {
            if (this.os == NativeHelper.conchIOS) {
                this.bridge.call("vibrate:");
            }
            else if (this.os == NativeHelper.conchAndroid) {
                this.bridge.call("vibrate");
            }
        }
    }

    public static userDataPath(): string {
        let path = "";
        if (this.os == NativeHelper.conchIOS) {
            path = this.bridge.call("userDataPath:");
        }
        else if (this.os == NativeHelper.conchAndroid) {
            path = this.bridge.call("userDataPath");
        }
        return path;
    }

    public static getGGType(callback: (type: number) => void) {
        let ggtype = this.bridge.call("getGGType");
        console.log("返回ggtype:" + ggtype);
        callback(ggtype);
    }

    public static loadAndUnZip(zipPath: string, targetPath: string, caller: any, callback: () => void) {
        if (this.os == NativeHelper.conchIOS) {
            this.bridge.callWithBack((success: boolean) => {
                callback.call(caller);
            }, "loadAndUnZip:", zipPath, targetPath);
        }
        else if (this.os == NativeHelper.conchAndroid) {
            this.bridge.callWithBack((success: boolean) => {
                callback.call(caller);
            }, "loadAndUnZip", zipPath, targetPath);
        }
    }

    /**接管安卓后退键 */
    public static setOnBackPressed() {
        if (Laya.Browser.window.conch) {
            Laya.Browser.window.conch.setOnBackPressedFunction(() => {
                // MsgBox.inst.show("系统提示", "是否要退出游戏？", this, (confirm) => {
                //     if (confirm) {
                //         Laya.Browser.window.conch.exit();
                //     }
                // })
                NativeHelper.ExitGame();
                // Laya.timer.once(1000, this, () => {
                //     UIManager.inst.showNativeAd();
                // });
            });

        }
    }

    public static log(msg: string) {
        if (Laya.Browser.window.conch) {
            if (this.os == NativeHelper.conchIOS) {
                this.bridge.call("log:", msg);
            }
            else if (this.os == NativeHelper.conchAndroid) {
                this.bridge.call("log", msg);
            }
        }
    }

    public static Login(jsonParam: string, caller: any, callback: (jsonRes: { code: number, msg: string, user_id: string }) => void) {
        this.bridge.callWithBack(jsonRes => {
            callback.call(caller, jsonRes);
        }, "Login", jsonParam);
    }

    public static ExitGame() {
        if (Laya.Browser.window.conch) {
            if (this.os == NativeHelper.conchIOS) {
                this.bridge.call("ExitGame:");
            }
            else if (this.os == NativeHelper.conchAndroid) {
                this.bridge.call("ExitGame");
            }
        }else{
            console.log("退出游戏");
        }
    }

    public static moreGame(){
        if (Laya.Browser.window.conch) {
            if (this.os == NativeHelper.conchIOS) {
                this.bridge.call("moreGame:");
            }
            else if (this.os == NativeHelper.conchAndroid) {
                this.bridge.call("moreGame");
            }
        }
    }

    public static hasMoreGame(): boolean {
        let flag:number = 0;
        if (this.os == NativeHelper.conchIOS) {
            flag = this.bridge.call("hasMoreGame:");
        }
        else if (this.os == NativeHelper.conchAndroid) {
            flag  = this.bridge.call("hasMoreGame");
        }
        if(flag == 1){
            return true;
        }
        return false;
    } 

}
if (Laya.Browser.window) {
    Laya.Browser.window.NativeHelper = NativeHelper;
}