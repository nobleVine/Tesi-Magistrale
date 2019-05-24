function showInformation() { // This function shows informations about the selected sequence.

    s.bind("clickNode", function (e) {

        $("#accordion2").accordion({ // This is the accordion where informations'll shown.
            collapsible: true,
            heightStyle: "content",
            active: 0
        });

        $("#graph").css("margin-top", "-110px"); //this function set the margin-top

        document.getElementById("accordion2").style.display = "block";
        document.getElementById("Title1").innerHTML = "Sequence Name and Recurrence Function";
        document.getElementById("Title2").innerHTML = "Sequence Number";

        entered = false;

        json_list.forEach(element => {
            if (e.data.node.label === element.query.substring(3, 11)) {
                document.getElementById("sequenceName").innerHTML = element.query.substring(3,
                    11) + "<br>" + element.results[0].name;
                document.getElementById("sequenceNumber").innerHTML = element.results[0].data;
                entered = true;
                return;
            }
        });

        if (!entered) {
            alert("The clicked sequence " + e.data.node.label + " has not been fetched");
            document.getElementById("accordion2").style.display = "none";
            document.getElementById("nodesClick").style.display = "block";
            if (specGraph === true) {
                document.getElementById("nodesClick2").style.display = "block";
            }
        }

    });

}

function hideHelp() {
    s.bind("clickNode", function () {
        document.getElementById("nodesClick").style.display = "none";
        document.getElementById("nodesClick2").style.display = "none";
    });
    
}