import { IParsedRelease } from './types';
import { ChangelogParserVersion } from './internal';

export default function mapReleaseDetails(release: ChangelogParserVersion): IParsedRelease {
  return {
    version: release.version,
    date: release.date,
    parsed: release.parsed,
  };
}
