export class BaseControl {
  node: HTMLElement;

  constructor(node: HTMLElement) {
    this.node = node;
  }

  public append(basePanel: BaseControl): BaseControl {
    this.node.append(basePanel.node);
    return this;
  }

  public appendAfter(basePanel: BaseControl): BaseControl {
    this.node.insertAdjacentElement("afterend", basePanel.node);
    return this;
  }

  public click(callback: (ev: MouseEvent) => any): BaseControl {
    this.node.addEventListener("click", callback);
    return this;
  }

  public contains(search: string, ignoreCasing?: boolean): boolean {
    return ignoreCasing === true
      ? this.node.innerHTML.toLowerCase().includes(search.toLowerCase())
      : this.node.innerHTML.includes(search);
  }

  public setAttribute(key: string, value: string): BaseControl {
    this.node.setAttribute(key, value);
    return this;
  }

  public setClass(..._class: string[]): BaseControl {
    this.node.setAttribute("class", _class.join(" "));
    return this;
  }

  public setId(id: string): BaseControl {
    this.node.setAttribute("id", id);
    return this;
  }

  public setInnerText(text: string): BaseControl {
    this.node.innerText = text;
    return this;
  }

  public setStyle(...style: string[]): BaseControl {
    this.node.setAttribute("style", style.join(";"));
    return this;
  }
}

export class TitleControl extends BaseControl {
    constructor(title: string) {
        super(document.createElement('div'));

        this
          .setClass('title-bar', 'flex', 'v-align')
          .append(new BaseControl(document.createElement('div'))
            .setClass('grow')
            .append(new BaseControl(document.createElement('h3'))
              .setInnerText(title)));
    }
}

export class PopupControl extends BaseControl {
    constructor() {
        super(document.createElement('div'));
        
        this
          .setId('facebox')
          .setStyle('top: 50px')
          .append(new BaseControl(document.createElement('div'))
            .setClass('popup')
            .append(new BaseControl(document.createElement('div'))
              .setClass('content')
              .append(new TitleControl('Plugin settings')))
            .append(new BaseControl(document.createElement('div'))
              .setId('loadingCover')
              .append(new BaseControl(document.createElement('center'))
                .setStyle('margin-top: 150px')
                .append(new BaseControl(document.createElement('div'))
                  .setClass('fancy-loader', 'dark', 'large'))))
            .append(new BaseControl(document.createElement('a'))
              .setClass('close')
              .setAttribute('href', '#')
              .click(_ => this.node.parentElement.remove())
              .append(new BaseControl(document.createElement('img'))
                .setAttribute('src', '/lib/img/layout/close.png')
                .setAttribute('title', 'close')
                .setClass('close_image'))))
    }
}

export class PopupOverlay extends BaseControl {
    constructor() {
        super(document.createElement('div'));

        this
          .setId('facebox_overlay')
          .setClass('facebox_hide', 'facebox_overlayBG')
          .setStyle('opacity: 0.5', 'display: block')
    }
}