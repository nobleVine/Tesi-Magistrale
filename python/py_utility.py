import os

listaFile = os.listdir('../materiale_Nocentini/oeis-tools-master/src/fetched')
openedFile = 0

for i in listaFile:
    openedFile = openedFile + 1
    if i.endswith(".json"):
        with open('../materiale_Nocentini/oeis-tools-master/src/fetched/' + i, 'r') as f:
            testo = f.read()
            if (testo[0] == "s" and openedFile <= 10):
                testo = testo[16:]
            if (testo[0] == "s" and (openedFile > 10 and openedFile <= 99)):
                testo = testo[17:]
            if (testo[0] == "s" and (openedFile > 100 and openedFile <= 999)):
                testo = testo[18:]
            if (testo[0] == "s" and (openedFile > 1000 and openedFile <= 9999)):
                testo = testo[19:]
            with open('../materiale_Nocentini/oeis-tools-master/src/fetched/' + i, 'w') as f1:
                f1.write(testo)