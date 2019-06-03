function takeWeight(idSequence, weight) {

    var weight_list = [];

    json_list.forEach(element => {
        if (element.query.substring(3, 11) === idSequence) {
            if (typeof element.results[0].comment !== 'undefined' && weight === "comment") {
                for (i = 0; i < element.results[0].comment.length; i++) {
                    weight_list.push(element.results[0].comment[i].length);
                }
            }
            if (typeof element.results[0].reference !== 'undefined' && weight === "reference") {
                for (i = 0; i < element.results[0].reference.length; i++) {
                    weight_list.push(element.results[0].reference[i].length);
                }
            }
            if (typeof element.results[0].link !== 'undefined' && weight === "link") {
                for (i = 0; i < element.results[0].link.length; i++) {
                    weight_list.push(element.results[0].link[i].length);
                }
            }
            if (typeof element.results[0].formula !== 'undefined' && weight === "formula") {
                for (i = 0; i < element.results[0].formula.length; i++) {
                    weight_list.push(element.results[0].formula[i].length);
                }
            }
            if (typeof element.results[0].example !== 'undefined' && weight === "example") {
                for (i = 0; i < element.results[0].example.length; i++) {
                    weight_list.push(element.results[0].example[i].length);
                }
            }
            if (typeof element.results[0].maple !== 'undefined' && weight === "maple") {
                for (i = 0; i < element.results[0].maple.length; i++) {
                    weight_list.push(element.results[0].maple[i].length);
                }
            }
            if (typeof element.results[0].mathematica !== 'undefined' && weight === "mathematica") {
                for (i = 0; i < element.results[0].mathematica.length; i++) {
                    weight_list.push(element.results[0].mathematica[i].length);
                }
            }
            if (typeof element.results[0].program !== 'undefined' && weight === "program") {
                for (i = 0; i < element.results[0].program.length; i++) {
                    weight_list.push(element.results[0].program[i].length);
                }
            }
        }
    });

    if (weight_list.length === 0) {
        alert("The inseterted weight " + weight + " of the sequence " + idSequence + " is undefined!");
    }

    return weight_list;

}