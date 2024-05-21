# Dummy Data CLI
## Background
I want to create a simple tool to create random data. The tool should support .json, .csv and other extensions. 
The user should define a javascript template and then feed that template into cli and output the files. 

Make Dummy Data CLI avalible on npm to install as cli tool. 
## Idea of usage 
User creates a .js file like the following: 
```
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
Then the user will only run the cli: 
```
ddcli -t ./templates/main.js -i 500 -s 0 -e 10500 -o ./output
```
This will then create 21, starting from 0, stoping at 10500 with increments of 500. 

## Potentials features
- Instead of using [dummy-json](https://www.npmjs.com/package/dummy-json) perhaps look into [Faker.js](https://fakerjs.dev/) since community and more well used framework.
- Switch out to Typescript! Or just use JSDoc? 
