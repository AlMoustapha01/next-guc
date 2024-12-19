import * as fs from "fs";
import * as shell from "shelljs";

export function addPrettierToESLintConfig() {
  const eslintConfigFilePath = fs.existsSync("eslint.config.mjs")
    ? "eslint.config.mjs"
    : fs.existsSync(".eslintrc.json")
    ? ".eslintrc.json"
    : null;
  if (!eslintConfigFilePath) {
    console.log(`Eslint config does not exist.`);
    return;
  }

  console.log("Adding Prettier to ESLint configuration...");
  shell.exec("pnpm add --save-dev eslint-config-prettier");

  const eslintContent = fs.readFileSync(eslintConfigFilePath, "utf8");

  let updatedContent: string | null = null;

  // Match `compat.extends` syntax
  if (eslintContent.includes("compat.extends")) {
    updatedContent = eslintContent.replace(
      /compat\.extends\((.*?)\)/,
      (match, config) => {
        if (config.includes('"prettier"')) {
          console.log('"prettier" is already included in compat.extends.');
          return match;
        }
        return `compat.extends(${config.trim().slice(0, -1)}, "prettier")`;
      }
    );
  }

  // Match plain `extends` arrays in objects
  else if (eslintContent.includes('"extends":')) {
    updatedContent = eslintContent.replace(
      /"extends":\s*\[(.*?)\]/,
      (match, config) => {
        if (config.includes('"prettier"')) {
          console.log('"prettier" is already included in extends.');
          return match;
        }
        return `"extends": [${config.trim().slice(0, -1)}, "prettier"]`;
      }
    );
  }

  // Match `compat.config` syntax
  else if (eslintContent.includes("compat.config")) {
    updatedContent = eslintContent.replace(
      /extends:\s*\[(.*?)\]/,
      (match, config) => {
        if (config.includes('"prettier"')) {
          console.log(
            '"prettier" is already included in compat.config extends.'
          );
          return match;
        }
        return `extends: [${config.trim().slice(0, -1)}, "prettier"]`;
      }
    );
  }

  if (updatedContent) {
    fs.writeFileSync(eslintConfigFilePath, updatedContent);
    console.log(
      `Updated ${eslintConfigFilePath} to include "prettier" in extends.`
    );
  } else {
    console.log(
      `No recognizable ESLint configuration found in ${eslintConfigFilePath}.`
    );
  }
}
