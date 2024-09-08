import { DropdownMenu } from './components/dropdown-menu';
import { FetchModule } from './modules/fetch-module';
import { GuideModule } from './modules/guide/guide-module';
import { ProfileGameModule } from './modules/profile-game-module';
import { TrophyModule } from './modules/trophy-module';

console.log('Starting PSNProfiles Extra');

const fetchModule = new FetchModule();
await fetchModule.fetch();

const paths = location.pathname.split('/');
if (paths.length >= 1) {
  switch (paths[1]) {
    case 'trophies': {
      break;
    }

    case 'trophy': {
      const trophyModule = new TrophyModule();
      await trophyModule.getGuide();
      break;
    }

    case 'guide': {
      const guideModule = new GuideModule();
      guideModule.checkable.makeCheckable();
      guideModule.trophyLoader.setOverviewClass();
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
