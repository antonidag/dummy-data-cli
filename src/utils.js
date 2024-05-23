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