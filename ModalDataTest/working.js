const util = require('util');

const testData = {
  name: 'John Doe',
  age: 42,
  address: {
    street: '123 Main St',
    city: 'Anytown',
    state: 'CA',
    zip: '12345'
  },
  nestedData: {
    nestedName: 'Jane Doe',
    nestedAge: 32,
    nestedObj: {
      nestedObjName: 'Joe Doe',
      nestedObjAge: 22,
      nestedObjObj: {
        nestedObjObjName: 'Jill Doe',
        nestedObjObjAge: 12
      }
    }
  }
}

const convertedData = [];
let prevChildArray = [];

const convertToModalData = (obj, IsChildren) => {

  const childArray = [];

  for (let [key, value] of Object.entries(obj)) {

    childArray.push({ label: key, data: value });

    if (typeof value === 'object' && value !== null) {
      prevChildArray.push(childArray);
      convertToModalData(value, true);
    }
  }

  if (IsChildren) {
    let lastChildArray = prevChildArray[prevChildArray.length - 1]; 
    lastChildArray[lastChildArray.length - 1] = { label: lastChildArray[lastChildArray.length - 1].label, children: childArray };
    prevChildArray.pop();
  } else {
    convertedData.push(...childArray);
  }
}

convertToModalData(testData, false);

console.log(util.inspect(convertedData, false, null, true));