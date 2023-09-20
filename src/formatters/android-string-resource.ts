import { IFormatter } from '../formatter';
import plainTextFormatter from './plain-text';

export default function androidStringResourceFormatter(): IFormatter {
  return {
    header: `<?xml version="1.0" encoding="utf-8"?>
<resources>
    <string name="changelog">"
`,
    footer: `"</string>
</resources>`,
    format: plainTextFormatter().format,
  };
}
