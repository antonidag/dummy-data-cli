// Import necessary modules and the DummyDataGenerator class
import { DummyDataGenerator } from './ddg.js';
import * as dummyjson from 'dummy-json';
import { writeFile } from './utils.js';

// Mock the dependencies
jest.mock('dummy-json');
jest.mock('node:path');
jest.mock('node:url');
jest.mock('./utils');

describe('DummyDataGenerator', () => {
  let generator;

  beforeEach(() => {
    // Initialize a new DummyDataGenerator instance for each test
    generator = new DummyDataGenerator(
      'test', '_', 'json', 0, 10, 2, '/output', '/template'
    );
  });

  afterEach(() => {
    // Clear all mocks after each test
    jest.clearAllMocks();
  });

  describe('generateFile', () => {
    it('should generate a file with parsed data', async () => {
      // Mock the loadTemplate method
      generator.loadTemplate = jest.fn().mockResolvedValue({
        main: jest.fn().mockReturnValue('{"name": "John"}')
      });

      // Mock the dummyjson.parse method
      dummyjson.parse.mockReturnValue('{"name": "John"}');

      // Call generateFile method
      const result = await generator.generateFile();

      // Assertions
      expect(result).toBe(true);
      expect(dummyjson.parse).toHaveBeenCalledWith('{"name": "John"}');
      expect(writeFile).toHaveBeenCalledWith('/output', undefined, '{"name": "John"}');
    });

    it('should update the counter after generating a file', async () => {
      // Mock the loadTemplate method
      generator.loadTemplate = jest.fn().mockResolvedValue({
        main: jest.fn().mockReturnValue('{}')
      });

      // Mock the dummyjson.parse method
      dummyjson.parse.mockReturnValue('{}');

      // Call generateFile method
      await generator.generateFile();

      // Check if the counter is updated correctly
      expect(generator.counter).toBe(2);
    });

    it('should return false if stop condition is met', async () => {
      // Set the counter to exceed the stop condition
      generator.counter = 10;

      // Call generateFile method
      const result = await generator.generateFile();

      // Assertions
      expect(result).toBe(false);
      expect(dummyjson.parse).not.toHaveBeenCalled();
      expect(writeFile).not.toHaveBeenCalled();
    });

    it('should throw an error if an error occurs during file generation', async () => {
      // Mock the loadTemplate method to throw an error
      generator.loadTemplate = jest.fn().mockRejectedValue(new Error('Template error'));

      // Call generateFile method and expect it to throw an error
      await expect(generator.generateFile()).rejects.toThrow('Error generating file: Error: Template error');
    });
  });
});
