import changelogParser from 'changelog-parser';
import semver from 'semver';
import { IParsedChangelog } from './types';

export default async function parse(content: string): Promise<IParsedChangelog> {
  const parsed = await changelogParser({
    text: content,
  });

  const indexOfLatest = parsed.versions
    .findIndex((v: { version: string | null }) => v.version !== null);
  const latestVersion = parsed.versions[indexOfLatest].version;
  const unreleased = parsed.versions
    .find((v: { version: string | null }) => v.version === null);

  const version = {
    latest: {
      name: latestVersion,
      date: parsed.versions[indexOfLatest].date,
    },
    next: {
      major: semver.inc(latestVersion || '', 'major'),
      minor: semver.inc(latestVersion || '', 'minor'),
      patch: semver.inc(latestVersion || '', 'patch'),
    },
  };

  return {
    version,
    releases: parsed.versions,
    unreleased,
  };
}
