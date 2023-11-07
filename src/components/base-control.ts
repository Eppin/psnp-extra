export class BaseControl {
  node: HTMLElement;

  constructor (node: HTMLElement | string) {
    if (typeof node === 'string') {
      this.node = document.createElement(node);
    } else {
      this.node = node;
    }
  }

  public append (basePanel: BaseControl | string): BaseControl {
    if (typeof basePanel === 'string') {
      this.node.append(basePanel);
    } else {
      this.node.append(basePanel.node);
    }

    return this;
  }

  public appendAfter (basePanel: BaseControl): BaseControl {
    this.node.insertAdjacentElement('afterend', basePanel.node);
    return this;
  }

  public click (callback: (ev: MouseEvent) => any): BaseControl {
    this.node.addEventListener('click', callback);
    return this;
  }

  public contains (search: string, ignoreCasing?: boolean): boolean {
    return ignoreCasing === true
      ? this.node.innerHTML.toLowerCase().includes(search.toLowerCase())
      : this.node.innerHTML.includes(search);
  }

  public setAttribute (key: string, value: string): BaseControl {
    this.node.setAttribute(key, value);
    return this;
  }

  public setClass (..._class: string[]): BaseControl {
    _class.forEach((c) => { this.node.classList.add(c); });
    return this;
  }

  public removeClass (style: string): BaseControl {
    this.node.classList.remove(style);
    return this;
  }

  public setId (id: string): BaseControl {
    this.node.setAttribute('id', id);
    return this;
  }

  public setInnerText (text: string): BaseControl {
    this.node.innerText = text;
    return this;
  }

  public setStyle (...style: string[]): BaseControl {
    this.node.setAttribute('style', style.join(';'));
    return this;
  }
}

export class TitleControl extends BaseControl {
  constructor (title: string) {
    super('div');

    this
      .setClass('title-bar', 'flex', 'v-align')
      .append(new BaseControl('div')
        .setClass('grow')
        .append(new BaseControl('h3')
          .setInnerText(title)));
  }
}

export class PopupControl extends BaseControl {
  constructor () {
    super('div');

    this
      .setId('facebox')
      .setStyle('top: 50px')
      .append(new BaseControl('div')
        .setClass('popup')
        .append(new BaseControl('div')
          .setClass('content')
          .append(new TitleControl('Plugin settings')))
        .append(new BaseControl('div')
          .setId('loadingCover')
          .append(new BaseControl('center')
            .setStyle('margin-top: 150px')
            .append(new BaseControl('div')
              .setClass('fancy-loader', 'dark', 'large'))))
        .append(new BaseControl('a')
          .setClass('close')
          .setAttribute('href', '#')
          .click((_) => this.node.parentElement?.remove())
          .append(new BaseControl('img')
            .setAttribute('src', '/lib/img/layout/close.png')
            .setAttribute('title', 'close')
            .setClass('close_image'))));
  }
}

export class PopupOverlay extends BaseControl {
  constructor () {
    super(document.createElement('div'));

    this
      .setId('facebox_overlay')
      .setClass('facebox_hide', 'facebox_overlayBG')
      .setStyle('opacity: 0.5', 'display: block');
  }
}
