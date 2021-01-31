/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_MoreGameBtn extends fgui.GButton {

	public m_n0:fgui.GImage;
	public static URL:string = "ui://2lldjolij6l4j8o";

	public static createInstance():UI_MoreGameBtn {
		return <UI_MoreGameBtn>(fgui.UIPackage.createObject("GameAdUI", "MoreGameBtn"));
	}

	protected onConstruct():void {
		this.m_n0 = <fgui.GImage>(this.getChildAt(0));
	}
}