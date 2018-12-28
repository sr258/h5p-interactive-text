import { TextState } from "./text-state";

export default class TextController {
  constructor(private state: TextState) { }

  public onToggle = (event: any): any => {
    this.state.toggleParagraphStatus(event.data);
  }
}