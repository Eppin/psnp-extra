import { parseJSON } from '../../extensions/json-parse';
import { GuideStorage } from './guide-storage';

export class StorageModule {
  public readonly guide: GuideStorage;

  constructor () {
    this.guide = new GuideStorage();
  }

  public add<T>(key: string, item: T): void {
    localStorage.setItem(key, JSON.stringify(item));
  }

  public append<T>(key: string, item: T, predicate?: (storage: T, item: T) => boolean): void {
    const itemStr = localStorage.getItem(key);
    if (itemStr === null) {
      localStorage.setItem(key, JSON.stringify([ item ]));
      return;
    }

    const items: T[] = parseJSON<T[]>(itemStr);

    if (predicate === undefined || !items.some((g) => predicate(g, item))) {
      items.push(item);
      localStorage.setItem(key, JSON.stringify(items));
    }
  }

  public get<T>(key: string): T | null {
    const itemsStr = localStorage.getItem(key);

    return itemsStr == null
      ? null
      : parseJSON<T>(itemsStr);
  }
}
