let table = null;
function displayFilesValues(file) {
  if (table !== null) {
    table.destroy();
    table = null;
  }
  if (table === null) {
    let id = 0;
    let name = file.replace(".json", "") + "_config";
    if ("jeczmien_jary_config" === name) {
      console.log(Array.isArray(arrays[name]));
      console.log(Array.isArray(jeczmien_jary_config));
    }
    table = new DataTable("#table", {
      ajax: "data/" + file,
      columns: [{ data: "Odmiany" }, { data: "Rok wyników" }, { data: "Plon ziarna a1" }, { data: "Plon ziarna a2" }, { data: "Masa 1000 ziaren" }, { data: "Zawartość białka" }, { data: "Wysokość roślin" }, { data: "Wyleganie" }, { data: "Typ" }, { data: "Wartość browarna" }, { data: "Rok rejestracji" }, { data: "Wyrównanie ziarna" }, { data: "Dojrzałość pełna" }, { data: "Mączniak prawdziwy" }, { data: "Plamistość siatkowa" }, { data: "Rdza jęczmienia" }, { data: "Rynchosporioza" }, { data: "Czarna plamistość" }, { data: "Plon w rejonie I a1" }, { data: "Plon w rejonie II a1" }, { data: "Plon w rejonie III a1" }, { data: "Plon w rejonie IV a1" }, { data: "Plon w rejonie V a1" }, { data: "Plon w rejonie VI a1" }, { data: "Plon w rejonie I a2" }, { data: "Plon w rejonie II a2" }, { data: "Plon w rejonie III a2" }, { data: "Plon w rejonie IV a2" }, { data: "Plon w rejonie V a2" }, { data: "Plon w rejonie VI a2" }, { data: null }],
      lengthMenu: [
        [-1, 10],
        ["wszystkie", "10"],
      ],
      sorting: true,
      language: {
        search: `<div><span title="Typ">Typ: 
                  <select id="type" class="w-30 h-8">
                    <option value="1" selected>browarny</option>
                    <option value="0">pastewny</option>
                  </select> 
                </span></div>
                <div><span title="Rok - wyniki stanowią średnią z trzech lat, a wybierany rok jest ostatnim z trzylecia">Wyniki z roku: 
                  <select id="yearFilter" class="w-16 h-8">
                    <option value="2023" selected>2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                    <option value="2020">2020</option>
                  </select> 
                </span></div>
                <div><span class="">Wyszukaj:</span></div>`,
        lengthMenu: "Liczba wyników na stronie: _MENU_ ",
        info: "_START_-_END_ z _TOTAL_ wyników",
        infoFiltered: "",
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
            return data + " " + unit; // Append the unit to the data
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
  }
}
