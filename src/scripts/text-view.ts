import { InteractiveTextConfig, Paragraph } from "./config";
import { IObservable, IObserver } from "./observable";
import Parser from "./parser";
import TextController from "./text-controller";
import { ParagraphStates, TextState } from "./text-state";

export default class TextView implements IObserver, IObservable {
  private root: JQuery<HTMLElement>;
  private parser = new Parser();
  private observers: IObserver[] = [];

  public constructor(private jQuery: JQueryStatic, private config: InteractiveTextConfig,
    private state: TextState, private controller: TextController) {
    state.registerObserver(this);
    this.createHtml();
  }

  public registerObserver(observer: IObserver): void {
    this.observers.push(observer);
  }

  public unregisterObserver(observer: IObserver): void {
    this.observers.slice(this.observers.indexOf(observer), 1);
  }

  public onChanged(caller: IObservable, propertyName: string): void {
    this.updateParagraphs();
  }

  public getJQueryContent = () => this.root;

  private onPropertyChanged(propertyName: string): void {
    for (const observer of this.observers) {
      observer.onChanged(this, propertyName);
    }
  }

  private createHtml() {
    this.root = this.jQuery("<div></div>");
    let counter = 0;
    for (const paragraph of this.config.content) {
      this.root.append(this.createParagraph(paragraph, counter++));
    }
  }

  private convertAnnotations(html: string): JQuery.Node[] {
    html = this.parser.parse(html);
    const nodes = this.jQuery.parseHTML(html);
    return nodes;
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
      .append(this.convertAnnotations(paragraph.text))
      .addClass("content")
      .appendTo(outer);

    outer.find(".annotated")
      .on({
        click: this.controller.onShowAnnotation,
        mouseout: this.controller.onEndHover,
        mouseover: this.controller.onStartHover,
      });

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
    this.onPropertyChanged("size");
  }
}
