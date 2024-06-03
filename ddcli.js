#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import { DummyDataGenerator } from './src/ddg.js';
import cliProgress from 'cli-progress';
import { calculateIterations, validateFilePathString, validateInteger } from './src/utils.js'

(async function main() {
  try {
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

    const { fileNamePrefix, fileNameSeparator, fileExtension, start, stop, increments, outputFolder, templatePath } = validateInputs(options);

    const ddg = new DummyDataGenerator(fileNamePrefix, fileNameSeparator, fileExtension, start, stop, increments, outputFolder, templatePath);

    const numberOfFiles = calculateIterations(start, increments, stop);
    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `You are about to generate ${numberOfFiles} files.\nStarting at ${start} with increments of ${increments} and end at ${stop}?`,
        default: false,
      },
    ]);
    if (!confirm) {
      console.log('Operation cancelled.');
      return;
    }
    const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
    bar.start(numberOfFiles, 0);
    while (await ddg.generateFile()) {
      bar.increment();
    }
    bar.stop();
    return 0;

  } catch (err) {
    console.error(`${err}`);
    return 1;
  }
})();

function validateInputs(options) {
  const start = validateInteger(options.start, '--start <number>');
  const increments = validateInteger(options.increment, '--increment <number>');
  const stop = validateInteger(options.stop, '--stop <number>');
  const outputFolder = validateFilePathString(options.output, '--output <string>');
  const fileExtension = options.fileExtension;
  const fileNamePrefix = options.filePrefix;
  const fileNameSeparator = options.separator;
  const templatePath = validateFilePathString(options.template, '--template <string>');
  return { fileNamePrefix, fileNameSeparator, fileExtension, start, stop, increments, outputFolder, templatePath };
}
