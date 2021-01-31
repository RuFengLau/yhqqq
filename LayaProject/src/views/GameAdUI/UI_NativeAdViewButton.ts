/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_NativeAdViewButton extends fgui.GButton {

	public m_n0:fgui.GImage;
	public m_n1:fgui.GImage;
	public m_n2:fgui.GTextField;
	public static URL:string = "ui://2lldjolij6l4j8l";

	public static createInstance():UI_NativeAdViewButton {
		return <UI_NativeAdViewButton>(fgui.UIPackage.createObject("GameAdUI", "NativeAdViewButton"));
	}

	protected onConstruct():void {
		this.m_n0 = <fgui.GImage>(this.getChildAt(0));
		this.m_n1 = <fgui.GImage>(this.getChildAt(1));
		this.m_n2 = <fgui.GTextField>(this.getChildAt(2));
	}
}