import { DropdownMenu } from "./components/dropdown-menu";
import { GuideModule } from "./modules/guide-module";

console.debug("Starting PSNProfiles Extra");

const dropdownMenu = new DropdownMenu();
dropdownMenu.addSettingsButton();

const guideModule = new GuideModule();
const guide = await guideModule.getGuide();
console.log(guide);

console.debug("Started PSNProfiles Extra");
