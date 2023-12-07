import { BaseControl, TitleControl } from '../../components/base-control';
import { FormButtonControl } from '../../components/form-button-control';
import { FormButtonGroupControl } from '../../components/form-button-group-control';
import { FormControl } from '../../components/form-control';
import { FormSelectControl } from '../../components/form-select-control';
import { findParent } from '../../extensions/html-element';
import { platformToString } from '../../extensions/platform';
import { type Game } from '../../models/game';
import { gamesKey } from '../storage/storage-keys';
import { StorageModule } from '../storage/storage-module';
import { GetTrophies } from './get-trophies';

export class TrophyLoader {
  private readonly storageModule: StorageModule;
  private readonly getTrophies: GetTrophies;

  constructor () {
    this.storageModule = new StorageModule();
    this.getTrophies = new GetTrophies();
  }

  public addTrophyLoader (): void {
    const currentGameElement = document.querySelector('.guide-info ~ div.title-bar.flex.v-align > h3 > a:last-of-type');
    if (currentGameElement === null) {
      console.warn('Unable to detect current trophy title');
      return;
    }

    const currentGame = (currentGameElement as HTMLElement).innerText;

    const control = new FormSelectControl('psnp-e-load-trophies', '', undefined, true);

    for (const game of this.storageModule.get<Game>(gamesKey)) {
      if (game.title.localeCompare(currentGame, undefined, { sensitivity: 'accent' }) === 0) {
        control.addOption(game.url, `${game.title} (${game.platforms.map((p) => (platformToString(p))).join(', ')})`);
      }
    }

    const element = document.querySelector('.game-image-holder + .box') as HTMLElement;
    new BaseControl(element)
      .appendAfter(new TitleControl('Load other platform'))
      .next()
      .appendAfter(new FormControl()
        .add(control)
        .add(new FormButtonGroupControl()
          .addSingleButton(new FormButtonControl('Load trophies', 'green', async (_) => { await this.loadTrophies(control.getValue()); }))));
  }

  private async loadTrophies (url: string | null): Promise<void> {
    if (url === null) {
      return;
    }

    const response = await fetch(url);

    if (!response.ok) {
      console.error('Unable to retrieve trophy document', url);
      return undefined;
    }

    // Retrieve earned trophies
    const content = new DOMParser()
      .parseFromString(await response.text(), 'text/html')
      .body
      .querySelectorAll('table.zebra tr.completed > td:nth-child(2) > a');

    const trophies: string[] = [];
    for (const trophy of content) {
      const name = (trophy as HTMLElement).innerText;
      trophies.push(name);
    }

    // Section
    this.getTrophies.section(false).forEach((e) => {
      const parent = findParent(e, 'tr')?.querySelector('td:nth-child(2) a.title');

      if (parent === undefined || parent === null) {
        return;
      }

      const title = (parent as HTMLElement).innerText;

      if (trophies.some((t) => t.localeCompare(title, undefined, { sensitivity: 'accent' }) === 0)) {
        e.classList.remove('unearned');
        e.classList.add('earned');
      }
    });

    // Roadmap
    this.getTrophies.roadmap(false).forEach((e) => {
      const aElement = e.querySelector('a.title');
      if (aElement === null) {
        return;
      }

      const title = (aElement as HTMLElement).innerText;

      if (trophies.some((t) => t.localeCompare(title, undefined, { sensitivity: 'accent' }) === 0)) {
        e.classList.add('earned');
      }
    });
  }
}
