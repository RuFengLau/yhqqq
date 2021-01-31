/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_SdkIconButton extends fgui.GButton {

	public m_n2:fgui.GImage;
	public m_icon:fgui.GLoader;
	public m_n4:fgui.GGraph;
	public m_title:fgui.GTextField;
	public static URL:string = "ui://kd5ich5ss4084";

	public static createInstance():UI_SdkIconButton {
		return <UI_SdkIconButton>(fgui.UIPackage.createObject("YmSdkUI", "SdkIconButton"));
	}

	protected onConstruct():void {
		this.m_n2 = <fgui.GImage>(this.getChildAt(0));
		this.m_icon = <fgui.GLoader>(this.getChildAt(1));
		this.m_n4 = <fgui.GGraph>(this.getChildAt(2));
		this.m_title = <fgui.GTextField>(this.getChildAt(3));
	}
}