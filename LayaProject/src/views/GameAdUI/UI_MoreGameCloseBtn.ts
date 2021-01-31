/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_MoreGameCloseBtn extends fgui.GButton {

	public m_icon:fgui.GLoader;
	public m_t0:fgui.Transition;
	public static URL:string = "ui://2lldjolijixpj8f";

	public static createInstance():UI_MoreGameCloseBtn {
		return <UI_MoreGameCloseBtn>(fgui.UIPackage.createObject("GameAdUI", "MoreGameCloseBtn"));
	}

	protected onConstruct():void {
		this.m_icon = <fgui.GLoader>(this.getChildAt(0));
		this.m_t0 = this.getTransitionAt(0);
	}
}