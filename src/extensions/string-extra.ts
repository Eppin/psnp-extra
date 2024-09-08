import { Extra } from '../models/extra';

export function stringToExtra(value: string): Extra | undefined {
  switch (value.toLowerCase()) {
    case 'trophy guides': return Extra.Trophy;
    case 'gameplay guides': return Extra.Gameplay;
    case 'dlc guides': return Extra.Dlc;

    case 'vr': return Extra.VR;
    case 'vita': return Extra.Vita;
    case 'ps3': return Extra.PS3;
    case 'ps4': return Extra.PS4;
    case 'ps5': return Extra.PS5;

    default:
      console.error('Argument out of range', value);
      return undefined;
  }
}
