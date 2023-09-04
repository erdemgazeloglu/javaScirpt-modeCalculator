//const modes = [["Major", "Ionian"], "Dorian", "Phrygian", "Lydian", "Mixolydian", ["Natural Minor", "Aeolian"], "Locrian"];
const isSharpedScales = ["B", "E", "A", "D", "G", "C"];

const cMajor = ["C", "D", "E", "F", "G", "A", "B"];
const fMajor = ["F", "G", "A", "Bb", "C", "D", "E"];

const table = document.getElementById("table");
const tableBody = document.querySelector("tbody");
const buttons = document.getElementsByTagName("button");

class SharpedScale {
  constructor(rootNote, scale) {
    this.sharped = [];
    this.flatted = [];
  }

  append() {
    // bir önceki dizinin 4. elemanını başa alma
    let lastScale = this.sharped[this.sharped.length - 1];
    let temp = lastScale.slice(0, 4);
    let newScale = lastScale.slice(4, 7);
    newScale = newScale.concat(temp);
    newScale[newScale.length - 1] += "#";
    this.sharped.push(newScale);
    //console.log(newScale);
    //lastScale[4]
  }

  // kullanıcının seçtiği notayı objenin içerisinde ara
  search(userInputNote) {
    for (let i in this.sharped) {
      if (this.sharped[i][0] == userInputNote) {
        return this.sharped[i];
      } 
    }
  }

  // gam oluşturulana kadar ekle
  appendTill(scale, note) {
    while(!Array.isArray(scale)) {
      this.append();
      scale = this.search(note);
    }
    return scale;
  }
}

// diyezli gamlar
const sharpedScales = new SharpedScale();
// başlangıç gamını giriyoruz.
sharpedScales.sharped.push(cMajor);
//sharpedScales.append();


// kullanıcının seçtiği nota
let note = "";

// butonlara click eventi ata
for (button of buttons) {
  button.addEventListener("click", (event) => {
    console.table(sharpedScales);
    note = event.target.textContent; // user input
    // tıklanan nota diyezli gam mı ?
    if (isSharpedScales.indexOf(note) !== -1) {
      let scale = sharpedScales.search(note);
      if (Array.isArray(scale)) {
        console.log(scale);
      } else {
        scale = sharpedScales.appendTill(scale, note);
        console.log(scale);
      }
    }
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
