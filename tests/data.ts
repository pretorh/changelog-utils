const header = '# changelog';

const basicChangelog = `
${header}

## 0.0.3 - 2023-01-03

### Added

- A3

### Removed

- B3

## 0.0.2 - 2023-01-02

### Added

- A2

### Removed

- B2

## 0.0.0 - 2023-01-01

### Added

- A

### Removed

- B
`;

export function withUnreleased() {
  const unreleased = `
## Unreleased

### Added

- More changes to A
`;
  return header + unreleased + basicChangelog.replace(header, '');
}

export default basicChangelog;
