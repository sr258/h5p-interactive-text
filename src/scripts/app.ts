import { InteractiveTextConfig } from "./config";
import TextController from "./text-controller";
import { TextState } from "./text-state";
import TextView from "./text-view";

declare var H5P: any;

export default class InteractiveText extends (H5P.EventDispatcher as new () => any) {
  private state: TextState;

  /**
   * @constructor
   *
   * @param {object} config
   * @param {string} contentId
   * @param {object} contentData
   */
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
   *
   * @param {jQuery} $wrapper
   */
  public attach = ($wrapper: JQuery) => {
    const controller = new TextController(this.state);
    const view = new TextView(H5P.jQuery, this.config, this.state, controller);

    $wrapper.get(0).classList.add("h5p-interactive-text");
    $wrapper.get(0).appendChild(view.getJQueryContent().get(0));
  }
}
