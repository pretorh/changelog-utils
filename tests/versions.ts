import { expect } from 'chai';
import parseChangelog from '../src';
import basicChangelog, { withUnreleased } from './data';

describe('get version details', () => {
  it('includes the latest version', async () => {
    const parsed = await parseChangelog(basicChangelog);
    expect(parsed.version.latest.name).to.eql('0.0.3');
    expect(parsed.version.latest.date).to.eql('2023-01-03');
  });

  it('ignores unreleased versions', async () => {
    const parsed = await parseChangelog(withUnreleased());
    expect(parsed.version.latest.name).to.eql('0.0.3');
    expect(parsed.version.latest.date).to.eql('2023-01-03');
  });

  describe('next version', () => {
    it('major', async () => {
      const parsed = await parseChangelog(basicChangelog);
      expect(parsed.version.next.major).to.eql('1.0.0');
    });

    it('minor', async () => {
      const parsed = await parseChangelog(basicChangelog);
      expect(parsed.version.next.minor).to.eql('0.1.0');
    });

    it('patch', async () => {
      const parsed = await parseChangelog(basicChangelog);
      expect(parsed.version.next.patch).to.eql('0.0.4');
    });

    it('next (first) version defaults to 0.0.0', async () => {
      const result = await parseChangelog('# Changelog');
      expect(result.version.next.major).to.eql('0.0.0');
      expect(result.version.next.minor).to.eql('0.0.0');
      expect(result.version.next.patch).to.eql('0.0.0');
    });
  });
});
