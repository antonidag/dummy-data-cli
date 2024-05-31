# Dummy Data CLI
## Background
The Dummy Data CLI is a command-line interface tool that generates dummy data based on templates and saves it to files. It's useful for generating sample data for testing, prototyping, or populating databases.
## Installation 
You can install the Dummy Data CLI globally using npm:
```
npm install -g dummy-data-cli
```

## Usage
### Generating Dummy Data
To generate dummy data, use the generate command followed by the desired options:
```
ddcli [options]
```
#### Options
- -t, --template <path>: Path to the template file (required).
- -o, --output <folder>: Output folder where generated files will be saved (default: current directory).
- -p, --prefix <prefix>: Prefix for generated file names (default: 'dummy').
- -s, --separator <separator>: Separator used in generated file names (default: '_').
- -e, --extension <extension>: Extension for generated files (default: 'json').
- -b, --start <number>: Starting index for file generation (default: 0).
- -l, --stop <number>: Stopping index for file generation (default: 10).
- -i, --increments <number>: Increment value for each file name (default: 1).


## Templating
The Dummy Data CLI leverages the powerful templating engine provided by [dummy-json](https://www.npmjs.com/package/dummy-json) to generate realistic and customizable dummy data. Templates are defined using a combination of JSON structure and JavaScript functions, allowing for dynamic content generation.

### Template Requirements
- Your template file must export a function named `main`. This function should accept a single parameter.
- Templates are created as `.js` files, allowing you to use JavaScript to dynamically modify your templates. The main function must return the template as a string.
### Example Template:
```
// Define a JavaScript function that returns a template string
export function main(index) {
    return `
    [
      {{#repeat ${index}}}
      {
        "id": {{@index}},
        "name": "{{firstName}} {{lastName}}",
        "work": "{{company}}",
        "email": "{{email}}",
        "dob": "{{date '1900' '2000' 'YYYY'}}",
        "address": "{{int 1 100}} {{street}}",
        "city": "{{city}}",
        "optedin": {{boolean}},
        "coordinates": {
          "x": {{float -50 50 '0.00'}},
          "y": {{float -25 25 '0.00'}}
        },
        "price": "$ {{int 0 99999 '0,0'}}",
        "status": "{{random 'active' 'inactive' 'paused' }}"
      }
      {{/repeat}}
    ]`
}
```

In this example:

- The main function is exported, which accepts an index parameter.
- Within the template string, `{{#repeat ${index}}}` is used to repeat the template block based on the value of index.
- Placeholders like `{{firstName}}`, `{{lastName}}`, etc., are used to generate random data using built-in dummy-json helpers.

By combining JSON structure with JavaScript functions, you have full control over the structure and content of the generated dummy data. Customize the template according to your specific data requirements.

See more examples [here]().

## Example
Generate 5 JSON files with dummy user data:
```
ddcli -t template.js -s 0 -i 2 -e 10 -o ./output
```

## License
The source code for the site is licensed under the MIT license, which you can find in the LICENSE file.