import UrlBuilder, {IUrlBuilder} from './url-builder';
import Host, {IHost} from './host';

export interface ISignatureOptions {
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
    theme: SignatureTheme.light,
    logoWidth: 200,
    logoHeight: 49
  };

  private _options: ISignatureOptions;

  private _host: IHost;

  private _urlBuilder: IUrlBuilder;

  constructor(private _element: HTMLElement, options: ISignatureOptions) {
    this._options = Object.assign({}, Signature.defaultOptions, options);
    this._host = new Host(window.document);
    this._urlBuilder = new UrlBuilder(this._host);
    this.render();
  }

  get locationUrl(): string {
    return this._urlBuilder.url;
  }

  get logoUrl(): string {
    return `https://cdn.rawgit.com/codigo5/codigo5-signature-widget/master/resources/codigo5-logo-for-${this.theme}-theme.png`;
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
        <a href="${this.locationUrl}" target="_blank" class="codigo5-signature-widget__logo">
          <img src="${this.logoUrl}" width="${this._options.logoWidth}" height="${this._options.logoHeight}" />
        </a>
      </div>
    `;
  }
}
