/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_MaskIcon from "./UI_MaskIcon";

export default class UI_NativeIcon extends fgui.GButton {

	public m_n1:fgui.GGraph;
	public m_IconMask:UI_MaskIcon;
	public m_n3:fgui.GImage;
	public static URL:string = "ui://2lldjolilo4q40";

	public static createInstance():UI_NativeIcon {
		return <UI_NativeIcon>(fgui.UIPackage.createObject("GameAdUI", "NativeIcon"));
	}

	protected onConstruct():void {
		this.m_n1 = <fgui.GGraph>(this.getChildAt(0));
		this.m_IconMask = <UI_MaskIcon>(this.getChildAt(1));
		this.m_n3 = <fgui.GImage>(this.getChildAt(2));
	}
}