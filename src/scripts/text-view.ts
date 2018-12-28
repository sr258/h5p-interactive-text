import { InteractiveTextConfig, Paragraph } from "./config";
import TextController from "./text-controller";
import { TextState, ParagraphStates } from "./text-state";
import { IObserver, IObservable } from "./observable";

export default class TextView implements IObserver {
  private root: JQuery<HTMLElement>;

  public constructor(private jQuery: JQueryStatic, config: InteractiveTextConfig, private state: TextState, private controller: TextController) {
    state.registerObserver(this);
    this.root = jQuery("<div></div>");
    let counter = 0;
    for (const paragraph of config.content) {
      this.root.append(this.createParagraph(paragraph, counter++));
    }
  }

  public onChanged(caller: IObservable, propertyName: string): void {
    this.update();
  }

  public getJQuery = () => this.root;

  public update() {
    for (let index = 0; index < this.state.paragraphsStatus.length; index++) {
      if (this.state.paragraphsStatus[index] === ParagraphStates.Opened) {
        this.root.find(`#paragraph-${index}`).addClass("opened");
      }
      else {
        this.root.find(`#paragraph-${index}`).removeClass("opened");
      }
    }
  }

  private createParagraph(paragraph: Paragraph, paragraphNumber: number) {
    const outer = this.jQuery("<div></div>")
      .attr("id", `paragraph-${paragraphNumber}`)
      .addClass("paragraph");

    if (this.state.paragraphsStatus[paragraphNumber] === ParagraphStates.Opened)
      outer.addClass("opened");

    this.jQuery('<div></div>')
      .append(this.jQuery('<i class="fa fa-eye-slash"></i>'))
      .append(this.jQuery('<i class="fa fa-eye"></i>'))
      .addClass("toggle")
      .on("click", null, paragraphNumber, this.controller.onToggle)
      .appendTo(outer);

    this.jQuery("<div></div>")
      .html(paragraph.text)
      .addClass("content")
      .appendTo(outer);

    return outer;
  }
}