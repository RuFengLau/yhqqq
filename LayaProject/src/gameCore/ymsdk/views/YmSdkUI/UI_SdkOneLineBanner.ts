/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_SdkOneLineBanner extends fgui.GComponent {

	public m_List:fgui.GList;
	public static URL:string = "ui://kd5ich5smzap8";

	public static createInstance():UI_SdkOneLineBanner {
		return <UI_SdkOneLineBanner>(fgui.UIPackage.createObject("YmSdkUI", "SdkOneLineBanner"));
	}

	protected onConstruct():void {
		this.m_List = <fgui.GList>(this.getChildAt(0));
	}
}