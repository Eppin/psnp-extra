import { fetchBody } from '../../extensions/fetch-body';
import { type GuideOverview } from '../../models/guide-overview';

export class GetGuides {
  public async guides (guideUrl: string): Promise<GuideOverview[] | undefined> {
    const body = await fetchBody(guideUrl);

    if (body === undefined) {
      return;
    }

    const guides: GuideOverview[] = [];

    body.querySelectorAll('.page > .row').forEach((e) => {
      const type = (e.previousElementSibling as HTMLElement)?.innerText;

      e.querySelectorAll('.guide-page-info').forEach((info) => {
        const url = info.querySelector('a')?.attributes.getNamedItem('href')?.value;
        const title = (info.querySelector('.ellipsis > span') as HTMLElement)?.innerText;
        const background = info.querySelector('.background')?.attributes.getNamedItem('style')?.value;
        const author = (info.querySelector('.ellipsis.author') as HTMLElement)?.innerText.trim();

        const stats = info.querySelectorAll('.stats.row > .stat');

        const favorites = stats[0].firstChild?.nodeValue;
        const rating = stats[1].children[0].attributes.getNamedItem('class')?.value;
        const ratings = (stats[1].children[1] as HTMLElement)?.innerText.trim();
        const views = stats[2].firstChild?.nodeValue;

        if (url === undefined || background === undefined || favorites === undefined || favorites === null || rating === undefined || views === undefined || views === null) {
          console.warn('Some properties of the guide are null or empty');
          return;
        }

        guides.push({ type, url, title, background, author, favorites, rating, ratings, views });
      });
    });

    return guides;
  }
}
