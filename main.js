//const modes = [["Major", "Ionian"], "Dorian", "Phrygian", "Lydian", "Mixolydian", ["Natural Minor", "Aeolian"], "Locrian"];
const isScaless = ["B", "E", "A", "D", "G", "C"];

const cMajor = ["C", "D", "E", "F", "G", "A", "B"];
const fMajor = ["F", "G", "A", "Bb", "C", "D", "E"];

const table = document.getElementById("table");
const tableBody = document.querySelector("tbody");
const buttons = document.getElementsByTagName("button");

class Scales {
  constructor(rootNote, scale) {
    this.sharped = [];
    this.flatted = [];
  }

  appendToSharped() {
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
  searchInSharped(userInputNote) {
    for (let i in this.sharped) {
      if (this.sharped[i][0] == userInputNote) {
        return this.sharped[i];
      } 
    }
  }

  // gam oluşturulana kadar ekle
  appendToSharpedTill(scale, note) {
    while(!Array.isArray(scale)) {
      this.appendToSharped();
      scale = this.searchInSharped(note);
    }
    return scale;
  }

  // Flatted dizisine bir nota ekleme işlemini gerçekleştirir
  appendToFlatted() {
    // bir önceki dizinin 3. elemanını başa alma
    let lastScale = this.flatted[this.flatted.length - 1];
    let temp = lastScale.slice(0, 3);
    let newScale = lastScale.slice(3, 7);
    newScale[newScale.length - 1] += "b";
    newScale = newScale.concat(temp);
    this.flatted.push(newScale);
  }

  // Flatted dizisinde bir nota arama işlemini gerçekleştirir
  searchInFlatted(userInputNote) {
    for (let i in this.flatted) {
      if (this.flatted[i][0] == userInputNote) {
        return this.flatted[i];
      } 
    }
  }

  // Flatted dizisi oluşturulana kadar notaları ekler
  appendToFlattedTill(scale, note) {
    while (!Array.isArray(scale)) {
      this.appendToFlatted();
      scale = this.searchInFlatted(note);
    }
    return scale;
  }
}

// gamlar
const scales = new Scales();

// diyezli gamlar için başlangıç gamını giriyoruz.
scales.sharped.push(cMajor);
// bemollü gamlar için başlangıç gamını giriyoruz.
scales.flatted.push(fMajor);

// kullanıcının seçtiği nota
let note = "";

// butonlara click eventi ata
for (button of buttons) {
  button.addEventListener("click", (event) => {
    note = event.target.textContent; // user input
    // tıklanan nota diyezli gam mı ?
    if (isScaless.indexOf(note) !== -1) {
      let scale = scales.searchInSharped(note);
      if (Array.isArray(scale)) {
        console.log(scale);
        drawRow(scale);
      } else {
        scale = scales.appendToSharpedTill(scale, note);
        console.log(scale);
        drawRow(scale);
      }
    } else {
      let scale = scales.searchInFlatted(note);
      if (Array.isArray(scale)) {
        console.log(scale);
        drawRow(scale);
      } else {
        scale = scales.appendToFlattedTill(scale, note);
        console.log(scale);
        drawRow(scale);
      }
    }
  });
}

function makeModes(scale) {
  let temp = scale.shift(0);
  scale.push(temp);
}

function drawRow(scale) {
  let tr = document.getElementsByTagName("tr");
  for (let i=1; i < tr.length; i++) {
    let td = tr[i].querySelector('td');

    // Eğer mevcut bir td varsa, onun içeriğini değiştir
    if (td) {
      td.textContent = scale;
    } else {
      // Yoksa yeni bir td ekleme
      let td = document.createElement("td");
      td.textContent = scale;
      tr[i].appendChild(td);
    }
    makeModes(scale);
  }
}

