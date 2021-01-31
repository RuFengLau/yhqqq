/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_LoadingBar extends fgui.GProgressBar {

	public m_n0:fgui.GImage;
	public m_bar:fgui.GImage;
	public static URL:string = "ui://lrq909uumpgu45";

	public static createInstance():UI_LoadingBar {
		return <UI_LoadingBar>(fgui.UIPackage.createObject("GameLoadingUI", "LoadingBar"));
	}

	protected onConstruct():void {
		this.m_n0 = <fgui.GImage>(this.getChildAt(0));
		this.m_bar = <fgui.GImage>(this.getChildAt(1));
	}
}