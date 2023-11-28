import { BaseControl } from './base-control';
import { type FormCheckboxControl } from './form-checkbox-control';

export class FormControl extends BaseControl {
  controls: BaseControl[] = [];

  constructor () {
    super('div');

    this
      .setClass('box', 'no-top-border', 'form')
      .setStyle('padding: 10px', 'margin-bottom: 10px');
  }

  public add (control: FormCheckboxControl): FormControl {
    this.append(control);
    return this;
  }
}
