/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_ShortcutBtn extends fgui.GButton {

	public m_n0:fgui.GImage;
	public static URL:string = "ui://2lldjolij6l4j8q";

	public static createInstance():UI_ShortcutBtn {
		return <UI_ShortcutBtn>(fgui.UIPackage.createObject("GameAdUI", "ShortcutBtn"));
	}

	protected onConstruct():void {
		this.m_n0 = <fgui.GImage>(this.getChildAt(0));
	}
}