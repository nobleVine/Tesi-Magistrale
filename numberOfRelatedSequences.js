function numberOfRelatedSequences() {

    // Common listeners.
    initializationCommonListeners();

    // Specialized listeners.
    document.getElementById("sequence").addEventListener("click", clearInput);

    sequenceToEvaluate = document.getElementById("sequence").value;

    if (sequenceToEvaluate === "") {
        alert("There is no sequence inserted");
        return;
    }

    var numberOfReferences = 0;

    if (s.graph.nodes().length === 0) {
        alert("You have to draw the graph first!");
        return;
    }

    s.graph.edges().forEach(element => {
        element.color = "#000000"; // Edges color reinitialization.
        if (element.source === sequenceToEvaluate || element.target === sequenceToEvaluate)
            numberOfReferences = numberOfReferences + 1;
    });

    if (numberOfReferences === 0) {
        var here = false;
        s.graph.nodes().forEach(element => {
            if (element.id === sequenceToEvaluate) {
                element.color = "#ff0000";
                here = true;
                return;
            }
        });
        if (here) {
            alert("The selected sequence is present in the graph but it hasn't references");
        } else {
            alert("The selected sequence is not present in the graph");
        }
        document.getElementById("result").value = 0;
        s.refresh();
        return;
    }

    s.graph.nodes().forEach(element => {
        if (element.id === sequenceToEvaluate) {
            element.color = "#ff0000";
            element.size = 2;
        } else {
            element.size = 1;
            element.color = "#007fff";
        }
    });

    document.getElementById("result").value = numberOfReferences;

    s.graph.edges().forEach(element => { //First of all, we have to draw the edges to hide.
        if (element.source !== sequenceToEvaluate && element.target !== sequenceToEvaluate) {
            element.color = "#b3b3b3";
        } else {
            s.graph.dropEdge(element.id);
            s.graph.addEdge(element);
        }
    });

    /* And then, we have to draw the edges to show and highlight.
     * step 1: draw all edges to highlight and save them.
     * step 2: redraw the edges to highlight, and now we don't have problems with the overlap.
     */

    s.refresh();

    document.getElementById("nodesClick").style.display = "block";
}