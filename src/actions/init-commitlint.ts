import * as shell from "shelljs";

export function InitCommitLint() {
  console.log("Setting up commitlint...");
  shell.exec("pnpm add --save-dev @commitlint/{cli,config-conventional}");
  shell
    .ShellString(
      "export default { extends: ['@commitlint/config-conventional'] };"
    )
    .to("commitlint.config.ts");
  if (!shell.test("-d", ".husky")) {
    console.log("Husky is not set up. Installing and initializing Husky...");
    // Install Husky
    shell.exec("pnpm install --save-dev husky");

    // Initialize Husky
    shell.exec("pnpm exec husky init");
  }

  const commitLintScript = "npx --no -- commitlint --edit $1";

  shell.ShellString(commitLintScript).to(".husky/commit-msg");

  console.log("Commitlint configured successfully!");
}
