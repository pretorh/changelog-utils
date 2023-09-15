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
      + '\n'
      + '0.0.2 (2023-01-02)\n'
      + '- Added: A2\n'
      + '- Removed: B2\n'
      + '\n'
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
      expect(text).to.eql('release\n\nrelease\n\nrelease');
    });

    it('can set header before all other text', () => {
      const text = formatChangelog(changelog, {
        ...placeholderFormatter,
        header: 'header:\n',
      });
      expect(text).to.eql('header:\nrelease\n\nrelease\n\nrelease');
    });

    it('can set footer after all other text', () => {
      const text = formatChangelog(changelog, {
        ...placeholderFormatter,
        footer: '\nfooter',
      });
      expect(text).to.eql('release\n\nrelease\n\nrelease\nfooter');
    });

    it('can set release separator', () => {
      const text = formatChangelog(changelog, {
        ...placeholderFormatter,
        releaseSeparator: '!',
      });
      expect(text).to.eql('release!release!release');
    });
  });
});
