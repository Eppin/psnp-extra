import { Platform } from '../models/platform';

export function platformToString (platform: Platform): string {
  switch (platform) {
    case Platform.PSVita: return 'PS Vita';
    case Platform.PS3: return 'PS3';
    case Platform.PS4: return 'PS4';
    case Platform.PS5: return 'PS5';
  }
}
