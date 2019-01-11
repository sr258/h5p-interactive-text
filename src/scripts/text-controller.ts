import { IObservable, IObserver } from "./observable";
import { PopupService } from "./popup-service";
import { TextState } from "./text-state";

export default class TextController implements IObservable {
  public popupHoverDelay = 750;

  private observers: IObserver[] = [];
  private timer: number;
  private lastPopupByHover = false;

  constructor(private state: TextState, private popupService: PopupService, private jQuery: JQueryStatic) { }

  public registerObserver(observer: IObserver): void {
    this.observers.push(observer);
  }
  public unregisterObserver(observer: IObserver): void {
    this.observers.slice(this.observers.indexOf(observer), 1);
  }

  public onToggle = (event: JQuery.ClickEvent): any => {
    this.state.toggleParagraphStatus(event.data);
  }

  public onShowAnnotation = (event: JQuery.ClickEvent): any => {
    if (this.lastPopupByHover === true)
      return;
    this.showPopup(event.currentTarget);
    this.lastPopupByHover = false;
    if (this.timer) {
      clearTimeout(this.timer);
    }
  }

  public onEndHover = (event: JQuery.ClickEvent) => {
    clearTimeout(this.timer);
    if (this.lastPopupByHover) {
      this.popupService.hide();
    }
    this.lastPopupByHover = false;
  }
  public onStartHover = (event: JQuery.ClickEvent) => {
    this.lastPopupByHover = false;
    this.timer = setTimeout(() => {
      this.showPopup(event.currentTarget);
      this.lastPopupByHover = true;
    }, this.popupHoverDelay);
  }

  private showPopup(annotatedElement: JQuery) {
    this.popupService.show(annotatedElement, this.jQuery(annotatedElement).find(".annotation").html());
    this.onPropertyChanged("size");
  }

  private onPropertyChanged(propertyName: string): void {
    for (const observer of this.observers) {
      observer.onChanged(this, propertyName);
    }
  }
}
