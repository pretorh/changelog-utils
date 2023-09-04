import changelogParser from 'changelog-parser';

export default async function parse(content: string) {
  const parsed = await changelogParser({
    text: content,
  });

  const indexOfLatest = parsed.versions
    .findIndex((v: { version: string | null }) => v.version !== null);

  const version = {
    latest: {
      name: parsed.versions[indexOfLatest].version,
      date: parsed.versions[indexOfLatest].date,
    },
  };

  return {
    version,
    versions: parsed.versions,
  };
}
