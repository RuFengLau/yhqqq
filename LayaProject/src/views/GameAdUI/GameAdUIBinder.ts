/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_NativeAdViewButton from "./UI_NativeAdViewButton";
import UI_NativeAdViewCommandBtn from "./UI_NativeAdViewCommandBtn";
import UI_MoreGameBtn from "./UI_MoreGameBtn";
import UI_ShortcutBtn from "./UI_ShortcutBtn";
import UI_NativeImage from "./UI_NativeImage";
import UI_NativeImageLoader from "./UI_NativeImageLoader";
import UI_MoreGameCloseBtn from "./UI_MoreGameCloseBtn";
import UI_MoreGameIcon from "./UI_MoreGameIcon";
import UI_MoreGameView from "./UI_MoreGameView";
import UI_MaskIcon from "./UI_MaskIcon";
import UI_NativeIcon from "./UI_NativeIcon";
import UI_NativeAdView from "./UI_NativeAdView";

export default class GameAdUIBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(UI_NativeAdViewButton.URL, UI_NativeAdViewButton);
		fgui.UIObjectFactory.setExtension(UI_NativeAdViewCommandBtn.URL, UI_NativeAdViewCommandBtn);
		fgui.UIObjectFactory.setExtension(UI_MoreGameBtn.URL, UI_MoreGameBtn);
		fgui.UIObjectFactory.setExtension(UI_ShortcutBtn.URL, UI_ShortcutBtn);
		fgui.UIObjectFactory.setExtension(UI_NativeImage.URL, UI_NativeImage);
		fgui.UIObjectFactory.setExtension(UI_NativeImageLoader.URL, UI_NativeImageLoader);
		fgui.UIObjectFactory.setExtension(UI_MoreGameCloseBtn.URL, UI_MoreGameCloseBtn);
		fgui.UIObjectFactory.setExtension(UI_MoreGameIcon.URL, UI_MoreGameIcon);
		fgui.UIObjectFactory.setExtension(UI_MoreGameView.URL, UI_MoreGameView);
		fgui.UIObjectFactory.setExtension(UI_MaskIcon.URL, UI_MaskIcon);
		fgui.UIObjectFactory.setExtension(UI_NativeIcon.URL, UI_NativeIcon);
		fgui.UIObjectFactory.setExtension(UI_NativeAdView.URL, UI_NativeAdView);
	}
}