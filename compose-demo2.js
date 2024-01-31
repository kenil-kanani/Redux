import { compose } from 'redux';

const removeSpaces = (str) => str.replace(' ', '');
const repeatString = (str) => str.repeat(2);
const makeUpperCase = (str) => str.toUpperCase();
const makeItalic = (str) => str.italics();

const str = 'hello there how are you?';

let composedFunctions = compose(makeItalic, makeUpperCase, repeatString, removeSpaces);
// compose method takes bunch of functions and compose them to one chain of functions

console.log(composedFunctions(str)); // <i>HELLOTHEREHOWAREYOU?HELLOTHEREHOWAREYOU?</i>