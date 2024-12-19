import * as shell from "shelljs";
import * as fs from "fs";

export function addLintStaged() {
  // Install lint-staged dependencies

  console.log("Installing lint-staged dependencies...");
  shell.exec("pnpm install --save-dev lint-staged imagemin-lint-staged");

  // Create .lintstagedrc.js file
  console.log("Creating .lintstagedrc.js file...");
  const lintStagedConfig = `
const path = require("path");

const buildEslintCommand = (filenames) =>
  \`next lint --fix --file \${filenames
    .map((f) => path.relative(process.cwd(), f))
    .join(" --file ")}\`;

module.exports = {
  "*.{js,jsx,ts,tsx}": [buildEslintCommand],
  "*.{png,jpeg,jpg,gif,svg}": ["imagemin-lint-staged"],
};
  `;
  shell.ShellString(lintStagedConfig).to(".lintstagedrc.js");
  console.log(".lintstagedrc.js created successfully!");

  // Add .lintstagedrc.js to .eslintignore
  const eslintIgnoreFile = ".eslintignore";
  const lintStagedEntry = ".lintstagedrc.js";

  if (!fs.existsSync(eslintIgnoreFile)) {
    console.log(`${eslintIgnoreFile} does not exist. Creating it...`);
    fs.writeFileSync(eslintIgnoreFile, `${lintStagedEntry}\n`);
    console.log(`${lintStagedEntry} added to ${eslintIgnoreFile}.`);
  } else {
    const eslintIgnoreContent = fs.readFileSync(eslintIgnoreFile, "utf8");
    if (!eslintIgnoreContent.includes(lintStagedEntry)) {
      fs.appendFileSync(eslintIgnoreFile, `\n${lintStagedEntry}\n`);
      console.log(`${lintStagedEntry} added to ${eslintIgnoreFile}.`);
    } else {
      console.log(`${lintStagedEntry} is already in ${eslintIgnoreFile}.`);
    }
  }
}
