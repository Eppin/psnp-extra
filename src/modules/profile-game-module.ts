import { BaseControl } from '../components/base-control';
import { type Game } from '../models/game';
import { type Guide } from '../models/guide';
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

        this.storageModule.save(gamesKey, game, (s, i) => s.trophyId === i.trophyId);
      }
    }
  }

  public setGuides (): void {
    const elements = document.querySelectorAll('#gamesTable > tbody a.title');

    for (const element of elements) {
      const href = element.attributes.getNamedItem('href');

      if (href === null) {
        continue;
      }

      const gameId = /(\d+)/.exec(href.value);
      if (gameId === null) {
        continue;
      }

      const guides = this.storageModule.get<Guide>(guidesKey, (g) => g.trophyId === parseInt(gameId[0]));
      if (guides.length === 0) {
        continue;
      }

      const gameTitle = element.parentElement?.parentElement;
      if (gameTitle == null) {
        console.warn('Couldn\'t find line which contains \'x of y Trophies\'', gameId[0]);
        continue;
      }

      new BaseControl(gameTitle)
        .appendAfter(new BaseControl('div')
          .setClass('small-info')
          .setStyle('margin-top: 4px;')
          .append(new BaseControl('a')
            .setAttribute('href', `/guide/${guides[0].guideId}`)
            .append(this.guideElement(`${guides[0].difficulty}/10`, guides[0].difficultyColor))
            .append(' ')
            .append(this.guideElement(`${guides[0].playthrough}x`, guides[0].playthroughColor))
            .append(' ')
            .append(this.guideElement(`${guides[0].hours}h`, guides[0].hoursColor))));
    }
  }

  private guideElement (value: string, color: string): BaseControl {
    return new BaseControl('span')
      .setInnerText(value)
      .setStyle(color, 'color: #fff', 'padding: 0 2px', 'border-radius: 2px');
  }
}
