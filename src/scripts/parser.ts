/**
 * Parses HTML strings and inserts html markup for annotated words and snipped passages.
 */
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
        .replace(/_/g, " ")}<span class="annotation">${group4}</span></span>`;
    });
  }

  private parseDictionaryLinks(html: string): string {
    const regex1 = /(\(([(\w\s]+)\)|(\w+))\s*\(\s*->\s*(.*?)(:\s*(.+?)(\s*,\s*([^\s]+?))?)?\)/g;
    return html.replace(regex1, (substr, group1, group2, group3, group4, group5, group6, group7, group8) => {
      const annotatedText = group2 || group1;
      return `<span class="dictionary-linked" data-dictionary-id="${group4}"\
${group6 ? ` data-dictionary-headword="${group6}"` : ""}\
${group8 ? ` data-dictionary-pos="${group8}"` : ""}>${annotatedText.replace(/_/g, " ")}</span>`;
    });
  }
}
