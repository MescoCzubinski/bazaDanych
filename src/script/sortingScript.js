const elementDisplayFilesName = document.querySelector("#displayFilesName");
const elementDisplaySettings = document.querySelector("#settings");
elementDisplaySettings.classList.add("hidden");
const elementType1Container = document.querySelector("#type1-container");
elementType1Container.classList.add("hidden");
const elementType2Container = document.querySelector("#type2-container");
elementType2Container.classList.add("hidden");

document.querySelector("body").scrollIntoView({
  behavior: "smooth",
  block: "start",
});

//wyświetlanie gatunków do sortowarek
function displayFilesName() {
  let result = "";
  for (let i = 0; i < names.length; i++) {
    result += '<input class="text-2xl text-top-agrar-green/90 flex border-2 border-solid border-top-agrar-green/90 rounded-2xl p-2 m-2   hover:bg-top-agrar-green/20" type="button" id="' + files[i] + '" value="' + names[i] + ' ">';
  }
  elementDisplayFilesName.innerHTML = result;
}
displayFilesName();

files.forEach((file, index) => {
  document.getElementById(file).addEventListener("click", function () {
    //wyświetlanie tabeli
    displayFilesValues(file, -1, "Brak wyników dla podanych ustawień", -1, false);

    document.querySelector("#sorting-text").innerHTML = 'Lista odmian wg PDO <b class="ml-2">' + names[index].toLowerCase() + "</b>";

    //wyświetlanie porównania
    window.compareObj = new Compare("compare", arrays[file.replace(".json", "") + "_col_names"].slice(0, -29));
    compareObj.displayCompare();

    document.querySelector("#settings").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    globalCompareScalar = 0;
  });
});

function displayFilters(file) {
  elementDisplaySettings.classList.remove("hidden");

  displayColTitles(file);

  //dodanie filtru 'typ1'
  if (arrays[file.replace(".json", "") + "_type1"]) {
    const elementType1 = document.querySelector("#type1");
    elementType1Container.classList.remove("hidden");
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
  if (arrays[file.replace(".json", "") + "_type2"]) {
    const elementType2 = document.querySelector("#type2");
    document.querySelector("#type2-name").innerHTML = arrays[file.replace(".json", "") + "_type2_name"];
    elementType2Container.classList.remove("hidden");
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
  let sort = "";
  const elementSorting = document.querySelector("#sorting");
  for (element of arrays[file.replace(".json", "") + "_col_names"].slice(0, -28)) {
    if (element !== "Rok wyników:") {
      sort += `<option value="${element.replace(":", "")}">${element.replace(":", "")}</option>`;
    }
  }
  elementSorting.innerHTML = sort;

  elementSorting.addEventListener("change", (event) => {
    let sortingIndex = arrays[file.replace(".json", "") + "_col_names"].slice(0, -28).indexOf(event.target.value + ":");

    if (sortingIndex !== -1) {
      displayFilesValues(file, -1, "Brak wyników dla podanych ustawień", sortingIndex, false);
      if (sortingIndex === 0) {
        table.order([sortingIndex, "asc"]).draw();
      } else {
        table.order([sortingIndex, "desc"]).draw();
      }

      table.columns(8).search("").draw();
      table.columns(1).search(elementYearFilter.value).draw();

      displayColTitles(file, false);
    }

    document.querySelector("#settings").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
}

function displayColTitles(file, isLOZ) {
  document.querySelectorAll("#table thead th").forEach((th, index) => {
    colsCount = arrays[file.replace(".json", "") + "_col_names"].slice(0, -17).length;
    if (isLOZ == true) {
      console.log("adasd");
    } else {
      console.log(colsCount);
      colsCount -= 2;
    }

    if (index === colsCount) {
      th.setAttribute("title", "Porównanie odmian u dołu strony");
    } else if (index === 1 && file !== "owies_jary.json") {
      th.setAttribute("title", "Na przeciętnym poziomie agrotechniki");
    } else if (index === 2 && file !== "owies_jary.json") {
      th.setAttribute("title", "Na wyższym poziomie agrotechniki");
    } else if (index >= colsCount - 17 && index < colsCount && file !== "owies_jary.json" && isLOZ === true) {
      th.setAttribute("title", "rok wpisu na listę dla danego województwa");
    } else {
      th.setAttribute("title", "Kliknięcie nazwy kolumny sortuje narastająco, ponownie kliknięcie malejąco");
    }
  });
}
