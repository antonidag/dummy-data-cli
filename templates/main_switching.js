export function main(counter) {
  let template = '['
  for (let index = 0; index < counter; index++) {
    if (index % 2 == 0) {
      template = template.concat(templateWithAdditionalData(index))
    }else {
      template = template.concat(basicTemplate())
    }
    template = template.concat(',')

  }
  template = template.concat(']')
  return template;
}

function templateWithAdditionalData(index) {
  return `
  {
    "id": ${index},
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
    "status": "active",
    "orderId": "{{guid}}"
  }
`
}
function basicTemplate(index) {
  return `
  {
    "id": ${index},
    "price": "$ {{int 0 99999 '0,0'}}",
    "status": "{{random 'inactive' 'paused' }}"
  }`
}