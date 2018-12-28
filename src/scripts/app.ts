import * as $ from 'jquery';
import { InteractiveTextConfig } from './config';
import TextView from './text-view';

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
  constructor(private config: InteractiveTextConfig, private contentId: string, private contentData: any = {}) {
    super();
  }

  /**
   * Attach library to wrapper
   *
   * @param {jQuery} $wrapper
   */
  attach = function ($wrapper: JQuery) {
    $wrapper.get(0).classList.add('h5p-interactive-text');
    $wrapper.get(0).appendChild(TextView.create(H5P.jQuery, this.config));
  }
}