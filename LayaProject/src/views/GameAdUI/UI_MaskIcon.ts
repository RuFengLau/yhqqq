/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_MaskIcon extends fgui.GLabel {

	public m_n2:fgui.GGraph;
	public m_icon:fgui.GLoader;
	public static URL:string = "ui://2lldjolilo4q3y";

	public static createInstance():UI_MaskIcon {
		return <UI_MaskIcon>(fgui.UIPackage.createObject("GameAdUI", "MaskIcon"));
	}

	protected onConstruct():void {
		this.m_n2 = <fgui.GGraph>(this.getChildAt(0));
		this.m_icon = <fgui.GLoader>(this.getChildAt(1));
	}
}