import { BaseControl } from './base-control';
import { type FormButtonGroupControl } from './form-button-group-control';
import { type FormCheckboxControl } from './form-checkbox-control';
import { type FormSelectControl } from './form-select-control';

export class FormControl extends BaseControl {
  controls: BaseControl[] = [];

  constructor () {
    super('div');

    this
      .setClass('box', 'no-top-border', 'form')
      .setStyle('padding: 10px', 'margin-bottom: 10px');
  }

  public add (control: FormCheckboxControl | FormSelectControl | FormButtonGroupControl): FormControl {
    this.append(control);
    return this;
  }
}
