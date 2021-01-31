/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_SdkButton from "./UI_SdkButton";
import UI_ProgressBar1 from "./UI_ProgressBar1";

export default class UI_SdkPowerView extends fgui.GComponent {

	public m_n0:fgui.GGraph;
	public m_n1:fgui.GImage;
	public m_ImageLoader:fgui.GLoader;
	public m_ClickBtn:UI_SdkButton;
	public m_TipLabel:fgui.GTextField;
	public m_ProgressBar:UI_ProgressBar1;
	public m_ButtomBar:fgui.GGraph;
	public static URL:string = "ui://kd5ich5smzapa";

	public static createInstance():UI_SdkPowerView {
		return <UI_SdkPowerView>(fgui.UIPackage.createObject("YmSdkUI", "SdkPowerView"));
	}

	protected onConstruct():void {
		this.m_n0 = <fgui.GGraph>(this.getChildAt(0));
		this.m_n1 = <fgui.GImage>(this.getChildAt(1));
		this.m_ImageLoader = <fgui.GLoader>(this.getChildAt(2));
		this.m_ClickBtn = <UI_SdkButton>(this.getChildAt(3));
		this.m_TipLabel = <fgui.GTextField>(this.getChildAt(4));
		this.m_ProgressBar = <UI_ProgressBar1>(this.getChildAt(5));
		this.m_ButtomBar = <fgui.GGraph>(this.getChildAt(6));
	}
}