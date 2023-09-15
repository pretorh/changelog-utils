// from changelog-parser's types
export type ChangelogParserVersion = {
  version: string | null;
  title: string;
  date: string | null;
  body: string;
  parsed: Record<string, string[] | undefined>;
};
