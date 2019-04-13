import os

listaFile = os.listdir('../materiale_Nocentini/oeis-tools-master/src/fetched')

for i in listaFile:
    if i.endswith(".json"):
        with open('../materiale_Nocentini/oeis-tools-master/src/fetched/' + i, 'r') as f:
            testo = f.read()
            if (testo[0] == "s"):
                testo = testo[16:]
                with open('../materiale_Nocentini/oeis-tools-master/src/fetched/' + i, 'w') as f1:
                    f1.write(testo)

           