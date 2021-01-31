
/**
 * ...
 * @author FengLau
 * 事件管理器
 * 配合CustomEvents来使用
 */
export default class EventManager {
    private eventDispatcher: Laya.EventDispatcher = new Laya.EventDispatcher();
    private static instance: EventManager;
    /**
     * 单例实例
     */
    public static get inst(): EventManager {
        if (EventManager.instance == null) {
            EventManager.instance = new EventManager();
        }
        return EventManager.instance;
    }

    /**
     * 派发事件
     * @param type 事件类型
     * @param arg 参数
     */
    public SendEvent(type: string, arg: any = null) {
        this.eventDispatcher.event(type, arg);
    }

    /**
     * 事件侦听
     * @param type 事件类型
     * @param caller 接受者
     * @param listener 方法
     * @param arg 参数
     */
    public AddEventListener(type: string, caller: any, listener: Function, arg?: Array<any>) {
        this.eventDispatcher.on(type, caller, listener, arg);
    }

    /**
     * 移除事件
     * @param type 事件类型
     * @param caller 接受者
     * @param listener 方法
     */
    public RemoveEventListener(type: string, caller: any, listener: Function) {
        this.eventDispatcher.off(type, caller, listener);
    }

    /**
     * 移除当前接受者所有事件
     * @param caller 接受者
     */
    public RemoveEventListenerWithCaller(caller: any) {
        this.eventDispatcher.offAllCaller(caller);
    }

}