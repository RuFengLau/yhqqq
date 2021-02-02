/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_GameButton from "./UI_GameButton";
import UI_ResourceBar from "./UI_ResourceBar";

export default class UI_StartView extends fgui.GComponent {

	public m_gameState:fgui.Controller;
	public m_n2:fgui.GImage;
	public m_n16:fgui.GImage;
	public m_n17:fgui.GImage;
	public m_Finger:fgui.GGroup;
	public m_Bot:UI_GameButton;
	public m_StageLabel:fgui.GTextField;
	public m_CoinBar:UI_ResourceBar;
	public m_ShopBtn:UI_GameButton;
	public m_n11:fgui.GButton;
	public m_n12:fgui.GButton;
	public m_n13:fgui.GButton;
	public m_n14:fgui.GButton;
	public m_n15:fgui.GImage;
	public m_t0:fgui.Transition;
	public static URL:string = "ui://0lagqdfms24q0";

	public static createInstance():UI_StartView {
		return <UI_StartView>(fgui.UIPackage.createObject("GameUI", "StartView"));
	}

	protected onConstruct():void {
		this.m_gameState = this.getControllerAt(0);
		this.m_n2 = <fgui.GImage>(this.getChildAt(0));
		this.m_n16 = <fgui.GImage>(this.getChildAt(1));
		this.m_n17 = <fgui.GImage>(this.getChildAt(2));
		this.m_Finger = <fgui.GGroup>(this.getChildAt(3));
		this.m_Bot = <UI_GameButton>(this.getChildAt(4));
		this.m_StageLabel = <fgui.GTextField>(this.getChildAt(5));
		this.m_CoinBar = <UI_ResourceBar>(this.getChildAt(6));
		this.m_ShopBtn = <UI_GameButton>(this.getChildAt(7));
		this.m_n11 = <fgui.GButton>(this.getChildAt(8));
		this.m_n12 = <fgui.GButton>(this.getChildAt(9));
		this.m_n13 = <fgui.GButton>(this.getChildAt(10));
		this.m_n14 = <fgui.GButton>(this.getChildAt(11));
		this.m_n15 = <fgui.GImage>(this.getChildAt(12));
		this.m_t0 = this.getTransitionAt(0);
	}
}