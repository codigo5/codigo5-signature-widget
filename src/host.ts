// Do get this property on the fly
// because sometimes the title can
// change without full reload the
// current page
export interface IHost {
  title: string;
  hostname: string;
}

export default class Host implements IHost {
  hostname: string;
  
  constructor(private _document: Document) {
    this.hostname = this._document.location.hostname;
  }

  get title(): string {
    return this._document.title;
  }
}
