# Changelog parsing utils

A collection of utilities to parse changelogs, build release notes and manage versions numbers.

## api and usage

Uses `changelog-parser` for the lower level [parsing of `CHANGELOG.md`](https://github.com/ungoldman/changelog-parser#standards),
which parses based on http://keepachangelog.com

### cli

See also `changelog-utils help`

#### format

`changelog-utils format <CHANGELOG-file> [format]`: Formats a changelog using a specified formatter

Formatters:
- `text`: plain text (Default)
- `latest`: plain text, but only the latest *released* version
- `android-string-resource`: Android xml string resource

## ideas

Cli ideas:
- Formatting changelogs for Google Play release notes
- Bumping versions in files (with an `rc` file to defined rules)
- Preparing next release notes (Unreleased -> version, new Unreleased in `CHANGELOG.md`)
