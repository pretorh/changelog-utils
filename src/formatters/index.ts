import androidStringResourceFormatter from './android-string-resource';
import latestReleaseFormatter from './latest';
import plainTextFormatter from './plain-text';

export default function selectFormatter(name: string | undefined) {
  switch (name) {
    case undefined:
      return plainTextFormatter();
    case 'text':
      return plainTextFormatter();
    case 'latest':
      return latestReleaseFormatter();
    case 'android-string-resource':
      return androidStringResourceFormatter();
    default:
      throw new Error(`Unknown formatter ${name}`);
  }
}
