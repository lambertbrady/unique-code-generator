"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const fetch = require('node-fetch');
// number defining length of code to be generated
const codeLength = 6;
const numCodes = 10;
// character arrays defining possible characters for use in generating code
const codeCharsIncluded = [...'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const codeCharsExcluded = ['I', 'L', '1', '0', 'O'];
// url of forbidden word list
const codeWordsForbiddenURL = 'https://gitcdn.link/repo/ahamburger/8f609c3a57aee907bd426ef66cd6fb1a/raw/1bef175bfa7da130f0f1ea723b625f0f9a0ce5cb/desmos_distracting_words';
function fetchWords(url) {
    return __awaiter(this, void 0, void 0, function* () {
        let text;
        try {
            const response = yield fetch(url);
            text = yield response.text();
        }
        catch (error) {
            throw new Error(error);
        }
        return text.split('\n');
    });
}
exports.fetchWords = fetchWords;
function getArrayDifference(arrayA, arrayB) {
    return arrayA.filter(element => !arrayB.includes(element));
}
exports.getArrayDifference = getArrayDifference;
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
exports.getRandomElement = getRandomElement;
function containsWord(testStr, word, matchCase = false) {
    if (testStr.length === 0 || word.length === 0) {
        throw new Error("Each argument must be string with length greater than 0");
    }
    // match 0 or more instances of any character
    const matcher = '.*';
    // pattern for 'test' is '.*t.*e.*s.*t.*'
    const pattern = matcher + Array.from(word).join(matcher) + matcher;
    // use case instensitive flag when matchCase is false
    const flag = (matchCase) ? 'g' : 'gi';
    return new RegExp(pattern, flag).test(testStr);
}
exports.containsWord = containsWord;
function genArrayRandom(length, charList) {
    if (charList.length <= 1) {
        throw new Error('character list must have at least one element');
    }
    // convert charList to Set, which removes any duplicate values, and then convert back to Array
    const charsUnique = [...new Set(charList)];
    // create array with specified length and fill with random characters from list, then convert to string
    return [...Array(length)].map(() => getRandomElement(charsUnique));
}
exports.genArrayRandom = genArrayRandom;
function genCode(codeLength, charList, wordList) {
    if (!Number.isInteger(codeLength) || codeLength <= 0) {
        throw new Error('First argument must be an integer greater than 0');
    }
    // convert random array to string
    const code = genArrayRandom(codeLength, charList).join('');
    // ignore any word whose length is greater than codeLength, then set match to true if any word is contained in code string
    const match = wordList
        .filter(word => word.length <= codeLength)
        .reduce((isMatch, word) => {
        if (isMatch)
            return isMatch;
        return containsWord(code, word);
    }, false);
    // generate a new code if any match is found, otherwise return successful code
    return (match) ? genCode(codeLength, charList, wordList) : code;
}
exports.genCode = genCode;
function addUnique(arr, generator, ...genArgs) {
    const code = generator.apply(undefined, genArgs);
    return (arr.includes(code)) ? addUnique(arr, generator, ...genArgs) : [...arr, code];
}
exports.addUnique = addUnique;
function genArrayUnique(length, arr, generator, ...genArgs) {
    return (length === arr.length) ? arr : genArrayUnique(length, addUnique(arr, generator, ...genArgs), generator, ...genArgs);
}
exports.genArrayUnique = genArrayUnique;
function genCodeArray(numCodes, codeLength, charList, wordList, codeArray = []) {
    return genArrayUnique(numCodes, codeArray, genCode, codeLength, charList, wordList);
}
exports.genCodeArray = genCodeArray;
function genCodeList(numCodes, codeLength, charList, wordList, list = []) {
    while (list.length < numCodes) {
        const code = genCode(codeLength, charList, wordList);
        if (!list.includes(code)) {
            list.push(code);
        }
    }
    return list;
}
exports.genCodeList = genCodeList;
const charsPossible = getArrayDifference(codeCharsIncluded, codeCharsExcluded);
fetchWords(codeWordsForbiddenURL).then(words => {
    const code = genCode(codeLength, charsPossible, words);
    console.log(`//////////////\n/// ${code} ///\n//////////////`);
    console.log('___genCodeList___');
    console.log(genCodeList(numCodes, codeLength, charsPossible, words));
    console.log('___genCodeArray___');
    console.log(genCodeArray(numCodes, codeLength, charsPossible, words));
});
