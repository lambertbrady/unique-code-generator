const funcs = require('../dist/code-generator');

describe('getArrayDifference', function() {
   const mockArrA = [1,2,3,4];
   const mockArrB = [3,4,5,6];
   const mockArrC = [7,8];
   it('A diff B returns appropriate values from A', function() {
      expect(funcs.getArrayDifference(mockArrA, mockArrB)).toEqual([1,2]);
   });
   it('B diff A returns appropriate values from B', function() {
      expect(funcs.getArrayDifference(mockArrB, mockArrA)).toEqual([5,6]);
   });
   it('diff of two arrays with no overlapping elements returns first array', function() {
      expect(funcs.getArrayDifference(mockArrC, mockArrA)).toEqual(mockArrC);
   });
});

describe('getRandomElement', function() {
   for(let i = 0; i < 10; i++) {
      const mockArr = [...Array(10)].map(() => Math.random());
      it('return value is number for input array of numbers', function() {
         const randomElement = funcs.getRandomElement(mockArr);
         expect(mockArr.includes(randomElement)).toBeTrue();
      });
   }
});

describe('getRandomArray', function() {
   const arrLength = 10;
   it('retrn array with length equal to first argument', function() {
      expect(funcs.getRandomArray(arrLength, ['a','b','c']).length).toEqual(arrLength);
   });
   it('retrn array with length equal to first argument, duplicate chars', function() {
      expect(funcs.getRandomArray(arrLength, ['a','b','c','c']).length).toEqual(arrLength);
   });
   it('throws error if array is empty', function() {
      expect(() => funcs.getRandomArray(arrLength, []).length).toThrow();
   });
});

describe('containsWord', function() {
   const mockStr = 'apple';
   it('returns true if string contains consecutive word', function() {
      expect(funcs.containsWord(mockStr, 'ppl')).toBe(true);
   });
   it('returns true if string contains non-consecutive word', function() {
      expect(funcs.containsWord(mockStr, 'ape')).toBe(true);
   });
   it('returns false if string does not contain word', function() {
      expect(funcs.containsWord(mockStr, 'qwe')).toBe(false);
   });
   it('throws error if either argument is empty string', function() {
      expect(() => funcs.containsWord('', 'mock')).toThrow();
      expect(() => funcs.containsWord(mockStr, '')).toThrow();
   });
});

describe('genCode', function() {
   const mockCharList = ['a','b','c','d','e'];
   it('throws error if first argument has length less than or equal to 0', function() {
      expect(() => funcs.genCode(0, mockCharList)).toThrow();
      expect(() => funcs.genCode(-1, mockCharList)).toThrow();
   });
   it('throws error if first argument is not an integer', function() {
      expect(() => funcs.genCode(.5, mockCharList)).toThrow();
   });
});