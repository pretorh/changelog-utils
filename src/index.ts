import changelogParser from 'changelog-parser';
import semver from 'semver';
import { IParsedChangelog } from './types';
import mapReleaseDetails from './mapping';

interface IFileSource {
  file: string;
}

type ParseSource = string | IFileSource;

export default async function parse(source: ParseSource): Promise<IParsedChangelog> {
  function parseSource() {
    if (typeof source === 'string') {
      return changelogParser({
        text: source,
      });
    }

    return changelogParser({
      filePath: source.file,
    });
  }
  const parsed = await parseSource();

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
