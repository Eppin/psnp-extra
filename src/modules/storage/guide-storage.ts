import { type Guide } from '../../models/guide';
import { type GuideChecked } from '../../models/guide-checked';
import { guidesCheckedKey, guidesKey } from './storage-keys';

export class GuideStorage {
  public getGuides (trophyId: number): Guide[] {
    const guidesStr = localStorage.getItem(guidesKey);
    if (guidesStr === null) {
      return [];
    }

    const guides: Guide[] = JSON.parse(guidesStr);
    return guides.filter((g) => g.trophyId === trophyId);
  }

  public setChecked (guideId: number, key: number, checked: boolean): void {
    const guidesCheckedStr = localStorage.getItem(guidesCheckedKey);
    if (guidesCheckedStr === null) {
      if (checked) {
        const guide: GuideChecked = { guideId, checks: [ key ] };
        localStorage.setItem(guidesCheckedKey, JSON.stringify([ guide ]));
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

      localStorage.setItem(guidesCheckedKey, JSON.stringify(guides));
    }
  }

  public getChecked (guideId: number, key: number): boolean {
    const guidesCheckedStr = localStorage.getItem(guidesCheckedKey);
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
