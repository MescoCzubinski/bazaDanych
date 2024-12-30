//kolejność umieszczania kolumn w pliku:
//nazwa, rok wyników, 6 kolumn z informacjami podstawowymi, typ, reszta kolumn, plon a1 I-VI, plon a2 I-VI
//konwerter: https://tableconvert.com/excel-to-json

let names = ["Pszenica jara", "Jęczmień jary"];
let files = ["pszenica_jara.json", "jeczmien_jary.json"];

//konfiguracja: jednostki, nazw kolumn, typy, lata
// _cols <- bez kropek
let jeczmien_jary_units = ["", "", " dt/ha", " dt/ha", " g", " st. (1-9)", " cm", " st. (1-9)", "", " st. (1-9)", " r.", " %", " dni", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", ""];
let jeczmien_jary_col_names = ["Odmiany:", "Rok wyników:", "Plon ziarna a1:", "Plon ziarna a2:", "Masa 1000 ziaren:", "Zawartość białka:", "Wysokość roślin:", "Wyleganie:", "Typ:", "Wartość browarna:", "Rok rejestracji:", "Wyrównanie ziarna:", "Dojrzałość pełna:", "Mączniak prawdziwy:", "Plamistość siatkowa:", "Rdza jęczmienia:", "Rynchosporioza:", "Czarna plamistość:", "Plon w rejonie I a1:", "Plon w rejonie II a1:", "Plon w rejonie III a1:", "Plon w rejonie IV a1:", "Plon w rejonie V a1:", "Plon w rejonie VI a1:", "Plon w rejonie I a2:", "Plon w rejonie II a2:", "Plon w rejonie III a2:", "Plon w rejonie IV a2:", "Plon w rejonie V a2:", "Plon w rejonie VI a2:", "Porównaj:"];
let jeczmien_jary_year = ["2023", "2022", "2021", "2020"];
let jeczmien_jary_type = ["browarny", "pastewny"];
let jeczmien_jary_cols = [{ data: "Odmiany" }, { data: "Rok wyników" }, { data: "Plon ziarna a1" }, { data: "Plon ziarna a2" }, { data: "Masa 1000 ziaren" }, { data: "Zawartość białka" }, { data: "Wysokość roślin" }, { data: "Wyleganie" }, { data: "Typ" }, { data: "Wartość browarna" }, { data: "Rok rejestracji" }, { data: "Wyrównanie ziarna" }, { data: "Dojrzałość pełna" }, { data: "Mączniak prawdziwy" }, { data: "Plamistość siatkowa" }, { data: "Rdza jęczmienia" }, { data: "Rynchosporioza" }, { data: "Czarna plamistość" }, { data: "Plon w rejonie I a1" }, { data: "Plon w rejonie II a1" }, { data: "Plon w rejonie III a1" }, { data: "Plon w rejonie IV a1" }, { data: "Plon w rejonie V a1" }, { data: "Plon w rejonie VI a1" }, { data: "Plon w rejonie I a2" }, { data: "Plon w rejonie II a2" }, { data: "Plon w rejonie III a2" }, { data: "Plon w rejonie IV a2" }, { data: "Plon w rejonie V a2" }, { data: "Plon w rejonie VI a2" }, { data: null }];

let pszenica_jara_units = ["", "", " dt/ha", " dt/ha", " g", " st. (1-9)", " cm", " st. (1-9)", "", " st. (1-9)", "", " r.", " st. (1-9)", " dni", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", ""];
let pszenica_jara_col_names = ["Odmiany:", "Rok wyników:", "Plon ziarna a1:", "Plon ziarna a2:", "Masa 1000 ziaren:", "Zawartość białka:", "Wysokość roślin:", "Wyleganie:", "Grupa technologiczna:", "Liczba opadania:", "Kłos:", "Rok rejestracji:", "Wskaźnik sedymentcji SDS:", "Dojrzałość pełna:", "Choroby podst. źdźbła:", "Mączniak prawdziwy:", "Rdza brunatna:", "Rdza żółta:", "Septoriozy liści:", "Septorioza plew:", "Fuzarioza kłosów:", "Plon w rejonie I a1:", "Plon w rejonie II a1:", "Plon w rejonie III a1:", "Plon w rejonie IV a1:", "Plon w rejonie V a1:", "Plon w rejonie VI a1:", "Plon w rejonie I a2:", "Plon w rejonie II a2:", "Plon w rejonie III a2:", "Plon w rejonie IV a2:", "Plon w rejonie V a2:", "Plon w rejonie VI a2:", "Porównaj:"];
let pszenica_jara_year = ["2024", "2023", "2021", "2020"];
let pszenica_jara_type = ["A", "B"];
let pszenica_jara_cols = [{ data: "Odmiany" }, { data: "Rok wyników" }, { data: "Plon ziarna a1" }, { data: "Plon ziarna a2" }, { data: "Masa 1000 ziaren" }, { data: "Zawartość białka" }, { data: "Wysokość roślin" }, { data: "Wyleganie" }, { data: "Grupa technologiczna" }, { data: "Liczba opadania" }, { data: "Kłos" }, { data: "Rok rejestracji" }, { data: "Wskaźnik sedymentcji SDS" }, { data: "Dojrzałość pełna" }, { data: "Choroby podstawy źdźbła" }, { data: "Mączniak prawdziwy" }, { data: "Rdza brunatna" }, { data: "Rdza żółta" }, { data: "Septoriozy liści" }, { data: "Septorioza plew" }, { data: "Fuzarioza kłosów" }, { data: "Plon w rejonie I a1" }, { data: "Plon w rejonie II a1" }, { data: "Plon w rejonie III a1" }, { data: "Plon w rejonie IV a1" }, { data: "Plon w rejonie V a1" }, { data: "Plon w rejonie VI a1" }, { data: "Plon w rejonie I a2" }, { data: "Plon w rejonie II a2" }, { data: "Plon w rejonie III a2" }, { data: "Plon w rejonie IV a2" }, { data: "Plon w rejonie V a2" }, { data: "Plon w rejonie VI a2" }, { data: null }];

let arrays = {
  jeczmien_jary_units,
  jeczmien_jary_col_names,
  jeczmien_jary_type,
  jeczmien_jary_year,
  jeczmien_jary_cols,

  pszenica_jara_units,
  pszenica_jara_col_names,
  pszenica_jara_type,
  pszenica_jara_year,
  pszenica_jara_cols,
};
