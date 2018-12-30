export default class Parser {
  public parse(html: string): string {
    html = this.parseInlineAnnotations(html);
    html = this.parseDictionaryLinks(html);
    return html;
  }

  private parseInlineAnnotations(html: string): string {
    const regex1 = /(\(([(\w\s]+)\)|(\w+))\s*\(\s*=\s*(.*?)\)/g;
    return html.replace(regex1, (substr, group1, group2, group3, group4) => {
      const annotatedText = group2 || group1;
      return `<span class="annotated">${annotatedText
        .replace(/_/g, " ")} <span class="annotation">${group4}</span></span>`;
    });
  }

  private parseDictionaryLinks(html: string): string {
    const regex1 = /(\(([(\w\s]+)\)|(\w+))\s*\(\s*->\s*(.*?)\)/g;
    return html.replace(regex1, (substr, group1, group2, group3, group4) => {
      const annotatedText = group2 || group1;
      return `<span class="dictionary-linked" data-dictionary-id="${group4}">${annotatedText
        .replace(/_/g, " ")}</span>`;
    });
  }
}
