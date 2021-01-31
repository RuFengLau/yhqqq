/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_ToastView extends fgui.GComponent {

	public m_maskBg:fgui.GGraph;
	public m_n2:fgui.GGraph;
	public m_title:fgui.GTextField;
	public static URL:string = "ui://9kynrs2zlo4qe";

	public static createInstance():UI_ToastView {
		return <UI_ToastView>(fgui.UIPackage.createObject("GameCommandUI", "ToastView"));
	}

	protected onConstruct():void {
		this.m_maskBg = <fgui.GGraph>(this.getChildAt(0));
		this.m_n2 = <fgui.GGraph>(this.getChildAt(1));
		this.m_title = <fgui.GTextField>(this.getChildAt(2));
	}
}