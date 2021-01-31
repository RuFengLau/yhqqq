/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_BtnColor from "./UI_BtnColor";

export default class UI_MessageBoxView extends fgui.GComponent {

	public m_n44:fgui.GGraph;
	public m_n45:fgui.GImage;
	public m_n46:fgui.GImage;
	public m_ContentLabel:fgui.GTextField;
	public m_TitleLabel:fgui.GTextField;
	public m_CancelBtn:UI_BtnColor;
	public m_ConfirmBtn:UI_BtnColor;
	public m_n39:fgui.GGroup;
	public m_t0:fgui.Transition;
	public static URL:string = "ui://9kynrs2zlo4q3";

	public static createInstance():UI_MessageBoxView {
		return <UI_MessageBoxView>(fgui.UIPackage.createObject("GameCommandUI", "MessageBoxView"));
	}

	protected onConstruct():void {
		this.m_n44 = <fgui.GGraph>(this.getChildAt(0));
		this.m_n45 = <fgui.GImage>(this.getChildAt(1));
		this.m_n46 = <fgui.GImage>(this.getChildAt(2));
		this.m_ContentLabel = <fgui.GTextField>(this.getChildAt(3));
		this.m_TitleLabel = <fgui.GTextField>(this.getChildAt(4));
		this.m_CancelBtn = <UI_BtnColor>(this.getChildAt(5));
		this.m_ConfirmBtn = <UI_BtnColor>(this.getChildAt(6));
		this.m_n39 = <fgui.GGroup>(this.getChildAt(7));
		this.m_t0 = this.getTransitionAt(0);
	}
}