import { DropdownMenu } from './components/dropdown-menu';
import { GuideModule } from './modules/guide/guide-module';
import { ProfileGameModule } from './modules/profile-game-module';
import { guidesKey } from './modules/storage/storage-keys';
import { StorageModule } from './modules/storage/storage-module';

console.log('Starting PSNProfiles Extra');

const paths = location.pathname.split('/');
if (paths.length >= 1) {
  switch (paths[1]) {
    case 'trophies': {
      const guideModule = new GuideModule();
      const guide = await guideModule.get.guide();

      if (guide !== undefined) {
        const storageModule = new StorageModule();
        storageModule.save(guidesKey, guide, (s, i) => s.trophyId === i.trophyId && s.guideId === i.guideId);
      }
      break;
    }

    case 'guide': {
      const guideModule = new GuideModule();
      guideModule.checkable.makeCheckable();
      guideModule.trophyLoader.addTrophyLoader();
      guideModule.settings.addSettings();
      break;
    }

    case '': {
      console.log('Main page');
      break;
    }

    default: {
      console.log('Profile page');
      const profileGameModule = new ProfileGameModule();
      profileGameModule.setGames();
      profileGameModule.setGuides();
    }
  }
}

const dropdownMenu = new DropdownMenu();
dropdownMenu.addSettingsButton();

console.log('Started PSNProfiles Extra');
