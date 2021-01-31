/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_SdkIconButtonAd from "./UI_SdkIconButtonAd";
import UI_SdkOneLineBanner from "./UI_SdkOneLineBanner";
import UI_SdkResultIconListView from "./UI_SdkResultIconListView";
import UI_SdkPowerView from "./UI_SdkPowerView";
import UI_ProgressBar1 from "./UI_ProgressBar1";
import UI_SdkStartIconListView from "./UI_SdkStartIconListView";
import UI_SdkIconButton from "./UI_SdkIconButton";
import UI_SdkButton from "./UI_SdkButton";

export default class YmSdkUIBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(UI_SdkIconButtonAd.URL, UI_SdkIconButtonAd);
		fgui.UIObjectFactory.setExtension(UI_SdkOneLineBanner.URL, UI_SdkOneLineBanner);
		fgui.UIObjectFactory.setExtension(UI_SdkResultIconListView.URL, UI_SdkResultIconListView);
		fgui.UIObjectFactory.setExtension(UI_SdkPowerView.URL, UI_SdkPowerView);
		fgui.UIObjectFactory.setExtension(UI_ProgressBar1.URL, UI_ProgressBar1);
		fgui.UIObjectFactory.setExtension(UI_SdkStartIconListView.URL, UI_SdkStartIconListView);
		fgui.UIObjectFactory.setExtension(UI_SdkIconButton.URL, UI_SdkIconButton);
		fgui.UIObjectFactory.setExtension(UI_SdkButton.URL, UI_SdkButton);
	}
}