function displayFilesValues(file) {
  if ($.fn.DataTable.isDataTable("#table")) {
    $("#table").DataTable().destroy();
    $("#table").empty();
  }
  let name = file.replace(".json", "");
  table = new DataTable("#table", {
    ajax: "data/" + file,
    columns: arrays[name + "_col_names"].map((colName, index) => ({
      data: arrays[name + "_cols"][index]?.data || null,
      title: colName,
    })),
    lengthMenu: [
      [10, -1],
      ["10", "wszystkie"],
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
        targets: -1,
        render: function (row) {
          let buttonId = file.replace(".json", "").replace("_", "-") + "-" + row["Rok wyników"] + "-" + row["Odmiany"].replace(/\s+/g, "-") + "-";
          buttonId = buttonId.replace("--", "-");
          return `<button id="${buttonId + "button"}" type="button" class="h-7 compare flex justify-center w-full hover:text-top-agrar-green">
                    <div class="pr-1 compare" id="${buttonId + "border"}">
                      <i class="icon-balance-scale compare" id="${buttonId + "span"}"></i>
                    </div>
                  </button>`;
        },
        sorting: false,
        responsivePriority: 1,
      },
      {
        targets: "_all",
        render: function (data, type, row, meta) {
          const columnIndex = meta.col;
          const unit = arrays[name + "_units"]?.[columnIndex] || "";
          return data + unit;
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
