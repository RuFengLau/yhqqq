/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_GameButton from "./UI_GameButton";

export default class UI_ResourceBar extends fgui.GLabel {

	public m_n7:fgui.GImage;
	public m_title:fgui.GTextField;
	public m_AddBtn:UI_GameButton;
	public m_icon:fgui.GLoader;
	public static URL:string = "ui://0lagqdfm5f7qa";

	public static createInstance():UI_ResourceBar {
		return <UI_ResourceBar>(fgui.UIPackage.createObject("GameUI", "ResourceBar"));
	}

	protected onConstruct():void {
		this.m_n7 = <fgui.GImage>(this.getChildAt(0));
		this.m_title = <fgui.GTextField>(this.getChildAt(1));
		this.m_AddBtn = <UI_GameButton>(this.getChildAt(2));
		this.m_icon = <fgui.GLoader>(this.getChildAt(3));
	}
}