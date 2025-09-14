import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

// Lazy imports to avoid initialization issues
let machineIdSync: (() => string) | undefined;
let isAuthenticatedConfig: ((config: any) => boolean) | undefined;
let loadAuthConfig: (() => any) | undefined;

async function lazyImports() {
  if (!machineIdSync || !isAuthenticatedConfig || !loadAuthConfig) {
    const { machineIdSync: _machineIdSync } = await import("node-machine-id");
    const { isAuthenticatedConfig: _isAuthenticatedConfig, loadAuthConfig: _loadAuthConfig } = await import("./auth/workos.js");
    machineIdSync = _machineIdSync;
    isAuthenticatedConfig = _isAuthenticatedConfig;
    loadAuthConfig = _loadAuthConfig;
  }
  return { machineIdSync, isAuthenticatedConfig, loadAuthConfig };
}

import { logger } from "./util/logger.js";

export function getVersion(): string {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const packageJsonPath = join(__dirname, "../package.json");
    const packageJson = JSON.parse(readFileSync(packageJsonPath, "utf8"));
    return packageJson.version;
  } catch {
    console.warn("Warning: Could not read version from package.json");
    return "unknown";
  }
}

async function getEventUserId(): Promise<string> {
  const { machineIdSync, isAuthenticatedConfig, loadAuthConfig } = await lazyImports();
  
  const authConfig = loadAuthConfig();

  if (isAuthenticatedConfig(authConfig)) {
    return authConfig.userId;
  }

  // Fall back to unique machine id if not signed in
  return machineIdSync();
}

// Singleton to cache the latest version result
let latestVersionCache: Promise<string | null> | null = null;

export async function getLatestVersion(
  signal?: AbortSignal,
): Promise<string | null> {
  // Return cached promise if it exists
  if (latestVersionCache) {
    return latestVersionCache;
  }

  // Create and cache the promise
  latestVersionCache = (async () => {
    try {
      const id = await getEventUserId();
      const response = await fetch(
        `https://api.continue.dev/cn/info?id=${encodeURIComponent(id)}`,
        { signal },
      );
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.version;
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        // Request was aborted, don't log
        return null;
      }
      logger?.debug(
        "Warning: Could not fetch latest version from api.continue.dev",
      );
      return null;
    }
  })();

  return latestVersionCache;
}

// Defer the version fetch to avoid module initialization issues
setTimeout(() => {
  getLatestVersion()
    .then((version) => {
      if (version) {
        logger?.info(`Latest version: ${version}`);
      }
    })
    .catch((error) => {
      logger?.debug(
        `Warning: Could not fetch latest version from api.continue.dev: ${error}`,
      );
    });
}, 0);

export function compareVersions(
  current: string,
  latest: string,
): "newer" | "same" | "older" {
  if (current === "unknown" || latest === "unknown") {
    return "same";
  }

  // Simple semantic version comparison
  const parseVersion = (version: string) => {
    const parts = version
      .replace(/^v/, "")
      .split(".")
      .map((part) => parseInt(part, 10));
    return { major: parts[0] || 0, minor: parts[1] || 0, patch: parts[2] || 0 };
  };

  const currentParts = parseVersion(current);
  const latestParts = parseVersion(latest);

  if (currentParts.major > latestParts.major) return "newer";
  if (currentParts.major < latestParts.major) return "older";
  if (currentParts.minor > latestParts.minor) return "newer";
  if (currentParts.minor < latestParts.minor) return "older";
  if (currentParts.patch > latestParts.patch) return "newer";
  if (currentParts.patch < latestParts.patch) return "older";

  return "same";
}
