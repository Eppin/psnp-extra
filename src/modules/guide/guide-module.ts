import { Checkable } from './checkable';
import { GetGuide } from './get-guide';
import { Settings } from './settings';
import { TrophyLoader } from './trophy-loader';

export class GuideModule {
  public readonly checkable: Checkable;
  public readonly get: GetGuide;
  public readonly settings: Settings;
  public readonly trophyLoader: TrophyLoader;

  constructor () {
    this.checkable = new Checkable();
    this.get = new GetGuide();
    this.settings = new Settings();
    this.trophyLoader = new TrophyLoader();
  }
}
