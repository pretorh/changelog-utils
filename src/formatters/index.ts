import { IFormatOptions } from '../formatter';
import androidStringResourceFormatter from './android-string-resource';
import latestReleaseFormatter from './latest';
import plainTextFormatter from './plain-text';

export default function selectFormatter(name: string | undefined, options: IFormatOptions) {
  switch (name) {
    case undefined:
      return plainTextFormatter(options);
    case 'text':
      return plainTextFormatter(options);
    case 'latest':
      return latestReleaseFormatter(options);
    case 'android-string-resource':
      return androidStringResourceFormatter(options);
    default:
      throw new Error(`Unknown formatter ${name}`);
  }
}
