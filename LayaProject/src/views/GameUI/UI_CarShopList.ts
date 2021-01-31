/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_CarShopList extends fgui.GButton {

	public m_state:fgui.Controller;
	public m_button:fgui.Controller;
	public m_n7:fgui.GImage;
	public m_icon:fgui.GLoader;
	public m_n10:fgui.GImage;
	public m_CoinLabel:fgui.GTextField;
	public m_n13:fgui.GTextField;
	public m_NameLabel:fgui.GTextField;
	public m_n15:fgui.GImage;
	public m_n16:fgui.GTextField;
	public m_n17:fgui.GImage;
	public m_n18:fgui.GImage;
	public static URL:string = "ui://0lagqdfm9oij2l";

	public static createInstance():UI_CarShopList {
		return <UI_CarShopList>(fgui.UIPackage.createObject("GameUI", "CarShopList"));
	}

	protected onConstruct():void {
		this.m_state = this.getControllerAt(0);
		this.m_button = this.getControllerAt(1);
		this.m_n7 = <fgui.GImage>(this.getChildAt(0));
		this.m_icon = <fgui.GLoader>(this.getChildAt(1));
		this.m_n10 = <fgui.GImage>(this.getChildAt(2));
		this.m_CoinLabel = <fgui.GTextField>(this.getChildAt(3));
		this.m_n13 = <fgui.GTextField>(this.getChildAt(4));
		this.m_NameLabel = <fgui.GTextField>(this.getChildAt(5));
		this.m_n15 = <fgui.GImage>(this.getChildAt(6));
		this.m_n16 = <fgui.GTextField>(this.getChildAt(7));
		this.m_n17 = <fgui.GImage>(this.getChildAt(8));
		this.m_n18 = <fgui.GImage>(this.getChildAt(9));
	}
}