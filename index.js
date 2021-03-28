// Get autocomplete field names
// See supported keys at https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete
const fields = {
    "givenName": "given-name",
    "lastName": "family-name",
    "phoneNumber": "tel",
    "email": "email",
    "password": "new-password"
}

const UPPERCASE_CHAR_CODES = {
    start: 64, // A
    end: 90, // Z
};

const LOWERCASE_CHAR_CODES = {
    start: 97, //a
    end: 122, // z
}

// Generte random integers
// https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
const getRandomInteger = (min = 1 , max = 10) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Decimal to Hex
// 0-255 -> '00'-'ff'
const dec2hex = (dec) => {
  return dec.toString(16).padStart(2, "0")
}

// String that can be used for name
const generateString = (length = 5) => {
    let string = '';
    for (let i = 0; i < length + 1; i++) {
        if (string.length === 0) {
            string += String.fromCharCode(getRandomInteger(UPPERCASE_CHAR_CODES.start, UPPERCASE_CHAR_CODES.end));
        } else {
            string += String.fromCharCode(getRandomInteger(LOWERCASE_CHAR_CODES.start, LOWERCASE_CHAR_CODES.end));
        }
    }
    return string;
}
// Generate a string with digits of arbitary length
const generateStringWithDigits = (length = 10) => {
    const arr = new Uint8Array((length) /2);
    const gen = window.crypto.getRandomValues(arr);
    return Array.from(gen, dec2hex).join('')
}

const emailDomain = () => '@example.com';

// Self explanatory
const generateRandomEmail = () => `${generateStringWithDigits()}${emailDomain()}`

// Generate random 10-digit phone number
const generateTel = (length = 10) => {
    let tel = '';
    for (let i = 0; i < length + 1; i++) {
        tel += getRandomInteger(0, 9);
    }
    return tel;
}

const getInputElement = (key) => {
    return document.querySelectorAll(`[autocomplete=${key}]`)[0];
}

// See https://github.com/facebook/react/issues/10135#issuecomment-314441175
function setNativeValue(element, value) {
  const valueSetter = Object.getOwnPropertyDescriptor(element, 'value').set;
  const prototype = Object.getPrototypeOf(element);
  const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value').set;
  
  if (valueSetter && valueSetter !== prototypeValueSetter) {
  	prototypeValueSetter.call(element, value);
  } else {
    valueSetter.call(element, value);
  }
}

const fillFormField = (key, value) => {
    const field = getInputElement(key);
    if (field) {
        setNativeValue(field, value);
        field.dispatchEvent(new Event('input', { bubbles: true }))
    }
}

const main = () => {
    fillFormField(fields[ 'givenName' ], generateString(10))
    fillFormField(fields[ 'lastName' ], generateString(10))
    fillFormField(fields[ 'email' ], generateRandomEmail())
    fillFormField(fields[ 'phoneNumber' ], generateTel())
    fillFormField(fields[ 'password' ], '1234ASDF*a')
}

main()
