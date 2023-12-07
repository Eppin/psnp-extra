import { GuideCheckableControl } from '../../components/guide-checkable';

export class Checkable {
  public makeCheckable (): void {
    const guideId = /(\d+)/.exec(window.location.href)?.[0];

    if (guideId === undefined) {
      console.error('Unable to determine guide ID from URL');
      return;
    }

    const lists = '#content ul > li';
    const tables = '#content table > tbody > tr';

    document.querySelectorAll(`${lists}, ${tables}`)
      .forEach((element, index) => {
        const guideCheckableControl = new GuideCheckableControl(element as HTMLElement, parseInt(guideId), index);
        guideCheckableControl.load();
      });
  }
}
