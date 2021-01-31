/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_ProgressBar1 extends fgui.GProgressBar {

	public m_n3:fgui.GImage;
	public m_bar:fgui.GImage;
	public static URL:string = "ui://kd5ich5smzapd";

	public static createInstance():UI_ProgressBar1 {
		return <UI_ProgressBar1>(fgui.UIPackage.createObject("YmSdkUI", "ProgressBar1"));
	}

	protected onConstruct():void {
		this.m_n3 = <fgui.GImage>(this.getChildAt(0));
		this.m_bar = <fgui.GImage>(this.getChildAt(1));
	}
}