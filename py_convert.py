import json
import os

def inizializzazioneJSON(nomeFile, var_js):
    with open(nomeFile, 'r') as f:
        contenuto = f.read()
    with open(nomeFile, 'w') as f:
        f.write(var_js)
    with open(nomeFile, 'a') as f:
        f.write(contenuto)

listaFile = os.listdir('C:/Users/Marco/Desktop/Marco/Università/Magistrale/Tesi/materiale_Nocentini/oeis-tools-master/src/fetched')

index = 0
inizializzazioneSequenze = []

for i in listaFile:
    if i.endswith(".json"):
        cosaScrivo = "sequenzaJSON" + str(index) + " = "
        inizializzazioneSequenze.append(cosaScrivo[0:-3])
        inizializzazioneJSON('C:/Users/Marco/Desktop/Marco/Università/Magistrale/Tesi/materiale_Nocentini/oeis-tools-master/src/fetched/' + i, cosaScrivo)
        index = int(index) + 1

JSONtotale = []

for i in listaFile:
    if i.endswith(".json"):
        with open('C:/Users/Marco/Desktop/Marco/Università/Magistrale/Tesi/materiale_Nocentini/oeis-tools-master/src/fetched/' + i, 'r') as f:
            JSONtotale.append(f.read())

with open('GlobalJSON.json', 'a+') as f:
    for i in JSONtotale:
       f.write(i + '\n')
    f.write('json_list = [')
    for j in inizializzazioneSequenze:
        if (j != inizializzazioneSequenze[len(inizializzazioneSequenze)-1]):
            f.write(j + ', ')
    f.write(inizializzazioneSequenze[len(inizializzazioneSequenze)-1])
    f.write(']')
