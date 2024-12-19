import * as shell from "shelljs";

export function InitHusky() {
  // Step 1: Check if Husky is installed
  if (!shell.test("-d", ".husky")) {
    console.log("Husky is not set up. Installing and initializing Husky...");

    // Install Husky
    shell.exec("pnpm install --save-dev husky");

    // Initialize Husky
    shell.exec("pnpm exec husky init");

    // Add Husky pre-commit hook for lint-staged

    const lintStagedCommand = "npx lint-staged";
    shell.ShellString(lintStagedCommand).to(".husky/pre-commit");
    console.log("Husky installed and initialized successfully.");
  } else {
    console.log("Husky is already set up.");
  }
}
