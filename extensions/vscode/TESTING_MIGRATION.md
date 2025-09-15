# VSCode Extension Testing Migration

This document describes the migration from Vitest to Mocha for VSCode extension testing.

## Overview

The VSCode extension testing has been migrated to follow VSCode extension best practices:

- **New (Recommended)**: Mocha-based tests in `src/test/` directory
- **Legacy**: Existing Vitest tests (`.vitest.ts` files) for backward compatibility

## Running Tests

### All Tests
```bash
npm test
```

### New Mocha Tests Only
```bash
npm run test:unit
```

### Legacy Vitest Tests Only  
```bash
npm run test:legacy
```

## Migration Guide

### For New Tests
Create tests in `src/test/suite/` using the Mocha pattern:

```typescript
import { expect } from "chai";

suite("Test Suite Name", () => {
  test("should do something", () => {
    expect(1 + 1).to.equal(2);
  });
});
```

### Migrating Existing Tests
1. Convert `describe` -> `suite`
2. Convert `it` -> `test` 
3. Convert `beforeEach` -> `setup`
4. Replace Vitest mocking with appropriate VSCode test patterns
5. Move file from `*.vitest.ts` to `src/test/suite/*.test.ts`

## Benefits of Migration

1. **VSCode Native Testing**: Follows VSCode extension development best practices
2. **Better IDE Integration**: Native VS Code test runner support
3. **Standard Tooling**: Uses the same testing framework as VSCode itself
4. **Future-Proof**: Aligns with Microsoft's recommendations

## Files Modified

- `.github/workflows/pr-checks.yaml`: Updated workflow to use new test command
- `package.json`: Added Mocha testing scripts and dependencies
- `src/test/`: New test directory structure
- `.mocharc.json`: Mocha configuration
- `vitest.config.ts`: Maintained for legacy tests during migration

## Next Steps

1. Gradually migrate `.vitest.ts` files to Mocha format
2. Remove vitest dependency once all tests are migrated  
3. Update CI/CD workflows to use VSCode extension test patterns