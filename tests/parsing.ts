import { expect } from 'chai';
import parseChangelog from '../src';
import basicChangelog, { withUnreleased } from './data';

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
});
