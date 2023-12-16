import { BaseControl } from './base-control';
import { type FormButtonControl } from './form-button-control';

export class FormButtonGroupControl extends BaseControl {
  constructor () {
    super('div');

    this.setClass('row', 'middle-xs');
  }

  public addMultipleButtons (left?: FormButtonControl, right?: FormButtonControl): FormButtonGroupControl {
    this.addButton(left);
    this.addButton(right);

    return this;
  }

  public addSingleButton (center: FormButtonControl): FormButtonGroupControl {
    this.addButton(center, true);
    return this;
  }

  private addButton (button?: FormButtonControl, single: boolean = false): void {
    const baseButton = new BaseControl('div').setClass(single ? 'col-xs-12' : 'col-xs-6');

    if (button !== undefined) {
      baseButton.append(button);
    }

    this.append(baseButton);
  }
}
