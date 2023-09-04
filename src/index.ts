import changelogParser from 'changelog-parser';
import semver from 'semver';

export default async function parse(content: string) {
  const parsed = await changelogParser({
    text: content,
  });

  const indexOfLatest = parsed.versions
    .findIndex((v: { version: string | null }) => v.version !== null);
  const latestVersion = parsed.versions[indexOfLatest].version;

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
    versions: parsed.versions,
  };
}
