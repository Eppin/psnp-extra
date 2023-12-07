import { type Guide } from '../../models/guide';

export class GetGuide {
  public async guide (): Promise<Guide | undefined> {
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

    const online = body.querySelectorAll('.invisible.tags .Connectivity').length > 0;

    let buggy = false;
    for (const status of body.querySelectorAll('.invisible.tags .Status')) {
      buggy = (status as HTMLElement).innerText.localeCompare('buggy', undefined, { sensitivity: 'accent' }) === 0;

      if (buggy) {
        break;
      }
    }

    return {
      trophyId: parseInt(trophyId),
      guideId: parseInt(guideId),

      difficulty: difficulty[0],
      difficultyColor: difficulty[1],

      playthrough: playthrough[0],
      playthroughColor: playthrough[1],

      hours: hours[0],
      hoursColor: hours[1],

      online,
      buggy
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
}
