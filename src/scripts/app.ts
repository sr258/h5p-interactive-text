import * as $ from 'jquery';
import { InteractiveTextConfig } from './config';

declare var H5P: any;
declare var H5PIntegration: any;

export default class InteractiveText extends (H5P.EventDispatcher as { new(): any; }) {
  /**
   * @constructor
   *
   * @param {object} config
   * @param {string} contentId
   * @param {object} contentData
   */
  constructor(config: InteractiveTextConfig, contentId: string, contentData: any = {}) {
    super();
    const root = document.createElement('div');
    for (const paragraph of config.content) {
      const details = document.createElement('details');
      if (!paragraph.hide)
        details.setAttribute("open", "open");

      const summary = document.createElement('summary');
      summary.innerText = "";
      details.appendChild(summary);

      const p = document.createElement('p');
      p.innerHTML = paragraph.text;
      details.appendChild(p);

      root.appendChild(details);
    }

    this.element = root;
  }

  /**
   * Attach library to wrapper
   *
   * @param {jQuery} $wrapper
   */
  attach = function ($wrapper: JQuery) {
    $wrapper.get(0).classList.add('h5p-interactive-text');
    $wrapper.get(0).appendChild(this.element);
  }
}