# Publishing n8n-nodes-clipmint

This guide covers how to publish the ClipMint n8n community node to npm.

## Prerequisites

1. npm account with publishing rights
2. Node.js 18+ installed
3. All dependencies installed

## Pre-Publish Checklist

Before publishing, ensure your package meets n8n's community node requirements:

- [x] Package name starts with `n8n-nodes-`
- [x] Keywords include `n8n-community-node-package`
- [x] License is MIT
- [x] No runtime dependencies (only peer/dev dependencies)
- [x] No environment variable or file system access
- [x] Documentation (README.md) is complete
- [x] TypeScript with proper typing
- [x] English-only interface and documentation

## Build & Test Locally

```bash
cd packages/n8n-nodes-clipmint

# Install dependencies
npm install

# Build the package
npm run build

# Run linter
npm run lint
```

## Test with n8n Linter

```bash
# Run the n8n scanner
npx @n8n/scan-community-package n8n-nodes-clipmint
```

## Publish to npm

```bash
# Login to npm (if not already)
npm login

# Publish (runs build automatically via prepublishOnly)
npm publish

# Or for a specific tag
npm publish --tag beta
```

## After Publishing

1. **Create GitHub Repository**: Push code to https://github.com/clipmint/n8n-nodes-clipmint
2. **Submit for Verification**: 
   - Go to [n8n Community Nodes](https://docs.n8n.io/integrations/community-nodes/)
   - Submit your package for official verification
3. **Update ClipMint Docs**: Document the n8n integration in ClipMint's help center

## Version Updates

When updating the package:

```bash
# Bump version
npm version patch  # or minor/major

# Publish
npm publish
```

## Troubleshooting

### "Cannot find module 'n8n-workflow'"
This is expected in development since n8n-workflow is a peer dependency. The package works correctly when installed in n8n.

### Build Errors
Make sure TypeScript compiles correctly:
```bash
npx tsc --noEmit
```

### Icon Not Showing
Ensure the SVG file is copied to dist:
```bash
npm run build
ls dist/nodes/ClipMint/
```

## Package Structure

```
n8n-nodes-clipmint/
├── credentials/
│   └── ClipMintApi.credentials.ts
├── nodes/
│   └── ClipMint/
│       ├── ClipMint.node.ts
│       └── clipmint.svg
├── dist/                    # Built files (git-ignored)
├── .eslintrc.js
├── gulpfile.js
├── index.ts
├── LICENSE.md
├── package.json
├── PUBLISHING.md
├── README.md
└── tsconfig.json
```

## Support

For issues with the n8n node, contact support@clipmint.ai or open an issue on GitHub.
