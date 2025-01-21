const elementDisplayLOZSpecies = document.querySelector("#LOZ-species");
document.addEventListener("DOMContentLoaded", function () {
  const regions = [document.querySelector("#Podkarpackie"), document.querySelector("#Malopolskie"), document.querySelector("#Slaskie"), document.querySelector("#Opolskie"), document.querySelector("#Dolnoslaskie"), document.querySelector("#Swietokrzyskie"), document.querySelector("#Lubelskie"), document.querySelector("#Lodzkie"), document.querySelector("#Mazowieckie"), document.querySelector("#Wielkopolskie"), document.querySelector("#Lubuskie"), document.querySelector("#Kujawsko-Pomorskie"), document.querySelector("#Podlaskie"), document.querySelector("#Zachodniopomorskie"), document.querySelector("#Warminsko-Mazurskie"), document.querySelector("#Pomorskie")].filter(Boolean);

  const elementLOZMap = document.querySelector("#LOZ-map");

  regions.forEach((element) => {
    element.addEventListener("click", function () {
      elementLOZMap.classList.add("hidden");
      displayLOZSpecies(element.id);
      document.querySelector("#LOZ-bottom-text").classList.add("hidden");

      let text = element.id;
      if (text === "Lodzkie") {
        text = "Łódzkie";
      } else if (text === "Slaskie") {
        text = "Śląskie";
      }
      document.querySelector("#LOZ-text").innerHTML = "LOZ woj. " + text.toLowerCase();
    });
  });
});

function displayLOZSpecies(region) {
  let result = "";
  for (let i = 0; i < names.length; i++) {
    result += '<input class="text-2xl text-top-agrar-green/90 flex border-2 border-solid border-top-agrar-green/90 rounded-2xl p-2 m-2   hover:bg-top-agrar-green/20" type="button" id="' + files[i] + '" value="' + names[i] + ' ">';
  }
  elementDisplayLOZSpecies.innerHTML = result;
  files.forEach((file, index) => {
    document.getElementById(file).addEventListener("click", function () {
      let indexOf = arrays[file.replace(".json", "") + "_cols"].findIndex((item) => item.data === region);

      displayFilesValues(file, indexOf, "brak odmiany na LOZ dla tego województwa");

      displayFilters(file);
      table.columns(indexOf).search("^(?![-#]).*$", true, false).draw();

      let text = region;
      if (text === "Lodzkie") {
        text = "Łódzkie";
      } else if (text === "Slaskie") {
        text = "Śląskie";
      }
      document.querySelector("#sorting-text").innerHTML = '<span "class=text-wrap">Lista odmian zalecanych woj. <b>' + text.toLowerCase() + " - " + names[index].toLowerCase() + "</b> (lista pozostałych odmian dostępna wyżej w porównywarce)";

      window.compareObj = new Compare("compare", arrays[file.replace(".json", "") + "_col_names"].slice(0, -29));
      compareObj.displayCompare();
    });
  });
}
