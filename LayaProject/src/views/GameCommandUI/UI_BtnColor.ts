/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_BtnColor extends fgui.GButton {

	public m_color:fgui.Controller;
	public m_videoStatus:fgui.Controller;
	public m_n97:fgui.GImage;
	public m_n98:fgui.GImage;
	public m_icon:fgui.GLoader;
	public m_n99:fgui.GImage;
	public static URL:string = "ui://9kynrs2zk0kn4a";

	public static createInstance():UI_BtnColor {
		return <UI_BtnColor>(fgui.UIPackage.createObject("GameCommandUI", "BtnColor"));
	}

	protected onConstruct():void {
		this.m_color = this.getControllerAt(0);
		this.m_videoStatus = this.getControllerAt(1);
		this.m_n97 = <fgui.GImage>(this.getChildAt(0));
		this.m_n98 = <fgui.GImage>(this.getChildAt(1));
		this.m_icon = <fgui.GLoader>(this.getChildAt(2));
		this.m_n99 = <fgui.GImage>(this.getChildAt(3));
	}
}