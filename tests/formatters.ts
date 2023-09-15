import { expect } from 'chai';
import parseChangelog from '../src';
import { IFormatter, formatChangelog } from '../src/formatter';
import { IParsedChangelog } from '../src/types';
import basicChangelog from './data';
import plainTextFormatter from '../src/formatters/plain-text';

describe('can format changelog to string', () => {
  let changelog: IParsedChangelog;

  before('parse basic changelog', async () => {
    changelog = await parseChangelog(basicChangelog);
  });

  describe('plain text formatter', () => {
    const expected = '0.0.3 (2023-01-03)\n'
      + '- Added: A3\n'
      + '- Removed: B3\n'
      + '0.0.2 (2023-01-02)\n'
      + '- Added: A2\n'
      + '- Removed: B2\n'
      + '0.0.0 (2023-01-01)\n'
      + '- Added: A\n'
      + '- Removed: B';

    it('formats in minimal output', () => {
      const text = formatChangelog(changelog, plainTextFormatter());
      expect(text).to.eql(expected);
    });
  });

  describe('options', () => {
    const placeholderFormatter: IFormatter = {
      format: () => 'release',
    };

    it('can set the body per release', () => {
      const text = formatChangelog(changelog, placeholderFormatter);
      expect(text).to.eql('release\nrelease\nrelease');
    });
  });
});
