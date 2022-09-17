# docx-to-pdf-axios

Convert docx files to pdf using https://tools.pdf24.org. This fork uses axios so it is compatible with both the browser and node.

## Copyright Notice

&copy; 2022 Wilson Foo Yu Kang. All rights reserved except as otherwise expressly provided in writing.

Licensed by Wilson Foo Yu Kang to the sole licensee Custom Automated Systems &reg; Pte Ltd on private and confidential terms which may be revoked with express written notice at any time at the sole and absolute discretion of Wilson Foo Yu Kang. By using and continuing to use this package, all parties agree that they are sub-licensing this package, including where this is pursuant to the LICENSE file containing herein, from Custom Automated Systems &reg; Pte Ltd and are not contracting directly with Wilson Foo Yu Kang, save that Wilson Foo Yu Kang shall be availed of all protections at law including all limitations of liability. Contact sales@customautosys.com for custom licensing terms.

Removal of this Copyright Notice is prohibited.

## Installation

```bash
npm i -D docx-to-pdf-axios
npm i -S docx-to-pdf-axios
```

## Importing

```typescript
import docxToPdfAxios from 'docx-to-pdf-axios';
```

## Functions

```typescript
docxToPdfAxios(docx:Blob|Buffer):Promise<ArrayBuffer>
```

Converts a docx Blob (browser) or Buffer (node) to a PDF ArrayBuffer.