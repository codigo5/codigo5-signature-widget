import UrlBuilder, {IUrlBuilder} from './url-builder';
import Host, {IHost} from './host';
import {objectAssign} from './utils';

export interface ISignatureOptions {
  cdnBaseUrl: string;
  theme: SignatureTheme;
  logoWidth: number | string;
  logoHeight: number | string;
}

export enum SignatureTheme {
  dark,
  light
}

export const SIGNATURE_URL: string = 'http://www.codigo5.com.br/';

export default class Signature {
  public static defaultOptions: ISignatureOptions = {
    cdnBaseUrl: '',
    theme: SignatureTheme.light,
    logoWidth: 130,
    logoHeight: 'auto'
  };

  constructor(
    private element: HTMLElement,
    private options: ISignatureOptions,
    private urlBuilder: IUrlBuilder
  ) {
    this.options = objectAssign({}, Signature.defaultOptions, options);
    this.render();
  }

  get locationUrl(): string {
    return this.urlBuilder.url;
  }

  get logoUrl(): string {
    return `${this.options.cdnBaseUrl}/resources/codigo5-logo-for-${this.theme}-theme.png`;
  }

  get theme(): string {
    if (typeof this.options.theme === 'string') {
      return this.options.theme.toString();
    } else {
      return SignatureTheme[this.options.theme];
    }
  }

  render(): void {
    this.element.innerHTML = this.toString();
  }

  toString(): string {
    return `
      <div class="codigo5-signature-widget is-${this.theme}">
        <span class="codigo5-signature-widget__description">Desenvolvido e Hospedado por</span>
        <a href="${this.locationUrl}" title="Desenvolvido e Hospedado por Código5" target="_blank">
          <img src="${this.logoUrl}" class="codigo5-signature-widget__logo" width="${this.options.logoWidth}" height="${this.options.logoHeight}" alt="Código5">
        </a>
      </div>
    `;
  }
}
