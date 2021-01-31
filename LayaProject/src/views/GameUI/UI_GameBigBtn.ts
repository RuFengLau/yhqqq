/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_GameBigBtn extends fgui.GButton {

	public m_state:fgui.Controller;
	public m_n20:fgui.GImage;
	public m_n21:fgui.GImage;
	public m_imageTitle:fgui.GLoader;
	public static URL:string = "ui://0lagqdfms28529";

	public static createInstance():UI_GameBigBtn {
		return <UI_GameBigBtn>(fgui.UIPackage.createObject("GameUI", "GameBigBtn"));
	}

	protected onConstruct():void {
		this.m_state = this.getControllerAt(0);
		this.m_n20 = <fgui.GImage>(this.getChildAt(0));
		this.m_n21 = <fgui.GImage>(this.getChildAt(1));
		this.m_imageTitle = <fgui.GLoader>(this.getChildAt(2));
	}
}