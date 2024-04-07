import { IFormatOptions, IFormatter } from '../formatter';
import { IParsedRelease } from '../types';

export default function plainTextFormatter(options: IFormatOptions): IFormatter {
  function mapChanges(prefix: string, items: string[]) {
    return items.map((item: string) => `${options.listItemPrefix}${prefix}: ${item}`);
  }

  return {
    format: (release: IParsedRelease): string => {
      const dateInfo = options.showDate ? ` (${release.date || 'no date'})` : '';
      const versionInfo = `${release.version || 'unreleased'}${dateInfo}`;

      const added = mapChanges('Added', release.added);
      const changed = mapChanges('Changed', release.changed);
      const deprecated = mapChanges('Deprecated', release.deprecated);
      const removed = mapChanges('Removed', release.removed);
      const fixed = mapChanges('Fixed', release.fixed);
      const security = mapChanges('Security', release.security);

      return [versionInfo, ...added, ...changed, ...deprecated, ...removed, ...fixed, ...security].join('\n');
    },
  };
}
