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
    this.colNames = colNames;
    this.firstTimeRender = false;
    const index = this.colNames.indexOf("Rok wyników:");
    if (index !== -1) {
      this.colNames.splice(index, 1);
    }    

    this.rowsToCompare = [];
    this.element = document.querySelector(`#${elementId}`);
    // this.scrollPosition = 0;
  }
  //wyświetlanie porównywarki
  displayCompare() {
    if (this.rowsToCompare.length < 2) {
      this.element.innerHTML = `<p class="text-2xl text-top-agrar-green text-center">Dodaj odmianę do porównania - kliknij ikonę<i class="icon-balance-scale pr-2 pl-1"></i>przy odmianie</p>`;
    } else {
      if(!this.firstTimeRender){
        this.firstTimeRender = true;
        document.querySelector('#compare').scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      }
      let table = '<div class="compare-table">';
      for(let i=0; i<this.rowsToCompare[0].length-1; i++){
        table += '<div class="compare-row">'
        console.log(this.colNames[i])
        table += `<div class="compare-name">${this.colNames[i].replace(':', '')}</div><div class="compare-scrolling">`
        for(let j=0; j<this.rowsToCompare.length; j++){
          table += `<div class="compare-cell">${this.rowsToCompare[j][i]}</div>`
        }
        table += '</div></div>'
      }
      table += "</div>";

      this.element.innerHTML = table;
      
      let screenWidth = screen.width;

      screenWidth > 768 ? screenWidth *= 8/12 : screenWidth*=11/12;
      document.querySelectorAll('.compare-cell').forEach((cell) => {
        cell.style.width = (screenWidth - 232)/this.rowsToCompare.length + "px";
      });
      
      this.synchronizeScrolling();
    }
  }

  //łączenie wierszy by się razem zmieniały
  synchronizeScrolling() {
    const scrollingElements = document.querySelectorAll('.compare-scrolling');
    scrollingElements.forEach((scrollingElement) => {
      scrollingElement.addEventListener('scroll', (event) => {
        const scrollLeft = event.target.scrollLeft;
        scrollingElements.forEach((el) => {
          if (el !== event.target) {
            el.scrollLeft = scrollLeft;
          }
        });
      });
    });
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

