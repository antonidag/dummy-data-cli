import { calculateIterations, writeFile } from './utils.js'; // Make sure to import the function correctly
import fs from 'fs/promises'; // Import fs module for mocking

jest.mock('fs/promises');

describe('writeFile', () => {
    afterEach(() => {
        jest.clearAllMocks(); // Reset mocks after each test
    });

    it('should create directories and write data to a file', async () => {
        // Define test data
        const outputFolder = '/path/to/output/folder';
        const filePath = '/path/to/output/folder/testFile.txt';
        const data = 'Hello, world!';

        // Mock fs.mkdir to resolve successfully
        fs.mkdir.mockResolvedValue();

        // Mock fs.writeFile to resolve successfully
        fs.writeFile.mockResolvedValue();

        // Call the function with test data
        const result = await writeFile(outputFolder, filePath, data);

        // Assertions
        expect(fs.mkdir).toHaveBeenCalledWith(outputFolder, { recursive: true });
        expect(fs.writeFile).toHaveBeenCalledWith(filePath, data);
        expect(result).toBe(true);
    });

    it('should throw an error if writing fails', async () => {
        // Define test data
        const outputFolder = '/path/to/output/folder';
        const filePath = '/path/to/output/folder/testFile.txt';
        const data = 'Hello, world!';

        // Mock fs.mkdir to resolve successfully
        fs.mkdir.mockResolvedValue();

        // Mock fs.writeFile to reject with an error
        const errorMessage = 'Failed to write file';
        fs.writeFile.mockRejectedValue(new Error(errorMessage));

        // Call the function with test data and expect it to throw an error
        await expect(writeFile(outputFolder, filePath, data)).rejects.toThrow(errorMessage);

        // Assertions
        expect(fs.mkdir).toHaveBeenCalledWith(outputFolder, { recursive: true });
        expect(fs.writeFile).toHaveBeenCalledWith(filePath, data);
    });
});



describe('calculateIterations', () => {
    it('should calculate the correct number of iterations', () => {
        const start = 0;
        const increments = 2;
        const stop = 10;
        const result = calculateIterations(start, increments, stop);
        expect(result).toBe(5);
    });

    it('should throw an error if increments is not a positive number', () => {
        const start = 0;
        const increments = -1;
        const stop = 10;
        expect(() => calculateIterations(start, increments, stop)).toThrow("Increments must be a positive number");
    });

    it('should return 0 if start equals stop', () => {
        const start = 0;
        const increments = 1;
        const stop = 0;
        const result = calculateIterations(start, increments, stop);
        expect(result).toBe(0);
    });

    it('should handle non-integer increments', () => {
        const start = 0;
        const increments = 2.5;
        const stop = 10;
        const result = calculateIterations(start, increments, stop);
        expect(result).toBe(4);
    });
});
