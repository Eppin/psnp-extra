import { BaseControl, PopupControl, PopupOverlay } from './base-control';

export class DropdownMenu {
  addSettingsButton (): void {
    this.getDropdownMenu().forEach((element) => {
      const node = new BaseControl((element as HTMLElement));

      if (!node.contains('Settings', true)) {
        return;
      }

      node.appendAfter(new BaseControl('li')
        .append(new BaseControl('a')
          .setInnerText('Plugin Settings')
          .setAttribute('href', '#')
          .click((_) => { this.openPopup(); })));
    });
  }

  private getDropdownMenu (): NodeListOf<Element> {
    return document.querySelectorAll('div.user-menu > div.dropdown > ul.dropdown-menu > li');
  }

  private openPopup (): void {
    new BaseControl(document.getElementsByTagName('body')[0])
      .append(new BaseControl('div')
        .append(new PopupControl())
        .append(new PopupOverlay()));
  }
}
