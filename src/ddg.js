import dummyjson from 'dummy-json';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { writeFile } from './utils.js';

/**
 * Data Generation Class
 */
export class DummyDataGenerator {
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
    try {
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

      await writeFile(this.outputFolder, filePath, parsedData);
      return true;
    } catch (error) {
      console.error('Error generating file:', error);
      throw error;
    }
  }

  /**
   * Loads a template module from a given file path.
   * @param {string} pathToFile - The file path to the template module.
   * @returns {Promise<Object>} - The imported template module.
   */
  async loadTemplate(pathToFile) {
    try {
      const templatePath = path.resolve(pathToFile);
      const templateURL = pathToFileURL(templatePath).href;
      return await import(templateURL);
    } catch (error) {
      console.error(`Error loading template from ${pathToFile}:`, error);
      throw error;
    }
  }
}
