const elementDisplayFilesName = document.querySelector("#displayFilesName");
const elementDisplaySettings = document.querySelector("#settings");
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
    displayFilesValues(file, -1);
    displayFilters(file);
  
    //wyświetlanie porównania
    window.compareObj = new Compare("compare", arrays[file.replace(".json", "") + "_col_names"].slice(0, -29));
    compareObj.displayCompare();
  });
});

function displayFilters(file){
  const elementType1Container = document.querySelector("#type1-container");
    elementType1Container.classList.add('hidden')
    const elementType2Container = document.querySelector("#type2-container");
    elementType2Container.classList.add('hidden')
    elementDisplaySettings.classList.remove('hidden')


    //dodanie filtru 'typ1'
    if(arrays[file.replace(".json", "") + "_type1"]){
      const elementType1 = document.querySelector("#type1");
      elementType1Container.classList.remove('hidden');
      document.querySelector("#type1-name").innerHTML = arrays[file.replace(".json", "") + "_type1_name"];
      let types1 = '<option value="-">wszystkie</option>';
      for (type of arrays[file.replace(".json", "") + "_type1"]) {
        types1 += `<option value="${type}">${type}</option>`;
      }
      elementType1.innerHTML = types1;
  
      elementType1.addEventListener("change", () => {
        const selectedType1 = elementType1.value;
        if (selectedType1 !== "-") {
          table.columns(8).search(selectedType1).draw();
        } else {
          table.columns(8).search("").draw();
        }
      });
    }
    //dodanie filtru 'typ2'
    if(arrays[file.replace(".json", "") + "_type2"]){
      const elementType2 = document.querySelector("#type2");
      document.querySelector("#type2-name").innerHTML = arrays[file.replace(".json", "") + "_type2_name"];
      elementType2Container.classList.remove('hidden')
      let types2 = '<option value="-">wszystkie</option>';
      for (type of arrays[file.replace(".json", "") + "_type2"]) {
        types2 += `<option value="${type}">${type}</option>`;
      }
      elementType2.innerHTML = types2;
  
      elementType2.addEventListener("change", () => {
        const selectedType2 = elementType2.value;
        if (selectedType2 !== "-") {
          table.columns(10).search(selectedType2).draw();
        } else {
          table.columns(10).search("").draw();
        }
      });
    }

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
    for (element of arrays[file.replace(".json", "") + "_col_names"].slice(0, -17)) {
      if(element !== "Rok wyników:"){
        sort += `<option value="${element.replace(':','')}">${element.replace(':','')}</option>`;
      }
    }
    elementSorting.innerHTML = sort;

    elementSorting.addEventListener("change", (event) => {
      let indexOf = arrays[file.replace(".json", "") + "_col_names"].slice(0, -17).indexOf(event.target.value + ":")
      if(indexOf === 0){
        table.order([indexOf, 'asc']).draw()
      } else {
        table.order([indexOf, 'dsc']).draw()
      }
    });

    document.querySelectorAll("#table thead th").forEach((th, index) => {
      let colsCount = arrays[file.replace(".json", "") + "_col_names"].slice(0, -17).length - 2
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
}