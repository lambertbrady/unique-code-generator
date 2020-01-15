async function getDict() {
   let response, text;
   try {
      response = await fetch('https://gist.githubusercontent.com/dlants/d3b25b0f6c0bf8d023f65e86498bf9e6/raw/b310b5aff00f62f5073b3b8d366f5a639aa88ee3/3000-words.txt');
      text = await response.text();
   } catch (error) {
      alert(error);
   }

   return text.split('\n');
}

function lowerCaseAndSort(text) {
   // text must be converted to lowerCase before sorting
   // use Array.from() to avoid errors caused by surrogate pairs
   return Array.from(text.toLowerCase()).sort().join("");
}

function getHashMap(dict) {
   return dict.reduce((hash, word) => {
      const key = lowerCaseAndSort(word);
      if (hash.has(key)) {
         hash.get(key).push(word);
      } else {
         hash.set(key, [word]);
      }
      return hash;
   }, new Map());
}

// create hash map from async getDict()
// hash requires evaluating dict just once and enables faster lookup times
let dictHash = new Map();
getDict().then(dict => {
   dictHash = getHashMap(dict);
});

function onInput(input) {
   const inputSorted = lowerCaseAndSort(input.value);
   const output = dictHash.get(inputSorted) || [];

   document.getElementById('output').innerHTML = JSON.stringify(output);
}