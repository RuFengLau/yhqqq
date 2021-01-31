/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_GameButton extends fgui.GButton {

	public m_isRedPoint:fgui.Controller;
	public m_icon:fgui.GLoader;
	public m_title:fgui.GTextField;
	public m_n3:fgui.GImage;
	public static URL:string = "ui://0lagqdfmtq6l4";

	public static createInstance():UI_GameButton {
		return <UI_GameButton>(fgui.UIPackage.createObject("GameUI", "GameButton"));
	}

	protected onConstruct():void {
		this.m_isRedPoint = this.getControllerAt(0);
		this.m_icon = <fgui.GLoader>(this.getChildAt(0));
		this.m_title = <fgui.GTextField>(this.getChildAt(1));
		this.m_n3 = <fgui.GImage>(this.getChildAt(2));
	}
}