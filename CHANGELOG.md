# Changelog

## 0.2.0

### Added

- Formatter parsing options
- CLI format arguments for `--no-show-date` and `--list-item-prefix`

## 0.1.0

### Added

- CLI argument parsing and error handling
- Option to parse directly from file (`string` or `{ file: string }` source)
- `commander` dependency for cli argument parsing

## 0.0.1

### Fixed

- Typo in cli error message
- Make CLI executable

### Changed

- Upgrade dependencies

## 0.0.0

### Added

- Basic library function for parsing changelogs using `changelog-parser`
- Determine next version numbers
- Typed change types based on https://keepachangelog.com
- Basic CLI to print the changelog to `stdout` in "plain text" (all or latest release) and Android string resource xml
- Formatter function and options to describe how to format a changelog to text
