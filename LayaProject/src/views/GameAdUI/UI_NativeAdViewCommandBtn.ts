/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_NativeAdViewCommandBtn extends fgui.GButton {

	public m_icon:fgui.GLoader;
	public static URL:string = "ui://2lldjolij6l4j8m";

	public static createInstance():UI_NativeAdViewCommandBtn {
		return <UI_NativeAdViewCommandBtn>(fgui.UIPackage.createObject("GameAdUI", "NativeAdViewCommandBtn"));
	}

	protected onConstruct():void {
		this.m_icon = <fgui.GLoader>(this.getChildAt(0));
	}
}