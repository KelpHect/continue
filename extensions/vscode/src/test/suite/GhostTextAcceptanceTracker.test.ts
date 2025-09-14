import { expect } from "chai";
import * as path from "path";

// Simple test to verify the mocha setup works
suite("Basic Test Suite", () => {
  test("should run a basic test", () => {
    expect(1 + 1).to.equal(2);
  });

  test("should verify path operations", () => {
    const testPath = path.join("test", "path");
    expect(testPath).to.include("test");
  });
});