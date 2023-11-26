#!/usr/bin/env node

import { Command } from 'commander';
import parse from '.';
import { formatChangelog } from './formatter';
import selectFormatter from './formatters';

const program = new Command();
program
  .name('changelog-utils')
  .description('CLI for utilities to parse changelogs and build release notes')
  .version('0.1.0');

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
