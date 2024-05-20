import dummyjson from 'dummy-json';
import fs from 'node:fs/promises';
import { forEachBenchmarkTemplate } from './templates/main.js';

const start = 0;
const increments = 500;
const stop = 10500;
const outputFolder = './output'; 
const fileExtension = 'json';
const fileNamePrefix = 'generated';
const fileNameSeparator  = '_';

const iterations = calculateIterations(start, increments, stop);
console.log(`Number of files generated: ${iterations}`);

(async function generateFiles() {
    for (let index = start; index < stop; index += increments) {
        try {
            console.log(`Writing file ${index}.json`);
            const template = forEachBenchmarkTemplate(index);
            console.log('Applied template: ' + template);
            
            const filePath = `${outputFolder}/${fileNamePrefix}${fileNameSeparator}${index}.${fileExtension}`;
            const data = dummyjson.parse(template);
            
            await fs.writeFile(filePath, data);
        } catch (err) {
            console.error(`Error writing file ${index}: ${err}`);
        }
    }
})();

function calculateIterations(start, increments, stop) {
    if (increments <= 0) {
        throw new Error("Increments must be a positive number");
    }
    
    // Calculate the number of iterations required
    const iterations = (stop - start) / increments;
    
    return iterations;
}
