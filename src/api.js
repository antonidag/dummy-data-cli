import dummyjson from 'dummy-json';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

/**
 * Data Generation Class
 */
export class DDG {
  /**
   * Constructs an instance of the DDG class.
   * @param {string} fileNamePrefix - The prefix for the generated file names.
   * @param {string} fileNameSeparator - The separator used in the file names.
   * @param {string} fileExtension - The extension for the generated files.
   * @param {number} start - The starting index for file generation.
   * @param {number} stop - The stopping index for file generation.
   * @param {number} increments - The increment value for each file name.
   * @param {string} outputFolder - The folder where generated files will be saved.
   * @param {string} templatePath - The path to the template file.
   */
  constructor(fileNamePrefix, fileNameSeparator, fileExtension, start, stop, increments, outputFolder, templatePath) {
    this.fileNamePrefix = fileNamePrefix;
    this.fileNameSeparator = fileNameSeparator;
    this.fileExtension = fileExtension;
    this.start = start;
    this.stop = stop;
    this.increments = increments;
    this.outputFolder = outputFolder;
    this.templatePath = templatePath;
    this.counter = 0;
  }

  /**
   * Generates a file with the current counter value and updates the counter.
   * @returns {Promise<boolean>} - Returns true if the file was generated, false if the stop condition is met.
   */
  async generateFile() {
    if (this.counter >= this.stop) {
      return false;
    }

    const index = this.counter;
    this.counter += this.increments;

    const { main } = await this.loadTemplate(this.templatePath);
    const dynamicTemplate = main(index);
    const parsedData = dummyjson.parse(dynamicTemplate);

    const finalFileName = `${this.fileNamePrefix}${this.fileNameSeparator}${index}.${this.fileExtension}`;
    const filePath = path.join(this.outputFolder, finalFileName);

    await this.writeFile(this.outputFolder, filePath, parsedData);
    return true;
  }

  /**
   * Calculates the number of iterations based on start, increments, and stop values.
   * @param {number} start - The starting index.
   * @param {number} increments - The increment value for each iteration.
   * @param {number} stop - The stopping index.
   * @returns {number} - The number of iterations.
   * @throws {Error} - Throws an error if increments is not a positive number.
   */
  calculateIterations(start, increments, stop) {
    if (increments <= 0) {
      throw new Error("Increments must be a positive number");
    }
    const iterations = (stop - start) / increments;
    return iterations;
  }

  /**
   * Loads a template module from a given file path.
   * @param {string} pathToFile - The file path to the template module.
   * @returns {Promise<Object>} - The imported template module.
   */
  async loadTemplate(pathToFile) {
    const templatePath = path.resolve(pathToFile);
    const templateURL = pathToFileURL(templatePath).href;

    return await import(templateURL);
  }

  /**
   * Writes parsed data to a file, creating directories as needed.
   * @param {string} outputFolder - The folder where the file will be saved.
   * @param {string} filePath - The full path to the file.
   * @param {string} parsedData - The data to be written to the file.
   * @returns {Promise<void>}
   */
  async writeFile(outputFolder, filePath, parsedData) {
    await fs.mkdir(outputFolder, { recursive: true });
    await fs.writeFile(filePath, parsedData);
  }
}
