const util = require('util');

const validate = (a) => {
    let newArr = [];
    for (const key in a) {
        if (key) {
            newArr.push({ data: key, label: key, childern: validate(a[key]) });
        }
    }
    return newArr;
}

const a = {
    "com": {
        "ups": {
            "demo": {
                "a": 9
            }
        }
    }
};

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

console.log(util.inspect(validate(a), false, null, true)); 