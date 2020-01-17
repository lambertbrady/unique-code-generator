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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fetch = require('node-fetch');
// number defining length of code to be generated
var codeLength = 6;
// character arrays defining possible characters for use in generating code
var codeCharsIncluded = __spread('0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ');
var codeCharsExcluded = ['I', 'L', '1', '0', 'O'];
// url of forbidden word list
var codeWordsForbiddenURL = 'https://gitcdn.link/repo/ahamburger/8f609c3a57aee907bd426ef66cd6fb1a/raw/1bef175bfa7da130f0f1ea723b625f0f9a0ce5cb/desmos_distracting_words';
function fetchWords(url) {
    return __awaiter(this, void 0, void 0, function () {
        var text, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    response = _a.sent();
                    return [4 /*yield*/, response.text()];
                case 2:
                    text = _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    error_1 = _a.sent();
                    throw new Error(error_1);
                case 4: return [2 /*return*/, text.split('\n')];
            }
        });
    });
}
exports.fetchWords = fetchWords;
function getArrayDifference(arrayA, arrayB) {
    return arrayA.filter(function (element) { return !arrayB.includes(element); });
}
exports.getArrayDifference = getArrayDifference;
function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
exports.getRandomElement = getRandomElement;
function getRandomArray(length, charList) {
    // convert charList to Set, which removes any duplicate values, and then convert back to Array
    var charsUnique = __spread(new Set(charList));
    // create array with specified length and fill with random characters from list, then convert to string
    return __spread(Array(length)).map(function () { return getRandomElement(charsUnique); });
}
exports.getRandomArray = getRandomArray;
function containsWord(testStr, word) {
    if (testStr.length === 0 || word.length === 0) {
        throw new Error("Each argument must be string with length greater than 0");
    }
    // match 0 or more instances of any character
    var matcher = '.*';
    // pattern for 'test' is '.*t.*e.*s.*t.*'
    var pattern = matcher + __spread(word).join(matcher) + matcher;
    return new RegExp(pattern, 'gi').test(testStr);
}
exports.containsWord = containsWord;
function genCode(codeLength, charList, wordList) {
    if (!Number.isInteger(codeLength) || codeLength <= 0) {
        throw new Error('First argument must be an integer greater than 0');
    }
    // convert random array to string
    var code = getRandomArray(codeLength, charList).join('');
    // ignore any word whose length is greater than codeLength, then set match to true if any word is contained in code string
    var match = wordList
        .filter(function (word) { return word.length <= codeLength; })
        .reduce(function (isMatch, word) {
        if (isMatch)
            return isMatch;
        return containsWord(code, word);
    }, false);
    // generate a new code and try again if any match is found, otherwise return successful code
    return (match) ? genCode(codeLength, charList, wordList) : code;
}
exports.genCode = genCode;
var charsPossible = getArrayDifference(codeCharsIncluded, codeCharsExcluded);
fetchWords(codeWordsForbiddenURL).then(function (words) {
    var code = genCode(codeLength, charsPossible, words);
    console.log("//////////////\n/// " + code + " ///\n//////////////");
});
