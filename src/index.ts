import { DropdownMenu } from './components/dropdown-menu';
import { GuideModule } from './modules/guide-module';
import { ProfileGameModule } from './modules/profile-game-module';
import { StorageModule } from './modules/storage-module';

console.debug('Starting PSNProfiles Extra');

const paths = location.pathname.split('/');
if (paths.length >= 1) {
  switch (paths[1]) {
    case 'trophies': {
      const guideModule = new GuideModule();
      const guide = await guideModule.getGuide();
      console.log(guide);

      if (guide !== undefined) {
        const storageModule = new StorageModule();
        storageModule.saveGuide(guide);
      }
      break;
    }

    case '': {
      console.log('Main page');
      break;
    }

    default: {
      console.log('Profile page');
      const profileGameModule = new ProfileGameModule();
      const games = profileGameModule.getList();
      console.log(games);
    }
  }
}

const dropdownMenu = new DropdownMenu();
dropdownMenu.addSettingsButton();

console.debug('Started PSNProfiles Extra');
