import fs from 'fs/promises';
/**
* Writes parsed data to a file, creating directories as needed.
* @param {string} outputFolder - The folder where the file will be saved.
* @param {string} filePath - The full path to the file.
* @param {string} data - The data to be written to the file.
* @returns {Promise<boolean>}
*/
export async function writeFile(outputFolder, filePath, data) {
  try {
    await fs.mkdir(outputFolder, { recursive: true });
    await fs.writeFile(filePath, data);
    return true
  } catch (error) {
    throw new Error(`Error writing file to ${filePath}: ${error}`);
  }
}

/**
 * Calculates the number of iterations based on start, increments, and stop values.
 * @param {number} start - The starting index.
 * @param {number} increments - The increment value for each iteration.
 * @param {number} stop - The stopping index.
 * @returns {number} - The number of iterations.
 * @throws {Error} - Throws an error if increments is not a positive number.
 */
export function calculateIterations(start, increments, stop) {
  if (increments <= 0) {
    throw new Error("Increments must be a positive number");
  }
  const iterations = stop / increments;
  return iterations;
}

/**
 * Validates input to be an non empty string
 * @param {string} input - The input string.
 * @param {string} flag - The flag string.
 * @returns {number} - The valid string.
 * @throws {Error} - Throws an error if input is empty or not a string.
 */
export function validateFilePathString(input, flag) {
  if (typeof input != 'string') {
    throw new Error(`${flag}: input was not a string`);
  }
  if (input.length == 0) {
    throw new Error(`${flag}: input was not a string`);
  }
  return input;
}

/**
 * Validates input to be an integer
 * @param {string} input - The input string.
 * @param {string} flag - The flag string.
 * @returns {number} - The valid number.
 * @throws {Error} - Throws an error if input is not an integer.
 */
export function validateInteger(input, flag) {

  const isInteger = parseInt(input);
  if (Number.isNaN(isInteger)) {
    throw new Error(`${flag}: input was not a number`);
  }
  if(!Number.isInteger(isInteger)){
    throw new Error(`${flag}: input was not a integer`);
  }
  if(isInteger < 0){
    throw new Error(`${flag}: input was less than 0`)
  }
  return isInteger;
}
