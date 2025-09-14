import chalk from "chalk";

import { startRemoteTUIChat } from "../ui/index.js";
import { logger } from "../util/logger.js";

export async function remoteTest(
  prompt?: string,
  url: string = "http://localhost:8000",
) {
  console.info(chalk.white(`Connecting to remote environment at ${url}...`));

  try {
    // Record session start
    try {
      // Start the TUI in remote mode
      await startRemoteTUIChat(url, prompt);
    } finally {    }
  } catch (error: any) {
    logger.error(
      chalk.red(`Failed to connect to remote environment: ${error.message}`),
    );
    process.exit(1);
  }
}
