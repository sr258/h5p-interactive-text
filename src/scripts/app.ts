import { InteractiveTextConfig } from "./config";
import { IObservable, IObserver } from "./observable";
import { PopupService } from "./popup-service";
import TextController from "./text-controller";
import { TextState } from "./text-state";
import TextView from "./text-view";

export default class InteractiveText extends (H5P.EventDispatcher as new () => any) implements IObserver {
  private state: TextState;

  constructor(private config: InteractiveTextConfig, private contentId: string, private contentData: any = {}) {
    super();
    if (typeof (contentData.previousState) === typeof (TextState)) {
      this.state = TextState.createFromContentData(this.contentData.previousState);
    } else {
      this.state = TextState.createFromConfig(this.config);
    }
  }

  /**
   * Attach library to wrapper
   */
  public attach = ($wrapper: JQuery) => {
    const popupService = new PopupService(H5P.jQuery);
    const controller = new TextController(this.state, popupService, H5P.jQuery);
    controller.registerObserver(this);
    const view = new TextView(H5P.jQuery, this.config, this.state, controller);
    view.registerObserver(this);

    $wrapper.get(0).classList.add("h5p-interactive-text");
    $wrapper.get(0).appendChild(view.getJQueryContent().get(0));
  }

  public onChanged(caller: IObservable, propertyName: string): void {
    if (propertyName === "size") {
      this.trigger("resize");
    }
  }
}
