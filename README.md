# tesi-magistrale

The project consists in using javascript libraries for graph visualization of id number sequences, fetched from The [On-Line Encyclopedia of Integer Sequences (OEIS)  ](https://oeis.org/) by means the script python *crawling.py* in this [repository](https://github.com/massimo-nocentini/oeis-tools/tree/master/src). The purpose of this work is to show the relations between the sequences and analyze their properties.

First of all, you have to create the file *globalJSON.json* which contains all json files that collect all the informations about every single fetched sequence. Such informations are used to generate the nodes and the edges of the graphs. To create the *globalJSON.json* you have to run in a shell *py_convert.py*, with the command:

1) **py py_convert.py** (on Windows)
2) **python py_convert.py** (on Linux)

Next you can open *index.html*, navigate with the browser and using the developed functionality.

The used library are:
1) [sigma](https://github.com/jacomyal/sigma.js): used to generate the graphs.
2) [jquery](https://github.com/jquery/jquery): used to insert some elements in the HTML page *index.html* like the accordion menù in order to show the developed functionality and the informations associated to the sequences. 
