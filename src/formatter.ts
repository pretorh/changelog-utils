import { IParsedChangelog, IParsedRelease } from './types';

export interface IFormatter {
  header?: string;
  footer?: string;
  format(release: IParsedRelease): string;
  releaseSeparator?: string;
}

export function formatChangelog(changelog: IParsedChangelog, formatter: IFormatter): string {
  const releases = changelog.releases
    .map(formatter.format)
    .join(formatter.releaseSeparator || '\n\n');

  return (formatter.header || '') + releases + (formatter.footer || '');
}
