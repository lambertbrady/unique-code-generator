import fetch, {Response} from 'node-fetch';

async function fetchWords(): Promise<Array<string>> {
   let response: Response;
   let text: string;
   try {
      response = await fetch('https://gitcdn.link/repo/ahamburger/8f609c3a57aee907bd426ef66cd6fb1a/raw/1bef175bfa7da130f0f1ea723b625f0f9a0ce5cb/desmos_distracting_words');
      text = await response.text();
   } catch (error) {
      throw new Error(error);
   }
   
   return text.split('\n');
}

function getArrayDifference<T>(arrayA: T[], arrayB: T[]): T[] {
   return arrayA.filter(element => !arrayB.includes(element));
}

function getRandomElement<T>(array: T[]): T {
   return array[Math.floor(Math.random() * array.length)];
}

function getRandomArray<T>(length: number, charList: T[]): T[] {
   // convert charList to Set, which removes any duplicate values, and then convert back to Array
   const charsUnique = [...new Set(charList)];
   // create array with specified length and fill with random characters from list, then convert to string
   return [...Array(length)].map(() => getRandomElement(charsUnique));
}

function containsWord(testStr: string, word: string): boolean {
   // match 0 or more instances of any character
   const matcher: string = '.*';
   // pattern for 'test' is '.*t.*e.*s.*t.*'
   const pattern: string = matcher + [...word].join(matcher) + matcher;
   return new RegExp(pattern, 'gi').test(testStr);
}

function genCode(codeLength: number, charList: Array<string>, wordList: Array<string>): string {
   // if (typeof codeLength !== 'number' || !Number.isInteger(codeLength) || codeLength <= 0) {
   //    throw new Error('codeLength must be an integer greater than 0');
   // }
   // if (charList.some(el => !(el instanceof String) && el.length !== 1)) {
   //    throw new Error('Every element of charList must be an instanceof String with length of 1');
   // }

   // convert random array to string
   const code: string = getRandomArray(codeLength, charList).join('');
   // ignore any word whose length is greater than codeLength, then set match to true if any word is contained in code string
   const match: boolean = wordList
      .filter(word => word.length <= codeLength)
      .reduce((isMatch: boolean, word) => {
         if (isMatch) return isMatch;
         return containsWord(code, word);
      }, false);
   // generate a new code and try again if any match is found, otherwise return successful code
   return (match) ? genCode(codeLength, charList, wordList) : code;
}

const charsAlphaNumeric: Array<string> = [...'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
const charsExcluded: Array<string> = ['I', 'L', '1', '0', 'O'];

const charsPossible = getArrayDifference(charsAlphaNumeric, charsExcluded);
fetchWords().then(words => {
   const code = genCode(6, charsPossible, words);
   console.log(words);
   console.log(code);
});