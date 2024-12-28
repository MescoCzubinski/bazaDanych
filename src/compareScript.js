document.addEventListener("click", function (event) {
  if (event.target.classList.contains("compare")) {
    let id = event.target.id.replace("-button", "").replace("-span", "");
    const element = document.querySelector("#" + id + "-span");
    if (element.classList.contains("click")) {
      element.classList.remove("click");
    } else {
      element.classList.add("click");
    }
    console.log("#" + id + "-span");
  }
});
