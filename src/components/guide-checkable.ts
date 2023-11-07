import { StorageModule } from '../modules/storage-module';
import { BaseControl } from './base-control';

export class GuideCheckableControl extends BaseControl {
  private readonly storageModule: StorageModule = new StorageModule();
  private readonly guideId: number;
  private readonly index: number;

  private checked: boolean;

  constructor (element: HTMLElement, guideId: number, index: number) {
    super(element);

    this.guideId = guideId;
    this.index = index;

    const id = `psnp-e-guide-${index}`;

    this
      .setId(id)
      .setClass('psnp-e-checkable')
      .click(() => {
        this.checked = !this.checked;
        this.changeClass();

        this.storageModule.setGuideChecked(guideId, index, this.checked);
      });
  }

  public load (): void {
    this.checked = this.storageModule.getGuideChecked(this.guideId, this.index);
    this.changeClass();
  }

  private changeClass (): void {
    if (this.checked) {
      this.setClass('psnp-e-checked');
    } else {
      this.removeClass('psnp-e-checked');
    }
  }
}
