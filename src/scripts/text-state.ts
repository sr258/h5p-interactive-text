import { InteractiveTextConfig } from "./config";
import { IObservable, IObserver } from "./observable";

export enum ParagraphStates {
  Opened,
  Collapsed,
}

export class TextState implements IObservable {

  public static createFromConfig(config: InteractiveTextConfig): TextState {
    const state = new TextState();
    for (const paragraph of config.content) {
      state.paragraphsStatus.push(paragraph.hide ? ParagraphStates.Collapsed : ParagraphStates.Opened);
    }
    return state;
  }

  public static createFromContentData(contentData: any): TextState {
    return contentData as TextState;
  }
  public paragraphsStatus: ParagraphStates[];
  public visibleAnnotation: number;

  private observers: IObserver[] = [];

  constructor() {
    this.paragraphsStatus = [];
    this.visibleAnnotation = -1;
  }

  public saveToContentData(): any {
    return this;
  }

  public setParagraphStatus(paragraphNumber: number, status: ParagraphStates) {
    this.paragraphsStatus[paragraphNumber] = status;
    this.onChanged("paragraphStatus");
  }

  public toggleParagraphStatus(paragraphNumber: number) {
    if (this.paragraphsStatus[paragraphNumber] === ParagraphStates.Opened) {
      this.setParagraphStatus(paragraphNumber, ParagraphStates.Collapsed);
    } else {
      this.setParagraphStatus(paragraphNumber, ParagraphStates.Opened);
    }
  }

  public registerObserver(observer: IObserver): void {
    this.observers.push(observer);
  }
  public unregisterObserver(observer: IObserver): void {
    this.observers.splice(this.observers.indexOf(observer), 1);
  }
  public onChanged(propertyName: string): void {
    for (const observer of this.observers) {
      observer.onChanged(this, propertyName);
    }
  }
}
