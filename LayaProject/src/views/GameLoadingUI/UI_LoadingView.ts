/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_LoadingBar from "./UI_LoadingBar";

export default class UI_LoadingView extends fgui.GComponent {

	public m_ColorBg:fgui.GGraph;
	public m_BigBgLoader:fgui.GLoader;
	public m_n11:fgui.GImage;
	public m_n12:fgui.GGraph;
	public m_TipLabel:fgui.GTextField;
	public m_LoadingBar:UI_LoadingBar;
	public m_LogoLoader:fgui.GLoader;
	public m_CC:fgui.GTextField;
	public m_TTT:fgui.GTextField;
	public static URL:string = "ui://lrq909uufo2s0";

	public static createInstance():UI_LoadingView {
		return <UI_LoadingView>(fgui.UIPackage.createObject("GameLoadingUI", "LoadingView"));
	}

	protected onConstruct():void {
		this.m_ColorBg = <fgui.GGraph>(this.getChildAt(0));
		this.m_BigBgLoader = <fgui.GLoader>(this.getChildAt(1));
		this.m_n11 = <fgui.GImage>(this.getChildAt(2));
		this.m_n12 = <fgui.GGraph>(this.getChildAt(3));
		this.m_TipLabel = <fgui.GTextField>(this.getChildAt(4));
		this.m_LoadingBar = <UI_LoadingBar>(this.getChildAt(5));
		this.m_LogoLoader = <fgui.GLoader>(this.getChildAt(6));
		this.m_CC = <fgui.GTextField>(this.getChildAt(7));
		this.m_TTT = <fgui.GTextField>(this.getChildAt(8));
	}
}