/**
* Writes parsed data to a file, creating directories as needed.
* @param {string} outputFolder - The folder where the file will be saved.
* @param {string} filePath - The full path to the file.
* @param {string} data - The data to be written to the file.
* @returns {Promise<boolean>}
*/
export default async function writeFile(outputFolder, filePath, data) {
  try {
    await fs.mkdir(outputFolder, { recursive: true });
    await fs.writeFile(filePath, data);
    return true
  } catch (error) {
    console.error(`Error writing file to ${filePath}:`, error);
    throw error;
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
export default function calculateIterations(start, increments, stop) {
  if (increments <= 0) {
    throw new Error("Increments must be a positive number");
  }
  const iterations = (stop - start) / increments;
  return iterations;
}