import { type Guide } from '../models/guide';

export class StorageModule {
  private readonly guidesKey: string = 'psnp-guides';

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
}
