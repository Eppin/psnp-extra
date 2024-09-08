import { BaseControl } from '../components/base-control';
import { stringToExtra } from '../extensions/string-extra';
import { Extra } from '../models/extra';
import { type Game } from '../models/game';
import { Guide } from '../models/guide';
import { Guides } from '../models/guides';
import { Platform } from '../models/platform';
import { gamesKey, guidesKey } from './storage/storage-keys';
import { StorageModule } from './storage/storage-module';

export class ProfileGameModule {
  private readonly storageModule: StorageModule;

  constructor () {
    this.storageModule = new StorageModule();
  }

  public setGames (): void {
    const elements = document.querySelectorAll('#gamesTable > tbody tr');

    for (const element of elements) {
      const platforms: Platform[] = [];

      for (const platform of element.querySelectorAll('td span.tag.platform')) {
        switch ((platform as HTMLElement).innerText.toUpperCase()) {
          case 'VITA':
            platforms.push(Platform.PSVita);
            break;

          case 'PS3':
            platforms.push(Platform.PS3);
            break;

          case 'PS4':
            platforms.push(Platform.PS4);
            break;

          case 'PS5':
            platforms.push(Platform.PS5);
            break;
        }
      }

      const gameElement = element.querySelectorAll('td:nth-child(2)');

      for (const element of gameElement) {
        const link = element.querySelector('a.title');
        if (link === null) {
          continue;
        }

        const href = link.attributes.getNamedItem('href');

        if (href === null) {
          continue;
        }

        const gameId = /(\d+)/.exec(href.value);
        if (gameId === null) {
          continue;
        }

        const lastTrophyStr = element.querySelector('div:last-child');
        const lastTrophySanitized = (lastTrophyStr as HTMLElement).innerText
          .split('•')[0]
          .replace('st', '')
          .replace('nd', '')
          .replace('rd', '')
          .replace('th', '');
        const lastTrophy = new Date(lastTrophySanitized);

        if (isNaN(lastTrophy.getTime())) {
          continue;
        }

        const game: Game = {
          trophyId: parseInt(gameId[0]),
          title: (link as HTMLElement).innerText,
          url: href.value,
          lastTrophy,
          platforms
        };

        this.storageModule.append(gamesKey, game, (s, i) => s.trophyId === i.trophyId);
      }
    }
  }

  public setGuides (): void {
    const elements = document.querySelectorAll('#gamesTable > tbody tr');

    if (elements.length === 0) {
      console.warn('Unable to find list of games');
      return;
    }

    const guides = this.storageModule.get<Guides>(guidesKey)?.guides;
    if (guides === undefined) {
      console.warn('Guides aren\t cached, skipping');
      return;
    }

    for (const element of elements) {
      const href = element.querySelector('a.title')?.attributes.getNamedItem('href')?.value;

      if (href === undefined) {
        continue;
      }

      const trophyId = /(\d+)/.exec(href);
      if (trophyId === null) {
        continue;
      }

      const platform = (element.querySelector('.platforms > .tag.platform') as HTMLElement).innerText;
      const guide = this.findGuide(guides, parseInt(trophyId[0]), platform);

      if (guide === undefined) {
        continue;
      }

      const gameTitle = element.querySelector('.small-info') as HTMLElement;
      if (gameTitle == null) {
        console.warn('Couldn\'t find line which contains \'x of y Trophies\'', trophyId[0]);
        continue;
      }

      new BaseControl(gameTitle)
        .appendAfter(new BaseControl('div')
          .setClass('small-info')
          .setStyle('margin-top: 4px;')
          .append(new BaseControl('a')
            .setAttribute('href', `/guide/${guide.id}`)
            .append(this.guideElement(`${guide.view[0]}/10`, `psnp-e-difficulty-${guide.view[0]}`))
            .append(' ')
            .append(this.guideElement(`${guide.view[1]}x`, this.getPlaythroughClass(guide.view[1])))
            .append(' ')
            .append(this.guideElement(`${guide.view[2]}h`, this.getHourClass(guide.view[2])))
          ));
    }
  }

  private guideElement (value: string, classColor: string): BaseControl {
    return new BaseControl('span')
      .setInnerText(value)
      .setClass(classColor)
      .setStyle('color: #fff', 'padding: 0 2px', 'border-radius: 2px');
  }

  private findGuide (guides: Guide[], trophyId: number, platform: string): Guide | undefined {

    const parsedPlatform = stringToExtra(platform);
    if (parsedPlatform === undefined)
      return undefined;

    // Try to find a guide by trophy ID, platform and guide type
    let guide = guides.find((g) => g.trophy.some((t) => t === trophyId) && ((g.extra & parsedPlatform) as Extra) === parsedPlatform && ((g.extra & Extra.Trophy) as Extra) === Extra.Trophy);

    // If nothing found, then searching by platform
    if (guide === undefined) {
      guide = guides.find((g) => g.trophy.some((t) => t === trophyId) && ((g.extra & Extra.Trophy) as Extra) === Extra.Trophy);
    }

    return guide;
  }

  private getPlaythroughClass(playthrough: number): string {
    const colorIndex = playthrough < 5 ? playthrough : 5;
    return `psnp-e-playthrough-${colorIndex}`;
  }

  private getHourClass(hour: number): string {
    // Largest possible color value
    let colorIndex = 10;

    if (hour < 10) {
      colorIndex = 1;
    } else if (hour < 20) {
      colorIndex = 2;
    } else if (hour < 30) {
      colorIndex = 3;
    } else if (hour < 40) {
      colorIndex = 4;
    } else if (hour < 50) {
      colorIndex = 5;
    } else if (hour < 60) {
      colorIndex = 6;
    } else if (hour < 70) {
      colorIndex = 7;
    } else if (hour < 80) {
      colorIndex = 8;
    } else if (hour < 90) {
      colorIndex = 9;
    }

    return `psnp-e-hour-${colorIndex}`;
  }
}
