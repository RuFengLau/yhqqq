/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_CommandButton extends fgui.GButton {

	public m_icon:fgui.GLoader;
	public m_title:fgui.GTextField;
	public static URL:string = "ui://9kynrs2zs24q4l";

	public static createInstance():UI_CommandButton {
		return <UI_CommandButton>(fgui.UIPackage.createObject("GameCommandUI", "CommandButton"));
	}

	protected onConstruct():void {
		this.m_icon = <fgui.GLoader>(this.getChildAt(0));
		this.m_title = <fgui.GTextField>(this.getChildAt(1));
	}
}