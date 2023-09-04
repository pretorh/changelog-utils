import changelogParser from 'changelog-parser';

export default async function parse(content: string) {
  const parsed = await changelogParser({
    text: content,
  });
  return {
    versions: parsed.versions,
  };
}
