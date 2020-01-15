import fetch from 'node-fetch';

// A random 6-character code
// Each code generated is composed of characters `A-Z` and numbers `0-9`, excluding characters that are ambiguous to read: I (eye), L (el), 1 (one), 0 (zero), O (oh)
// Each code generated does not contain any forbidden words in this list, consecutive (RATS42) or non-consecutive (3RQATS).
// The provided list is a small sampling for this problem. In practice, our forbidden word list has around 50-100 words.

async function getWords() {
   let response, text;
   try {
      response = await fetch('https://gitcdn.link/repo/ahamburger/8f609c3a57aee907bd426ef66cd6fb1a/raw/1bef175bfa7da130f0f1ea723b625f0f9a0ce5cb/desmos_distracting_words');
      text = await response.text();
   } catch (error) {
      throw new Error(error);
   }
   
   return text.split('\n');
}

function getArrayDiff(A, B) {
   return A.filter(el => !B.includes(el));
}

function getRandomElement(arr) {
   return arr[Math.floor(Math.random() * arr.length)];
}

function containsWord(testStr, word) {
   const pattern = `.*${[...word].join('.*')}.*`;
   return new RegExp(pattern, 'gi').test(testStr);
}

function genCode(codeLength, charList, wordList) {
   // if (typeof codeLength !== 'number' || !Number.isInteger(codeLength) || codeLength <= 0) {
   //    throw new Error('codeLength must be an integer greater than 0');
   // }
   // if (charList.some(el => !(el instanceof String) && el.length !== 1)) {
   //    throw new Error('Every element of charList must be an instanceof String with length of 1');
   // }

   const charsUnique = [...new Set(charList)];
   const code = [...Array(codeLength)].map(() => getRandomElement(charsUnique)).join('');
   const match = wordList
      .filter(word => word.length <= codeLength)
      .reduce((isMatch, word) => {
         if (isMatch) return isMatch;
         return containsWord(code, word);
      }, false);

   return (match) ? genCode(...arguments) : code;
}

const charsAlphaNumeric = [...'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const charsExcluded = ['I', 'L', '1', '0', 'O'];
const charsPossible = getArrayDiff(charsAlphaNumeric, charsExcluded);

let code;
getWords().then(words => {
   code = genCode(6, charsPossible, words);
   console.log(words);
   console.log(code);
});