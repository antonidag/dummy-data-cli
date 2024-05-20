import dummyjson from 'dummy-json';
import fs from 'node:fs';
import { forEachBenchmarkTemplate } from './templates/main.js';


const start = 0;
const increments = 500;
const stop = 10000;
const outputFolder = './output'; 
const fileExtension = 'json';
const fileNamePrefix = 'generated';
const fileNameSeparator  = '_';
const loadTemplate = () => {};

const iterations = calculateIterations(start, increments, stop);
console.log(`Number of files generated: ${iterations}`);

for (let index = start; index < stop;) {
    console.log(`Writing file ${index}.json`)
    const template = loadTemplate();

    fs.writeFile(`${outputFolder}/${fileNamePrefix}${fileNameSeparator}${index}.${fileExtension}`, dummyjson.parse(template), err => {
        if (err) {
            throw new Error(err);
        } else {

        }
    });


    index = index + increments;
}

function calculateIterations(start, increments, stop) {
    if (increments <= 0) {
        throw new Error("Increments must be a positive number");
    }
    
    // Calculate the number of iterations required
    const iterations = (stop - start) / increments;
    
    return iterations;
}


