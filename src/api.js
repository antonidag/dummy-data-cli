import dummyjson from 'dummy-json';
import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export class DDG {
  //Comment: could be nicer?
  constructor(fileNamePrefix, fileNameSeparator, fileExtension, start, stop, increments, outputFolder, templatePath) {
    this.fileNamePrefix = fileNamePrefix;
    this.fileNameSeparator = fileNameSeparator;
    this.fileExtension = fileExtension
    this.start = start;
    this.stop = stop;
    this.increments = increments;
    this.outputFolder = outputFolder;
    this.templatePath = templatePath;
    this.counter = 0;
  }

  async generateFile() {
    if (this.counter >= this.stop) {
      console.log("All files have been generated.");
      return;
    }

    const { main } = await this.loadTemplate(this.templatePath);
    const index = this.counter;
    this.counter += this.increments;

    const finalFileName = `${this.fileNamePrefix}${this.fileNameSeparator}${index}.${this.fileExtension}`;
    console.log(`Writing file ${finalFileName}`);
    const dynamicTemplate = main(index);

    const parsedData = dummyjson.parse(dynamicTemplate);
    const filePath = path.join(this.outputFolder, finalFileName);

    await this.writeFile(this.outputFolder, filePath, parsedData);
    console.log(`File ${finalFileName} written successfully.`);
  }
  calculateIterations(start, increments, stop) {
    if (increments <= 0) {
      throw new Error("Increments must be a positive number");
    }
    const iterations = (stop - start) / increments;
    return iterations;
  }

  async loadTemplate(pathToFile) {
    // Comment: add try catch? 
    const templatePath = path.resolve(pathToFile);
    const templateURL = pathToFileURL(templatePath).href;

    return await import(templateURL);
  }
  async writeFile(outputFolder, filePath, parsedData) {
    await fs.mkdir(outputFolder, { recursive: true });
    await fs.writeFile(filePath, parsedData);
  }
}

