import changelogParser from 'changelog-parser';
import semver from 'semver';
import { IParsedChangelog } from './types';
import mapReleaseDetails from './mapping';

export default async function parse(content: string): Promise<IParsedChangelog> {
  const parsed = await changelogParser({
    text: content,
  });

  const indexOfLatest = parsed.versions
    .findIndex((v: { version: string | null }) => v.version !== null);
  const latestVersion = parsed.versions[indexOfLatest]?.version;
  const unreleased = parsed.versions
    .find((v: { version: string | null }) => v.version === null);

  const defaultVersion = '0.0.0';
  const version = {
    latest: {
      name: latestVersion || defaultVersion,
      date: parsed.versions[indexOfLatest]?.date,
    },
    next: {
      major: semver.inc(latestVersion || '', 'major') || defaultVersion,
      minor: semver.inc(latestVersion || '', 'minor') || defaultVersion,
      patch: semver.inc(latestVersion || '', 'patch') || defaultVersion,
    },
  };

  return {
    version,
    releases: parsed.versions.map(mapReleaseDetails),
    unreleased: unreleased ? mapReleaseDetails(unreleased) : undefined,
  };
}
