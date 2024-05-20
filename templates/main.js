
export function forEachBenchmarkTemplate(index) {
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