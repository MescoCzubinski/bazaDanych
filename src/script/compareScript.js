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
  constructor(elementId, colNames) {
    this.colNames = colNames.slice(0, -13);
    this.rowsToCompare = [];
    this.element = document.querySelector(`#${elementId}`);
  }

  //wyświetlanie porównywarki
  displayCompare() {
    if (this.rowsToCompare.length === 0) {
      this.element.innerHTML = "Dodaj elementy do porównania";
    } else {
      let table = "";
      for (let i = 0; i < this.colNames.length; i += 1) {
        table += "<br>" + this.colNames[i].replace(":", ":  ");
        for (let record of this.rowsToCompare) {
          table += record[i] + ", ";
        }
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
