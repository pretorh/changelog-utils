#!/usr/bin/env node

import { Command } from 'commander';
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

const program = new Command();
program
  .name('changelog-utils')
  .description('CLI for utilities to parse changelogs and build release notes')
  .version('0.0.1');

program
  .command('format', { isDefault: true })
  .description('Formats a changelog using a specified formatter')
  .argument('<CHANGELOG-file>', 'the changelog file to parse')
  .argument('[format]', 'the formatter used to print the changelog')
  .action(async (file: string, format: string) => {
    const formatter = selectFormatter(format);
    const parsed = await parse({ file });
    process.stdout.write(formatChangelog(parsed, formatter));
  });

program.parseAsync()
  .catch((e) => {
    process.stderr.write(`Error: ${e.message}\n`);
    process.exit(1);
  });
