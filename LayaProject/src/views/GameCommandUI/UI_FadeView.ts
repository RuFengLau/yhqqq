/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_FadeView extends fgui.GComponent {

	public m_n2:fgui.GGraph;
	public m_n0:fgui.GLoader;
	public m_fadeIn:fgui.Transition;
	public m_fadeOut:fgui.Transition;
	public static URL:string = "ui://9kynrs2zs24q4w";

	public static createInstance():UI_FadeView {
		return <UI_FadeView>(fgui.UIPackage.createObject("GameCommandUI", "FadeView"));
	}

	protected onConstruct():void {
		this.m_n2 = <fgui.GGraph>(this.getChildAt(0));
		this.m_n0 = <fgui.GLoader>(this.getChildAt(1));
		this.m_fadeIn = this.getTransitionAt(0);
		this.m_fadeOut = this.getTransitionAt(1);
	}
}