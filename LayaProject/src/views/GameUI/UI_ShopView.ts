/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_ResourceBar from "./UI_ResourceBar";
import UI_GameButton from "./UI_GameButton";
import UI_GameBigBtn from "./UI_GameBigBtn";

export default class UI_ShopView extends fgui.GComponent {

	public m_adState:fgui.Controller;
	public m_n0:fgui.GLoader;
	public m_CoinBar:UI_ResourceBar;
	public m_n2:fgui.GImage;
	public m_List:fgui.GList;
	public m_BackBtn:UI_GameButton;
	public m_FreeGetBtn:UI_GameBigBtn;
	public m_BuyBtn:UI_GameBigBtn;
	public m_UseBtn:UI_GameBigBtn;
	public m_ImageLoader:fgui.GLoader;
	public m_n24:fgui.GButton;
	public m_n25:fgui.GButton;
	public m_n26:fgui.GButton;
	public m_n27:fgui.GButton;
	public m_ButtomBar:fgui.GGraph;
	public static URL:string = "ui://0lagqdfm9oij2c";

	public static createInstance():UI_ShopView {
		return <UI_ShopView>(fgui.UIPackage.createObject("GameUI", "ShopView"));
	}

	protected onConstruct():void {
		this.m_adState = this.getControllerAt(0);
		this.m_n0 = <fgui.GLoader>(this.getChildAt(0));
		this.m_CoinBar = <UI_ResourceBar>(this.getChildAt(1));
		this.m_n2 = <fgui.GImage>(this.getChildAt(2));
		this.m_List = <fgui.GList>(this.getChildAt(3));
		this.m_BackBtn = <UI_GameButton>(this.getChildAt(4));
		this.m_FreeGetBtn = <UI_GameBigBtn>(this.getChildAt(5));
		this.m_BuyBtn = <UI_GameBigBtn>(this.getChildAt(6));
		this.m_UseBtn = <UI_GameBigBtn>(this.getChildAt(7));
		this.m_ImageLoader = <fgui.GLoader>(this.getChildAt(8));
		this.m_n24 = <fgui.GButton>(this.getChildAt(9));
		this.m_n25 = <fgui.GButton>(this.getChildAt(10));
		this.m_n26 = <fgui.GButton>(this.getChildAt(11));
		this.m_n27 = <fgui.GButton>(this.getChildAt(12));
		this.m_ButtomBar = <fgui.GGraph>(this.getChildAt(13));
	}
}