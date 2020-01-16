const testFuncs = require('../dist/code-generator');

// if (typeof codeLength !== 'number' || !Number.isInteger(codeLength) || codeLength <= 0) {
//    throw new Error('codeLength must be an integer greater than 0');
// }
// if (charList.some(el => !(el instanceof String) && el.length !== 1)) {
//    throw new Error('Every element of charList must be an instanceof String with length of 1');
// }

// describe('fetchWords', function() {
//    it('', function() {
//       expect(testFuncs.fetchWords());
//    });
// });

// describe('getArrayDifference', function() {
//    it('', function() {
//       expect(testFuncs.getArrayDifference());
//    });
// });

describe('getRandomElement', function() {
   it('return value is number for input array of numbers', function() {
      expect(testFuncs.getRandomElement([1,2,3])).toBeInstanceOf(Number);
   });
});

// describe('getRandomArray', function() {
//    it('', function() {
//       expect(testFuncs.getRandomArray());
//    });
// });

describe('containsWord', function() {
   let testStr = 'apple';
   it('returns true if testStr contains word', function() {
      expect(testFuncs.containsWord(testStr, 'ape')).toBe(true);
   });
});

// describe('genCode', function() {
//    it('', function() {
//       expect(testFuncs.genCode());
//    });
// });