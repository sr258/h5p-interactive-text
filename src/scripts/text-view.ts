import { InteractiveTextConfig, Paragraph } from "./config";
import { IObservable, IObserver } from "./observable";
import TextController from "./text-controller";
import { ParagraphStates, TextState } from "./text-state";

export default class TextView implements IObserver {
  private root: JQuery<HTMLElement>;

  public constructor(private jQuery: JQueryStatic, private config: InteractiveTextConfig,
    private state: TextState, private controller: TextController) {
    state.registerObserver(this);
    this.createHtml();
  }

  public onChanged(caller: IObservable, propertyName: string): void {
    this.updateParagraphs();
  }

  public getJQueryContent = () => this.root;

  private createHtml() {
    this.root = this.jQuery("<div></div>");
    let counter = 0;
    for (const paragraph of this.config.content) {
      this.root.append(this.createParagraph(paragraph, counter++));
    }
  }

  private createParagraph(paragraph: Paragraph, paragraphNumber: number) {
    const outer = this.jQuery("<div></div>")
      .attr("id", `paragraph-${paragraphNumber}`)
      .addClass("paragraph");

    if (this.config.behaviour.allowhideforall === false
      && this.state.paragraphsStatus[paragraphNumber] === ParagraphStates.Opened) {
      outer.addClass("opened");
      this.jQuery('<div class="toggle-dummy"></div>')
        .appendTo(outer);
    } else {
      if (this.state.paragraphsStatus[paragraphNumber] === ParagraphStates.Opened)
        outer.addClass("opened");

      this.jQuery('<div class="toggle"></div>')
        .append(this.jQuery('<button class="hide-button"><i class="icon fa fa-eye-slash"></i></button>'))
        .append(this.jQuery('<button class="show-button"><i class="icon fa fa-eye"></i></button>'))
        .on("click", null, paragraphNumber, this.controller.onToggle)
        .appendTo(outer);

      this.jQuery("<div>[...]</div>")
        .addClass("cut-content")
        .appendTo(outer);
    }
    this.jQuery("<div></div>")
      .html(paragraph.text)
      .addClass("content")
      .appendTo(outer);

    return outer;
  }

  private updateParagraphs() {
    for (let index = 0; index < this.state.paragraphsStatus.length; index++) {
      if (this.state.paragraphsStatus[index] === ParagraphStates.Opened) {
        this.root.find(`#paragraph-${index}`).addClass("opened");
      } else {
        this.root.find(`#paragraph-${index}`).removeClass("opened");
      }
    }
  }
}
