const elementDisplayFilesName = document.querySelector("#displayFilesName");
function displayFilesName() {
  //wyświetlanie gatunków do sortowarek
  let result = "";
  for (let i = 0; i < names.length; i++) {
    result += '<input class="text-2xl text-top-agrar-green/90 flex border-2 border-solid border-top-agrar-green/90 rounded-2xl p-2 m-2   hover:bg-top-agrar-green/20" type="button" id="' + files[i] + '" value="' + names[i] + ' ">';
  }
  elementDisplayFilesName.innerHTML = result;
}
function displayOnLoad() {
  document.querySelector("#table").classList.add("hidden");
  displayFilesName();
}
document.addEventListener("load", displayOnLoad());

//po kliknięciu na gatunek
files.forEach((file) => {
  document.getElementById(file).addEventListener("click", function () {
    //wyświetlanie tabeli, dodawanie nazw kolumn
    document.querySelector("#table").classList.remove("hidden");

    let col_names = "";
    for (col_name of arrays[file.replace(".json", "") + "_col_names"]) {
      col_names += `<th>${col_name}</th>`;
    }
    document.querySelector("#col_names").innerHTML = col_names;

    displayFilesValues(file);

    let types = "";
    for (type of arrays[file.replace(".json", "") + "_type"]) {
      types += `<option value="${type}">${type}</option>`;
    }
    document.querySelector("#type").innerHTML = types;

    let years = "";
    for (year of arrays[file.replace(".json", "") + "_year"]) {
      years += `<option value="${year}">${year}</option>`;
    }
    document.querySelector("#yearFilter").innerHTML = years;
  });
});
