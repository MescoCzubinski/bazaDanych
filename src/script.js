const table = new DataTable("#jeczmien_jary", {
  ajax: "data/jeczmien_jary.json",
  lengthMenu: [
    [10, -1],
    ["Tylko najlepsze", "Wszystkie"],
  ],
  //by pokazać wszystko na raz
  // lengthChange: false,
  // pageLength: -1,
  language: {
    lengthMenu: "_MENU_ wyniki na stronie",
    search: `Rok: <select id="yearFilter" class="w-16 h-8">
          <option value="2023" selected>2023</option>
          <option value="2022">2022</option>
          <option value="2021">2021</option>
          <option value="2020">2020</option>
        </select>`,
    info: "_START_-_END_ z _TOTAL_ wyników",
    infoFiltered: "",
  },

  columnDefs: [
    {
      target: [1, 2, 3, 4, 8, 10, 12, 13, 14, 15, 16, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29],
      visible: false,
    },
    {
      target: 30,
      render: function () {
        return '<button class="flex justify-center w-full hover:text-top-agrar-green"><i class="icon-balance-scale"></i></button>';
      },
      sorting: false,
    },
  ],
});
const elementYearFilter = document.querySelector("#yearFilter");
elementYearFilter.addEventListener("change", filtrYear);
filtrYear();

function filtrYear() {
  const selectedYear = elementYearFilter.value;
  table.columns(1).search(selectedYear).draw();
}

// let files = ["jeczmien_jary.json", "pszenica_ozima.json", "pszenica_jara.json", "jeczmien_ozimy.json", "kukurydza.json", "proso.json", "owies.json", "soja.json"];
// const elementDisplayFilesName = document.querySelector("#displayFilesName");
// function displayFilesName() {
//   let result = "";
//   for (file of files) {
//     file = file.replace(".json", "").replace("_", " ");
//     let id = file.replace(" ", "-");
//     result += '<input class="text-2xl mb-5 text-top-agrar-green/90 flex border-2 border-solid border-top-agrar-green/90 rounded-2xl p-2 m-1 hover:bg-top-agrar-green/20" type="button" id="' + id + '" value="' + file + ' ">';
//   }
//   elementDisplayFilesName.innerHTML = result;
// }
// document.addEventListener("load", displayFilesName());
