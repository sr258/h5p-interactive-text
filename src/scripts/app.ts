import * as $ from 'jquery';

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
  constructor(config: any, contentId: string, contentData: any = {}) {
    super();
    let username = H5PIntegration.user.name || 'world';
    this.element = document.createElement('div');
    this.element.innerText = config.textField.replace('%username', username);
  }
  
  /**
   * Attach library to wrapper
   *
   * @param {jQuery} $wrapper
   */
  attach = function($wrapper: JQuery) {
    $wrapper.get(0).classList.add('h5p-interactive-text');
    $wrapper.get(0).appendChild(this.element);
  }  
}