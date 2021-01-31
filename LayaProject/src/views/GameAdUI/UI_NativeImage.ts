/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_NativeImageLoader from "./UI_NativeImageLoader";

export default class UI_NativeImage extends fgui.GButton {

	public m_n18:fgui.GGraph;
	public m_ImageLoader:UI_NativeImageLoader;
	public m_n20:fgui.GImage;
	public static URL:string = "ui://2lldjolijixpj8b";

	public static createInstance():UI_NativeImage {
		return <UI_NativeImage>(fgui.UIPackage.createObject("GameAdUI", "NativeImage"));
	}

	protected onConstruct():void {
		this.m_n18 = <fgui.GGraph>(this.getChildAt(0));
		this.m_ImageLoader = <UI_NativeImageLoader>(this.getChildAt(1));
		this.m_n20 = <fgui.GImage>(this.getChildAt(2));
	}
}