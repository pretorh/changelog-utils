import { readFileSync } from 'fs';
import parse from '.';
import { formatChangelog } from './formatter';
import androidStringResourceFormatter from './formatters/android-string-resource';
import latestReleaseFormatter from './formatters/latest';
import plainTextFormatter from './formatters/plain-text';

function selectFormatter(param: string) {
  switch (param) {
    case undefined:
      return plainTextFormatter();
    case 'text':
      return plainTextFormatter();
    case 'latest':
      return latestReleaseFormatter();
    case 'android-string-resource':
      return androidStringResourceFormatter();
    default:
      throw new Error(`Unknown formatter ${param}`);
  }
}

const filename = process.argv[2];
const formatter = selectFormatter(process.argv[3]);

const contents = readFileSync(filename);
parse(contents.toString())
  .then((parsed) => {
    process.stdout.write(formatChangelog(parsed, formatter));
  });
