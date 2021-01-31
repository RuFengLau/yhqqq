/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_LoadingView from "./UI_LoadingView";
import UI_LoadingBar from "./UI_LoadingBar";

export default class GameLoadingUIBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(UI_LoadingView.URL, UI_LoadingView);
		fgui.UIObjectFactory.setExtension(UI_LoadingBar.URL, UI_LoadingBar);
	}
}