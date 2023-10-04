import { expect } from 'chai';
import { exec } from 'child_process';
import path from 'path';

describe('cli', () => {
  const projectRoot = path.resolve(path.join(__dirname, '..', '..'));

  it('is executable', async () => {
    await expect(async () => {
      await exec('./out/src/cli.js CHANGELOG.md', {
        cwd: projectRoot,
      });
    }).to.not.throw();
  });
});
