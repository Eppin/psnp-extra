import { BaseControl } from '../components/base-control';
import { fetchBody } from '../extensions/fetch-body';
import { sleep } from '../extensions/sleep';
import { stringEquals } from '../extensions/string-equals';
import { type GuideOverview } from '../models/guide-overview';
import { GetGuides } from './guide/get-guides';
import { GetTrophies } from './guide/get-trophies';

export class TrophyModule {
  private readonly getGuides: GetGuides;
  private readonly getTrophies: GetTrophies;

  constructor () {
    this.getGuides = new GetGuides();
    this.getTrophies = new GetTrophies();
  }

  public async getGuide (): Promise<void> {
    if (document.querySelector('.guide-page-info') !== null) {
      console.log('Page already contains trophy information');
      return;
    }

    let guideUrl: undefined | string;
    document.querySelectorAll('ul.navigation > li > a').forEach((e) => {
      const html = e as HTMLElement;

      if (stringEquals(html.innerText, 'Guides')) {
        const href = e.attributes.getNamedItem('href');

        if (href !== null) {
          guideUrl = href.value;
        }
      }
    });

    if (guideUrl === undefined) {
      console.warn('Unable to find guide URL');
      return;
    }

    const trophyName = (document.querySelector('.title') as HTMLElement)?.innerText;
    if (trophyName === null) {
      console.warn('Trophy not found');
      return;
    }

    const guides = await this.getGuides.guides(guideUrl);

    if (guides === undefined) {
      console.warn('Unable to find guides');
      return;
    }

    const sleepDelay = guides.length > 4 ? 750 : 250;

    for (const guide of guides) {
      const body = await fetchBody(guide.url);

      if (body !== undefined) {
        const description = this.getTrophies.descriptions(body).filter((e) => stringEquals(e.title, trophyName));

        if (description.length === 1) {
          const boxZebra = document.querySelector('#trophyTips');

          if (boxZebra === null) {
            console.warn('Couldn\t find tips block');
            return;
          }

          // Recreate document, to be able to split the innerHTML
          const guideDocument = document
            .createRange()
            .createContextualFragment(description[0].body.innerHTML)
            .children;

          // If there are no tags, the first block will contain the description
          const tagsOrContent = guideDocument[0] as HTMLElement;
          const content = guideDocument[1] as HTMLElement;

          const guideBlock = new BaseControl(boxZebra as HTMLElement)
            .append(this.buildGuideInfoBar(guide))
            .append(new BaseControl(tagsOrContent));

          if (content !== undefined) {
            guideBlock.append(new BaseControl(content));
          }

          this.prepareSpoilers();
          this.lazyYT();

          return;
        }
      }

      /* Be nice and avoid getting 429 - too many requests error */
      await sleep(sleepDelay);
    }
  }

  private buildGuideInfoBar (guide: GuideOverview): BaseControl {
    return new BaseControl('div')
      .setClass('cf')
      .append(new BaseControl('div')
        .setClass('guide-page-info', 'sm')
        .setStyle('margin-bottom: 0')
        .append(new BaseControl('a')
          .setAttribute('href', guide.url)
          .append(new BaseControl('div')
            .setClass('background')
            .setStyle(guide.background)
            .append(new BaseControl('div')
              .setClass('shade')
              .setStyle('text-align: left')
              .append(new BaseControl('div')
                .setClass('flex', 'v-align')
                .append(new BaseControl('div')
                  .setClass('grow')
                  .append(new BaseControl('h3')
                    .setClass('ellipsis')
                    .append(new BaseControl('span')
                      .setInnerText(guide.title)))
                  .append(new BaseControl('div')
                    .setClass('info')
                    .append(new BaseControl('span')
                      .setStyle('line-clamp', 'two')
                      .setInnerText(`${guide.author}`))))
                .append(new BaseControl('div')
                  .setClass('no-shrink')
                  .append(new BaseControl('div')
                    .setClass('flex')
                    .append(new BaseControl('div')
                      .append(new BaseControl('center')
                        .setStyle('padding: 0 10px 0 10px', 'border-right:1px solid rgba(255,255,255,.3)')
                        .append(new BaseControl('span')
                          .setClass(...guide.rating.split(' ')))
                        .append(new BaseControl('br'))
                        .append(new BaseControl('span')
                          .setClass('typo-bottom')
                          .setInnerText(guide.ratings))))
                    .append(new BaseControl('div')
                      .append(new BaseControl('center')
                        .setStyle('padding: 0 10px 0 10px', 'border-right:1px solid rgba(255,255,255,.3)')
                        .append(new BaseControl('span')
                          .setClass('typo-top')
                          .setInnerText(guide.views))
                        .append(new BaseControl('br'))
                        .append(new BaseControl('span')
                          .setClass('typo-bottom')
                          .setInnerText('Views'))))
                    .append(new BaseControl('div')
                      .append(new BaseControl('center')
                        .setStyle('padding: 0 10px 0 10px')
                        .append(new BaseControl('span')
                          .setClass('typo-top')
                          .setInnerText(guide.favorites))
                        .append(new BaseControl('br'))
                        .append(new BaseControl('span')
                          .setClass('typo-bottom')
                          .setInnerText('Favorites')))))))))));
  }

  private prepareSpoilers (): void {
    // Little hack, to be able to call 'prepareSpoilers'
    const prepareSpoilers = document.createElement('script');
    prepareSpoilers.id = 'prepareSpoilers';
    prepareSpoilers.innerText = 'prepareSpoilers();';
    document.body.appendChild(prepareSpoilers);
  }

  private lazyYT (): void {
    // Little hack, to be able to call 'lazyYT'
    const lazyYT = document.createElement('script');
    lazyYT.id = 'lazyYT';
    lazyYT.innerText = '$(\'.lazyYT\').lazyYT();';
    document.body.appendChild(lazyYT);
  }
}
