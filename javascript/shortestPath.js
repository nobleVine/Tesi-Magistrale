function shortestPath() {

    if (currentLayout === "Force Layout Default" || currentLayout === "Force Layout Edges" || currentLayout === "Incremental Layout") {

        document.getElementById("nodesClick").style.display = "block";

        var sourceNode = document.getElementById("firstSequence").value;
        var destinationNode = document.getElementById("secondSequence").value;
        var numEdges = 0;
        var nodesInThePath = [];

        var edges_list_before_all = s.graph.edges();

        createGraphForShortestPath();

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

        nodesInThePathLeftRight = s.graph.astar(sourceNode, destinationNode, true); //returns a list of the nodes of the shortest path
        nodesInThePathRightLeft = s.graph.astar(destinationNode, sourceNode, true);

        if (typeof nodesInThePathLeftRight === 'undefined' && typeof nodesInThePathRightLeft === 'undefined') {
            alert("There is no path between the inserted sequence");
            return;
        } else {
            if (typeof nodesInThePathLeftRight !== 'undefined' && typeof nodesInThePathRightLeft !== 'undefined') {

                if (nodesInThePathLeftRight.length <= nodesInThePathRightLeft.length) {
                    nodesInThePath = nodesInThePathLeftRight;
                } else {
                    nodesInThePath = nodesInThePathRightLeft;
                }

            } else {
                if (typeof nodesInThePathLeftRight !== 'undefined') {
                    nodesInThePath = nodesInThePathLeftRight;
                }

                if (typeof nodesInThePathRightLeft !== 'undefined') {
                    nodesInThePath = nodesInThePathRightLeft;
                }
            }

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
            for (j = 0; j < nodesInThePath.length - 1; j++) {
                if (listEdges[i].source === nodesInThePath[j].id && listEdges[i].target === nodesInThePath[j + 1].id) {
                    console.log("Archi colorati: " + listEdges[i].id);
                    listEdges[i].color = "#ff0000";
                    numEdges++;
                    break;
                }
            }
        }

        s.graph.edges().forEach(element => {
            s.graph.dropEdge(element.id);
        });

        edges_list_before_all.forEach(element => {
            s.graph.addEdge(element);
        });

        list_edges_final = s.graph.edges();

        list_edges_final.forEach(element => {
            for (i = 0; i < nodesInThePath.length - 1; i++) {
                if ((element.source === nodesInThePath[i].id && element.target === nodesInThePath[i + 1].id) || (element.target === nodesInThePath[i].id && element.source === nodesInThePath[i + 1].id)) {
                    element.color = "#ff0000";
                }
            }
        });

        document.getElementById("numEdges").value = numEdges;

        if (currentLayout === "Force Layout Default" || currentLayout === "Force Layout Edges") {
            sigma.plugins.relativeSize(s, 3);
        }

        s.refresh();

    } else {

        alert("This algorithm is not applicable to " + currentLayout);

    }
}

function clearInputFirstSequence() {
    document.getElementById("firstSequence").value = "";
}

function clearInputSecondSequence() {
    document.getElementById("secondSequence").value = "";
}

function createGraphForShortestPath() {
    s.graph.edges().forEach(element => {
        try {
            s.graph.addEdge({
                id: 'e' + '(' + element.target + ',' + element.source + ')',
                source: element.target,
                target: element.source
            });

        } catch (err) {
            console.log(err);
        }
    });

}