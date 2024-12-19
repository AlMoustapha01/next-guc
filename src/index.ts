#!/usr/bin/env node
import { Command } from "commander";
import { InitLintStaged } from "./actions/init-lint-staged/index";
import { InitCommitLint } from "./actions/init-commitlint";

const program = new Command();

// Command to set up lint-staged
program
  .command("config-lint-staged")
  .description("Set up lint-staged configuration")
  .action(InitLintStaged);

// Command to set up commitlint
program
  .command("config-commitlint")
  .description("Set up commitlint configuration")
  .action(InitCommitLint);

program.parse(process.argv);
