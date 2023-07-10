// message dépar : envoyer la cavalerie
// clé : clefcle fc lefclefcl

// Exercire sur l'encodage 
const alfa = 'abcdefghijklmnopqrstuvwxyz'.split('');
const phrase = "envoyer la cavalerie";
let phraseSplit = phrase.replace(/ /g, "-").split(''); 
let clef = "clef";
let clefSplit = clef.split("");

console.log("encode -> Phrase départ : " + phraseSplit.join(""));

// Indexation de la phrase
let phraseIndex = [];
for (let i = 0; i < phraseSplit.length; i++) {
    if (phraseSplit[i] === '-') {phraseIndex.push('-');} 
    else {phraseIndex.push(alfa.indexOf(phraseSplit[i]));}
}
console.log("encode -> indexation phrase : " + phraseIndex.join(" "));

// Indexation de la clé
let keyIndex = [];
let clefIndex = 0;
for (let i = 0; i < phraseSplit.length; i++) {
    if (phraseSplit[i] === "-") { keyIndex.push("-");} 
    else {
        if (clefSplit[clefIndex] !== "-") {
            keyIndex.push(alfa.indexOf(clefSplit[clefIndex])); 
        }
        clefIndex = (clefIndex + 1) % clefSplit.length;// Modulo %
    }
}
console.log("encode -> indexation clé : " + keyIndex.join(" "));

// Addition index des 2 tableaux 
let concat = (tab1, tab2) =>
  tab1.map((element, index) => {
    if (tab1[index] === "-" && tab2[index] === "-") {
      return "-";
    } else {
      return element + tab2[index];
    }
  });

let mixIndex = concat(phraseIndex, keyIndex);

console.log("encode -> index lettres chiffrées : " + mixIndex.join(" ")); 

// Encodage
let encode = [];
for (let i = 0; i < mixIndex.length; i++) {
    if (mixIndex[i] === "-") {encode.push("-"); } 
    else { let index = mixIndex[i]; encode.push(alfa[index]);}
}
console.log("encode -> Phrase encodée : " + encode.join(""));



// Phrase départ : envoyer-la-cavalerie
// indexasion phrase : 4 13 21 14 24 4 17 - 11 0 - 2 0 21 0 11 4 17 8 4
// indexation clé : 2 11 4 5 2 11 4 - 5 2 - 11 4 5 2 11 4 5 2 11
// index lettres chiffrées : 6 24 25 19 26 15 21 - 16 2 - 13 4 26 2 22 8 22 10 15
// Phrase encodée : gyztapv-qc-neacwiwkp