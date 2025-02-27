//kolejność: nazwa, rok wyników, 6 kolumn z informacjami podstawowymi, typy, reszta kolumn, ew. plon a1 I-VI, ew. plon a2 I-VI
//gdy brak plonu zmienić konstruktor - compareScript.js, gdy brak plonu a1 i a2 zmienić atrybut title - script.js
//jeśli w kolumnie 10, jest zero mogą się pojawić problemy z renderowaniem danych script.js około 66
//konwerter: https://tableconvert.com/excel-to-json

let zboza_jare_files = ["pszenica_jara.json", "jeczmien_jary.json", "pszenzyto_jare.json", "owies_jary.json"];
let zboza_jare = ["Pszenica jara", "Jęczmień jary", "Pszenżyto jare", "Owies jary"];

let ziemniak = ["Ziemniak", "Burak wkrótce"];
let ziemniak_files = ["ziemniak.json"];

let bobowate = ["Groch", "Bobik", "Łubin biały", "Łubin wąskolistny", "Łubin żółty"];
let bobowate_files = ["groch.json", "bobik.json", "lubin_bialy.json", "lubin_waskolistny.json", "lubin_zolty.json"];

let kukurydza = ["kukurydza na ziarno", "kukurydza na kiszonkę"];
let kukurydza_files = ["kukurydza_ziarno.json", "kukurydza_kiszonka.json"];

let sectionsArr = [zboza_jare, ziemniak, bobowate, kukurydza];
let filesArr = [zboza_jare_files, ziemniak_files, bobowate_files, kukurydza_files];

const names_section = ["zboza_jare", "okopowe", "bobowate", "kukurydza", "pozostale_wkrotce"];

let lubin_zolty_col_names = ["Odmiana:", "Rok wyników:", "Plon ziarna:", "Plon białka ogól.:", "Zaw. białka ogól.:", "Masa 1000 nasion:", "Wysokość:", "Wyleganie:", "Typ:", "Rok rejestru:", "Barwa kwiatów:", "Siew - dojrz. tech.:", "Zaw. tłuszczu sur.:", "Zaw. włókna sur.:", "Długość kwitnienia:", "Zaw. alkaloidów:", "Rośln. zielone zbior.:", "Wyleganie po kwitn.:", "Pękanie strąków:", "Antraknoza 2. term.:", "Antraknoza 1. term.:", "Choroby fuzaryjne:", "Równom. dojrz.:", "dolnośląskie:", "kujawsko-pomorskie:", "lubelskie:", "lubuskie:", "łódzkie:", "małopolskie:", "mazowieckie:", "opolskie:", "podkarpackie:", "podlaskie:", "pomorskie:", "śląskie:", "świętokrzyskie:", "warmińsko-mazurskie:", "wielkopolskie:", "zachodniopomorskie:", "Porównaj"];
let lubin_zolty_cols = [{ data: "Odmiany" }, { data: "Rok wynikow" }, { data: "Plon ziarna" }, { data: "Plon bialka ogolnego" }, { data: "Zawartosc bialka ogolnego" }, { data: "Masa 1000 nasion" }, { data: "Wysokosc roslin" }, { data: "Wyleganie" }, { data: "Typ" }, { data: "Rok wpisu do KR" }, { data: "Barwa kwiatow" }, { data: "Okres od siewu do dojrzalosci technicznej" }, { data: "Zawartosc tluszczu surowego" }, { data: "Zawartosc wlokna surowego" }, { data: "Dlugosc fazy kwitnienia" }, { data: "Zawartosc alkaloidów" }, { data: "Udział roślin zielonych przed zbiorem" }, { data: "Odporność na wyleganie po zakończeniu kwitnienia" }, { data: "Pekanie straków" }, { data: "Antrakoza 2 termin" }, { data: "Antrakoza 1 termin" }, { data: "Choroby fuzaryjne" }, { data: "Rownomiernosc dojrzewania" }, { data: "Dolnoslaskie" }, { data: "Kujawsko-pomorskie" }, { data: "Lubelskie" }, { data: "Lubuskie" }, { data: "Lodzkie" }, { data: "Malopolskie" }, { data: "Mazowieckie" }, { data: "Opolskie" }, { data: "Podkarpackie" }, { data: "Podlaskie" }, { data: "Pomorskie" }, { data: "Slaskie" }, { data: "Swietokrzyskie" }, { data: "Warminsko-Mazurskie" }, { data: "Wielkopolskie" }, { data: "Zachodniopomorskie" }, { data: null }];
let lubin_zolty_units = ["", "", " dt/ha", " kg/ha", "%", " g", " cm", " dt/ha", "", " r.", "", " dni", "%", "%", " dni", "%", " st. (1-9)", " st. (1-9)", "st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", ""];
let lubin_zolty_year = ["2025", "2024", "2022"];

let lubin_waskolistny_col_names = ["Odmiana:", "Rok wyników:", "Plon nasion:", "Plon białka ogól.:", "Zaw. białka ogól.:", "Masa 1000 nasion:", "Wysokość:", "Wyleganie:", "Typ:", "Rok rejestracji:", "Barwa kwiatów:", "Zaw. tłuszczu sur.:", "Zaw. włókna sur.:", "Zaw. alkaloidów:", "Siew - dojrz. tech.:", "Równom. dojrz.:", "Pękanie strąków:", "Antraknoza 1. term.:", "Fuzaryjne więdnięcie:", "dolnośląskie:", "kujawsko-pomorskie:", "lubelskie:", "lubuskie:", "łódzkie:", "małopolskie:", "mazowieckie:", "opolskie:", "podkarpackie:", "podlaskie:", "pomorskie:", "śląskie:", "świętokrzyskie:", "warmińsko-mazurskie:", "wielkopolskie:", "zachodniopomorskie:", "Porównaj"];
let lubin_waskolistny_cols = [{ data: "Odmiany" }, { data: "Rok wynikow" }, { data: "Plon nasion" }, { data: "Plon bialka ogolnego" }, { data: "Zawartosc bialka ogolnego" }, { data: "Masa 1000 nasion" }, { data: "Wysokosc roslin" }, { data: "Wyleganie" }, { data: "Typ" }, { data: "Rok wpisu do KR" }, { data: "Barwa kwiatow" }, { data: "Zawartosc tluszczu surowego" }, { data: "Zawartosc wlokna surowego" }, { data: "Zawartosc alkaloidow" }, { data: "Okres od siewu do dojrzalosci technicznej" }, { data: "Rownomiernosc dojrzewania" }, { data: "Pekanie strakow" }, { data: "Odpornosc na antraknoze termin I" }, { data: "Fuzaryjne wiedniecie" }, { data: "Dolnośląskie" }, { data: "Kujawsko-pomorskie" }, { data: "Lubelskie" }, { data: "Lubuskie" }, { data: "Łódzkie" }, { data: "Małopolskie" }, { data: "Mazowieckie" }, { data: "Opolskie" }, { data: "Podkarpackie" }, { data: "Podlaskie" }, { data: "Pomorskie" }, { data: "Śląskie" }, { data: "Świętokrzyskie" }, { data: "Warmińsko-Mazurskie" }, { data: "Wielkopolskie" }, { data: "Zachodniopomorskie" }, { data: null }];
let lubin_waskolistny_units = ["", "", " dt/ha", " kg/ha", "%", " g", "cm", " st. (1-9) dt/ha", "", " r.", "", "%", "%", "%", " dni", " st. (1-9)", "", " st. (1-9)", " st. (1-9)", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", ""];
let lubin_waskolistny_year = ["2025", "2024", "2022"];
let lubin_waskolistny_type1_name = "Typ:";
let lubin_waskolistny_type1 = ["samokończące niskoalkaloidowe", "niesamokończące niskoalkaloidowe"];

let lubin_bialy_col_names = ["Odmiana:", "Rok wyników:", "Plon nasion:", "Plon białka ogól.:", "Zaw. białka ogól.:", "Masa 1000 nasion:", "Wysokość:", "Wyleganie:", "Typ:", "Rok rejestracji:", "Barwa kwiatów:", "Zaw. tłuszczu sur.:", "Zaw. włókna sur.:", "Zaw. alkaloidów:", "Siew - dojrz. tech.:", "Siew - pocz. kwitn.:", "Długość kwitnienia:", "Równom. dojrz.:", "Rośln. zielone zbior.:", "Pękanie strąków:", "Antraknoza:", "dolnośląskie:", "kujawsko-pomorskie:", "lubelskie:", "lubuskie:", "łódzkie:", "małopolskie:", "mazowieckie:", "opolskie:", "podkarpackie:", "podlaskie:", "pomorskie:", "śląskie:", "świętokrzyskie:", "warmińsko-mazurskie:", "wielkopolskie:", "zachodniopomorskie:", "Porównaj"];
let lubin_bialy_cols = [{ data: "Odmiany" }, { data: "Rok wynikow" }, { data: "Plon nasion" }, { data: "Plon bialka ogolnego" }, { data: "Zawartosc bialka ogolnego" }, { data: "Masa 1000 nasion" }, { data: "Wysokosc roslin" }, { data: "Wyleganie przed zbiorem" }, { data: "Typ" }, { data: "Rok wpisu do KR" }, { data: "Barwa kwiatow" }, { data: "Zawartosc tluszczu surowego" }, { data: "Zawartosc wlokna surowego" }, { data: "Zawartosc alkaloidów" }, { data: "Okres od siewu do dojrzalosci technicznej" }, { data: "Okresu od siewu do poczatku kwitnienia" }, { data: "Dlugosc fazy kwitnienia" }, { data: "Rownomiernosc dojrzewania" }, { data: "Udzial roslin zielonych przed zbiorem" }, { data: "Pekanie strakow" }, { data: "Antraknoza" }, { data: "Dolnośląskie" }, { data: "Kujawsko-pomorskie" }, { data: "Lubelskie" }, { data: "Lubuskie" }, { data: "Łódzkie" }, { data: "Małopolskie" }, { data: "Mazowieckie" }, { data: "Opolskie" }, { data: "Podkarpackie" }, { data: "Podlaskie" }, { data: "Pomorskie" }, { data: "Śląskie" }, { data: "Świętokrzyskie" }, { data: "Warmińsko-Mazurskie" }, { data: "Wielkopolskie" }, { data: "Zachodniopomorskie" }, { data: null }];
let lubin_bialy_units = ["", "", " dt/ha", " kg/ha", "%", " g", " cm", " st. (1-9)", "", " r.", "", "%", "%", "%", " dni", " dni", " dni", " st. (1-9)", "%", " st. (1-9", " st. (1-9)", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", ""];
let lubin_bialy_year = ["2024", "2022"];
let lubin_bialy_type1_name = "Typ:";
let lubin_bialy_type1 = ["samokończące pastewne", "niesamokończące pastewne"];

let kukurydza_kiszonka_col_names = ["Odmiana:", "Rok wyników:", "Plon ogolny św.m.:", "Plon s.m.:", "Zawartosc s.m.:", "Liczba FAO:", "Wysokość:", "Strawność:", "Wczesność:", "Głownia łodygi:", "Głownia kolby:", "dolnośląskie:", "kujawsko-pomorskie:", "lubelskie:", "lubuskie:", "łódzkie:", "małopolskie:", "mazowieckie:", "opolskie:", "podkarpackie:", "podlaskie:", "pomorskie:", "śląskie:", "świętokrzyskie:", "warmińsko-mazurskie:", "wielkopolskie:", "zachodniopomorskie:", "Porównaj"];
let kukurydza_kiszonka_cols = [{ data: "Odmiany" }, { data: "Rok wynikow" }, { data: "Plon ogolny swiezej masy" }, { data: "Plon suchej masy" }, { data: "Zawartosc suchej masy" }, { data: "Liczba FAO" }, { data: "Wysokosc roslin" }, { data: "Strawnosc" }, { data: "Wczesnosc" }, { data: "Głownia łodygi" }, { data: "Głownia kolby" }, { data: "Dolnoslaskie" }, { data: "Kujawsko-Pomorskie" }, { data: "Lubelskie" }, { data: "Lubuskie" }, { data: "Lodzkie" }, { data: "Malopolskie" }, { data: "Mazowieckie" }, { data: "Opolskie" }, { data: "Podkarpackie" }, { data: "Podlaskie" }, { data: "Pomorskie" }, { data: "Slaskie" }, { data: "Swietokrzyskie" }, { data: "Warminsko-Mazurskie" }, { data: "Wielkopolskie" }, { data: "Zachodniopomorskie" }, { data: null }];
let kukurydza_kiszonka_units = ["", "", " dt/ha", " dt/ha", "%", "", " cm", "", "", "% poraż.", "% poraż.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", ""];
let kukurydza_kiszonka_year = ["2025", "2024", "2023", "2022"];
let kukurydza_kiszonka_type1_name = "Wczesność:";
let kukurydza_kiszonka_type1 = ["średniopóźne", "wczesne", "średniowczesne"];

let kukurydza_ziarno_col_names = ["Odmiana:", "Rok wyników:", "Plon - 14% wilg.:", "Wilg. ziar. zbiór:", "Liczba FAO:", "Wysokość:", "Wyleganie:", "Typ ziarna:", "Wczesność:", "Typ mieszańca:", "Gęstość w st. zsypnym:", "Cukry ogółem:", "Fuzarioza łodygi:", "Fuzarioza kolby:", "Głownia łodygi:", "Głownia kolby:", "Omacnica:", "dolnośląskie:", "kujawsko-pomorskie:", "lubelskie:", "lubuskie:", "łódzkie:", "małopolskie:", "mazowieckie:", "opolskie:", "podkarpackie:", "podlaskie:", "pomorskie:", "śląskie:", "świętokrzyskie:", "warmińsko-mazurskie:", "wielkopolskie:", "zachodniopomorskie:", "Porównaj"];
let kukurydza_ziarno_cols = [{ data: "Odmiana" }, { data: "Rok wynikow" }, { data: "Plon ziarna przy 14% wilgotnosci" }, { data: "Wilgotnosc ziarna w czasie zbioru" }, { data: "Liczba FAO" }, { data: "Wysokosc roslin" }, { data: "Wyleganie" }, { data: "Typ ziarna" }, { data: "Wczesnosc" }, { data: "Typ mieszańca" }, { data: "Gęstosc ziarna w stanie zsypnym" }, { data: "Zawartosc cukrow ogolem" }, { data: "Fuzarioza łodygi" }, { data: "Fuzarioza kolby" }, { data: "Głownia łodygi" }, { data: "Głownia kolby" }, { data: "Omacnica prosowianka" }, { data: "Dolnoslaskie" }, { data: "Kujawsko-Pomorskie" }, { data: "Lubelskie" }, { data: "Lubuskie" }, { data: "Lodzkie" }, { data: "Malopolskie" }, { data: "Mazowieckie" }, { data: "Opolskie" }, { data: "Podkarpackie" }, { data: "Podlaskie" }, { data: "Pomorskie" }, { data: "Slaskie" }, { data: "Swietokrzyskie" }, { data: "Warminsko-Mazurskie" }, { data: "Wielkopolskie" }, { data: "Zachodniopomorskie" }, { data: null }];
let kukurydza_ziarno_units = ["", "", " dt/ha", "%", "", " cm", "%", "", "", "", " kg/hl", "%", " st. (1-9)", " st. (1-9)", " % poraż.", " % poraż.", " % poraż.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", ""];
let kukurydza_ziarno_year = ["2025", "2024", "2023", "2022"];
let kukurydza_ziarno_type1_name = "Wczesność:";
let kukurydza_ziarno_type1 = ["średniopóźne", "wczesne", "średniowczesne"];

let bobik_col_names = ["Odmiana:", "Rok wyników:", "Plon nasion:", "Plon białka ogól.:", "Zaw. białka ogól.:", "Masa 1000 nasion:", "Wysokość:", "Wyleganie:", "Typ:", "Rok rejestracji:", "Zawartość wł. sur.:", "Zawartość tanin:", "Siewu - dojrz. tech.:", "Równom. dojrz.:", "Siewu - pocz. kwit.:", "Pękanie strąków:", "Łamliwość łodyg:", "Wyleganie po kwitn.:", "Barwa nasion:", "Długość kwitnienia:", "Czekoladowa plam.:", "Szara pleśń:", "Rdza bobiku:", "Askochytoza:", "Uszk. strąkowca:", "dolnośląskie:", "kujawsko-pomorskie:", "lubelskie:", "lubuskie:", "łódzkie:", "małopolskie:", "mazowieckie:", "opolskie:", "podkarpackie:", "podlaskie:", "pomorskie:", "śląskie:", "świętokrzyskie:", "warmińsko-mazurskie:", "wielkopolskie:", "zachodniopomorskie:", "Porównaj"];
let bobik_cols = [{ data: "Odmiany" }, { data: "Rok wynikow" }, { data: "Plon nasion" }, { data: "Plon bialka" }, { data: "Zawartosc bialka ogolnego" }, { data: "Masa 1000 nasion" }, { data: "Wysokosc roslin" }, { data: "Wyleganie" }, { data: "Typ" }, { data: "Rok wpisu do KR" }, { data: "Zawartosc wlokna surowego" }, { data: "Zawartosc tanin" }, { data: "Od siewu do dojrzalosci technicznej" }, { data: "Rownomiernosc dojrzewania" }, { data: "Okres od siewu do poczatku kwitnienia" }, { data: "Pekanie strakow" }, { data: "Lamliwosc lodyg" }, { data: "Wyleganie po kwitnieniu" }, { data: "Barwa nasion" }, { data: "Dlugosc fazy kwitnienia" }, { data: "Czekoladowa plamistosc bobiku" }, { data: "Szara plesn" }, { data: "Rdza bobiku" }, { data: "Zgorzelowa plamistosc - askochytoza" }, { data: "Uszkodzenia przez strakowca" }, { data: "Dolnoslaskie" }, { data: "Kujawsko-Pomorskie" }, { data: "Lubelskie" }, { data: "Lubuskie" }, { data: "Lodzkie" }, { data: "Malopolskie" }, { data: "Mazowieckie" }, { data: "Opolskie" }, { data: "Podkarpackie" }, { data: "Podlaskie" }, { data: "Pomorskie" }, { data: "Slaskie" }, { data: "Swietokrzyskie" }, { data: "Warminsko-Mazurskie" }, { data: "Wielkopolskie" }, { data: "Zachodniopomorskie" }, { data: null }];
let bobik_units = ["", "", " dt/ha", " kg/ha", " %", " g", " cm", " st. (1-9)", "", " r.", " %", " mg/g s.m.", " dni", " st. (1-9)", " dni", " st. (1-9)", " st. (1-9)", " st. (1-9)", "", " dni", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", "", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", ""];
let bobik_year = ["2025", "2024", "2022"];
let bobik_type1_name = "Typ:";
let bobik_type1 = ["niesamokończące niskotaninowe", "niesamokończące wysokotaninowe", "samokończąca"];

let groch_col_names = ["Odmiana:", "Rok wyników:", "Plon nasion:", "Plon białka:", "Zaw. białka ogól.:", "Masa 1000 nasion:", "Wysokość:", "Wyleganie:", "Typ:", "Typ ulistnienia:", "Rok rejestracji:", "Wyleg. przed zbior.:", "Barwa kwiatów/nasion:", "Zaw. włókna sur.:", "Udział nas. ø>7 mm:", "Udział nas. ø>6-7 mm:", "Siew - dojrz. tech:", "Siew - pocz. kwitn.:", "Długość kwitnienia:", "Wyleganie po kwitn.:", "Pękanie strąków:", "Równom. dojrz.:", "Fuzaryjne więdnięcie:", "Askochytoza:", "Mączniak prawdziwy:", "Mączniak rzekomy:", "dolnośląskie:", "kujawsko-pomorskie:", "lubelskie:", "lubuskie:", "łódzkie:", "małopolskie:", "mazowieckie:", "opolskie:", "podkarpackie:", "podlaskie:", "pomorskie:", "śląskie:", "świętokrzyskie:", "warmińsko-mazurskie:", "wielkopolskie:", "zachodniopomorskie:", "Porównaj"];
let groch_cols = [{ data: "Odmiany" }, { data: "Rok wynikow" }, { data: "Plon nasion" }, { data: "Plon bialka" }, { data: "Zawartosc bialka ogolnego" }, { data: "Masa 1000 nasion" }, { data: "Wysokosc roslin" }, { data: "Wyleganie" }, { data: "Typ" }, { data: "Typ ulistnienia" }, { data: "Rok wpisania do KR" }, { data: "Wyleganie przed zbiorem" }, { data: "Barwa kwiatow/nasion" }, { data: "Zawartosc wlokna surowego" }, { data: "Udzial nasion bardzo duzych (ø>7 mm)" }, { data: "Udzial nasion duzych (ø>6-7 mm)" }, { data: "Okres od siewu do dojrzałosci technicznej" }, { data: "Okres od siewu do poczatku kwitnienia" }, { data: "Dlugosc fazy kwitnienia" }, { data: "Wyleganie po zakonczeniu kwitnienia" }, { data: "Pekanie strakow" }, { data: "Rownomiernosc dojrzewania" }, { data: "Fuzaryjne wiedniecie" }, { data: "Zgorzelowa plamistosc - askochytoza" }, { data: "Maczniak prawdziwy" }, { data: "Maczniak rzekomy" }, { data: "Dolnoslaskie" }, { data: "Kujawsko-Pomorskie" }, { data: "Lubelskie" }, { data: "Lubuskie" }, { data: "Lodzkie" }, { data: "Malopolskie" }, { data: "Mazowieckie" }, { data: "Opolskie" }, { data: "Podkarpackie" }, { data: "Podlaskie" }, { data: "Pomorskie" }, { data: "Slaskie" }, { data: "Swietokrzyskie" }, { data: "Warminsko-Mazurskie" }, { data: "Wielkopolskie" }, { data: "Zachodniopomorskie" }, { data: null }];
let groch_units = ["", "", " dt/ha", " kg/ha", " %", " g", " cm", " st. (1-9)", "", "", " r.", " st. (1-9)", "", " %", " %", " %", " dni", " dni", " dni", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", ""];
let groch_year = ["2025", "2024", "2022"];
let groch_type1_name = "Typ:";
let groch_type1 = ["ogólnoużytkowe", "pastewne"];
let groch_type2_name = "Typ ulistnienia:";
let groch_type2 = ["wąsy czepne", "liście parzysto-pierzaste"];

let jeczmien_jary_col_names = ["Odmiana:", "Rok wyników:", "Plon ziarna a₁:", "Plon ziarna a₂:", "Masa 1000 ziaren:", "Zawartość białka:", "Wysokość roślin:", "Wyleganie:", "Typ:", "Wartość browarna:", "Rok rejestracji:", "Wyrównanie ziarna:", "Dojrzałość pełna:", "Mączniak prawdziwy:", "Plamistość siatkowa:", "Rdza jęczmienia:", "Rynchosporioza:", "Czarna plamistość:", "Plon w rejonie I a₁:", "Plon w rejonie II a₁:", "Plon w rejonie III a₁:", "Plon w rejonie IV a₁:", "Plon w rejonie V a₁:", "Plon w rejonie VI a₁:", "Plon w rejonie I a₂:", "Plon w rejonie II a₂:", "Plon w rejonie III a₂:", "Plon w rejonie IV a₂:", "Plon w rejonie V a₂:", "Plon w rejonie VI a₂:", "dolnośląskie:", "kujawsko-pomorskie:", "lubelskie:", "lubuskie:", "łódzkie:", "małopolskie:", "mazowieckie:", "opolskie:", "podkarpackie:", "podlaskie:", "pomorskie:", "śląskie:", "świętokrzyskie:", "warmińsko-mazurskie:", "wielkopolskie:", "zachodniopomorskie:", "Porównaj"];
let jeczmien_jary_cols = [{ data: "Odmiany" }, { data: "Rok wynikow" }, { data: "Plon ziarna a1" }, { data: "Plon ziarna a2" }, { data: "Masa 1000 ziaren" }, { data: "Zawartosc bialka" }, { data: "Wysokosc roslin" }, { data: "Wyleganie" }, { data: "Typ" }, { data: "Wartosc browarna" }, { data: "Rok rejestracji" }, { data: "Wyrownanie ziarna" }, { data: "Dojrzalosc pelna" }, { data: "Maczniak prawdziwy" }, { data: "Plamistosc siatkowa" }, { data: "Rdza jeczmienia" }, { data: "Rynchosporioza" }, { data: "Czarna plamistosc" }, { data: "Plon w rejonie I a1" }, { data: "Plon w rejonie II a1" }, { data: "Plon w rejonie III a1" }, { data: "Plon w rejonie IV a1" }, { data: "Plon w rejonie V a1" }, { data: "Plon w rejonie VI a1" }, { data: "Plon w rejonie I a2" }, { data: "Plon w rejonie II a2" }, { data: "Plon w rejonie III a2" }, { data: "Plon w rejonie IV a2" }, { data: "Plon w rejonie V a2" }, { data: "Plon w rejonie VI a2" }, { data: "Dolnoslaskie" }, { data: "Kujawsko-Pomorskie" }, { data: "Lubelskie" }, { data: "Lubuskie" }, { data: "Lodzkie" }, { data: "Malopolskie" }, { data: "Mazowieckie" }, { data: "Opolskie" }, { data: "Podkarpackie" }, { data: "Podlaskie" }, { data: "Pomorskie" }, { data: "Slaskie" }, { data: "Swietokrzyskie" }, { data: "Warminsko-Mazurskie" }, { data: "Wielkopolskie" }, { data: "Zachodniopomorskie" }, { data: null }];
let jeczmien_jary_units = ["", "", " dt/ha", " dt/ha", " g", " st. (1-9)", " cm", " st. (1-9)", "", " st. (1-9)", " r.", "%", " dni", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", ""];
let jeczmien_jary_year = ["2025", "2024", "2023", "2022", "2021", "2020"];
let jeczmien_jary_type1_name = "Typ użytkowy:";
let jeczmien_jary_type1 = ["pastewny", "browarny"];

let pszenica_jara_col_names = ["Odmiana:", "Rok wyników:", "Plon ziarna a₁:", "Plon ziarna a₂:", "Masa 1000 ziaren:", "Zawartość białka:", "Wysokość roślin:", "Wyleganie:", "Grupa technologiczna:", "Liczba opadania:", "Kłos:", "Rok rejestracji:", "Wskaźnik SDS:", "Dojrzałość pełna:", "Choroby podst. źdźbła:", "Mączniak prawdziwy:", "Rdza brunatna:", "Rdza żółta:", "Septoriozy liści:", "Septorioza plew:", "Fuzarioza kłosów:", "Plon w rejonie I a₁:", "Plon w rejonie II a₁:", "Plon w rejonie III a₁:", "Plon w rejonie IV a₁:", "Plon w rejonie V a₁:", "Plon w rejonie VI a₁:", "Plon w rejonie I a₂:", "Plon w rejonie II a₂:", "Plon w rejonie III a₂:", "Plon w rejonie IV a₂:", "Plon w rejonie V a₂:", "Plon w rejonie VI a₂:", "dolnośląskie:", "kujawsko-pomorskie:", "lubelskie:", "lubuskie:", "łódzkie:", "małopolskie:", "mazowieckie:", "opolskie:", "podkarpackie:", "podlaskie:", "pomorskie:", "śląskie:", "świętokrzyskie:", "warmińsko-mazurskie:", "wielkopolskie:", "zachodniopomorskie:", "Porównaj"];
let pszenica_jara_cols = [{ data: "Odmiany" }, { data: "Rok wynikow" }, { data: "Plon ziarna a1" }, { data: "Plon ziarna a2" }, { data: "Masa 1000 ziaren" }, { data: "Zawartosc bialka" }, { data: "Wysokosc roslin" }, { data: "Wyleganie" }, { data: "Grupa technologiczna" }, { data: "Liczba opadania" }, { data: "Klos" }, { data: "Rok rejestracji" }, { data: "Wskaznik sedymentcji SDS" }, { data: "Dojrzalosc pelna" }, { data: "Choroby zdzbla" }, { data: "Maczniak prawdziwy" }, { data: "Rdza brunatna" }, { data: "Rdza zolta" }, { data: "Septoriozy lisci" }, { data: "Septorioza plew" }, { data: "Fuzarioza klosow" }, { data: "Plon w rejonie I a1" }, { data: "Plon w rejonie II a1" }, { data: "Plon w rejonie III a1" }, { data: "Plon w rejonie IV a1" }, { data: "Plon w rejonie V a1" }, { data: "Plon w rejonie VI a1" }, { data: "Plon w rejonie I a2" }, { data: "Plon w rejonie II a2" }, { data: "Plon w rejonie III a2" }, { data: "Plon w rejonie IV a2" }, { data: "Plon w rejonie V a2" }, { data: "Plon w rejonie VI a2" }, { data: "Dolnoslaskie" }, { data: "Kujawsko-Pomorskie" }, { data: "Lubelskie" }, { data: "Lubuskie" }, { data: "Lodzkie" }, { data: "Malopolskie" }, { data: "Mazowieckie" }, { data: "Opolskie" }, { data: "Podkarpackie" }, { data: "Podlaskie" }, { data: "Pomorskie" }, { data: "Slaskie" }, { data: "Swietokrzyskie" }, { data: "Warminsko-Mazurskie" }, { data: "Wielkopolskie" }, { data: "Zachodniopomorskie" }, { data: null }];
let pszenica_jara_units = ["", "", " dt/ha", " dt/ha", " g", " st. (1-9)", " cm", " st. (1-9)", "", " st. (1-9)", "", " r.", " st. (1-9)", " dni", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", ""];
let pszenica_jara_year = ["2025", "2024", "2023", "2022", "2021", "#"];
let pszenica_jara_type1_name = "Typ jakościowy:";
let pszenica_jara_type1 = ["E", "A", "B", "C", "K"];
let pszenica_jara_type2_name = "Rodzaj kłosa:";
let pszenica_jara_type2 = ["ościsty", "bezostny"];

let pszenzyto_jare_col_names = ["Odmiana:", "Rok wyników:", "Plon ziarna a₁:", "Plon ziarna a₂:", "Masa 1000 ziaren:", "Zawartość białka:", "Wysokość roślin:", "Wyleganie:", "Typ:", "Rok rejestracji:", "Dojrzałość pełna:", "Mączniak prawdziwy:", "Rdza brunatna:", "Rdza żółta:", "Brunatna plamistość liści:", "Septorioza liści:", "Septorioza plew:", "Porastanie ziarna:", "Gęstość ziarna:", "Rynchosporioza:", "Fuzarioza kłosów:", "Plon w rejonie I a₁:", "Plon w rejonie II a₁:", "Plon w rejonie III a₁:", "Plon w rejonie IV a₁:", "Plon w rejonie V a₁:", "Plon w rejonie VI a₁:", "Plon w rejonie I a₂:", "Plon w rejonie II a₂:", "Plon w rejonie III a₂:", "Plon w rejonie IV a₂:", "Plon w rejonie V a₂:", "Plon w rejonie VI a₂:", "dolnośląskie:", "kujawsko-pomorskie:", "lubelskie:", "lubuskie:", "łódzkie:", "małopolskie:", "mazowieckie:", "opolskie:", "podkarpackie:", "podlaskie:", "pomorskie:", "śląskie:", "świętokrzyskie:", "warmińsko-mazurskie:", "wielkopolskie:", "zachodniopomorskie:", "Porównaj"];
let pszenzyto_jare_cols = [{ data: "Odmiany" }, { data: "Rok wynikow" }, { data: "Plon ziarna a1" }, { data: "Plon ziarna a2" }, { data: "Masa 1000 ziaren" }, { data: "Zawartosc bialka" }, { data: "Wysokosc roslin" }, { data: "Wyleganie" }, { data: "Rok rejestracji" }, { data: "Dojrzalosc pelna" }, { data: "Maczniak prawdziwy" }, { data: "Rdza brunatna" }, { data: "Rdza zolta" }, { data: "Brunatna plamistosc lisci" }, { data: "Septorioza lisci" }, { data: "Septorioza plew" }, { data: "Porastanie ziarna" }, { data: "Gestosc ziarna" }, { data: "Rynchosporioza" }, { data: "Fuzarioza klosow" }, { data: "Plon w rejonie I a1" }, { data: "Plon w rejonie II a1" }, { data: "Plon w rejonie III a1" }, { data: "Plon w rejonie IV a1" }, { data: "Plon w rejonie V a1" }, { data: "Plon w rejonie VI a1" }, { data: "Plon w rejonie I a2" }, { data: "Plon w rejonie II a2" }, { data: "Plon w rejonie III a2" }, { data: "Plon w rejonie IV a2" }, { data: "Plon w rejonie V a2" }, { data: "Plon w rejonie VI a2" }, { data: "Dolnoslaskie" }, { data: "Kujawsko-Pomorskie" }, { data: "Lubelskie" }, { data: "Lubuskie" }, { data: "Lodzkie" }, { data: "Malopolskie" }, { data: "Mazowieckie" }, { data: "Opolskie" }, { data: "Podkarpackie" }, { data: "Podlaskie" }, { data: "Pomorskie" }, { data: "Slaskie" }, { data: "Swietokrzyskie" }, { data: "Warminsko-Mazurskie" }, { data: "Wielkopolskie" }, { data: "Zachodniopomorskie" }, { data: null }];
let pszenzyto_jare_units = ["", "", " dt/ha", " dt/ha", " g", "%", " cm", " st. (1-9)", "", " r.", " dni", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", ""];
let pszenzyto_jare_year = ["2025", "2024", "2023", "2022", "2021"];

let ziemniak_col_names = ["Odmiana:", "Rok wyników:", "Plon ogólny:", "Plon handlowy:", "Zawartość skrobi:", "Typ kulinarny:", "Barwa miąższu:", "Barwa skórki:", "Rodzaj:", "Wczesność:", "Dodatkowe przezn.:", "Rok wpisu:", "Plon ogólny po 40 dniach:", "Plon handl. po 40 dniach:", "Plon skrobi:", "Kształt bulw:", "Smak:", "Wirus Y:", "Zaraza ziemniaka (liście):", "Alternarioza:", "Parch zwykły:", "Wirus liściozwoju:", "Wirus M:", "Czarna nóżka:", "Choroby przechowalnicze:", "Przechowalność:", "Okres spoczynku bulw:", "Metrybuzyna:", "Rak ziemn. 1(D1):", "Rak ziemn. 2(CH1):", "Rak ziemn. 8(F1):", "Rak ziemn. 2(G1):", "Rak ziemn. 3(M1):", "Rak ziemn. 6(O1):", "Rak ziemn. 18(T1):", "Mątwik ziemn. Ro1:", "Mątwik ziemn. Ro2:", "Mątwik ziemn. Ro3:", "Mątwik ziemn. Ro4:", "Mątwik ziemn. Ro5:", "Mątwik ziemn. Pa1:", "Mątwik ziemniaka Pa2:", "Mątwik ziemniaka Pa3:", "Barwa kwiatów:", "Regularność kształtu:", "Głębokość oczek:", "Wielkość bulw:", "dolnośląskie:", "kujawsko-pomorskie:", "lubelskie:", "lubuskie:", "łódzkie:", "małopolskie:", "mazowieckie:", "opolskie:", "podkarpackie:", "podlaskie:", "pomorskie:", "śląskie:", "świętokrzyskie:", "warmińsko-mazurskie:", "wielkopolskie:", "zachodniopomorskie:", "Porównaj"];
let ziemniak_cols = [{ data: "Odmiany" }, { data: "Rok wynikow" }, { data: "Plon ogolny" }, { data: "Plon handlowy" }, { data: "Zawartosc skrobi" }, { data: "Typ kulinarny" }, { data: "Barwa miazszu" }, { data: "Barwa skorki" }, { data: "Rodzaj" }, { data: "Wczesnosc" }, { data: "Frytki czy chipsy" }, { data: "Rok wpisu" }, { data: "Plon ogolny po 40 dniach" }, { data: "Plon handlowy po 40 dniach" }, { data: "Plon skrobi" }, { data: "Ksztalt bulw" }, { data: "Smak" }, { data: "Wirus Y" }, { data: "Zaraza ziemniaka (liscie)" }, { data: "Alternarioza" }, { data: "Parch zwykly" }, { data: "Wirus lisciozwoju" }, { data: "Wirus M" }, { data: "Czarna nozka" }, { data: "Choroby przechowalnicze" }, { data: "Przechowywalnosc" }, { data: "Okres spoczynku bulw" }, { data: "Metrybuzyna" }, { data: "Rak ziemniaka patotyp 1(D1)" }, { data: "Rak ziemniaka patotyp 2(CH1)" }, { data: "Rak ziemniaka patotyp 8(F1)" }, { data: "Rak ziemniaka patotyp 2(G1)" }, { data: "Rak ziemniaka patotyp 3(M1)" }, { data: "Rak ziemniaka patotyp 6(O1)" }, { data: "Rak ziemniaka patotyp 18(T1)" }, { data: "Matwik ziemniaka patotyp Ro1" }, { data: "Matwik ziemniaka patotyp Ro2" }, { data: "Matwik ziemniaka patotyp Ro3" }, { data: "Matwik ziemniaka patotyp Ro4" }, { data: "Matwik ziemniaka patotyp Ro5" }, { data: "Matwik ziemniaka patotyp Pa1" }, { data: "Matwik ziemniaka patotyp Pa2" }, { data: "Matwik ziemniaka patotyp Pa3" }, { data: "Barwa kwiatow" }, { data: "Regularnosc ksztaltu" }, { data: "Glebokosc oczek" }, { data: "Wielkosc bulw" }, { data: "Dolnoslaskie" }, { data: "Kujawsko-Pomorskie" }, { data: "Lubelskie" }, { data: "Lubuskie" }, { data: "Lodzkie" }, { data: "Malopolskie" }, { data: "Mazowieckie" }, { data: "Opolskie" }, { data: "Podkarpackie" }, { data: "Podlaskie" }, { data: "Pomorskie" }, { data: "Slaskie" }, { data: "Swietokrzyskie" }, { data: "Warminsko-Mazurskie" }, { data: "Wielkopolskie" }, { data: "Zachodniopomorskie" }, { data: null }];
let ziemniak_units = ["", " r.", " dt/ha", " dt/ha", "%", "", "", "", "", "", "", " r.", " dt/ha", " dt/ha", " dt/ha", "", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", "", ""];
let ziemniak_year = ["2025", "2024", "2023", "2022", "2021"];
let ziemniak_type1_name = "Rodzaj:";
let ziemniak_type1 = ["jadalne", "skrobiowe", "regionalne"];
let ziemniak_type2_name = "Wczesność:";
let ziemniak_type2 = ["b. wczesne", "wczesne", "średnio wczesne", "średnio późne", "późne"];
let ziemniak_type3_name = "Dodatkowe przezn.:";
let ziemniak_type3 = ["chipsy", "frytki"];

let owies_jary_col_names = ["Odmiana:", "Rok wyników:", "Plon ziarna:", "Udział łuski:", "Masa 1000 ziaren:", "Zawartość białka:", "Zawartość tłuszczu:", "Wysokość roślin:", "Typ:", "Rok rejestracji:", "Wyleganie roślin:", "Mączniak prawdziwy:", "Rdza owsa:", "Helmintosporioza:", "Septorioza liści:", "Dojrzałość pełna:", "Plon w rejonie I:", "Plon w rejonie II:", "Plon w rejonie III:", "Plon w rejonie IV:", "Plon w rejonie V:", "Plon w rejonie VI:", "dolnośląskie:", "kujawsko-pomorskie:", "lubelskie:", "lubuskie:", "łódzkie:", "małopolskie:", "mazowieckie:", "opolskie:", "podkarpackie:", "podlaskie:", "pomorskie:", "śląskie:", "świętokrzyskie:", "warmińsko-mazurskie:", "wielkopolskie:", "zachodniopomorskie:", "Porównaj"];
let owies_jary_cols = [{ data: "Odmiany" }, { data: "Rok wynikow" }, { data: "Plon ziarna" }, { data: "Udzial luski" }, { data: "Masa 1000 ziaren" }, { data: "Zawartosc bialka" }, { data: "Zawartosc tluszczu" }, { data: "Wysokosc roslin" }, { data: "Typ" }, { data: "Rok rejestracji" }, { data: "Wyleganie roslin" }, { data: "Maczniak prawdziwy" }, { data: "Rdza owsa" }, { data: "Helmintosporioza" }, { data: "Septorioza lisci" }, { data: "Dojrzalosc pelna" }, { data: "Plon w rejonie I" }, { data: "Plon w rejonie II" }, { data: "Plon w rejonie III" }, { data: "Plon w rejonie IV" }, { data: "Plon w rejonie V" }, { data: "Plon w rejonie VI" }, { data: "Dolnoslaskie" }, { data: "Kujawsko-Pomorskie" }, { data: "Lubelskie" }, { data: "Lubuskie" }, { data: "Lodzkie" }, { data: "Malopolskie" }, { data: "Mazowieckie" }, { data: "Opolskie" }, { data: "Podkarpackie" }, { data: "Podlaskie" }, { data: "Pomorskie" }, { data: "Slaskie" }, { data: "Swietokrzyskie" }, { data: "Warminsko-Mazurskie" }, { data: "Wielkopolskie" }, { data: "Zachodniopomorskie" }, { data: null }];
let owies_jary_units = ["", " r.", " dt/ha", "%", " g", "%", "%", " cm", "", " r.", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " st. (1-9)", " dni", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " dt/ha", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", " r.", ""];
let owies_jary_year = ["2025", "2024", "2023", "2022", "2021"];
let owies_jary_type1_name = "Typ:";
let owies_jary_type1 = ["zwyczajny", "nagi"];

let arrays = {
  lubin_zolty_col_names,
  lubin_zolty_cols,
  lubin_zolty_units,
  lubin_zolty_year,

  lubin_waskolistny_col_names,
  lubin_waskolistny_cols,
  lubin_waskolistny_units,
  lubin_waskolistny_year,
  lubin_waskolistny_type1,
  lubin_waskolistny_type1_name,

  lubin_bialy_col_names,
  lubin_bialy_cols,
  lubin_bialy_units,
  lubin_bialy_year,
  lubin_bialy_type1,
  lubin_bialy_type1_name,

  kukurydza_kiszonka_col_names,
  kukurydza_kiszonka_cols,
  kukurydza_kiszonka_units,
  kukurydza_kiszonka_year,
  kukurydza_kiszonka_type1,
  kukurydza_kiszonka_type1_name,

  kukurydza_ziarno_col_names,
  kukurydza_ziarno_cols,
  kukurydza_ziarno_units,
  kukurydza_ziarno_year,
  kukurydza_ziarno_type1,
  kukurydza_ziarno_type1_name,

  groch_col_names,
  groch_cols,
  groch_units,
  groch_year,
  groch_type1,
  groch_type1_name,
  groch_type2,
  groch_type2_name,

  bobik_col_names,
  bobik_cols,
  bobik_units,
  bobik_year,
  bobik_type1,
  bobik_type1_name,

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

  ziemniak_col_names,
  ziemniak_cols,
  ziemniak_units,
  ziemniak_year,
  ziemniak_type1_name,
  ziemniak_type1,
  ziemniak_type2_name,
  ziemniak_type2,
  ziemniak_type3_name,
  ziemniak_type3,

  owies_jary_col_names,
  owies_jary_cols,
  owies_jary_units,
  owies_jary_year,
  owies_jary_type1,
  owies_jary_type1_name,
};
