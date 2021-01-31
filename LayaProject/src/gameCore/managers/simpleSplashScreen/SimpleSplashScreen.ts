import { TextureScreenData } from "./TextureScreenData";
import EventManager from "../eventManager/EventManager";

export default class SimpleSplashScreen {
	public static readonly ON_COMPLETE_EVENT: string = "onCompleteEvent";

	private static _inst: SimpleSplashScreen;
	public static get inst(): SimpleSplashScreen {
		if (this._inst == null) {
			this._inst = new SimpleSplashScreen();
		}
		return this._inst;
	}

	public data: Array<TextureScreenData> = [];
	private queueIndex: number = 0;

	public setData(data: Array<TextureScreenData>): void {
		//预先加载图片
		this.data = data;
		this.loadScreenImages();
	}

	public loadScreenImages() {
		var urls = [];
		for (var key in this.data) {
			var item = this.data[key];
			if (item.logo != "") {
				urls.push({ url: item.logo, type: Laya.Loader.IMAGE });
			}
			if (item.backgroundImage != "") {
				urls.push({ url: item.backgroundImage, type: Laya.Loader.IMAGE });
			}
		}
		Laya.loader.load(urls, Laya.Handler.create(this, this.loadScreenImagesComplete))
	}

	private loadScreenImagesComplete() {
		this.startQueue();
	}

	private startQueue() {
		var textrueSplashData: TextureScreenData = this.data[this.queueIndex];
		var splash = this.createSplashComponent(textrueSplashData);

		let timeLine = new Laya.TimeLine();
		timeLine.addLabel("出现",0).to(splash,{alpha:1},500);



		splash.alpha = 0;
		Laya.Tween.to(splash, { alpha: 1 }, 500, Laya.Ease.linearNone);


		// fairygui.GTween.to(0, 1, 0.5).onUpdate((tweener: fairygui.GTweener) => {
		// 	splash.alpha = tweener.value.x;
		// }, this);

		fairygui.GTween.to(1, 0, 1).onUpdate((tweener: fairygui.GTweener) => {
			splash.alpha = tweener.value.x;
		}, this).onComplete(() => {
			fairygui.GRoot.inst.removeChild(splash, true);
			this.queueIndex++;
			if (this.queueIndex > this.data.length - 1) {
				EventManager.inst.SendEvent(SimpleSplashScreen.ON_COMPLETE_EVENT);
				return;
			} else {
				this.startQueue();
			}
		}, this).setDelay(textrueSplashData.duration + 0.5);
	}

	private createSplashComponent(splashData: TextureScreenData): fairygui.GComponent {
		Laya.stage.addChild(fairygui.GRoot.inst.displayObject);
		var splashComponent: fairygui.GComponent = new fairygui.GComponent();
		splashComponent.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
		var graphy: fairygui.GGraph = new fairygui.GGraph();
		graphy.drawRect(0, "0xFFFFFF", splashData.backgroundColor);
		graphy.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
		splashComponent.addChild(graphy);
		if (splashData.logo != "") {
			let loader: fairygui.GLoader = new fairygui.GLoader();
			loader.verticalAlign = "Middle";
			loader.icon = splashData.logo;
			loader.autoSize = true;
			loader.center(true);
			splashComponent.addChild(loader);
		}
		if (splashData.backgroundImage != "") {
			let loader: fairygui.GLoader = new fairygui.GLoader();
			loader.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
			loader.fill = fairygui.LoaderFillType.ScaleNoBorder;
			loader.icon = splashData.backgroundImage;
			loader.verticalAlign = "Middle";
			loader.autoSize = true;
			loader.center(true);
			splashComponent.addChild(loader);
		}
		fairygui.GRoot.inst.addChild(splashComponent);
		return splashComponent;
	}
}