let table = null;
function displayFilesValues(file) {
  if (table !== null) {
    table.destroy();
    table = null;
  }
  if (table === null) {
    let name = file.replace(".json", "");
    table = new DataTable("#table", {
      ajax: "data/" + file,
      columns: arrays[name + "_cols"],
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
      columnDefs: [
        {
          targets: -1, // Last column
          render: function (row) {
            // console.log(row);
            let buttonId = file.replace(".json", "").replace("_", "-") + "-" + row["Rok wyników"] + "-" + row["Odmiany"].replace(/\s+/g, "-");

            return `<button id="${buttonId + "-button"}" type="button" class="compare flex justify-center w-full hover:text-top-agrar-green">
                      <i class="icon-balance-scale compare" id="${buttonId + "-span"}"></i>
                    </button>`;
          },
          sorting: false,
          responsivePriority: 1,
        },
        {
          targets: "_all",
          render: function (data, meta) {
            const columnIndex = meta.col; // Get the current column index
            const unit = arrays[name + "_units"]?.[columnIndex] || ""; // Fetch the unit or use an empty string if undefined
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
  }
}
