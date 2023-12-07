export class GetTrophies {
  public overview (): NodeListOf<HTMLElement> {
    return document.querySelectorAll('div.guide.overview a[href]');
  }

  public roadmap (earned: boolean): NodeListOf<HTMLElement> {
    let classes = 'div.roadmap-trophies div.trophy';
    if (earned) {
      classes = `${classes}.earned`;
    }

    return document.querySelectorAll(classes);
  }

  public section (earned: boolean): NodeListOf<HTMLElement> {
    let classes = 'table.zebra img.trophy';
    if (earned) {
      classes = `${classes}.earned`;
    }

    return document.querySelectorAll(classes);
  }

  public text (): NodeListOf<HTMLElement> {
    return document.querySelectorAll('.flex a:not(.icon-sprite.trophy)');
  }

  public tree (earned: boolean): NodeListOf<HTMLElement> {
    let classes = 'ul.tableofcontents > li.ellipsis';
    if (earned) {
      classes = `${classes}.earned`;
    }

    return document.querySelectorAll(classes);
  }
}
