import { readFileSync } from 'fs';
import parse from '.';

const filename = process.argv[2];

const contents = readFileSync(filename);
parse(contents.toString())
  .then((parsed) => {
    parsed.releases.forEach((release) => {
      // todo: extract this into a util to format releases
      process.stdout.write(release.version || 'unreleased');
      process.stdout.write(' (');
      process.stdout.write(release.date || 'no date');
      process.stdout.write(')\n');

      function printItems(prefix: string, items: string[] | undefined) {
        items?.forEach((item: string) => {
          process.stdout.write(`- ${prefix}: ${item}\n`);
        });
      }

      printItems('Added', release.parsed.Added);
      printItems('Changed', release.parsed.Changed);
      printItems('Deprecated', release.parsed.Deprecated);
      printItems('Removed', release.parsed.Removed);
      printItems('Fixed', release.parsed.Fixed);
      printItems('Security', release.parsed.Security);
    });
  });
