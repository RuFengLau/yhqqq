/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_MoreGameIcon extends fgui.GLabel {

	public m_n2:fgui.GGraph;
	public m_icon:fgui.GLoader;
	public static URL:string = "ui://2lldjolijixpj8g";

	public static createInstance():UI_MoreGameIcon {
		return <UI_MoreGameIcon>(fgui.UIPackage.createObject("GameAdUI", "MoreGameIcon"));
	}

	protected onConstruct():void {
		this.m_n2 = <fgui.GGraph>(this.getChildAt(0));
		this.m_icon = <fgui.GLoader>(this.getChildAt(1));
	}
}