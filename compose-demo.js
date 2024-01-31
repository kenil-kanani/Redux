const removeSpaces = (str) => str.replace(' ', '');
const repeatString = (str) => str.repeat(2);
const makeUpperCase = (str) => str.toUpperCase();
const makeItalic = (str) => str.italics();

const str = 'hello world';
const result1 = makeItalic(makeUpperCase(repeatString(removeSpaces(str))));

console.log(result1); // <i>HELLOHELLO</i>



// alternative

const fuctionsArr = [str, removeSpaces, repeatString, makeUpperCase, makeItalic];
const result2 = fuctionsArr.reduce((currentValue, currentFunction) => {
    return currentFunction(currentValue);
});

console.log(result2); // <i>HELLOHELLO</i>