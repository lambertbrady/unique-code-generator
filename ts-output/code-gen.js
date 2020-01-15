"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
// A random 6-character code
// Each code generated is composed of characters `A-Z` and numbers `0-9`, excluding characters that are ambiguous to read: I (eye), L (el), 1 (one), 0 (zero), O (oh)
// Each code generated does not contain any forbidden words in this list, consecutive (RATS42) or non-consecutive (3RQATS).
// The provided list is a small sampling for this problem. In practice, our forbidden word list has around 50-100 words.
async function fetchWords() {
    let response;
    let text;
    try {
        response = await node_fetch_1.default('https://gitcdn.link/repo/ahamburger/8f609c3a57aee907bd426ef66cd6fb1a/raw/1bef175bfa7da130f0f1ea723b625f0f9a0ce5cb/desmos_distracting_words');
        text = await response.text();
    }
    catch (error) {
        throw new Error(error);
    }
    return text.split('\n');
}
function getArrayDifference(arrayA, arrayB) {
    return arrayA.filter(element => !arrayB.includes(element));
}
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
function getRandomArray(length, charList) {
    // convert charList to Set, which removes any duplicate values, and then convert back to Array
    const charsUnique = [...new Set(charList)];
    // create array with specified length and fill with random characters from list, then convert to string
    return [...Array(length)].map(() => getRandomElement(charsUnique));
}
function containsWord(testStr, word) {
    // match 0 or more instances of any character
    const matcher = '.*';
    // pattern for 'test' is '.*t.*e.*s.*t.*'
    const pattern = matcher + [...word].join(matcher) + matcher;
    return new RegExp(pattern, 'gi').test(testStr);
}
function genCode(codeLength, charList, wordList) {
    // if (typeof codeLength !== 'number' || !Number.isInteger(codeLength) || codeLength <= 0) {
    //    throw new Error('codeLength must be an integer greater than 0');
    // }
    // if (charList.some(el => !(el instanceof String) && el.length !== 1)) {
    //    throw new Error('Every element of charList must be an instanceof String with length of 1');
    // }
    // convert random array to string
    const code = getRandomArray(codeLength, charList).join('');
    // ignore any word whose length is greater than codeLength, then set match to true if any word is contained in code string
    const match = wordList
        .filter(word => word.length <= codeLength)
        .reduce((isMatch, word) => {
        if (isMatch)
            return isMatch;
        return containsWord(code, word);
    }, false);
    // generate a new code and try again if any match is found, otherwise return successful code
    return (match) ? genCode(codeLength, charList, wordList) : code;
}
const charsAlphaNumeric = [...'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const charsExcluded = ['I', 'L', '1', '0', 'O'];
const charsPossible = getArrayDifference(charsAlphaNumeric, charsExcluded);
fetchWords().then(words => {
    const code = genCode(6, charsPossible, words);
    console.log(words);
    console.log(code);
});
