import Signature, {ISignatureOptions} from './signature';

export const VERSION = '1.0.0';

export interface ISignatureWidgetOptions extends ISignatureOptions {
  selector: string;
}

export default function bootstrap(_options: ISignatureWidgetOptions) {
  const options = Object.assign({ selector: '.codigo5-signature-widget-wrapper' }, _options);

  // TODO: We could use ES6 babel polyfill, right? `Array.from`
  Array.prototype.slice.apply(document.querySelectorAll(options.selector))
    .forEach((element: any) => element.cod5Signature = element.cod5Signature || new Signature(element, options));
}

// Expose globally
window['Codigo5'] = window['Codigo5'] || {};

window['Codigo5'].signatureWidget = {
  VERSION: VERSION,
  bootstrap: bootstrap
};
