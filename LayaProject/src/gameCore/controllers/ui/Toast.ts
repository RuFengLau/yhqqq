import UI_ToastView from "../../../views/GameCommandUI/UI_ToastView";

export class Toast {
	private static instance: Toast;
	public static get inst(): Toast {
		if (this.instance == null) {
			this.instance = new Toast();
		}
		return this.instance;
	}

	private view: UI_ToastView;
	public container: fairygui.GComponent;
	public fadeDuration: number = 0.3;
	private tweener: Laya.Tween;
	private timer:Laya.Timer = new Laya.Timer();
	/**
	  * 显示
	  * @param content 内容
	  * @param mask 是否遮罩
	  * @param delay 显示持续时间
	  */
	public show(content: string, mask: boolean = false, delay: number = 2000) {
		if (this.container == null) {
			this.container = fairygui.GRoot.inst;
		}
		if (this.view == null) {
			this.view = UI_ToastView.createInstance();
			this.view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);

		}
		this.container.addChild(this.view);
		this.view.alpha = 0;
		this.view.m_title.text = content;
		this.view.m_maskBg.touchable = mask;
		if (this.tweener) {
			this.tweener.clear();
		}
		this.view.visible = true;
		if(content == ""){
			this.view.m_n2.visible = false;
		}else{
			this.view.m_n2.visible = true;
		}
		//this.tweener = fairygui.GTween.to(this.view.alpha, 1, this.fadeDuration).onUpdate(this.toastViewUpdate, this);
		this.tweener = Laya.Tween.to(this.view,{alpha:1},this.fadeDuration * 1000)
		if (delay > 0) {
			this.timer.clear(this,this.hide);
			this.timer.once(delay, this, this.hide);
		}
	}

	public hide() {
		this.timer.clear(this,this.hide);
		// if (this.tweener) {
		// 	this.tweener.kill();
		// }
		this.view.alpha = 0;
		this.onHideToastViewComplete();
		//this.tweener = fairygui.GTween.to(this.view.alpha, 0, this.fadeDuration).onUpdate(this.toastViewUpdate, this).onComplete(this.onHideToastViewComplete, this);
	}

	private toastViewUpdate(tweener: fairygui.GTweener) {
		this.view.alpha = tweener.value.x;
	}

	private onHideToastViewComplete() {
		this.view.visible = false;
	}


}