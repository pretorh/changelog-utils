import { IFormatter } from '../formatter';
import { IParsedRelease } from '../types';

function mapChanges(prefix: string, items: string[]) {
  return items.map((item: string) => `- ${prefix}: ${item}`);
}

export default function plainTextFormatter(): IFormatter {
  return {
    format: (release: IParsedRelease): string => {
      const versionInfo = `${release.version || 'unreleased'} (${release.date || 'no date'})`;

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
