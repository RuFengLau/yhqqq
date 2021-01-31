
import GameEngine from "../GameEngine";
import SoundData from './SoundData';
import { SoundType } from '../../models/GameEnum';
import LocalStorageManager from '../LocalStorageManager';
import Platforms, { Platform } from '../../platform/Platforms';

export default class SoundManager {
    private static instance: SoundManager;
    public static get inst(): SoundManager {
        if (this.instance == null) {
            Laya.SoundManager.autoStopMusic = true;
            //如果在ios上需要关闭audioMusic 使用webAudio
            if (Laya.Browser.onIOS) {
                Laya.SoundManager.useAudioMusic = false;
            }
            this.instance = new SoundManager();
        }
        return this.instance;
    }

    /**音乐开关 false为开 */
    private _musicMuted: boolean = false;
    /**音乐开关 false为开 */
    private _soundMuted: boolean = false;
    private soundList: Array<SoundData> = [];
    private musicVolume = 1;
    private soundVolume = 1;
    private curretnType: SoundType;
    private currentBgAudio: any;
    private soundPools: Array<{ key: string, audio: any, type: string, canplay: boolean }> = [];

    private playingList: Array<string> = [];

    public loadData() {
        let muteJson = GameEngine.inst.loadData(LocalStorageManager.inst.soundMuteDataKey);
        if (muteJson) {
            this._musicMuted = muteJson.musicMuted;
            this._soundMuted = muteJson.soundMuted;
        }
        GameEngine.inst.debug(`音乐本地数据：${JSON.stringify(muteJson)}`);
        this.setMusicMuted(this._musicMuted);
        this.setSoundMuted(this._soundMuted);
    }

    public saveData() {
        GameEngine.inst.saveData(LocalStorageManager.inst.soundMuteDataKey, { musicMuted: this._musicMuted, soundMuted: this._soundMuted })
    }

    /**音乐开关 muted:false为打开,true为关闭 */
    public setMusicMuted(muted: boolean) {
        this._musicMuted = muted;
        if (muted == false) {
            this.musicVolume = 1;
            this.setVolume(this.musicVolume, "BGM");
            if (Platforms.inst.platform == Platform.vivo_h5) {
                this.PlayCurrentMusic();
            }
        } else {
            this.musicVolume = 0.001;//qq不支持为0
            this.setVolume(this.musicVolume, "BGM");
        }
        this.saveData();
    }

    public getMusicMuted(): boolean {
        return this._musicMuted;
    }

    /**音效开关 muted:false为打开,true为关闭 */
    public setSoundMuted(muted: boolean) {
        this._soundMuted = muted;
        if (muted == false) {
            this.soundVolume = 1;
            this.setVolume(this.soundVolume, "SE");
        } else {
            this.soundVolume = 0.001;//qq不支持为0
            this.setVolume(this.soundVolume, "SE");
        }
        this.saveData();
    }

    public getSoundMuted(): boolean {
        return this._soundMuted;
    }

    /**
     * 
     * @param type 类型
     * @param clipName 文件名
     */
    public registerSound(type: SoundType, clipName: string) {
        let data = new SoundData();
        data.type = type;
        data.clipName = clipName;
        this.soundList.push(data);
    }

    private getAudio(key: string): { key: string, audio: any, type: string } {
        for (let index = 0; index < this.soundPools.length; index++) {
            const item = this.soundPools[index];
            if (item.key == key) {
                return item;
            }
        }
        return null;
    }



    private stopSound(type: string) {
        if (this.currentBgAudio) {
            this.currentBgAudio.pause();
        }
        if (type == "") {
            for (let index = 0; index < this.soundPools.length; index++) {
                const item = this.soundPools[index];
                item.audio.pause();
            }
        } else {
            for (let index = 0; index < this.soundPools.length; index++) {
                const item = this.soundPools[index];
                if (item.type == type) {
                    item.audio.pause();
                }

            }
        }

    }

    private pauseSound(type: string) {
        if (type == "") {
            for (let index = 0; index < this.soundPools.length; index++) {
                const item = this.soundPools[index];
                item.audio.pause();
            }
        } else {
            for (let index = 0; index < this.soundPools.length; index++) {
                const item = this.soundPools[index];
                if (item.type == type) {
                    item.audio.pause();
                }

            }
        }
    }

    /**
     * 设置音量大小
     * @param volume 
     * @param type 
     */
    public setVolume(volume: number, type: string = "") {
        if (volume <= 0.001) {
            volume = 0.001;
        }

        if (type == "") {
            for (let index = 0; index < this.soundPools.length; index++) {
                const item = this.soundPools[index];
                item.audio.volume = volume;
            }
            Laya.SoundManager.setMusicVolume(volume);
            Laya.SoundManager.setSoundVolume(volume);
            if (this.currentBgAudio) {
                this.currentBgAudio.volume = volume;
            }
        } else {
            if (type == "BGM") {
                Laya.SoundManager.setMusicVolume(volume);
                if (this.currentBgAudio) {
                    this.currentBgAudio.volume = volume;
                }
            } else if (type == "SE") {
                Laya.SoundManager.setSoundVolume(volume);
            }
            for (let index = 0; index < this.soundPools.length; index++) {
                const item = this.soundPools[index];
                if (item.type == type) {
                    item.audio.volume = volume;
                }
            }
        }

    }

    /**
     * 播放单前背景音乐
     */
    public PlayCurrentMusic() {
        if (this.curretnType) {
            this.PlayMusic(this.curretnType);
        }
    }

    /**
     * 播放背景类声音
     * @param type 声音文件
     */
    public PlayMusic(type: SoundType) {
        for (let index = 0; index < this.soundList.length; index++) {
            let data = this.soundList[index];
            if (data.type == type) {
                if (Platforms.inst.platform == Platform.vivo_h5) {
                    this.curretnType = type;
                    if (this.currentBgAudio) {
                        this.currentBgAudio.stop();
                        this.currentBgAudio = null;
                    }
                    this.currentBgAudio = Platforms.inst.createInnerAudioContext();
                    //判断是否有原生音效，没有则使用Laya的
                    if (this.currentBgAudio) {
                        this.currentBgAudio.src = Laya.URL.basePath + data.clipName;
                        this.currentBgAudio.loop = true;
                        this.currentBgAudio.volume = this.musicVolume
                        this.currentBgAudio.play();

                    } else {
                        Laya.SoundManager.playMusic(data.clipName, 0);
                    }

                } else {
                    this.stopSound("BGM");
                    let item = this.getAudio(data.clipName);
                    if (item) {
                        //有
                        item.audio.volume = this.musicVolume;
                        item.audio.play();
                    } else {
                        let audioContext = Platforms.inst.createInnerAudioContext();
                        if (audioContext) {
                            audioContext.src = Laya.URL.basePath + data.clipName;
                            audioContext.loop = true;
                            audioContext.volume = this.musicVolume;
                            audioContext.play();
                            this.soundPools.push({ key: data.clipName, audio: audioContext, type: "BGM", canplay: false });
                        } else {
                            Laya.SoundManager.playMusic(data.clipName, 0);
                        }
                    }
                }
                this.setVolume(this.musicVolume, "BGM");
            }
        }
    }

    /**
     * 播放效果音
     * @param type 声音文件
     */
    public Play(type: SoundType, loop: number = 1) {
        for (let index = 0; index < this.soundList.length; index++) {
            let data = this.soundList[index];
            if (data.type == type) {
                // if (Platforms.inst.platform == Platform.vivo_h5) {
                //     Laya.SoundManager.playSound(data.clipName, loop);
                // } else {
                //     let item = this.getAudio(data.clipName);
                //     if (item) {
                //         item.audio.stop();
                //         item.audio.volume = this.soundVolume;
                //         if (this._soundMuted == false) {
                //             item.audio.play();
                //         }
                //     } else {
                //         let audioContext = Platforms.inst.createInnerAudioContext();
                //         //判断是否有原生音效，没有则使用Laya的
                //         if (audioContext) {
                //             audioContext.src = Laya.URL.basePath + data.clipName;
                //             audioContext.volume = this.soundVolume;
                //             audioContext.loop = (loop > 1 ? true : false);
                //             if (this._soundMuted == false) {
                //                 audioContext.play();
                //             }
                //             this.soundPools.push({ key: data.clipName, audio: audioContext, type: "SE", canplay: false });
                //         } else {
                //             Laya.SoundManager.playSound(data.clipName, loop);
                //         }
                //     }
                // }

                if (this.playingList.indexOf(data.clipName) == -1) {
                    let c = Laya.SoundManager.playSound(data.clipName, loop);
                    this.playingList.push(data.clipName);
                    c.completeHandler = Laya.Handler.create(this, this.onSoundPlayComplete, [data.clipName]);
                }else{
                    //console.log(data.clipName + " 正在播放");
                }

                this.setVolume(this.soundVolume, "SE");
            }
        }
    }

    /**播放音效路径 */
    public PlayURL(url: string, loop: number = 1) {
        // if (Platforms.inst.platform == Platform.vivo_h5) {
        //     Laya.SoundManager.playSound(url, loop);
        // } else {
        //     let item = this.getAudio(url);
        //     if (item) {
        //         item.audio.stop();
        //         item.audio.volume = this.soundVolume;
        //         if (this._soundMuted == false) {
        //             item.audio.play();
        //         }
        //     } else {
        //         let audioContext = Platforms.inst.createInnerAudioContext();
        //         //判断是否有原生音效，没有则使用Laya的
        //         if (audioContext) {
        //             audioContext.src = Laya.URL.basePath + url;
        //             audioContext.volume = this.soundVolume;
        //             audioContext.loop = (loop > 1 ? true : false);
        //             if (this._soundMuted == false) {
        //                 audioContext.play();
        //             }
        //             this.soundPools.push({ key: url, audio: audioContext, type: "SE" ,canplay:false});
        //         } else {
        //             let c = Laya.SoundManager.playSound(url, loop);
        //             c.completeHandler = Laya.Handler.create(this,this.onSoundPlayComplete,[url]);
        //         }
        //     }
        // }
        if (this.playingList.indexOf(url) == -1) {
            let c = Laya.SoundManager.playSound(url, loop);
            if(c){
                this.playingList.push(url);
                c.completeHandler = Laya.Handler.create(this, this.onSoundPlayComplete, [url]);
            }
            
        }else{
            //console.log(url + " 正在播放");
        }

        this.setVolume(this.soundVolume, "SE");
    }

    private onSoundPlayComplete(url: string) {
        let index = this.playingList.indexOf(url);
        this.playingList.splice(index,1);
    }
}