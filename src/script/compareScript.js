document.querySelector('#prev').classList.add('hidden')
document.querySelector('#next').classList.add('hidden')

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
    this.scrollPosition = 0;
  }
  //wyświetlanie porównywarki
  displayCompare() {
    if (this.rowsToCompare.length < 2) {
      document.querySelector('#prev').classList.add('hidden')
      document.querySelector('#next').classList.add('hidden')
      this.element.innerHTML = `<p class="text-2xl text-top-agrar-green text-center">Dodaj odmianę do porównania - kliknij ikonę<i class="icon-balance-scale pr-2 pl-1"></i>przy odmianie</p>`;
    } else {    
      document.querySelector('#prev').classList.remove('hidden')
      document.querySelector('#next').classList.remove('hidden')

      let table = '<div class=" flex compare-container justify-center ">';
      let colsCounter = 0;
      table += '<div class="compare-header">';
      for (let cell of this.colNames) {
        table += `<div class="compare-name compare-cell">${cell}</div>`;
      }
      table += '</div><div class="scrolable-container">';

      for (let i = 0; i < this.rowsToCompare.length; i += 1) {
        table += '<div class="compare-column">';
        colsCounter += 1;
        for (let j = 0; j < this.rowsToCompare[i].length - 1; j += 1) {
          table += `<div class="compare-cell">${this.rowsToCompare[i][j]}</div>`;
        }
        table += '</div>'
      }
      table += "</div></div>";

      this.element.innerHTML = table;
      
      document.querySelectorAll('.compare-column').forEach((column) => {
        column.style.width = (screen.width*8/12 - 204)/colsCounter + "px";
      });
    }
    document.querySelector('#prev').removeEventListener('click', this.scrollLeftHandler);
    document.querySelector('#next').removeEventListener('click', this.scrollRightHandler);

    this.scrollLeftHandler = () => this.scroll('left');
    this.scrollRightHandler = () => this.scroll('right');
    document.querySelector('#prev').addEventListener('click', this.scrollLeftHandler);
    document.querySelector('#next').addEventListener('click', this.scrollRightHandler);
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

  scroll(direction){
    const items = document.querySelectorAll('.compare-column');

    if(direction === "left"){
      this.scrollPosition -= 160;
    } else {
      this.scrollPosition += 160;
    }
  
    const maxScroll = (items.length * 160) - (screen.width * 8 / 12 - 204);
    if (this.scrollPosition < 0) this.scrollPosition = 0;
    if (this.scrollPosition > maxScroll) this.scrollPosition = maxScroll;

    items.forEach((item) => {
      item.style.transform = `translateX(-${this.scrollPosition}px)`;
    });
  }
}

