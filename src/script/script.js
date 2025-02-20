console.log("Cześć! Jestem Mieszko, żyję sobie w konsoli. Fajnie, że do mnie zajrzałeś. Smacznej kawusi życzę");
function displayFilesValues(file, indexOf, noDataInfo, sortingDataIndex = -1, isLOZ) {
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
    lengthMenu: isLOZ
      ? [
          [-1, 10],
          ["wszystkie", "10"],
        ]
      : [
          [10, -1],
          ["10", "wszystkie"],
        ],
    sorting: true,
    responsive: true,
    language: {
      search: `<span id="searching">Wyszukaj odmianę:</span>`,
      lengthMenu: '<div class="text-left p-2 flex items-center"><p class="">Liczba odmian na stronie:</p> _MENU_',
      info: "_START_-_END_ z _TOTAL_ wyników",
      infoFiltered: "",
      emptyTable: "Ładowanie...",
      zeroRecords: noDataInfo,
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
        targets: indexOf,
        responsivePriority: 2,
        visible: function () {
          return indexOf === -1 ? false : true;
        },
      },
      {
        targets: "_all",
        render: function (data, type, row, meta) {
          const columnIndex = meta.col;
          if (columnIndex === 9 && data === "0") {
            return "#";
          }
          if (data !== "#" && data !== "-") {
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
        target: sortingDataIndex,
        responsivePriority: 1,
      },
      {
        target: 1,
        visible: false,
      },
      {
        targets: (function () {
          const totalColumns = $("#example").DataTable().columns().count();
          return Array.from({ length: 16 }, (_, i) => totalColumns - 17 + i);
        })(),
        visible: false,
      },
    ],
    //atrybut "title"
    headerCallback: (thead) => {
      let colsCount = thead.querySelectorAll("th").length;
      thead.querySelectorAll("th").forEach((th, index) => {
        let colTitle = "Kliknięcie nazwy kolumny sortuje narastająco, ponownie kliknięcie malejąco";
        if (index === 1) colTitle = "Na przeciętnym poziomie agrotechniki";
        if (index === 2) colTitle = "Na wyższym poziomie agrotechniki";
        if (isLOZ && index === colsCount - 2) colTitle = "Rok wpisu na listę dla danego województwa";
        if (index === colsCount - 1) colTitle = "Kliknij wagę - porównanie odmian u dołu strony";
        th.title = colTitle;
      });
    },
  });
}

function functioningSpecies(groupOfSpecies, files, region = -1) {
  //files, names <- tablice z config.js
  files.forEach((file, index) => {
    document.getElementById(file).addEventListener("click", function () {
      let indexOf = -1;
      let textWhenNoData = "Brak wyników dla podanych ustawień";
      let isLOZ = false;
      if (region !== -1) {
        indexOf = arrays[file.replace(".json", "") + "_cols"].findIndex((item) => item.data === region);
        textWhenNoData = "brak odmiany na LOZ dla tego województwa";
        isLOZ = true;
      }

      //wyświetlanie danych
      displayFilesValues(file, indexOf, textWhenNoData, -1, isLOZ);

      //mechanika filtrów
      displayFilters(file);

      if (region !== -1) {
        table.columns(indexOf).search("^(?![-#]).*$", true, false).draw();
      }

      //wyświetlanie tytułu
      displayNameText(region, index, groupOfSpecies);

      //przesunięcie przy wyświetlaniu danych
      document.querySelector("#settings").scrollIntoView({
        behavior: "smooth",
        block: "start",
      });

      //tworzenie porównania
      window.compareObj = new Compare("compare", arrays[file.replace(".json", "") + "_col_names"].slice(0, -29), file, groupOfSpecies, files);
      compareObj.displayCompare();

      globalCompareScalar = 1;
    });
  });
}

//tekst z nazwą woj. w sekcji LOZ
function displayLOZText(text) {
  if (text === "Lodzkie") {
    text = "Łódzkie";
  } else if (text === "Slaskie") {
    text = "Śląskie";
  } else if (text === "Zachodniopomorskie") {
    text = "Zach.-Pom.";
  }
  document.querySelector("#LOZ-text").innerHTML = "LOZ woj. " + text.toLowerCase();
}

//tekst z nazwą odmiany i województwem w tytule
function displayNameText(text, index, groupOfSpecies) {
  if (text === -1) {
    document.querySelector("#sorting-text").innerHTML = `<span> Lista odmian wg PDO <b> ${groupOfSpecies[index].toLowerCase()}</b></span>`;
  } else {
    if (text === "Lodzkie") {
      text = "Łódzkie";
    } else if (text === "Slaskie") {
      text = "Śląskie";
    }
    document.querySelector("#sorting-text").innerHTML = `<span "class=text-wrap">Lista odmian zalecanych <b> woj. ${text.toLowerCase() + " " + groupOfSpecies[index].toLowerCase()}</b> (lista pozostałych odmian dostępna wyżej w porównywarce)</span>`;
  }
}

//wyświetlanie grup gatunków
function displaySpeciesGroup(element) {
  let listOfSections = "";
  names_section.forEach((section, index) => {
    if (section === "pozostale_wkrotce") section = "pozostałe wkrótce";
    if (section === "zboza_jare") section = "zboża jare";
    listOfSections += `
      <input 
        class="text-2xl text-top-agrar-green/90 border-2 border-solid border-top-agrar-green/90 rounded-2xl p-2 m-2 hover:bg-top-agrar-green/20" 
        type="button" 
        id="section-${index}" 
        value="${section}">
    `;
  });
  element.innerHTML = listOfSections;
}

//wyświetlanie nazw gatunków
function displaySpecies(element, isLOZ, groupOfSpecies, files) {
  let result = "";
  for (let i = 0; i < groupOfSpecies.length; i++) {
    result += '<input class="text-2xl text-top-agrar-green/90 flex border-2 border-solid border-top-agrar-green/90 rounded-2xl p-2 m-2   hover:bg-top-agrar-green/20" type="button" id="' + files[i] + '" value="' + groupOfSpecies[i] + ' ">';
  }

  if (isLOZ) {
    elementDisplayLOZSpecies.classList.remove("hidden");
    elementDisplayLOZSections.classList.add("hidden");
  } else {
    elementDisplayFilesName.classList.remove("hidden");
    elementDisplaySectionsName.classList.add("hidden");
  }
  element.innerHTML = result;
}
