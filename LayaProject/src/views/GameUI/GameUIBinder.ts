/** This is an automatically generated class by FairyGUI. Please do not modify it. **/

import UI_ResourceBar from "./UI_ResourceBar";
import UI_ShopView from "./UI_ShopView";
import UI_CarShopList from "./UI_CarShopList";
import UI_StartView from "./UI_StartView";
import UI_GameBlueBtn from "./UI_GameBlueBtn";
import UI_GameBigBtn from "./UI_GameBigBtn";
import UI_ResultView from "./UI_ResultView";
import UI_GameButton from "./UI_GameButton";

export default class GameUIBinder {
	public static bindAll():void {
		fgui.UIObjectFactory.setExtension(UI_ResourceBar.URL, UI_ResourceBar);
		fgui.UIObjectFactory.setExtension(UI_ShopView.URL, UI_ShopView);
		fgui.UIObjectFactory.setExtension(UI_CarShopList.URL, UI_CarShopList);
		fgui.UIObjectFactory.setExtension(UI_StartView.URL, UI_StartView);
		fgui.UIObjectFactory.setExtension(UI_GameBlueBtn.URL, UI_GameBlueBtn);
		fgui.UIObjectFactory.setExtension(UI_GameBigBtn.URL, UI_GameBigBtn);
		fgui.UIObjectFactory.setExtension(UI_ResultView.URL, UI_ResultView);
		fgui.UIObjectFactory.setExtension(UI_GameButton.URL, UI_GameButton);
	}
}