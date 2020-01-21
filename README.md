# desmos-code-generator

## Summary

This repository contains code for the Desmos Code Cenerator coding challenge.

- Source code is written in TypeScript: `src/code-generater.ts`
- Code is compiled to JavaScript: `dist/code-generater.js`
- Tests are written in JavaScript using Jasmine: `spec/code-generator_Spec.js`

View code for the Desmos anagram coding exercise here: https://codepen.io/bradylambert/pen/VwYGRPa

## Setup and Use

1. Clone this repository and add dependencies:

      ```
      git clone https://github.com/lambertbrady/desmos-code-generator.git
      npm install
      ```
  
2. Compile TypeScript files in `src/`:

      `npm run build`
  
3. Run Jasmine tests in `spec/`:

      `npm test`
  
4. Run any file in `dist/`:

      `npm start -- <filename>`
      
   If you just want to run `code-generator.js`, then run:
   
      `npm start`

5. Run steps 2 - 4:

      `npm run all -- <filename>`
   
   Or simply:

      `npm run all`
      
6. View output in your terminal. It should look something like this:

      ```
      //////////////
      /// QGH45U ///
      //////////////
      ```

7. Feel free to change variables for the generated code output. These values are included at the top of `code-generator` and include `codeLength`, `codeCharsIncluded`, and `codeCharsExcluded`.

***Note:** this project assumes you have node installed*
