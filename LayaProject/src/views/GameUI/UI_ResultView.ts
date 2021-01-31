/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_GameBlueBtn from "./UI_GameBlueBtn";
import UI_GameBigBtn from "./UI_GameBigBtn";

export default class UI_ResultView extends fgui.GComponent {

	public m_State:fgui.Controller;
	public m_adState:fgui.Controller;
	public m_ColorBg:fgui.GGraph;
	public m_n28:fgui.GLoader;
	public m_n8:fgui.GImage;
	public m_n11:fgui.GImage;
	public m_n9:fgui.GImage;
	public m_n10:fgui.GImage;
	public m_n27:fgui.GTextField;
	public m_CoinLabel:fgui.GTextField;
	public m_n12:fgui.GImage;
	public m_GetCoinBtn:UI_GameBlueBtn;
	public m_FreeGetCoinBtn:UI_GameBigBtn;
	public m_Win:fgui.GGroup;
	public m_n13:fgui.GImage;
	public m_n15:fgui.GImage;
	public m_n16:fgui.GImage;
	public m_CountTimeLabel:fgui.GTextField;
	public m_n14:fgui.GTextField;
	public m_n5:fgui.GImage;
	public m_ContinueBtn:UI_GameBlueBtn;
	public m_NextBtn:UI_GameBigBtn;
	public m_Lose:fgui.GGroup;
	public static URL:string = "ui://0lagqdfmsocn5";

	public static createInstance():UI_ResultView {
		return <UI_ResultView>(fgui.UIPackage.createObject("GameUI", "ResultView"));
	}

	protected onConstruct():void {
		this.m_State = this.getControllerAt(0);
		this.m_adState = this.getControllerAt(1);
		this.m_ColorBg = <fgui.GGraph>(this.getChildAt(0));
		this.m_n28 = <fgui.GLoader>(this.getChildAt(1));
		this.m_n8 = <fgui.GImage>(this.getChildAt(2));
		this.m_n11 = <fgui.GImage>(this.getChildAt(3));
		this.m_n9 = <fgui.GImage>(this.getChildAt(4));
		this.m_n10 = <fgui.GImage>(this.getChildAt(5));
		this.m_n27 = <fgui.GTextField>(this.getChildAt(6));
		this.m_CoinLabel = <fgui.GTextField>(this.getChildAt(7));
		this.m_n12 = <fgui.GImage>(this.getChildAt(8));
		this.m_GetCoinBtn = <UI_GameBlueBtn>(this.getChildAt(9));
		this.m_FreeGetCoinBtn = <UI_GameBigBtn>(this.getChildAt(10));
		this.m_Win = <fgui.GGroup>(this.getChildAt(11));
		this.m_n13 = <fgui.GImage>(this.getChildAt(12));
		this.m_n15 = <fgui.GImage>(this.getChildAt(13));
		this.m_n16 = <fgui.GImage>(this.getChildAt(14));
		this.m_CountTimeLabel = <fgui.GTextField>(this.getChildAt(15));
		this.m_n14 = <fgui.GTextField>(this.getChildAt(16));
		this.m_n5 = <fgui.GImage>(this.getChildAt(17));
		this.m_ContinueBtn = <UI_GameBlueBtn>(this.getChildAt(18));
		this.m_NextBtn = <UI_GameBigBtn>(this.getChildAt(19));
		this.m_Lose = <fgui.GGroup>(this.getChildAt(20));
	}
}