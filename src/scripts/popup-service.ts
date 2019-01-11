export class PopupService {
  private speechBubble: any;
  private annotatedElement: JQuery;

  constructor(private jQuery: JQueryStatic) { }

  public show(element: JQuery, html: string) {
    this.speechBubble = new H5P.JoubelSpeechBubble(this.jQuery(element), html);
  }

  public hide() {
    if (this.speechBubble) {
      try {
        this.speechBubble.remove();
      } catch (exception) {
        this.speechBubble = undefined;
      }
    }
    this.speechBubble = undefined;
  }
}
