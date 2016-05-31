import {IHost} from './host';
import {VERSION} from './signature-widget';
import {SIGNATURE_URL} from './signature';

// Do get this property on the fly
// because sometimes the title can
// change without full reload the
// current page
export interface IUrlBuilder {
  url: string;
  utmSource: string;
  utmMedium: string;
}

export default class UrlBuilder implements IUrlBuilder {
  constructor(private host: IHost) { }

  get url(): string {
    return (<any>window).encodeURI(`${SIGNATURE_URL}?utm_source=${this.utmSource}&utm_medium=${this.utmMedium}`);
  }

  get utmSource(): string {
    return `${this.host.title} (${this.host.hostname})`;
  }

  get utmMedium(): string {
    return `Código5 Signature Widget v${VERSION}`;
  }
}
