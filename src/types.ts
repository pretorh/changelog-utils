import { ChangelogParserVersion } from './internal';

export interface IParsedChangelog {
  version: IParsedVersionDetails;
  versions: ChangelogParserVersion[];
}

interface IParsedVersionDetails {
  latest: IVersion;
  next: INextVersions;
}

interface IVersion {
  name: string | null;
  date: string | null;
}

interface INextVersions {
  major: string | null;
  minor: string | null;
  patch: string | null;
}
