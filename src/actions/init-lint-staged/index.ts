import { addPrettierToESLintConfig } from "./add-prettier-to-eslint";
import { addLintStaged } from "./add-lint-staged";
import { InitHusky } from "./init-husky";

export function InitLintStaged() {
  console.log("Setting up lint-staged...");

  InitHusky();

  addLintStaged();

  addPrettierToESLintConfig();

  console.log("Lint-staged setup completed.");
}
