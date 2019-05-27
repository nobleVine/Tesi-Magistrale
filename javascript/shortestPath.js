function shortestPath() {

    var sourceNode = document.getElementById("firstSequence").value;
    var destinationNode = document.getElementById("secondSequence").value;
    var numEdges = 0;
    var nodesInThePath = [];

    // Common listeners.
    initializationCommonListeners();

    // Specialized listeners.
    document.getElementById("firstSequence").addEventListener("click", clearInputFirstSequence);
    document.getElementById("secondSequence").addEventListener("click", clearInputSecondSequence);

    if (sourceNode === "" && destinationNode === "") {
        alert("Both the first and the second sequence not inserted");
        return;
    } else if (sourceNode === "") {
        alert("The first sequence not inserted");
        return;
    } else if (destinationNode === "") {
        alert("The second sequence not inserted");
        return;
    }

    if (s.graph.nodes().length === 0) {
        alert("You have to draw the graph first!");
        return;
    }

    s.graph.nodes().forEach(element => {
        element.color = "#007fff";
        element.size = 3;
    });

    s.graph.edges().forEach(element => {
        element.color = "#000000";
        element.size = 3;
    });

    nodesInThePath = s.graph.astar(sourceNode, destinationNode, true); //returns a list of the nodes of the shortest path

    if (typeof nodesInThePath === 'undefined') {
        alert ("There is no path between the inserted sequence");
        return;
    }

    document.getElementById("numNodes").value = nodesInThePath.length;

    nodesInThePath.forEach(element => {
        if (s.graph.nodes().includes(element)) {
            element.color = "#ff0000";
            element.size = 6;
        }
    });

    listEdges = s.graph.edges();

    for (i = 0; i < listEdges.length; i++) {
        for (j = 0; j < nodesInThePath.length-1; j++) {
            if (listEdges[i].source === nodesInThePath[j].id && listEdges[i].target === nodesInThePath[j+1].id) {
                listEdges[i].color = "#ff0000";
                numEdges++;
                break;
            }
        }
    }

    document.getElementById("numEdges").value = numEdges;

    s.refresh();
}

function clearInputFirstSequence() {
    document.getElementById("firstSequence").value = "";
}

function clearInputSecondSequence() {
    document.getElementById("secondSequence").value = "";
}