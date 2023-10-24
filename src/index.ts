import { DropdownMenu } from "./components/dropdown-menu";
import { GuideModule } from "./modules/guide-module";

console.debug("Starting PSNProfiles Extra");

const dropdownMenu = new DropdownMenu();
dropdownMenu.addSettingsButton();

// document.getElementsByTagName('body')[0].appendChild(new PopupControl().node);

new GuideModule().getGuideUrl();

console.debug("Started PSNProfiles Extra");
