const table = new DataTable("#jeczmien_jary", {
  ajax: "jeczmien_jary.json",
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

const regions = [document.querySelector("#podkarpackie"), document.querySelector("#malopolskie"), document.querySelector("#slaskie"), document.querySelector("#opolskie"), document.querySelector("#dolnoslaskie"), document.querySelector("#swietokrzyskie"), document.querySelector("#lubelskie"), document.querySelector("#lodzkie"), document.querySelector("#mazowieckie"), document.querySelector("#wielkopolskie"), document.querySelector("#lubuskie"), document.querySelector("#kujawsko-pomorskie"), document.querySelector("#podlaskie"), document.querySelector("#zachodnio-pomorskie"), document.querySelector("#warminsko-mazurskie"), document.querySelector("#pomorskie")];

regions.forEach((element) => {
  element.addEventListener("click", function () {
    console.log(element.id);
  });
});
