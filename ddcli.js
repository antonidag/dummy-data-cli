#!/usr/bin/env node

import { Command } from 'commander';
import dummyjson from 'dummy-json';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import inquirer from 'inquirer';

const program = new Command();

program
  .option('-t, --template <path>', 'Path to the template JS file')
  .option('-s, --start <number>', 'Starting index', 0)
  .option('-i, --increment <number>', 'Increment value', 1)
  .option('-e, --stop <number>', 'Stopping index', 10500)
  .option('-o, --output <path>', 'Output folder', './output')
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

(async function generateFiles() {
  try {
    const templatePath = path.resolve(options.template);
    const templateURL = pathToFileURL(templatePath).href;
    const { main } = await import(templateURL);

    const { confirm } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirm',
        message: `You are about to generate ${calculateIterations(start, increments, stop)} files.\nStarting at ${start} with increments of ${increments} and end at ${stop}?\nTemplate: ${String(main)}`,
        default: false,
      },
    ]);

    if (!confirm) {
      console.log('Operation cancelled.');
      return;
    }

    for (let index = start; index < stop; index += increments) {
      console.log(`Writing file ${index}.${fileExtension}`);
      const template = main(index);
      console.log(template);
      const parsedData = dummyjson.parse(template);
      const filePath = path.join(outputFolder, `${fileNamePrefix}${fileNameSeparator}${index}.${fileExtension}`);

      await fs.mkdir(outputFolder, { recursive: true });
      await fs.writeFile(filePath, parsedData);
      console.log(`File ${index}.${fileExtension} written successfully.`);
    }
  } catch (err) {
    console.error(`Error: ${err.message}`);
  }
})();

function calculateIterations(start, increments, stop) {
  if (increments <= 0) {
    throw new Error("Increments must be a positive number");
  }

  const iterations = (stop - start) / increments;
  return iterations;
}
