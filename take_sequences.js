function take_sequences(sequenzaJSON) {
    xref_list = sequenzaJSON.results[0].xref;
    if (typeof xref_list !== 'undefined') {
        let array_sequences = [];
        for (i = 0; i < xref_list.length; i++) { // Loop that scans xref elements.
            element = xref_list[i];
            for (j = 0; j < element.length; j++) { // Loop that scans the letters of xref elements.
                if (element[j] === "A") { // Each sequences has the form Axxxxxx.
                    for (v = 0; v < array_numbers.length; v++) {
                        if (element[j + 1] === array_numbers[v] && element.substring(j, j + 7) !== sequenzaJSON
                            .query.substring(3, 11)) {
                            array_sequences.push("A" + element.substring(j + 1, j + 7));
                            j = j +
                                7; // Useful for optimizing the code. If you find a "A", you can jump the next xxxxxx.
                            break;
                        }
                    }
                }
            }
        }
        var set_sequences = [...new Set(array_sequences)];
        return set_sequences;
    } else {
        return 'undefined';
    }
}