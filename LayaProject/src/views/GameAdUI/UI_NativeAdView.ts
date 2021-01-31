/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_NativeImageLoader from "./UI_NativeImageLoader";
import UI_NativeAdViewCommandBtn from "./UI_NativeAdViewCommandBtn";
import UI_NativeAdViewButton from "./UI_NativeAdViewButton";

export default class UI_NativeAdView extends fgui.GComponent {

	public m_n0:fgui.GGraph;
	public m_TitleLabel:fgui.GTextField;
	public m_n23:fgui.GImage;
	public m_n27:fgui.GGraph;
	public m_ImageLoader:UI_NativeImageLoader;
	public m_n18:fgui.GGraph;
	public m_n29:fgui.GImage;
	public m_DescLabel:fgui.GTextField;
	public m_ClickBtn:UI_NativeAdViewCommandBtn;
	public m_CloseBtn:UI_NativeAdViewCommandBtn;
	public m_ConfirmBtn:UI_NativeAdViewButton;
	public m_n17:fgui.GGroup;
	public static URL:string = "ui://2lldjolilo4qb";

	public static createInstance():UI_NativeAdView {
		return <UI_NativeAdView>(fgui.UIPackage.createObject("GameAdUI", "NativeAdView"));
	}

	protected onConstruct():void {
		this.m_n0 = <fgui.GGraph>(this.getChildAt(0));
		this.m_TitleLabel = <fgui.GTextField>(this.getChildAt(1));
		this.m_n23 = <fgui.GImage>(this.getChildAt(2));
		this.m_n27 = <fgui.GGraph>(this.getChildAt(3));
		this.m_ImageLoader = <UI_NativeImageLoader>(this.getChildAt(4));
		this.m_n18 = <fgui.GGraph>(this.getChildAt(5));
		this.m_n29 = <fgui.GImage>(this.getChildAt(6));
		this.m_DescLabel = <fgui.GTextField>(this.getChildAt(7));
		this.m_ClickBtn = <UI_NativeAdViewCommandBtn>(this.getChildAt(8));
		this.m_CloseBtn = <UI_NativeAdViewCommandBtn>(this.getChildAt(9));
		this.m_ConfirmBtn = <UI_NativeAdViewButton>(this.getChildAt(10));
		this.m_n17 = <fgui.GGroup>(this.getChildAt(11));
	}
}