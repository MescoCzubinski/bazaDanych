const elementDisplayFilesName = document.querySelector("#displayFilesName");
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

    //wyświetlanie porównania
    window.compareObj = new Compare("compare", arrays[file.replace(".json", "") + "_col_names"]);
    compareObj.displayCompare();
  });
});
