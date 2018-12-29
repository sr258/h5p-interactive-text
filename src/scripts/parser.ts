export default class Parser {
  public parse(html: string): string {
    const regex1 = /(\w+)\s*\(=\s*(.*?)\)/g;
    return html.replace(regex1, '<span class="annotated">$1 <span class="annotation">$2</span></span>');
  }
}
