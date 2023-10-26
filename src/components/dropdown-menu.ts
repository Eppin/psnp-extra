import { BaseControl, PopupControl, PopupOverlay } from "./base-control";

export class DropdownMenu {
  addSettingsButton(): void {
    this.getDropdownMenu().forEach((element) => {
      var node = new BaseControl(<HTMLElement>element);

      if (node.contains("Settings", true) === false) {
        return;
      }

      node.appendAfter(new BaseControl(document.createElement("li"))
        .append(new BaseControl(document.createElement("a"))
          .setInnerText("Plugin Settings")
          .setAttribute("href", "#")
          .click(_ => this.openPopup())));
    });
  }

  private getDropdownMenu(): NodeListOf<Element> {
    return document.querySelectorAll('div.user-menu > div.dropdown > ul.dropdown-menu > li');
  }

  private openPopup(): void {
    new BaseControl(document.getElementsByTagName('body')[0])
      .append(new BaseControl(document.createElement('div'))
        .append(new PopupControl())
        .append(new PopupOverlay()));
  }
}