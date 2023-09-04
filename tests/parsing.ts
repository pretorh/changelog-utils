import { expect } from 'chai';
import parseChangelog from '../src';
import basicChangelog from './data';

describe('can parse changelog into details', () => {
  it('basic parsing', async () => {
    const result = await parseChangelog(basicChangelog);
    const last = result.versions[result.versions.length - 1];
    expect(last.parsed.Added).to.eql(['A']);
    expect(last.parsed.Removed).to.eql(['B']);
    expect(last.date).to.eql('2023-01-01');
  });

  it('multiple versions', async () => {
    const result = await parseChangelog(basicChangelog);
    expect(result.versions).to.have.length(3);
  });
});
