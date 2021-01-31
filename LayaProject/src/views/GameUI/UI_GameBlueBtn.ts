/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_GameBlueBtn extends fgui.GButton {

	public m_n18:fgui.GImage;
	public m_title:fgui.GTextField;
	public static URL:string = "ui://0lagqdfms28528";

	public static createInstance():UI_GameBlueBtn {
		return <UI_GameBlueBtn>(fgui.UIPackage.createObject("GameUI", "GameBlueBtn"));
	}

	protected onConstruct():void {
		this.m_n18 = <fgui.GImage>(this.getChildAt(0));
		this.m_title = <fgui.GTextField>(this.getChildAt(1));
	}
}