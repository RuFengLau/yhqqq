/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_SdkOneLineBanner from "./UI_SdkOneLineBanner";

export default class UI_SdkResultIconListView extends fgui.GComponent {

	public m_SdkOneLineBanner:UI_SdkOneLineBanner;
	public static URL:string = "ui://kd5ich5smzap9";

	public static createInstance():UI_SdkResultIconListView {
		return <UI_SdkResultIconListView>(fgui.UIPackage.createObject("YmSdkUI", "SdkResultIconListView"));
	}

	protected onConstruct():void {
		this.m_SdkOneLineBanner = <UI_SdkOneLineBanner>(this.getChildAt(0));
	}
}