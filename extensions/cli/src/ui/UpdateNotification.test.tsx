// Mock the version module before any other imports
vi.mock("../version.js", () => ({
  getVersion: vi.fn(),
}));

// Mock useTerminalSize hook
vi.mock("./hooks/useTerminalSize.js", () => ({
  useTerminalSize: () => ({ columns: 80, rows: 24 }),
}));

import { render } from "ink-testing-library";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import * as versionModule from "../version.js";

import { UpdateNotification } from "./UpdateNotification.js";

const mockVersionModule = vi.mocked(versionModule);

describe("UpdateNotification", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should display CLI status in normal mode", () => {
    mockVersionModule.getVersion.mockReturnValue("1.0.0");

    const { lastFrame } = render(<UpdateNotification />);

    expect(lastFrame()).toContain("● Continue CLI");
  });

  it("should display remote mode indicator when in remote mode", () => {
    mockVersionModule.getVersion.mockReturnValue("1.0.0");

    const { lastFrame } = render(<UpdateNotification isRemoteMode={true} />);

    expect(lastFrame()).toContain("◉ Remote Mode");
  });

  it("should display CLI status when not in remote mode", () => {
    mockVersionModule.getVersion.mockReturnValue("1.0.0");

    const { lastFrame } = render(<UpdateNotification isRemoteMode={false} />);

    expect(lastFrame()).toContain("● Continue CLI");
  });
});
