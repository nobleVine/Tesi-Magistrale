function removeForAdd(idselect1, idselect2, sequenceToDraw) {

    var select = document.getElementById(idselect1);
    var select2 = document.getElementById(idselect2);

    for (i = 0; i < select.options.length; i++) { // Removal of the added sequence.
        if (select.options[i].value === sequenceToDraw) {
            var option = select.options[i].value;
            select.options[i] = null; // Update of the add menù.
            var optionHTML = document.createElement("option");
            optionHTML.textContent = option;
            optionHTML.value = option;
            select2.appendChild(optionHTML); //Update of remove menù
            break;
        }
    }
}

function removeForRemove(idSelect3, idSelect4, sequenceToRemove) {

    var select = document.getElementById(idSelect3);
    var select2 = document.getElementById(idSelect4);

    for (i = 0; i < select2.options.length; i++) { // Removal of the selected sequence.
        if (select2.options[i].value === sequenceToRemove) {
            var option2 = select2.options[i].value;
            select2.options[i] = null; // Update of the remove menù.
            var optionHTML2 = document.createElement("option");
            optionHTML2.textContent = option2;
            optionHTML2.value = option2;
            select.appendChild(optionHTML2); //Update of the add menù
            break;
        }
    }
}

function initializationMenu(idSelect, options) {

    $("#" + idSelect).empty().append('<option value="">Choose</option>');

    var select = document.getElementById(idSelect);

    for (d = 0; d < options.length; d++) {
        var option = options[d];
        var optionHTML = document.createElement("option");
        optionHTML.textContent = option;
        optionHTML.value = option;
        select.appendChild(optionHTML);
    }

}