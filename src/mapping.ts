import { IParsedRelease } from './types';
import { ChangelogParserVersion } from './internal';

export default function mapReleaseDetails(release: ChangelogParserVersion): IParsedRelease {
  return {
    version: release.version,
    date: release.date,
    added: release.parsed.Added || [],
    changed: release.parsed.Changed || [],
    deprecated: release.parsed.Deprecated || [],
    removed: release.parsed.Removed || [],
    fixed: release.parsed.Fixed || [],
    security: release.parsed.Security || [],
    parsed: release.parsed,
  };
}
