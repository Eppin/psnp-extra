import { GuideStorage } from './guide-storage';

export class StorageModule {
  public readonly guide: GuideStorage;

  constructor () {
    this.guide = new GuideStorage();
  }

  public save<T> (key: string, item: T, predicate: (storage: T, item: T) => boolean): void {
    const itemStr = localStorage.getItem(key);
    if (itemStr === null) {
      localStorage.setItem(key, JSON.stringify([ item ]));
    } else {
      const items: T[] = JSON.parse(itemStr);
      if (!items.some((g) => predicate(g, item))) {
        items.push(item);
        localStorage.setItem(key, JSON.stringify(items));
      }
    }
  }

  public get<T> (key: string, predicate?: (item: T) => boolean): T[] {
    const itemsStr = localStorage.getItem(key);
    if (itemsStr === null) {
      return [];
    }

    const items: T[] = JSON.parse(itemsStr);

    if (predicate === undefined) {
      return items;
    } else {
      return items.filter((i) => predicate(i));
    }
  }
}
