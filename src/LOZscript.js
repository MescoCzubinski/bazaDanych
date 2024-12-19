const regions = [document.querySelector("#podkarpackie"), document.querySelector("#malopolskie"), document.querySelector("#slaskie"), document.querySelector("#opolskie"), document.querySelector("#dolnoslaskie"), document.querySelector("#swietokrzyskie"), document.querySelector("#lubelskie"), document.querySelector("#lodzkie"), document.querySelector("#mazowieckie"), document.querySelector("#wielkopolskie"), document.querySelector("#lubuskie"), document.querySelector("#kujawsko-pomorskie"), document.querySelector("#podlaskie"), document.querySelector("#zachodnio-pomorskie"), document.querySelector("#warminsko-mazurskie"), document.querySelector("#pomorskie")];

const elementLOZMap = document.querySelector("#LOZ-map");
const elementLOZText = document.querySelector("#LOZ-text");
regions.forEach((element) => {
  element.addEventListener("click", function () {
    elementLOZMap.classList.add("hidden");
    elementLOZText.innerHTML = "Wybierz szukany gatunek";
    displayLOZSpecies();

    document.querySelector(".specie-LOZ").addEventListener("click", function () {
      console.log("asdasds");
    });
    console.log(element.id);
  });
});

let speciesLOZ = ["Żyto ozime", "Żyto jare", "Ziemniak", "Soja", "Rzepak ozimy", "Rzepak jary", "Pszenżyto ozime", "Pszenżyto jare", "Pszenica zwyczajna ozima", "Kukurydza"];
const elementDisplayLOZSpecies = document.querySelector("#LOZ-species");
function displayLOZSpecies() {
  let result = "";
  for (specie of speciesLOZ) {
    let id = specie.replace(" ", "-").toLowerCase();
    result += '<input class="specie-LOZ text-2xl mb-5 text-top-agrar-green/90 flex border-2 border-solid border-top-agrar-green/90 rounded-2xl p-2 m-1 hover:bg-top-agrar-green/20" type="button" id="' + id + '" value="' + specie + '">';
  }
  elementDisplayLOZSpecies.innerHTML = result;
}
