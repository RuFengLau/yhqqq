import GComponent = fairygui.GComponent;
import ViewController from "./ViewController";

export default abstract class ViewControllerGeneric<T extends GComponent> extends ViewController {
    public View: T;
    public get view(): T {
        return this.View;
    }
}