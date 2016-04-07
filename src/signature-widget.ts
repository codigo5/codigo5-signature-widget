import Signature, {ISignatureOptions, SignatureTheme} from './signature';

export const VERSION = '1.2.0';

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
//
// TODO: I really didn't like the way I did it
// I'd like to expose to window more in the es6 way
// like `export * from './signature'`
(function(global) {
  global.signatureWidget = {
    VERSION: VERSION,
    bootstrap: bootstrap,
    Signature: Signature,
    SignatureTheme: SignatureTheme
  };
}(window['cod5'] = window['cod5'] || {}));
