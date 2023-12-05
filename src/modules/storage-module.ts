import { type Game } from '../models/game';
import { type Guide } from '../models/guide';
import { type GuideChecked } from '../models/guide-checked';

export class StorageModule {
  private readonly gamesKey: string = 'psnp-games';
  private readonly guidesKey: string = 'psnp-guides';
  private readonly guidesCheckedKey: string = 'psnp-guides-checked';

  public saveGame (game: Game): void {
    const gamesStr = localStorage.getItem(this.gamesKey);
    if (gamesStr === null) {
      localStorage.setItem(this.gamesKey, JSON.stringify([ game ]));
    } else {
      const list: Game[] = JSON.parse(gamesStr);
      if (!list.some((g) => g.trophyId === game.trophyId)) {
        list.push(game);
        localStorage.setItem(this.gamesKey, JSON.stringify(list));
      }
    }
  }

  public getGames (): Game[] {
    const gamesStr = localStorage.getItem(this.gamesKey);
    if (gamesStr === null) {
      return [];
    }

    return JSON.parse(gamesStr);
  }

  public saveGuide (guide: Guide): void {
    const guidesStr = localStorage.getItem(this.guidesKey);
    if (guidesStr === null) {
      localStorage.setItem(this.guidesKey, JSON.stringify([ guide ]));
    } else {
      const guides: Guide[] = JSON.parse(guidesStr);
      if (!guides.some((g) => g.trophyId === guide.trophyId && g.guideId === guide.guideId)) {
        guides.push(guide);
        localStorage.setItem(this.guidesKey, JSON.stringify(guides));
      }
    }
  }

  public getGuides (trophyId: number): Guide[] {
    const guidesStr = localStorage.getItem(this.guidesKey);
    if (guidesStr === null) {
      return [];
    }

    const guides: Guide[] = JSON.parse(guidesStr);
    return guides.filter((g) => g.trophyId === trophyId);
  }

  public setGuideChecked (guideId: number, key: number, checked: boolean): void {
    const guidesCheckedStr = localStorage.getItem(this.guidesCheckedKey);
    if (guidesCheckedStr === null) {
      if (checked) {
        const guide: GuideChecked = { guideId, checks: [ key ] };
        localStorage.setItem(this.guidesCheckedKey, JSON.stringify([ guide ]));
      }
    } else {
      const guides: GuideChecked[] = JSON.parse(guidesCheckedStr);

      const index = guides.findIndex((t) => t.guideId === guideId);
      if (index >= 0) {
        if (checked) {
          guides[index].checks.push(key);
        } else {
          const checks = guides[index].checks;
          const indexOfKey = checks.findIndex((c) => c === key);
          checks.splice(indexOfKey, 1);
        }
      } else {
        const guide: GuideChecked = { guideId, checks: [ key ] };
        guides.push(guide);
      }

      localStorage.setItem(this.guidesCheckedKey, JSON.stringify(guides));
    }
  }

  public getGuideChecked (guideId: number, key: number): boolean {
    const guidesCheckedStr = localStorage.getItem(this.guidesCheckedKey);
    if (guidesCheckedStr === null) {
      return false;
    } else {
      const guides: GuideChecked[] = JSON.parse(guidesCheckedStr);

      const index = guides.findIndex((t) => t.guideId === guideId);
      if (index >= 0) {
        return guides[index].checks.some((c) => c === key);
      } else {
        return false;
      }
    }
  }
}
