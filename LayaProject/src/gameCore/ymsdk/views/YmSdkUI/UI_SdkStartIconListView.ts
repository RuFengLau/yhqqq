/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_SdkButton from "./UI_SdkButton";

export default class UI_SdkStartIconListView extends fgui.GComponent {

	public m_n5:fgui.GGraph;
	public m_List0:fgui.GList;
	public m_List1:fgui.GList;
	public m_CloseBtn:UI_SdkButton;
	public static URL:string = "ui://kd5ich5ss4083";

	public static createInstance():UI_SdkStartIconListView {
		return <UI_SdkStartIconListView>(fgui.UIPackage.createObject("YmSdkUI", "SdkStartIconListView"));
	}

	protected onConstruct():void {
		this.m_n5 = <fgui.GGraph>(this.getChildAt(0));
		this.m_List0 = <fgui.GList>(this.getChildAt(1));
		this.m_List1 = <fgui.GList>(this.getChildAt(2));
		this.m_CloseBtn = <UI_SdkButton>(this.getChildAt(3));
	}
}