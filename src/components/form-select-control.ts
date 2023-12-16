import { BaseControl } from './base-control';

export class FormSelectControl extends BaseControl {
  control?: BaseControl;

  constructor (id: string, label: string, callback?: (ev: Event) => any, fullRow: boolean = false) {
    super('div');

    this.control = new BaseControl('select')
      .setId(id);

    if (callback !== undefined) {
      this.control.onChange(callback);
    }

    this.setClass('row', 'middle-xs')
      .append(new BaseControl('div')
        .setClass(fullRow ? 'col-xs-12' : 'col-xs-6')
        .append(new BaseControl('label')
          .setClass('select')
          .append(this.control)
          .append(new BaseControl('i'))));

    if (!fullRow) {
      this.append(new BaseControl('div')
        .setClass('col-xs-6')
        .append(new BaseControl('span')
          .setClass('small-title')
          .setInnerText(label)));
    }
  }

  public getValue (): string | null {
    if (this.control === undefined) {
      return null;
    }

    return (this.control.node as HTMLSelectElement).value;
  }

  public addOption (id: string, value: string, selected: boolean = false): FormSelectControl {
    const control = new BaseControl('option')
      .setAttribute('value', id)
      .setInnerText(value);

    if (selected) {
      control.setAttribute('selected', 'selected');
    }

    this.control?.append(control);
    return this;
  }
}
