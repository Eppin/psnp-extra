import { BaseControl } from './base-control';

export class FormButtonControl extends BaseControl {
  control?: BaseControl;

  left?: BaseControl;
  center?: BaseControl;
  right?: BaseControl;

  constructor (label: string, color: string, callback: (ev: Event) => any) {
    super('a');

    this.setAttribute('href', '#')
      .setClass('button', color)
      .click((e) => this.clickCallback(e, callback))
      .setInnerText(label);
  }

  private clickCallback (event: Event, callback: (ev: Event) => any): any {
    callback(event);
    event.preventDefault();
  }
}
