const elementDisplayFilesName = document.querySelector("#displayFilesName");
const elementDisplaySettings = document.querySelector("#settings");
console.log(elementDisplaySettings)
elementDisplaySettings.classList.add('hidden')

function displayFilesName() {
  //wyświetlanie gatunków do sortowarek
  let result = "";
  for (let i = 0; i < names.length; i++) {
    result += '<input class="text-2xl text-top-agrar-green/90 flex border-2 border-solid border-top-agrar-green/90 rounded-2xl p-2 m-2   hover:bg-top-agrar-green/20" type="button" id="' + files[i] + '" value="' + names[i] + ' ">';
  }
  elementDisplayFilesName.innerHTML = result;
}
displayFilesName();

//po kliknięciu na gatunek
files.forEach((file) => {
  document.getElementById(file).addEventListener("click", function () {
    //wyświetlanie tabeli
    displayFilesValues(file);
    elementDisplaySettings.classList.remove('hidden')

    //dodanie filtru 'typ'
    const elementType = document.querySelector("#type");
    let types = '<option value="-">wszytstkie</option>';
    for (type of arrays[file.replace(".json", "") + "_type"]) {
      types += `<option value="${type}">${type}</option>`;
    }
    elementType.innerHTML = types;

    elementType.addEventListener("change", () => {
      const selectedType = elementType.value;
      if (selectedType !== "-") {
        table.columns(8).search(selectedType).draw();
      } else {
        table.columns(8).search("").draw();
      }
    });

    //dodanie filtru 'rok'
    let years = "";
    const elementYearFilter = document.querySelector("#yearFilter");
    for (year of arrays[file.replace(".json", "") + "_year"]) {
      years += `<option value="${year}">${year}</option>`;
    }
    elementYearFilter.innerHTML = years;

    const selectedYear = elementYearFilter.value;
    table.columns(1).search(selectedYear).draw();

    elementYearFilter.addEventListener("change", () => {
      const selectedYear = elementYearFilter.value;
      table.columns(1).search(selectedYear).draw();
    });

    //dodanie sortowarki
    let sort  = "";
    const elementSorting = document.querySelector("#sorting");
    for (element of arrays[file.replace(".json", "") + "_col_names"]) {
      if(element !== "Rok wyników:"){
        sort += `<option value="${element.replace(':','')}">${element.replace(':','')}</option>`;
      }
    }
    elementSorting.innerHTML = sort;

    elementSorting.addEventListener("change", (event) => {
      let indexOf = arrays[file.replace(".json", "") + "_col_names"].indexOf(event.target.value + ":")
      if(indexOf === 0){
        table.order([indexOf, 'asc']).draw()
      } else {
        table.order([indexOf, 'dsc']).draw()
      }
      console.log(indexOf)
    });
      //title: porównanie: Porównanie odmian u dołu strony; 
      // Rejony: I  –  zachodniopomorskie, pomorskie; II  –  warmińsko-mazurskie, podlaskie; III –  lubuskie, wielkopolskie, kujawsko-pomorskie; IV – łódzkie, mazowieckie, lubelskie; V  – dolnośląskie, opolskie, śląskie; VI – małopolskie, świętokrzyskie, podkarpackie;
      // Co to jest a1, czyli „Na przeciętnym poziomie agrotechniki” co ot jest a2. Czyli „Na wyższym poziomie agrotechniki”
      //"Kliknięcie nazwy kolumny sortuje narastająco, ponownie kliknięcie malejąco, a trzeci raz wywoła powrót do sortowania alfabetycznego wg nazw odmian";


    document.querySelectorAll("#table thead th").forEach((th, index) => {
      let colsCount = arrays[file.replace(".json", "") + "_col_names"].length - 2
      if(index === colsCount){
        th.setAttribute("title", "Porównanie odmian u dołu strony");
      } else if(index === 1){
        th.setAttribute("title", "Na przeciętnym poziomie agrotechniki");
      } else if(index === 2){
        th.setAttribute("title", "Na wyższym poziomie agrotechniki");
      } else {
        th.setAttribute("title", "Kliknięcie nazwy kolumny sortuje narastająco, ponownie kliknięcie malejąco, a trzeci raz wywoła powrót do sortowania alfabetycznego wg nazw odmian");
      }
    });

    //wyświetlanie porównania
    window.compareObj = new Compare("compare", arrays[file.replace(".json", "") + "_col_names"]);
    compareObj.displayCompare();
  });
});
