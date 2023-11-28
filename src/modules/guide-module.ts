import { BaseControl, TitleControl } from '../components/base-control';
import { FormCheckboxControl } from '../components/form-checkbox-control';
import { FormControl } from '../components/form-control';
import { GuideCheckableControl } from '../components/guide-checkable';
import { type Guide } from '../models/guide';

export class GuideModule {
  public async getGuide (): Promise<Guide | undefined> {
    const trophyId = /(\d+)/.exec(window.location.href)?.[0];

    if (trophyId === undefined) {
      console.error('Unable to determine trophy ID from URL');
      return;
    }

    const guideUrl = document
      .querySelector('.guide-page-info > a')
      ?.attributes.getNamedItem('href')?.value;

    if (guideUrl === undefined) {
      console.debug('Couldn\'t find a linked guide');
      return;
    }

    const guideId = /(\d+)/.exec(guideUrl)?.[0];

    if (guideId === undefined) {
      console.debug('Unable to determine guide ID from URL');
      return;
    }

    const body = await this.getGuideBody(guideUrl);

    if (body === undefined) {
      return;
    }

    const overview = body.querySelectorAll('.overview-info > .tag > .typo-top');

    const difficulty = this.getOverviewElement(overview, 0);
    const playthrough = this.getOverviewElement(overview, 1);
    const hours = this.getOverviewElement(overview, 2);

    return {
      trophyId: parseInt(trophyId),
      guideId: parseInt(guideId),

      difficulty: difficulty[0],
      difficultyColor: difficulty[1],

      playthrough: playthrough[0],
      playthroughColor: playthrough[1],

      hours: hours[0],
      hoursColor: hours[1]
    };
  }

  private getOverviewElement (elements: NodeListOf<Element>, index: number): [number, string] {
    if (elements.length - 1 < index) {
      throw new Error(`Invalid index given ${elements.length} > ${index}`);
    }

    const value = parseInt(elements[index].innerHTML);
    const valueColor = elements[index].parentElement?.attributes.getNamedItem('style')?.value ?? 'background-color: #7393B3';

    return [ value, valueColor ];
  }

  private async getGuideBody (url: string): Promise<HTMLElement | undefined> {
    const response = await fetch(url);

    if (!response.ok) {
      console.error('Unable to retrieve guide document', url);
      return undefined;
    }

    return new DOMParser()
      .parseFromString(await response.text(), 'text/html')
      .body;
  }

  public addSettings (): void {
    const element = document.querySelector('.game-image-holder + .box') as HTMLElement;
    new BaseControl(element)
      .appendAfter(new TitleControl('Settings'))
      .next()
      .appendAfter(new FormControl()
        .add(new FormCheckboxControl('psnp-e-hide-earned', 'Hide earned trophies', (e) => { this.changeEarned((e.target as HTMLInputElement).checked); })));
  }

  public makeCheckable (): void {
    const guideId = /(\d+)/.exec(window.location.href)?.[0];

    if (guideId === undefined) {
      console.error('Unable to determine guide ID from URL');
      return;
    }

    const lists = '#content ul > li';
    const tables = '#content table > tbody > tr';

    document.querySelectorAll(`${lists}, ${tables}`)
      .forEach((element, index) => {
        const guideCheckableControl = new GuideCheckableControl(element as HTMLElement, parseInt(guideId), index);
        guideCheckableControl.load();
      });
  }

  public changeEarned (hide: boolean): void {
    // Earned trophies
    const trophyUrls: string[] = [];

    document.querySelectorAll('img.trophy.earned').forEach((e) => {
      const parent = this.findParent(e as HTMLElement, ':not(.box).section-holder');
      const sectionId = parent?.firstElementChild?.id;

      if (sectionId !== undefined) {
        trophyUrls.push(sectionId);
      }
    });

    // Overview
    document.querySelectorAll('div.guide.overview a[href]').forEach((e) => {
      if (trophyUrls.some((t) => e.attributes.getNamedItem('href')?.value.includes(t))) {
        if (hide) {
          e.setAttribute('style', 'display:none');
        } else if (e != null) {
          (e as HTMLElement).style.display = '';
        }
      }
    });

    // Roadmap
    document.querySelectorAll('div.trophy.earned').forEach((e) => {
      const parent = this.findParent(e as HTMLElement, '.col-xs-6, .col-xs-12');

      if (hide) {
        parent?.setAttribute('style', 'display:none');
      } else if (parent != null) {
        parent.style.display = '';
      }
    });

    // Section
    document.querySelectorAll('img.trophy.earned').forEach((e) => {
      const parent = this.findParent(e as HTMLElement, ':not(.box).section-holder');

      if (hide) {
        parent?.setAttribute('style', 'display:none');
      } else if (parent != null) {
        parent.style.display = '';
      }
    });

    // Text
    document.querySelectorAll('a:not(icon-sprite.trophy)').forEach((e) => {
      if (trophyUrls.some((t) => e.attributes.getNamedItem('href')?.value.includes(t))) {
        if (hide) {
          e.classList.add('psnp-e-checked');
        } else {
          e.classList.remove('psnp-e-checked');
        }
      }
    });

    // Tree
    document
      .querySelectorAll('ul.tableofcontents > li.ellipsis.earned')
      .forEach((e) => {
        if (hide) {
          e?.setAttribute('style', 'display:none');
        } else if (e != null) {
          (e as HTMLElement).style.display = '';
        }
      });
  }

  private findParent (element: HTMLElement, query: string): HTMLElement | null {
    while (true) {
      if (element.parentElement?.querySelector(query) != null) {
        return element;
      }

      if (element.parentElement == null) {
        return null;
      }

      element = element.parentElement;
    }
  }
}
