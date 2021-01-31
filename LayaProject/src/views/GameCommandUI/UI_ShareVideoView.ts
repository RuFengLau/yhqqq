/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_CommandButton from "./UI_CommandButton";
import UI_BtnColor from "./UI_BtnColor";

export default class UI_ShareVideoView extends fgui.GComponent {

	public m_n0:fgui.GGraph;
	public m_n30:fgui.GImage;
	public m_ImageLoader:fgui.GLoader;
	public m_CloseBtn:UI_CommandButton;
	public m_n42:UI_BtnColor;
	public m_n39:fgui.GGroup;
	public m_t0:fgui.Transition;
	public static URL:string = "ui://9kynrs2zs24q4g";

	public static createInstance():UI_ShareVideoView {
		return <UI_ShareVideoView>(fgui.UIPackage.createObject("GameCommandUI", "ShareVideoView"));
	}

	protected onConstruct():void {
		this.m_n0 = <fgui.GGraph>(this.getChildAt(0));
		this.m_n30 = <fgui.GImage>(this.getChildAt(1));
		this.m_ImageLoader = <fgui.GLoader>(this.getChildAt(2));
		this.m_CloseBtn = <UI_CommandButton>(this.getChildAt(3));
		this.m_n42 = <UI_BtnColor>(this.getChildAt(4));
		this.m_n39 = <fgui.GGroup>(this.getChildAt(5));
		this.m_t0 = this.getTransitionAt(0);
	}
}