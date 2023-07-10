const form = document.getElementById("form");
const alfa = "abcdefghijklmnopqrstuvwxyz".split("");
form.addEventListener("submit", function (e) {
  e.preventDefault();

  const encode = document.getElementById("encode").value;
  const clef = document.getElementById("clef").value;
  const decode = document.getElementById("decode").value;

  // Indexation de la phrase
  if (encode !== "" && clef !== "") {
    let encodeSplit = encode.replace(/ /g, "-").split("");
    let encodeIndex = [];
    for (let i = 0; i < encodeSplit.length; i++) {
      if (encodeSplit[i] === "-") {
        encodeIndex.push("-");
      } else {
        encodeIndex.push(alfa.indexOf(encodeSplit[i]));
      }
    }
    console.log(
      "Encodage - Indexation de la phrase : " + encodeIndex.join(" ")
    );

    // Indexation de la clé
    let clefSplit = clef.split("");
    let keyIndex = [];
    let clefIndex = 0;
    for (let i = 0; i < encodeSplit.length; i++) {
      if (encodeSplit[i] === "-") {
        keyIndex.push("-");
      } else {
        let char = clefSplit[clefIndex];
        keyIndex.push(char !== " " ? alfa.indexOf(char) : " ");
        clefIndex = (clefIndex + 1) % clefSplit.length;
      }
    }
    console.log("Encodage - Indexation de la clé : " + keyIndex.join(" "));

    // Addition des index des deux tableaux
    let mixIndex = encodeIndex.map((element, index) => {
      if (encodeIndex[index] === "-" && keyIndex[index] === "-") {
        return "-";
      } else {
        return (element + keyIndex[index]) % alfa.length;
      }
    });
    console.log(
      "Encodage - Addition des index des deux tableaux : " + mixIndex.join(" ")
    );

    // Encodage
    let encodeResult = mixIndex
      .map((index) => {
        return index === "-" ? " " : alfa[index];
      })
      .join("");
    console.log("Encodage - Phrase encodée : " + encodeResult);

    document.getElementById("decode").value = encodeResult;
  }

  // Décodage
  else if (decode !== "" && clef !== "") {
    let decodeSplit = decode.replace(/ /g, "-").split("");
    let decodeIndex = [];
    for (let i = 0; i < decodeSplit.length; i++) {
      if (decodeSplit[i] === "-") {
        decodeIndex.push("-");
      } else {
        decodeIndex.push(alfa.indexOf(decodeSplit[i]));
      }
    }
    console.log(
      "Décodage - Indexation de la phrase à décoder : " + decodeIndex.join(" ")
    );

    // Indexation de la clé
    let clefSplit = clef.split("");
    let keyIndex = [];
    let clefIndex = 0;
    for (let i = 0; i < decodeSplit.length; i++) {
      if (decodeSplit[i] === "-") {
        keyIndex.push("-");
      } else {
        if (clefSplit[clefIndex] !== " ") {
          keyIndex.push(alfa.indexOf(clefSplit[clefIndex]));
        } else {
          keyIndex.push(" ");
        }
        clefIndex = (clefIndex + 1) % clefSplit.length;
      }
    }
    console.log("Décodage - Indexation de la clé : " + keyIndex.join(" "));

    // Soustraction des index des deux tableaux
    let subtract = (tab1, tab2) =>
      tab1.map((element, index) => {
        if (tab1[index] === "-" && tab2[index] === "-") {
          return "-";
        } else {
          let result = (element - tab2[index] + alfa.length) % alfa.length;
          return result;
        }
      });
    let mixIndex = subtract(decodeIndex, keyIndex);
    console.log(
      "Décodage - Soustraction des index des deux tableaux : " +
        mixIndex.join(" ")
    );

    // Décodage
    let decodeResult = [];
    for (let i = 0; i < mixIndex.length; i++) {
      if (mixIndex[i] === "-") {
        decodeResult.push(" ");
      } else {
        let index = mixIndex[i];
        decodeResult.push(alfa[index]);
      }
    }
    console.log("Décodage - Phrase décodée : " + decodeResult.join(""));
    let encodeResult = decodeResult.join("");
    document.getElementById("encode").value = encodeResult;
  }

  // Gestion d'erreur
  else if (decode !== "" && clef !== "" && encode !== "" ) {
    document.getElementById(
      "cible"
    ).innerHTML = `<h3 class="text-danger">Erreur</h3>`;
  }
  else {
    document.getElementById(
      "cible"
    ).innerHTML = `<h3 class="text-danger">Erreur</h3>`;
  }
});
