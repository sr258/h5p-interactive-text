import { InteractiveTextConfig, Paragraph } from "./config";

export default class TextView {
  private static createParagraph(jQuery: JQueryStatic, paragraph: Paragraph) {
    const details = jQuery("<details></details>");
    if (!paragraph.hide)
      details.attr("open", "open");

    jQuery('<summary></summary>')
      .appendTo(details);

    jQuery("<p></p>")
      .html(paragraph.text)
      .appendTo(details);

    return details;
  }

  public static create(jQuery: JQueryStatic, config: InteractiveTextConfig): HTMLElement {
    const root = jQuery("<div></div>");
    for (const paragraph of config.content) {
      root.append(this.createParagraph(jQuery, paragraph));
    }
    return root.get(0);
  }
}