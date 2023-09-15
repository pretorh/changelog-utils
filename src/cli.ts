import { readFileSync } from 'fs';
import parse from '.';
import { formatChangelog } from './formatter';
import plainTextFormatter from './formatters/plain-text';

const filename = process.argv[2];

const contents = readFileSync(filename);
parse(contents.toString())
  .then((parsed) => {
    process.stdout.write(formatChangelog(parsed, plainTextFormatter()));
  });
