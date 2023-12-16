import { BaseControl, TitleControl } from '../../components/base-control';
import { FormCheckboxControl } from '../../components/form-checkbox-control';
import { FormControl } from '../../components/form-control';
import { findParent } from '../../extensions/html-element';
import { GetTrophies } from './get-trophies';

export class Settings {
  private readonly getTrophies: GetTrophies;

  constructor () {
    this.getTrophies = new GetTrophies();
  }

  public addSettings (): void {
    const element = document.querySelector('.game-image-holder + .box') as HTMLElement;
    new BaseControl(element)
      .appendAfter(new TitleControl('Settings'))
      .next()
      .appendAfter(new FormControl()
        .add(new FormCheckboxControl('psnp-e-hide-earned', 'Hide earned trophies', (e) => { this.changeEarned((e.target as HTMLInputElement).checked); })));
  }

  public changeEarned (hide: boolean): void {
    // Earned trophies
    const trophyUrls: string[] = [];

    // Section
    this.getTrophies.section(true).forEach((e) => {
      const parent = findParent(e, ':not(.box).section-holder');
      const sectionId = parent?.firstElementChild?.id;

      if (sectionId !== undefined) {
        trophyUrls.push(sectionId);
      }

      if (hide) {
        parent?.setAttribute('style', 'display:none');
      } else if (parent != null) {
        parent.style.display = '';
      }
    });

    // Overview
    this.getTrophies.overview().forEach((e) => {
      if (trophyUrls.some((t) => e.attributes.getNamedItem('href')?.value.includes(t))) {
        if (hide) {
          e.setAttribute('style', 'display:none');
        } else if (e != null) {
          (e).style.display = '';
        }
      }
    });

    // Roadmap
    this.getTrophies.roadmap(true).forEach((e) => {
      const parent = findParent(e, '.col-xs-6, .col-xs-12');

      if (hide) {
        parent?.setAttribute('style', 'display:none');
      } else if (parent != null) {
        parent.style.display = '';
      }
    });

    // Text
    this.getTrophies.text().forEach((e) => {
      if (trophyUrls.some((t) => e.attributes.getNamedItem('href')?.value.includes(t))) {
        if (hide) {
          e.classList.add('psnp-e-checked');
        } else {
          e.classList.remove('psnp-e-checked');
        }
      }
    });

    // Tree
    this.getTrophies.tree(true).forEach((e) => {
      if (hide) {
        e?.setAttribute('style', 'display:none');
      } else if (e != null) {
        (e).style.display = '';
      }
    });
  }
}
