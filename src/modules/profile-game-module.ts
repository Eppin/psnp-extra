import { BaseControl } from '../components/base-control';
import { StorageModule } from './storage-module';

export class ProfileGameModule {
  private readonly storageModule: StorageModule;

  constructor () {
    this.storageModule = new StorageModule();
  }

  getList (): string[] {
    const elements = document.querySelectorAll('#gamesTable > tbody a.title');

    const games: string[] = [];
    for (const element of elements) {
      const href = element.attributes.getNamedItem('href');

      if (href === null) {
        continue;
      }

      const gameId = /(\d+)/.exec(href.value);
      if (gameId !== null) {
        games.push(gameId[0]);
      }
    }

    return games;
  }

  setGuides (): void {
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

      const guides = this.storageModule.getGuides(parseInt(gameId[0]));
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
