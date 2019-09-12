function showInformation() { // This function shows informations about the selected sequence.

    s.bind("clickNode", function (e) {

        if (e.data.node.id[0] === 'A') {
        
            /*
                document.getElementById("accordion3").style.display = "none";
            }*/

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

        } else {

            document.getElementById("accordion2").style.display = "none";

            var sequenceForLayout = document.getElementById("sequenceLayout").value;
            var weightForLayout = document.getElementById("selectWeightForLayout").value;

            $("#accordion3").accordion({
                collapsible: true,
                heightStyle: "content",
                active: 0
            });

            document.getElementById("accordion3").style.display = "block";
            document.getElementById("Title3").innerHTML = weightForLayout + " " + e.data.node.id;

            json_list.forEach(element => {

                if (sequenceForLayout === element.query.substring(3, 11)) {
                    if (weightForLayout === 'comment') {
                        document.getElementById("clickedInfo").innerHTML = element.results[0].comment[e.data.node.id];

                    } else if (weightForLayout === 'reference') {
                        document.getElementById("clickedInfo").innerHTML = element.results[0].reference[e.data.node.id];

                    } else if (weightForLayout === 'link') {
                        document.getElementById("clickedInfo").innerHTML = element.results[0].link[e.data.node.id];

                    } else if (weightForLayout === 'formula') {
                        document.getElementById("clickedInfo").innerHTML = element.results[0].formula[e.data.node.id];

                    } else if (weightForLayout === 'example') {
                        document.getElementById("clickedInfo").innerHTML = element.results[0].example[e.data.node.id];

                    } else if (weightForLayout === 'maple') {
                        document.getElementById("clickedInfo").innerHTML = element.results[0].maple[e.data.node.id];

                    } else if (weightForLayout === 'mathematica') {
                        document.getElementById("clickedInfo").innerHTML = element.results[0].mathematica[e.data.node.id];

                    } else if (weightForLayout === 'program') {
                        document.getElementById("clickedInfo").innerHTML = element.results[0].program[e.data.node.id];

                    }
                    return;
                }
            })

        }

    });

}

function hideHelp() {
    s.bind("clickNode", function () {
        document.getElementById("nodesClick").style.display = "none";
        document.getElementById("nodesClick2").style.display = "none";
    });

}