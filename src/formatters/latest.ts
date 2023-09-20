import { IFormatter } from '../formatter';
import { IParsedRelease } from '../types';
import plainTextFormatter from './plain-text';

export default function latestReleaseFormatter(): IFormatter {
  let alreadyIncluded = false;

  return {
    includeRelease: (release: IParsedRelease) => {
      if (alreadyIncluded || !release.version) {
        return false;
      }

      alreadyIncluded = true;
      return true;
    },
    format: plainTextFormatter().format,
  };
}
