import UrlBuilder, {IUrlBuilder} from './url-builder';
import Host, {IHost} from './host';
import {objectAssign} from './utils';

export interface ISignatureOptions {
  cdnBaseUrl: string;
  theme: SignatureTheme;
  logoWidth: number;
  logoHeight: number;
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
    logoWidth: 200,
    logoHeight: 35
  };

  private _options: ISignatureOptions;

  private _host: IHost;

  private _urlBuilder: IUrlBuilder;

  constructor(private _element: HTMLElement, options: ISignatureOptions) {
    this._options = objectAssign({}, Signature.defaultOptions, options);
    this._host = new Host(window.document);
    this._urlBuilder = new UrlBuilder(this._host);
    this.render();
  }

  get locationUrl(): string {
    return this._urlBuilder.url;
  }

  get logoUrl(): string {
    return `${this._options.cdnBaseUrl}/resources/codigo5-logo-for-${this.theme}-theme.png`;
  }

  get theme(): string {
    if (typeof this._options.theme === 'string') {
      return this._options.theme.toString();
    } else {
      return SignatureTheme[this._options.theme];
    }
  }

  render(): void {
    this._element.innerHTML = this.toString();
  }

  toString(): string {
    return `
      <div class="codigo5-signature-widget is-${this.theme}">
        <span class="codigo5-signature-widget__description">Desenvolvido e Hospedado por</span>
        <a href="${this.locationUrl}" title="Desenvolvido e Hospedado por Código5" target="_blank">
          <img src="${this.logoUrl}" class="codigo5-signature-widget__logo" width="${this._options.logoWidth}" height="${this._options.logoHeight}" alt="Código5">
        </a>
      </div>
    `;
  }
}
