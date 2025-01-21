//kolejność umieszczania kolumn w pliku:
//nazwa, rok wyników, 6 kolumn z informacjami podstawowymi, typ, reszta kolumn, plon a1 I-VI, plon a2 I-VI
//jeśli w kolumnie 10, jest zero mogą się pojawić problemy z renderowaniem danych  script.js około 66
//konwerter: https://tableconvert.com/excel-to-json lub https://tableconvert.com/csv-to-json

let names = ["Pszenica jara", "Jęczmień jary", "Pszenżyto jare"];
let files = ["pszenica_jara.json", "jeczmien_jary.json", "pszenzyto_jare.json"];

//konfiguracja: jednostki, nazw kolumn, lata, sortowaie, typy
// _cols <- bez kropek, polskich znaków

let jeczmien_jary_col_names = ["Nazwa odmiany:", "Rok wyników:", "Plon ziarna a₁:", "Plon ziarna a₂:", "Masa 1000 ziaren:", "Zawartość białka:", "Wysokość roślin:", "Wyleganie:", "Typ:", "Wartość browarna:", "Rok rejestracji:", "Wyrównanie ziarna:", "Dojrzałość pełna:", "Mączniak prawdziwy:", "Plamistość siatkowa:", "Rdza jęczmienia:", "Rynchosporioza:", "Czarna plamistość:", "Plon w rejonie I a₁:", "Plon w rejonie II a₁:", "Plon w rejonie III a₁:", "Plon w rejonie IV a₁:", "Plon w rejonie V a₁:", "Plon w rejonie VI a₁:", "Plon w rejonie I a₂:", "Plon w rejonie II a₂:", "Plon w rejonie III a₂:", "Plon w rejonie IV a₂:", "Plon w rejonie V a₂:", "Plon w rejonie VI a₂:", "Dolnośląskie:", "Kujawsko-Pomorskie:", "Lubelskie:", "Lubuskie:", "Łódzkie:", "Małopolskie:", "Mazowieckie:", "Opolskie:", "Podkarpackie:", "Podlaskie:", "Pomorskie:", "Śląskie:", "Świętokrzyskie:", "Warmińsko-Mazurskie:", "Wielkopolskie:", "Zachodniopomorskie:", "Porównaj"];
let jeczmien_jary_cols = [{ data: "Odmiany" }, { data: "Rok wynikow" }, { data: "Plon ziarna a1" }, { data: "Plon ziarna a2" }, { data: "Masa 1000 ziaren" }, { data: "Zawartosc bialka" }, { data: "Wysokosc roslin" }, { data: "Wyleganie" }, { data: "Typ" }, { data: "Wartosc browarna" }, { data: "Rok rejestracji" }, { data: "Wyrownanie ziarna" }, { data: "Dojrzalosc pelna" }, { data: "Maczniak prawdziwy" }, { data: "Plamistosc siatkowa" }, { data: "Rdza jeczmienia" }, { data: "Rynchosporioza" }, { data: "Czarna plamistosc" }, { data: "Plon w rejonie I a1" }, { data: "Plon w rejonie II a1" }, { data: "Plon w rejonie III a1" }, { data: "Plon w rejonie IV a1" }, { data: "Plon w rejonie V a1" }, { data: "Plon w rejonie VI a1" }, { data: "Plon w rejonie I a2" }, { data: "Plon w rejonie II a2" }, { data: "Plon w rejonie III a2" }, { data: "Plon w rejonie IV a2" }, { data: "Plon w rejonie V a2" }, { data: "Plon w rejonie VI a2" }, { data: "Dolnoslaskie" }, { data: "Kujawsko-Pomorskie" }, { data: "Lubelskie" }, { data: "Lubuskie" }, { data: "Lodzkie" }, { data: "Malopolskie" }, { data: "Mazowieckie" }, { data: "Opolskie" }, { data: "Podkarpackie" }, { data: "Podlaskie" }, { data: "Pomorskie" }, { data: "Slaskie" }, { data: "Swietokrzyskie" }, { data: "Warminsko-Mazurskie" }, { data: "Wielkopolskie" }, { data: "Zachodniopomorskie" }, { data: null }];
let jeczmien_jary_units = ["", "", " dt/ha", " dt/ha", " g", " st. (1-9)", " cm", " st. (1-9)", "", " st. (1-9)", " r.", "%", " dni", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", ""];
let jeczmien_jary_year = ["2025", "2024", "2023", "2022", "2021", "2020"];
let jeczmien_jary_type1_name = "Typ użytkowy:";
let jeczmien_jary_type1 = ["pastewny", "browarny"];

let pszenica_jara_col_names = ["Nazwa odmiany:", "Rok wyników:", "Plon ziarna a₁:", "Plon ziarna a₂:", "Masa 1000 ziaren:", "Zawartość białka:", "Wysokość roślin:", "Wyleganie:", "Grupa technologiczna:", "Liczba opadania:", "Kłos:", "Rok rejestracji:", "Wskaźnik sedymentcji SDS:", "Dojrzałość pełna:", "Choroby podst. źdźbła:", "Mączniak prawdziwy:", "Rdza brunatna:", "Rdza żółta:", "Septoriozy liści:", "Septorioza plew:", "Fuzarioza kłosów:", "Plon w rejonie I a₁:", "Plon w rejonie II a₁:", "Plon w rejonie III a₁:", "Plon w rejonie IV a₁:", "Plon w rejonie V a₁:", "Plon w rejonie VI a₁:", "Plon w rejonie I a₂:", "Plon w rejonie II a₂:", "Plon w rejonie III a₂:", "Plon w rejonie IV a₂:", "Plon w rejonie V a₂:", "Plon w rejonie VI a₂:", "Dolnośląskie:", "Kujawsko-Pomorskie:", "Lubelskie:", "Lubuskie:", "Łódzkie:", "Małopolskie:", "Mazowieckie:", "Opolskie:", "Podkarpackie:", "Podlaskie:", "Pomorskie:", "Śląskie:", "Świętokrzyskie:", "Warmińsko-Mazurskie:", "Wielkopolskie:", "Zachodniopomorskie:", "Porównaj"];
let pszenica_jara_cols = [{ data: "Odmiany" }, { data: "Rok wynikow" }, { data: "Plon ziarna a1" }, { data: "Plon ziarna a2" }, { data: "Masa 1000 ziaren" }, { data: "Zawartosc bialka" }, { data: "Wysokosc roslin" }, { data: "Wyleganie" }, { data: "Grupa technologiczna" }, { data: "Liczba opadania" }, { data: "Klos" }, { data: "Rok rejestracji" }, { data: "Wskaznik sedymentcji SDS" }, { data: "Dojrzalosc pelna" }, { data: "Choroby zdzbla" }, { data: "Maczniak prawdziwy" }, { data: "Rdza brunatna" }, { data: "Rdza zolta" }, { data: "Septoriozy lisci" }, { data: "Septorioza plew" }, { data: "Fuzarioza klosow" }, { data: "Plon w rejonie I a1" }, { data: "Plon w rejonie II a1" }, { data: "Plon w rejonie III a1" }, { data: "Plon w rejonie IV a1" }, { data: "Plon w rejonie V a1" }, { data: "Plon w rejonie VI a1" }, { data: "Plon w rejonie I a2" }, { data: "Plon w rejonie II a2" }, { data: "Plon w rejonie III a2" }, { data: "Plon w rejonie IV a2" }, { data: "Plon w rejonie V a2" }, { data: "Plon w rejonie VI a2" }, { data: "Dolnoslaskie" }, { data: "Kujawsko-Pomorskie" }, { data: "Lubelskie" }, { data: "Lubuskie" }, { data: "Lodzkie" }, { data: "Malopolskie" }, { data: "Mazowieckie" }, { data: "Opolskie" }, { data: "Podkarpackie" }, { data: "Podlaskie" }, { data: "Pomorskie" }, { data: "Slaskie" }, { data: "Swietokrzyskie" }, { data: "Warminsko-Mazurskie" }, { data: "Wielkopolskie" }, { data: "Zachodniopomorskie" }, { data: null }];
let pszenica_jara_units = ["", "", " dt/ha", " dt/ha", " g", " st. (1-9)", " cm", " st. (1-9)", "", " st. (1-9)", "", " r.", " st. (1-9)", " dni", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", ""];
let pszenica_jara_year = ["2025", "2024", "2023", "2022", "2021"];
let pszenica_jara_type1_name = "Typ jakościowy:";
let pszenica_jara_type1 = ["E", "A", "B", "C", "K"];
let pszenica_jara_type2_name = "Rodzaj kłosa:";
let pszenica_jara_type2 = ["ościsty", "bezostny"];

let pszenzyto_jare_col_names = ["Nazwa odmiany:", "Rok wyników:", "Plon ziarna a₁:", "Plon ziarna a₂:", "Masa 1000 ziaren:", "Zawartość białka:", "Wysokość roślin:", "Wyleganie:", "Typ:", "Rok rejestracji:", "Dojrzałość pełna:", "Mączniak prawdziwy:", "Rdza brunatna:", "Rdza żółta:", "Brunatna plamistość liści:", "Septorioza liści:", "Septorioza plew:", "Porastanie ziarna:", "Gęstość ziarna:", "Rynchosporioza:", "Fuzarioza kłosów:", "Plon w rejonie I a₁:", "Plon w rejonie II a₁:", "Plon w rejonie III a₁:", "Plon w rejonie IV a₁:", "Plon w rejonie V a₁:", "Plon w rejonie VI a₁:", "Plon w rejonie I a₂:", "Plon w rejonie II a₂:", "Plon w rejonie III a₂:", "Plon w rejonie IV a₂:", "Plon w rejonie V a₂:", "Plon w rejonie VI a₂:", "Dolnośląskie:", "Kujawsko-Pomorskie:", "Lubelskie:", "Lubuskie:", "Łódzkie:", "Małopolskie:", "Mazowieckie:", "Opolskie:", "Podkarpackie:", "Podlaskie:", "Pomorskie:", "Śląskie:", "Świętokrzyskie:", "Warmińsko-Mazurskie:", "Wielkopolskie:", "Zachodniopomorskie:", "Porównaj:"];
let pszenzyto_jare_cols = [{ data: "Odmiany" }, { data: "Rok wynikow" }, { data: "Plon ziarna  a1" }, { data: "Plon ziarna a2" }, { data: "Masa 1000 ziaren" }, { data: "Zawartosc bialka" }, { data: "Wysokosc roslin" }, { data: "Wyleganie" }, { data: "Typ" }, { data: "Rok rejestracji" }, { data: "Dojrzalosc pelna" }, { data: "Maczniak prawdziwy" }, { data: "Rdza brunatna" }, { data: "Rdza zolta" }, { data: "Brunatna plamistosc lisci" }, { data: "Septorioza lisci" }, { data: "Septorioza plew" }, { data: "Porastanie ziarna" }, { data: "Gestosc ziarna" }, { data: "Rynchosporioza" }, { data: "Fuzarioza klosow" }, { data: "Plon w rejonie I a1" }, { data: "Plon w rejonie II a1" }, { data: "Plon w rejonie III a1" }, { data: "Plon w rejonie IV a1" }, { data: "Plon w rejonie V a1" }, { data: "Plon w rejonie VI a1" }, { data: "Plon w rejonie I a2" }, { data: "Plon w rejonie II a2" }, { data: "Plon w rejonie III a2" }, { data: "Plon w rejonie IV a2" }, { data: "Plon w rejonie V a2" }, { data: "Plon w rejonie VI a2" }, { data: "Dolnoslaskie" }, { data: "Kujawsko-Pomorskie" }, { data: "Lubelskie" }, { data: "Lubuskie" }, { data: "Lodzkie" }, { data: "Malopolskie" }, { data: "Mazowieckie" }, { data: "Opolskie" }, { data: "Podkarpackie" }, { data: "Podlaskie" }, { data: "Pomorskie" }, { data: "Slaskie" }, { data: "Swietokrzyskie" }, { data: "Warminsko-Mazurskie" }, { data: "Wielkopolskie" }, { data: "Zachodniopomorskie" }, { data: null }];
let pszenzyto_jare_units = ["", "", " dt/ha", " dt/ha", " g", "%", " cm", " st. (1-9)", "", " r.", " dni", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", ""];
let pszenzyto_jare_year = ["2025", "2024", "2023", "2022", "2021"];

let arrays = {
  jeczmien_jary_col_names,
  jeczmien_jary_cols,
  jeczmien_jary_units,
  jeczmien_jary_year,
  jeczmien_jary_type1,
  jeczmien_jary_type1_name,

  pszenica_jara_col_names,
  pszenica_jara_cols,
  pszenica_jara_units,
  pszenica_jara_year,
  pszenica_jara_type1,
  pszenica_jara_type1_name,
  pszenica_jara_type2,
  pszenica_jara_type2_name,

  pszenzyto_jare_col_names,
  pszenzyto_jare_cols,
  pszenzyto_jare_units,
  pszenzyto_jare_year,
};
//TODO: DANE: owies + LOZ pszenicy 2024

//TODO: MECHANIKA: odmiana po której sortujesz + responsive priority 1
//TODO: MECHANIKA: klawisz resetuj/powrót do mapki

//TODO: WYGLĄD: dodaj opis rejonów, źródło danych
