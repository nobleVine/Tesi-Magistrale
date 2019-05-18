function downloadSequence() {
    var sequenceToFetch = document.getElementById("download").value;
    $.ajax({
        type: "GET",
        url: "https://localhost/tesi-magistrale/php/fetch.php",
        async: false,
        data: {
            download: sequenceToFetch
        },
        success: function (JSONfile) {
            alert("Sequence " + sequenceToFetch + " has been correctly fetched!");
            $.ajax({
                type: "POST",
                url: "https://localhost/materiale_Nocentini/oeis-tools-master/src/fetched/" + sequenceToFetch + ".json",
                async: false,
                success: function (fileJSON) {
                    json_list.push(fileJSON);
                },
                error: function () {
                    alert("Error in json_list construction");
                }
            });
        },
        error: function () {
            alert("Error in the fetch of the sequence!");
        }
    });
}