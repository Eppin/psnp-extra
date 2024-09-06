import { Checkable } from './checkable';
import { Settings } from './settings';
import { TrophyLoader } from './trophy-loader';

export class GuideModule {
  public readonly checkable: Checkable;
  public readonly settings: Settings;
  public readonly trophyLoader: TrophyLoader;

  constructor () {
    this.checkable = new Checkable();
    this.settings = new Settings();
    this.trophyLoader = new TrophyLoader();
  }
}
