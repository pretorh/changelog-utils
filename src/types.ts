export interface IParsedChangelog {
  version: IParsedVersionDetails;
  releases: IParsedRelease[];
  unreleased: IParsedRelease | undefined;
}

interface IParsedVersionDetails {
  latest: IVersion;
  next: INextVersions;
}

interface IVersion {
  name: string;
  date: string | null;
}

interface INextVersions {
  major: string;
  minor: string;
  patch: string;
}

export interface IParsedRelease {
  version: string | null;
  date: string | null;
  parsed: Record<string, string[]>;
}
