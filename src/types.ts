import { ChangelogParserVersion } from './internal';

export interface IParsedChangelog {
  version: IParsedVersionDetails;
  releases: ChangelogParserVersion[];
  unreleased: ChangelogParserVersion | undefined;
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
  major: string;
  minor: string;
  patch: string;
}
