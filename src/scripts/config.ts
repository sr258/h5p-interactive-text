export class Paragraph {
  public hide: boolean;
  public text: string;
}

export class Dictionary {
  public name: string;
  public url: string;
  public css: string;
}

export class InteractiveTextConfig {
  public media?: any;
  public content: Paragraph[];
  public source: {
    author?: string;
    title?: string;
    date?: string;
    url?: string;
  };
  public dictionaries: Dictionary[];
  public behaviour: {
    freelookup: boolean,
    defaultdictionary: string,
    allowhideforall: boolean,
    dictionaryopenformat: "popup" | "window" | "linksamewindow" | "linknewwindow",
    text2speech: "disabled" | string;
  }
}