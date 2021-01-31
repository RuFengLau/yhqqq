/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_BtnColor from "./UI_BtnColor";
import UI_MessageBoxView from "./UI_MessageBoxView";
import UI_ToastView from "./UI_ToastView";
import UI_ShareVideoView from "./UI_ShareVideoView";
import UI_CommandButton from "./UI_CommandButton";
import UI_FadeView from "./UI_FadeView";

export default class GameCommandUIBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(UI_BtnColor.URL, UI_BtnColor);
		fgui.UIObjectFactory.setExtension(UI_MessageBoxView.URL, UI_MessageBoxView);
		fgui.UIObjectFactory.setExtension(UI_ToastView.URL, UI_ToastView);
		fgui.UIObjectFactory.setExtension(UI_ShareVideoView.URL, UI_ShareVideoView);
		fgui.UIObjectFactory.setExtension(UI_CommandButton.URL, UI_CommandButton);
		fgui.UIObjectFactory.setExtension(UI_FadeView.URL, UI_FadeView);
	}
}