const modes = [["Major", "Ionian"], "Dorian", "Phrygian", "Lydian", "Mixolydian", ["Natural Minor", "Aeolian"], "Locrian"];
const isSharpedScales = ["B", "E", "A", "D", "G", "C"];

const table = document.getElementById("table");
const buttons = document.getElementsByTagName("button");

// kullanıcının seçtiği nota
let note = "";

// butonlara click eventi ata
for (button of buttons) {
  button.addEventListener("click", (event) => {
    // tıklanan nota diyezli gam mı ?
    if (isSharpedScales.indexOf(event.target.textContent) !== -1) {
      note = event.target.textContent;
      console.log(sharpedScales.search(note));
    }
  });
}

// diyezli gamlar
const sharpedScales = {
  C: ["C", "D", "E", "F", "G", "A", "B"],

  // yalnızca dizileri döndürür.
  getScales() {
    return (Object.keys(this).filter((item) => Array.isArray(this[item])));
  },

  // kullanıcının seçtiği notayı objenin içerisinde ara
  search(userInputNote) {
    for (note in this) {
      if(Array.isArray(this[note])){
        return (this.hasOwnProperty(userInputNote)) ? this[userInputNote] : this.createScale(userInputNote);
      } 
    }
  },

  // kök sesi "note" olan diyezli gam olana kadar objeye gam ekler
  createScale(note) {
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

    this.search(note);
  }

};

flattedScales() {
  F: ["F", "G", "A", "Bb", "C", "D", "E"],

  
}
