# esbuild to Rspack Migration

This document outlines the migration from esbuild to Rspack across the Continue project.

## Overview

The migration successfully converts the following components:
- ✅ **GUI**: Already using Rspack (no changes needed)
- ✅ **VSCode Extension**: Migrated from esbuild to Rspack
- ✅ **CLI**: Migrated from esbuild to Rspack

## Changes Made

### VSCode Extension (`extensions/vscode/`)

1. **Added dependencies**: `@rspack/cli`, `@rspack/core`
2. **Created configuration**: `rspack.config.js` with:
   - TypeScript support with decorators
   - Comprehensive externals for all dependencies 
   - Import.meta.url handling for transformers.js compatibility
   - Source map support
3. **Updated scripts** in `package.json`:
   - `build`: Uses Rspack in development mode with source maps
   - `build-watch`: Rspack watch mode
   - `vscode:prepublish`: Production build
   - Kept esbuild scripts for backwards compatibility

### CLI (`extensions/cli/`)

1. **Added dependencies**: `@rspack/cli`, `@rspack/core`, plus external dependencies
2. **Created configuration**: `rspack.config.cjs` (CommonJS due to ESM package) with:
   - ESM output with createRequire compatibility
   - TypeScript and React support
   - Local package aliases
   - Minimal externals (only native modules)
3. **Updated scripts** in `package.json`:
   - `build:bundle`: Uses Rspack instead of esbuild
   - Kept esbuild script as `build:bundle:esbuild` for backwards compatibility

## Key Technical Changes

### Externals Strategy

**VSCode Extension**: Uses comprehensive externals since it runs in the VSCode Node.js environment where dependencies are available.

**CLI**: Bundles most dependencies to create a self-contained executable, only externalizing native modules.

### TypeScript Decorators

Both configurations enable TypeScript decorators support: