import UI_MessageBoxView from "../../../views/GameCommandUI/UI_MessageBoxView";

export class MsgBox {
	public static OneKey = 0;
	public static TwoKey = 1;
	private static instance: MsgBox;
	public static get inst(): MsgBox {
		if (this.instance == null) {
			this.instance = new MsgBox();
		}
		return this.instance;
	}

	// private view: UI_MsgboxView;
	private view: any;
	public container: fairygui.GComponent;

	public show(title: string, content: string, caller: any, callback: (confirm: boolean) => void, confirmTitle: string = "确定", cancelTitle: string = "取消", type: number = MsgBox.OneKey) {
		if (this.container == null) {
			this.container = fairygui.GRoot.inst;
		}
		if (this.view == null) {
			this.view = UI_MessageBoxView.createInstance();
			this.view.setSize(fairygui.GRoot.inst.width, fairygui.GRoot.inst.height);
			this.container.addChild(this.view);
		}

		this.view.visible = true;
		this.view.m_ContentLabel.text = content;
		this.view.m_TitleLabel.text = title;
		this.view.m_ConfirmBtn.title = confirmTitle;
		this.view.m_CancelBtn.title = cancelTitle;
		this.view.m_ConfirmBtn.onClick(this, () => {
			this.hide();
			if (callback) {
				callback.call(caller, true);
				callback = null;
			}

		});

		this.view.m_CancelBtn.onClick(this, () => {
			this.hide();
			if (callback) {
				callback.call(caller, false);
				callback = null;
			}
		});
	}

	public hide() {
		this.view.visible = false;
	}
}