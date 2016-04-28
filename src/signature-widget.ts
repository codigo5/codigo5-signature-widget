import Signature, {ISignatureOptions, SignatureTheme} from './signature';
import {objectAssign} from './utils';

export const VERSION = '1.4.0';

export const DEFAULT_OPTIONS = {
  cdnBaseUrl: 'https://cdn.codigo5.com.br/signature',
  selector: '.codigo5-signature-widget-wrapper',
  autoLoadDeps: true
};

export interface ISignatureWidgetOptions extends ISignatureOptions {
  cdnBaseUrl: string;
  selector: string;
  autoLoadDeps: boolean;
}

var depsLoaded = false;

const loadDeps = (options: ISignatureWidgetOptions) => {
  if (!depsLoaded) {
    let stylesheet: HTMLLinkElement = document.createElement('link');
    stylesheet.rel = 'stylesheet';
    stylesheet.type = 'text/css';
    stylesheet.href = `${options.cdnBaseUrl}/signature-widget.min.css`;

    // append them
    document.querySelector('head').appendChild(stylesheet);
  }
};

export default function bootstrap(_options: ISignatureWidgetOptions) {
  const options = objectAssign({}, DEFAULT_OPTIONS, _options);
  const traverseElements = () => {
    // TODO: We could use ES6 babel polyfill, right? `Array.from`
    Array.prototype.slice.apply(document.querySelectorAll(options.selector))
      .forEach((element: any) => element.cod5Signature = element.cod5Signature || new Signature(element, options));
  };

  if (options.autoLoadDeps) {
    loadDeps(options);
  }

  if (document.readyState === 'complete') {
    traverseElements();
  } else {
    document.addEventListener('DOMContentLoaded', traverseElements);
  }
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
