import changelogParser from 'changelog-parser';

export default async function parse(content: string) {
  const parsed = await changelogParser({
    text: content,
  });

  const version = {
    latest: {
      name: parsed.versions[0].version,
      date: parsed.versions[0].date,
    },
  };

  return {
    version,
    versions: parsed.versions,
  };
}
