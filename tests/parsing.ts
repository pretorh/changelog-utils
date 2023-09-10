import { expect } from 'chai';
import parseChangelog from '../src';
import basicChangelog, { singleEntry, withUnreleased } from './data';

describe('can parse changelog into details', () => {
  it('basic parsing', async () => {
    const result = await parseChangelog(basicChangelog);
    const last = result.releases[result.releases.length - 1];
    expect(last.parsed.Added).to.eql(['A']);
    expect(last.parsed.Removed).to.eql(['B']);
    expect(last.date).to.eql('2023-01-01');
  });

  it('multiple versions', async () => {
    const result = await parseChangelog(basicChangelog);
    expect(result.releases).to.have.length(3);
  });

  describe('unreleased', () => {
    it('is not defined if not in changelog', async () => {
      const result = await parseChangelog(basicChangelog);
      expect(result.unreleased).to.eql(undefined);
    });

    it('is defined if not in changelog', async () => {
      const result = await parseChangelog(withUnreleased());
      expect(result.unreleased).not.to.eql(undefined);
      expect(result.unreleased?.parsed?.Added).to.eql(['More changes to A']);
    });
  });

  describe('empty changelogs', () => {
    it('works for empty changelog', async () => {
      const result = await parseChangelog('# Changelog');
      expect(result.releases).to.have.length(0);
    });

    it('works with unreleased-only changelog', async () => {
      const result = await parseChangelog(`# Changelog

## Unreleased

### Added

- Things`);
      expect(result.releases).to.have.length(1);
    });
  });

  describe('change types', () => {
    it('Added', async () => {
      const result = await parseChangelog(singleEntry('Added'));
      expect(result.releases[0].parsed.Added).to.eql(['Single change']);
    });

    it('Changed', async () => {
      const result = await parseChangelog(singleEntry('Changed'));
      expect(result.releases[0].parsed.Changed).to.eql(['Single change']);
    });

    it('Deprecated', async () => {
      const result = await parseChangelog(singleEntry('Deprecated'));
      expect(result.releases[0].parsed.Deprecated).to.eql(['Single change']);
    });

    it('Removed', async () => {
      const result = await parseChangelog(singleEntry('Removed'));
      expect(result.releases[0].parsed.Removed).to.eql(['Single change']);
    });

    it('Fixed', async () => {
      const result = await parseChangelog(singleEntry('Fixed'));
      expect(result.releases[0].parsed.Fixed).to.eql(['Single change']);
    });

    it('Security', async () => {
      const result = await parseChangelog(singleEntry('Security'));
      expect(result.releases[0].parsed.Security).to.eql(['Single change']);
    });

    it('everything else is in `parsed`', async () => {
      const result1 = await parseChangelog(singleEntry('Bugfixes'));
      expect(result1.releases[0].parsed.Bugfixes).to.eql(['Single change']);
      const result2 = await parseChangelog(singleEntry('Stuff'));
      expect(result2.releases[0].parsed.Stuff).to.eql(['Single change']);
    });
  });
});
