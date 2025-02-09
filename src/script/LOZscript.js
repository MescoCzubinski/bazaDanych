const elementDisplayLOZSpecies = document.querySelector("#LOZ-species");
const elementDisplayLOZSections = document.querySelector("#LOZ-sections");
const elementLOZMap = document.querySelector("#LOZ-map");
const elementLOZReset = document.querySelector("#LOZ-reset");

const regions = [document.querySelector("#Podkarpackie"), document.querySelector("#Malopolskie"), document.querySelector("#Slaskie"), document.querySelector("#Opolskie"), document.querySelector("#Dolnoslaskie"), document.querySelector("#Swietokrzyskie"), document.querySelector("#Lubelskie"), document.querySelector("#Lodzkie"), document.querySelector("#Mazowieckie"), document.querySelector("#Wielkopolskie"), document.querySelector("#Lubuskie"), document.querySelector("#Kujawsko-Pomorskie"), document.querySelector("#Podlaskie"), document.querySelector("#Zachodniopomorskie"), document.querySelector("#Warminsko-Mazurskie"), document.querySelector("#Pomorskie")].filter(Boolean);
let globalCompareScalar = 0;

regions.forEach((element) => {
  element.addEventListener("click", function () {
    elementLOZMap.classList.add("hidden");
    elementDisplayLOZSections.classList.remove("hidden");

    let listOfSections = "";
    names_section.forEach((section, index) => {
      listOfSections += `
        <input 
          class="text-2xl text-top-agrar-green/90 border-2 border-solid border-top-agrar-green/90 rounded-2xl p-2 m-2 hover:bg-top-agrar-green/20" 
          type="button" 
          id="section-${index}" 
          value="${section}">
      `;
    });
    elementDisplayLOZSections.innerHTML = listOfSections;

    names_section.forEach((section, index) => {
      document.getElementById(`section-${index}`).addEventListener("click", function () {
        if(section !== "reszta wkrótce"){
          displayLOZSpecies(element.id);
          document.querySelector("#LOZ-bottom-text").classList.add("hidden");
          
          let text = element.id;
          if (text === "Lodzkie") {
            text = "Łódzkie";
          } else if (text === "Slaskie") {
            text = "Śląskie";
          } else if (text === "Zachodniopomorskie") {
            text = "Zach.-Pom.";
          }
          document.querySelector("#LOZ-text").innerHTML = "LOZ woj. " + text.toLowerCase();
        }
      });
    });
  });
});




elementLOZReset.addEventListener("click", function () {
  elementLOZMap.classList.remove("hidden");
  elementDisplayLOZSections.classList.add('hidden')
  
  elementDisplayLOZSpecies.classList.add("hidden");
  document.querySelector("#LOZ-text").innerHTML = "Lista Odmian Zalecanych";
});

function displayLOZSpecies(region) {
  elementDisplayLOZSections.classList.add('hidden')
  let result = "";
  for (let i = 0; i < names.length; i++) {
    result += '<input class="text-2xl text-top-agrar-green/90 flex border-2 border-solid border-top-agrar-green/90 rounded-2xl p-2 m-2   hover:bg-top-agrar-green/20" type="button" id="' + files[i] + '" value="' + names[i] + ' ">';
  }

  elementDisplayLOZSpecies.classList.remove("hidden");
  elementDisplayLOZSpecies.innerHTML = result;
  files.forEach((file, index) => {
    document.getElementById(file).addEventListener("click", function () {
      let indexOf = arrays[file.replace(".json", "") + "_cols"].findIndex((item) => item.data === region);

      displayFilesValues(file, indexOf, "brak odmiany na LOZ dla tego województwa", -1, true);
      displayFilters(file, true);

      displayFilters(file);
      table.columns(indexOf).search("^(?![-#]).*$", true, false).draw();

      let text = region;
      if (text === "Lodzkie") {
        text = "Łódzkie";
      } else if (text === "Slaskie") {
        text = "Śląskie";
      }
      document.querySelector("#sorting-text").innerHTML = '<span "class=text-wrap">Lista odmian zalecanych <b> woj. ' + text.toLowerCase() + " " + names[index].toLowerCase() + "</b> (lista pozostałych odmian dostępna wyżej w porównywarce)</span>";

      window.compareObj = new Compare("compare", arrays[file.replace(".json", "") + "_col_names"].slice(0, -29), file);
      compareObj.displayCompare();

      document.querySelector("#settings").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      globalCompareScalar = 1;
    });
  });
}
