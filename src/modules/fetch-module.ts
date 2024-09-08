import { Guide } from '../models/guide';
import { Guides } from '../models/guides';
import { guidesKey } from './storage/storage-keys';
import { StorageModule } from './storage/storage-module';

const github: string = process.env.FETCH_URI!;

export class FetchModule {
  private readonly storage: StorageModule;

  constructor() {
    this.storage = new StorageModule();
  }

  public async fetch(): Promise<void> {
    const now = new Date();
    const yesterday = now.getTime() - 86400000;

    const get = this.storage.get<Guides>(guidesKey);

    if (get === null || yesterday >= get.created) {
      await fetch(github)
        .then((r) => r.json())
        .then((guides: Guide[]) => this.storage.add<Guides>(guidesKey, { guides, created: new Date().getTime() }));
    }
  }
}
