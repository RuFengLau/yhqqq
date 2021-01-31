/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_SdkButton extends fgui.GButton {

	public m_n0:fgui.GImage;
	public m_ImageTitle:fgui.GLoader;
	public m_title:fgui.GTextField;
	public static URL:string = "ui://kd5ich5ss4085";

	public static createInstance():UI_SdkButton {
		return <UI_SdkButton>(fgui.UIPackage.createObject("YmSdkUI", "SdkButton"));
	}

	protected onConstruct():void {
		this.m_n0 = <fgui.GImage>(this.getChildAt(0));
		this.m_ImageTitle = <fgui.GLoader>(this.getChildAt(1));
		this.m_title = <fgui.GTextField>(this.getChildAt(2));
	}
}