/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_MoreGameCloseBtn from "./UI_MoreGameCloseBtn";

export default class UI_MoreGameView extends fgui.GComponent {

	public m_n3:fgui.GGraph;
	public m_n6:fgui.GImage;
	public m_n7:fgui.GImage;
	public m_CloseBtn:UI_MoreGameCloseBtn;
	public m_List:fgui.GList;
	public m_n5:fgui.GGroup;
	public static URL:string = "ui://2lldjolijixpj8h";

	public static createInstance():UI_MoreGameView {
		return <UI_MoreGameView>(fgui.UIPackage.createObject("GameAdUI", "MoreGameView"));
	}

	protected onConstruct():void {
		this.m_n3 = <fgui.GGraph>(this.getChildAt(0));
		this.m_n6 = <fgui.GImage>(this.getChildAt(1));
		this.m_n7 = <fgui.GImage>(this.getChildAt(2));
		this.m_CloseBtn = <UI_MoreGameCloseBtn>(this.getChildAt(3));
		this.m_List = <fgui.GList>(this.getChildAt(4));
		this.m_n5 = <fgui.GGroup>(this.getChildAt(5));
	}
}