import { IParsedChangelog, IParsedRelease } from './types';

export interface IFormatter {
  header?: string;
  footer?: string;
  format(release: IParsedRelease): string;
  releaseSeparator?: string;
  includeRelease? (release: IParsedRelease): boolean;
}

export interface IFormatOptions {
  showDate: boolean;
  listItemPrefix: string;
}

export function formatChangelog(changelog: IParsedChangelog, formatter: IFormatter): string {
  const includeRelease = formatter.includeRelease || (() => true);

  const releases = changelog.releases
    .filter(includeRelease)
    .map(formatter.format)
    .join(formatter.releaseSeparator || '\n\n');

  return (formatter.header || '') + releases + (formatter.footer || '');
}
