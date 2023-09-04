import { expect } from 'chai';
import parseChangelog from '../src';
import basicChangelog from './data';

describe('get version details', () => {
  it('includes the latest version', async () => {
    const parsed = await parseChangelog(basicChangelog);
    expect(parsed.version.latest.name).to.eql('0.0.3');
    expect(parsed.version.latest.date).to.eql('2023-01-03');
  });
});
