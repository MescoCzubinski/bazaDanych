let table = null;
function displayFilesValues(file) {
  if (table !== null) {
    table.destroy();
    table = null;
  }
  if (table === null) {
    table = new DataTable("#table", {
      // responsive: true,
      ajax: "data/" + file,
      lengthMenu: [
        [-1, 10],
        ["wszystkie", "10"],
      ],
      //by pokazać wszystko na raz
      // lengthChange: false,
      // pageLength: -1,
      language: {
        search: `<span title="Rok - wyniki stanowią średnią z trzech lat, a wybierany rok jest ostatnim z trzylecia"> Wyniki z roku: <select id="yearFilter" class="w-16 h-8">
        <option value="2023" selected>2023</option>
        <option value="2022">2022</option>
        <option value="2021">2021</option>
        <option value="2020">2020</option>
        </select> </span>`,
        lengthMenu: "Liczba wyników na stronie: _MENU_ ",
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
    if (elementYearFilter) {
      const selectedYear = elementYearFilter.value;
      table.columns(1).search(selectedYear).draw();

      elementYearFilter.addEventListener("change", () => {
        const selectedYear = elementYearFilter.value;
        table.columns(1).search(selectedYear).draw();
      });
    }
  }
}
