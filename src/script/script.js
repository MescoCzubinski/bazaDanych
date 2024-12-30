let table = null;
function displayFilesValues(file) {
  if (table !== null) {
    table.destroy();
    table = null;
  }
  if (table === null) {
    let id = 0;
    let name = file.replace(".json", "") + "_units";
    console.log(file);
    table = new DataTable("#table", {
      ajax: "data/" + file,
      columns: arrays[name.replace("_units", "_cols")],
      lengthMenu: [
        [-1, 10],
        ["wszystkie", "10"],
      ],
      sorting: true,
      language: {
        search: `<div><span title="Typ">Typ: 
                  <select id="type" class="w-30 h-8"></select> 
                </span></div>
                <div><span title="Rok - wyniki stanowią średnią z trzech lat, a wybierany rok jest ostatnim z trzylecia">Wyniki z roku: 
                  <select id="yearFilter" class="w-16 h-8"></select> 
                </span></div>
                <div><span class="">Wyszukaj:</span></div>`,
        lengthMenu: "Liczba wyników na stronie: _MENU_ ",
        info: "_START_-_END_ z _TOTAL_ wyników",
        infoFiltered: "",
        emptyTable: "Ładowanie...",
      },
      order: [[0, "asc"]],
      rowId: function () {
        id += 1;
        return file.replace(".json", "").replace("_", "-") + "-row-" + (id - 1 - table.rows().count());
      },
      columnDefs: [
        {
          target: -1,
          render: function () {
            let buttonId = file.replace(".json", "").replace("_", "-") + "-row-" + (id - 1 - table.rows().count()) + "-button";
            return `<button id="${buttonId}" type="button" class="compare flex justify-center w-full hover:text-top-agrar-green">
            <i class="icon-balance-scale compare" id=${buttonId.replace("button", "span")}></i>
            </button>`;
          },
          sorting: false,
          responsivePriority: 1,
        },
        {
          targets: "_all",
          render: function (data, type, row, meta) {
            const columnIndex = meta.col; // Get the current column index
            const unit = arrays[name]?.[columnIndex] || ""; // Fetch the unit or use an empty string if undefined
            return data + unit; // Append the unit to the data
          },
        },
        {
          target: 0,
          responsivePriority: 1,
        },
        {
          target: 1,
          visible: false,
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

    const elementType = document.querySelector("#type");
    if (elementType) {
      const selectedType = elementType.value;
      table.columns(8).search(selectedType).draw();

      elementType.addEventListener("change", () => {
        const selectedType = elementType.value;
        table.columns(8).search(selectedType).draw();
      });
    }
  }
}
