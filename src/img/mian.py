# %% zad1
lista1 =  list((1,12,6,9,7,5,3,4,5,4,5,9,13,8,7,2,3))
lista2 = list()
licznik = 0
n = 7

for liczba in lista1:
    if liczba % 2 != 0:
        lista2.append(liczba)
    else:
        licznik += 1

    if liczba%2 == 0 and licznik > n:
        lista2.append(liczba)
print(lista2)


# %% zad2
from array import *
n = int(input("Podaj liczbe:"))
lista = list()
for i in range(n, 0, -1):
    sub_lista = list()
    for j in range(i):
        sub_lista.append(i)
    for j in range(n - i):
        sub_lista.append(i + j + 1)
    lista.append(sub_lista)

for i in lista:
    print(i)
# %% zad3
lista = [(2, 1, -3), (13, 0, 76), (4, 7), (-4, 3, -2, 1)]
lista2 = list()
for tup in lista:
    multi = 1
    for el in tup:
        multi *= el

    lista2.append(multi)

print(lista2)
# %% zad 4
n = int(input("Podaj liczby"))
dane = list()

#1 11 121 1331 14641
for i in range(n):
    sub_list = list()
    for j in range(n):
        sub_list.append(1)
    dane.append(sub_list)

for i in range(1, n):
    for j in range(i):
        if j+1 < n:
            dane[i][j] = dane[i-1][j] + dane[i-1][j+1]


for row in dane:
    print(row)
# %% zad5
name = "Czubinski"
letters = set()
result = dict()

for letter in name:
    letters.add(letter)

for letter in letters:
    count = 0
    for i in name:
        if letter == i:
            count += 1
    result.update({letter: count})

print(result)
# %% zad 6
class Istota():
    def __init__(self, energia = 0, wiek = 1):
        self.energia = energia
        self.wiek = wiek

    def chodzenie(self):
        print("chodze sobie")

class Ogr(Istota):
    def __init__(self, energia=0, wiek=14, poziomAgresji = 0):
        super().__init__(energia, wiek)
        self.poziomAgresji = poziomAgresji

    def strzelanieZProcy(self):
        print("strzelam z procy")

    def atakSierpem(self):
        print("atakuje sieprem")

class TrolJaskiniowy(Istota):
    def __init__(self, energia=0, wiek=14, wytrzymalosc = 0):
        super().__init__(energia, wiek)
        self.wytrzymalosc = wytrzymalosc

    def rzucKamieniem(self):
        print("rzucam kamieniem")

    def uderzKolczastaMaczuga(self):
        print("uderzam maczuga")

class IstotaGrywalna(Istota):
    def __init__(self, energia=0, wiek=18, szybkosc = 1):
        super().__init__(energia, wiek)
        self.szybkosc = szybkosc

    def odpoczywanie(self):
        print("Zzzz...")

    def bieganie(self):
        print("Lewa, prawa, raz i dwa...")

class Rycerz(IstotaGrywalna):
    def __init__(self, energia=0, wiek=18, szybkosc=1, wytrzymalosc = 1, imie="jakies imie", nazwisko="jakies nazwisko"):
        super().__init__(energia, wiek, szybkosc)
        self.wytrzymalosc = wytrzymalosc
        self.imie = imie
        self.nazwisko = nazwisko

    def atakMieczem(self):
        print("Atakuje mieczem")

    def strzelanieZKuczy(self):
        print("strzelam z kuszy")

    def obronaTarcza(self):
        print("bronie sie tarcze")

    def przedstawSie(self):
        print(f'A imie moje {self.imie} {self.nazwisko}')

class Czarodziej(IstotaGrywalna):
    def __init__(self, energia=0, wiek=18, szybkosc=1, moc=1):
        super().__init__(energia, wiek, szybkosc)
        self.moc = moc
    def alchemia(self):
        print("alchemia")

    def rzucCzar(self):
        print("rzucam czar")

    def atakujMagicznymKosturem(self):
        print("atakuje magicznym kosturem")
        
istota = Istota()
istota.chodzenie()

ogr = Ogr()
ogr.atakSierpem()
ogr.strzelanieZProcy()

trol_jaskiniowy = TrolJaskiniowy()
trol_jaskiniowy.rzucKamieniem()
trol_jaskiniowy.uderzKolczastaMaczuga()

czarodziej = Czarodziej()
czarodziej.alchemia()
czarodziej.rzucCzar()
czarodziej.atakujMagicznymKosturem()

ryc_list = list()
rycerz = Rycerz(imie="Mieszko", nazwisko="Czubiński")
ryc_list.append(rycerz)

for i in range(4):
    rycerz_mass = Rycerz()
    ryc_list.append(rycerz_mass)


#wysiwetalnie info:
for ryc in ryc_list:
    ryc.przedstawSie()
# %%
