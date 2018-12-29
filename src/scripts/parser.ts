export default class Parser {
  public parse(html: string): string {
    const regex1 = /(\w+)\s*\(=\s*(.*?)\)/g;
    return html.replace(regex1, (substr, arg1, arg2) => {
      return `<span class="annotated">${arg1.replace(/_/g, " ")} <span class="annotation">${arg2}</span></span>`;
    });
  }
}
