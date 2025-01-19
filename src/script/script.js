window.addEventListener('load', () => {
  document.querySelector('body').scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
});
function displayFilesValues(file) {
  document.querySelector('#table').scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
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
      //TODO: po czym sortować
      search: `<span id="searching">Wyszukaj odmianę:</span>`,
      lengthMenu: '<div class="text-left p-2 flex items-center"><p class="">Liczba odmian na stronie:</p> _MENU_',
      info: "_START_-_END_ z _TOTAL_ wyników",
      infoFiltered: "",
      emptyTable: "Ładowanie...",
      zeroRecords: "Brak wyników dla podanych ustawień",
    },
    order: [[0, "asc"]],
    columnDefs: [
      {
        targets: -1,
        render: function (row) {
          let buttonId = file.replace(".json", "").replace("_", "-") + "-" + row["Rok wyników"] + "-" + row["Odmiany"].replace(/\s+/g, "-") + "-";
          buttonId = buttonId.replace("--", "-");
          return `<button id="${buttonId + "button"}" type="button" class="h-7 compare flex justify-center w-full hover:text-top-agrar-green">
                    <div class="pr-1 compare" title="Porównanie odmian u dołu strony. Przesuń w prawo w porównywarce umożiwia zobaczenie więcej odmian" id="${buttonId + "border"}">
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
          if(columnIndex === 9 && data === "0"){
            return "nie dotyczy";
          }
          if(data !== "#"){
            const unit = arrays[name + "_units"]?.[columnIndex] || "";
            return data + unit;
          } else {
            return data;
          }
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
