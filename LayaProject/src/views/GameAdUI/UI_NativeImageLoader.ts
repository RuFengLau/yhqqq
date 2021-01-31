/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

export default class UI_NativeImageLoader extends fgui.GLabel {

	public m_icon:fgui.GLoader;
	public static URL:string = "ui://2lldjolijixpj8c";

	public static createInstance():UI_NativeImageLoader {
		return <UI_NativeImageLoader>(fgui.UIPackage.createObject("GameAdUI", "NativeImageLoader"));
	}

	protected onConstruct():void {
		this.m_icon = <fgui.GLoader>(this.getChildAt(0));
	}
}