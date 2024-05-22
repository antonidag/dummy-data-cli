#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import { DDG } from './src/api.js';

const program = new Command();

program
  .option('-t, --template <string>', 'Path to the template JS file')
  .option('-s, --start <number>', 'Starting index', 1)
  .option('-i, --increment <number>', 'Increment value', 1)
  .option('-e, --stop <number>', 'Stopping index', 10)
  .option('-o, --output <string>', 'Output folder', '.')
  .option('-f, --file-prefix <string>', 'File name prefix', 'generated')
  .option('-x, --file-extension <string>', 'File extension', 'json')
  .option('-p, --separator <string>', 'File name separator', '_')
  .parse(process.argv);

const options = program.opts();

const start = parseInt(options.start, 10);
const increments = parseInt(options.increment, 10);
const stop = parseInt(options.stop, 10);
const outputFolder = options.output;
const fileExtension = options.fileExtension;
const fileNamePrefix = options.filePrefix;
const fileNameSeparator = options.separator;
const templatePath = options.template;
const api = new DDG(fileNamePrefix, fileNameSeparator, fileExtension, start, stop, increments, outputFolder, templatePath);

(async function main() {
  try {
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `You are about to generate ${api.calculateIterations(start, increments, stop)} files.\nStarting at ${start} with increments of ${increments} and end at ${stop}?`,
        default: false,
      },
    ]);
    if (!confirm) {
      console.log('Operation cancelled.');
      return;
    }
    await api.generateFile();

  } catch (err) {
    console.error(`Error Message: ${err.message}.\nRaw error: ${err}`);
  }
})();