let names = ["Pszenica jara", "Jęczmień jary", "Owies jary", "Pszenżyto jare", "Żyto jare"];
let files = ["pszenica_jara.json", "jeczmien_jary.json", "owies_jary.json", "pszenzyto_jare.json", "zyto_jare.json"];
const elementDisplayFilesName = document.querySelector("#displayFilesName");
function displayFilesName() {
  let result = "";
  for (let i = 0; i < names.length; i++) {
    result += '<input class="text-2xl text-top-agrar-green/90 flex border-2 border-solid border-top-agrar-green/90 rounded-2xl p-2 m-2   hover:bg-top-agrar-green/20" type="button" id="' + files[i] + '" value="' + names[i] + ' ">';
  }
  elementDisplayFilesName.innerHTML = result;
}
function displayOnLoad() {
  document.querySelector("#table").classList.add("hidden");
  displayFilesName();
}
document.addEventListener("load", displayOnLoad());

files.forEach((file) => {
  document.getElementById(file).addEventListener("click", function () {
    document.querySelector("#table").classList.remove("hidden");
    displayFilesValues(file);
  });
});
