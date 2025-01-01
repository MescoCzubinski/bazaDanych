let idToCompare = Array();
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("compare")) {
    let id = event.target.id.replace("-button", "").replace("-span", "");
    const element = document.querySelector("#" + id + "-span");
    //czy zaznaczone
    if (element.classList.contains("click")) {
      element.classList.remove("click");
      // idToCompare.pop(id);
    } else {
      //co po klinknięciu
      element.classList.add("click");
      console.log("#" + id);
      // idToCompare.push(id);
    }
  }
  // console.log(idToCompare);
});
