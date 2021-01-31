/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_SdkIconButtonAd extends fgui.GButton {

	public m_n2:fgui.GImage;
	public m_icon:fgui.GLoader;
	public m_n4:fgui.GGraph;
	public m_title:fgui.GTextField;
	public m_t0:fgui.Transition;
	public static URL:string = "ui://kd5ich5s8m0z7";

	public static createInstance():UI_SdkIconButtonAd {
		return <UI_SdkIconButtonAd>(fgui.UIPackage.createObject("YmSdkUI", "SdkIconButtonAd"));
	}

	protected onConstruct():void {
		this.m_n2 = <fgui.GImage>(this.getChildAt(0));
		this.m_icon = <fgui.GLoader>(this.getChildAt(1));
		this.m_n4 = <fgui.GGraph>(this.getChildAt(2));
		this.m_title = <fgui.GTextField>(this.getChildAt(3));
		this.m_t0 = this.getTransitionAt(0);
	}
}