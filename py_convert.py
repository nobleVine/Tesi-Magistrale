import json
import os

listaFileRepo = os.listdir()

if("GlobalJSON.json" in listaFileRepo):
    os.remove("GlobalJSON.json")


def inizializzazioneJSON(nomeFile, var_js):
    with open(nomeFile, 'r') as f:
        contenuto = f.read()
    with open(nomeFile, 'w') as f:
        f.write(var_js)
    with open(nomeFile, 'a') as f:
        f.write(contenuto)


listaFile = os.listdir('../materiale_Nocentini/oeis-tools-master/src/fetched')

index = 0
inizializzazioneSequenze = []

'''for j in listaFile:
    if j.endswith(".json"):
        with open(j, 'r') as f:
            testo = f.read()
            if testo[0] == 's':
                scritto = True
                break'''

'''if scritto == False:'''
for i in listaFile:
    if i.endswith(".json"):
        cosaScrivo = "sequenzaJSON" + str(index) + " = "
        inizializzazioneSequenze.append(cosaScrivo[0:-3])
        with open('../materiale_Nocentini/oeis-tools-master/src/fetched/' + i, 'r') as f:
            testo = f.read()
        if (testo[0] != "s"):
            inizializzazioneJSON(
                '../materiale_Nocentini/oeis-tools-master/src/fetched/' + i, cosaScrivo)
        index = int(index) + 1

JSONtotale = []

for i in listaFile:
    if i.endswith(".json"):
        with open('../materiale_Nocentini/oeis-tools-master/src/fetched/' + i, 'r') as f:
            JSONtotale.append(f.read())

with open('GlobalJSON.json', 'a+') as f:
    for i in JSONtotale:
        f.write(i + '\n')
    f.write('json_list = [')
    print(inizializzazioneSequenze)
    for j in inizializzazioneSequenze:

        if (j != inizializzazioneSequenze[len(inizializzazioneSequenze)-1]):
            f.write(j + ', ')
    f.write(inizializzazioneSequenze[len(inizializzazioneSequenze)-1])
    f.write(']')
