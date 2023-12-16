import { BaseControl } from './base-control';

export class FormCheckboxControl extends BaseControl {
  control?: BaseControl;

  constructor (id: string, label: string, callback?: (ev: Event) => any, checked?: boolean) {
    super('label');

    this.control = new BaseControl('input')
      .setId(id)
      .setAttribute('type', 'checkbox');

    if (checked === true) {
      this.control.setAttribute('checked', 'checked');
    }

    if (callback !== undefined) {
      this.control.onChange(callback);
    }

    this
      .setClass('checkbox')
      .append(this.control)
      .append(new BaseControl('i'))
      .append(new BaseControl('span')
        .setInnerText(label));
  }

  public getValue (): boolean {
    return (this.control?.node as HTMLInputElement).checked;
  }
}
