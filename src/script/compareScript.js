document.addEventListener("click", function (event) {
  if (event.target.classList.contains("compare")) {
    let id = event.target.id.replace("-button", "").replace("-span", "");
    const element = document.querySelector("#" + id + "-span");
    const elementBorder = document.querySelector("#" + id + "-border");
    //czy zaznaczone
    if (element.classList.contains("to-compare")) {
      element.classList.remove("to-compare");
      elementBorder.classList.remove("compare-border");

      row = Array.from(event.target.closest("tr").querySelectorAll("td")).map((cell) => cell.textContent.trim());
      compareObj.removeRow(row);
    } else {
      element.classList.add("to-compare");
      elementBorder.classList.add("compare-border");

      row = Array.from(event.target.closest("tr").querySelectorAll("td")).map((cell) => cell.textContent.trim());
      compareObj.addRow(row);
    }
  }
});

class Compare {
  //konstruktor
  constructor(elementId, colNames) {
    //nazwy kolumn bez ostatnich 13 i roku wyników
    this.colNames = colNames.slice(0, -13);
    const index = this.colNames.findIndex((r) => JSON.stringify(r) === JSON.stringify("Rok wyników:"));
    if (index !== -1) {
      this.colNames.splice(index, 1);
    }

    this.rowsToCompare = [];
    this.element = document.querySelector(`#${elementId}`);
  }

  //wyświetlanie porównywarki
  displayCompare() {
    if (this.rowsToCompare.length === 0) {
      this.element.innerHTML = `<p class="text-2xl text-top-agrar-green">Dodaj elementy do porównania</p>`;
    } else {
      let table = "";
      for (let i = 0; i < this.colNames.length; i += 1) {
        table += '<div class="compare-row"> <div class="compare-title">' + this.colNames[i] + '</div> <div class="compare-content">';
        for (let record of this.rowsToCompare) {
          table += "<div class=compare-cell>" + record[i] + "</div>";
        }
        table += "</div> </div>";
      }

      this.element.innerHTML = table;
      console.log(this.rowsToCompare);
    }
  }

  //dodawanie wiersza do porównywarki
  addRow(row) {
    const fragmentRow = row.slice(0, -12);
    this.rowsToCompare.push(fragmentRow);
    this.displayCompare();
  }

  //usunięcie wiersza z porównywarki
  removeRow(row) {
    const fragmentRow = row.slice(0, -12);
    const index = this.rowsToCompare.findIndex((r) => JSON.stringify(r) === JSON.stringify(fragmentRow));
    if (index !== -1) {
      this.rowsToCompare.splice(index, 1);
    }
    this.displayCompare();
  }
}
