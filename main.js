//const modes = [["Major", "Ionian"], "Dorian", "Phrygian", "Lydian", "Mixolydian", ["Natural Minor", "Aeolian"], "Locrian"];
const isSharpedScales = ["B", "E", "A", "D", "G", "C"];

const cMajor = ["C", "D", "E", "F", "G", "A", "B"];
const fMajor = ["F", "G", "A", "Bb", "C", "D", "E"];

const table = document.getElementById("table");
const tableBody = document.querySelector("tbody");
const buttons = document.getElementsByTagName("button");

class Scale {
  constructor(rootNote, scale) {
    this.sharped = [];
    this.flatted = [];
    this[rootNote] = scale; 
  }

  // yalnızca dizileri döndürür.
  getScales() {
    return (Object.keys(this).filter((item) => Array.isArray(this[item])));
  }

  // kullanıcının seçtiği notayı objenin içerisinde ara
  search(userInputNote) {
    let scales = this.getScales();
    //console.log(scales);
    while (!this.hasOwnProperty(userInputNote)) {
      this.createScale();
    }
    return this[userInputNote]
  }
}

// diyezli gamlar
const sharpedScales = new Scale(cMajor[0], cMajor);
sharpedScales.sharped.push(sharpedScales.C);
console.log(sharpedScales);
// bemollü gamlar
const flattedScales = new Scale(fMajor[0], fMajor);

// kullanıcının seçtiği nota
let note = "";

// butonlara click eventi ata
for (button of buttons) {
  button.addEventListener("click", (event) => {
    note = event.target.textContent; // user input
    // tıklanan nota diyezli gam mı ?
    if (isSharpedScales.indexOf(note) !== -1) {
      let scale = sharpedScales.search(note);
      console.log(scale);
//      drawRow(scale);
    }
    let scale = flattedScales.search(note);
    drawTable(scale);
  });
}

// bir önceki gamdan sokraki gamı objeye ekler
sharpedScales.createScale = function() {
  // Yalnızca array niteliklerini içeren diziyi alın
  let scales = this.getScales();
  // İşlemi her zaman en son gam üzerinden yapıyoruz.
  let lastScale = scales[scales.length - 1];
  // gamın bir shallow copy'sini aldık
  let newScale = [...this[lastScale]];
  // ilk dört elemanı çıkartıp sonuna ekledik.
  let extracted = newScale.splice(0, 4);
  newScale = newScale.concat(extracted); 
  // son elemana diyez attık
  newScale[newScale.length - 1] += "#";
  this[newScale[0]] = newScale;
}

flattedScales.createScale = function(note) {
  // Yalnızca array niteliklerini içeren diziyi alın
  let scales = this.getScales();
  // İşlemi her zaman en son gam üzerinden yapıyoruz.
  let lastScale = scales[scales.length - 1];
  // gamın bir shallow copy'sini aldık
  let newScale = [...this[lastScale]];
  // ilk dört elemanı çıkartıp sonuna ekledik.
  let extracted = newScale.splice(0, 3);
  // son elemana bemol atanır.
  newScale[newScale.length - 1] += "b";
  newScale = newScale.concat(extracted);
  // son elemana diyez attık
  this[newScale[0]] = newScale;
}

function rearrange(scale) {
  let temp = scale.shift(0);
  scale.push(temp);
}
function drawRow(scale) {
  let td = document.createElement("td");
  td.textContent = scale;
  let tr = document.getElementsByTagName("tr");
  console.log(td);
  //td.appendChild(tr[1]);
}

function drawTable(scale) {
    scale.forEach((item, index, arr) => {
  });
}
