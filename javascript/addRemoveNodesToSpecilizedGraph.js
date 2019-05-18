function optionsInitializationAddNodes() {

    current_sequence = document.getElementById("startingSequence")
        .value; // current_sequence = sequence written in the input text.
    nodesToAdd_current = document.getElementById("numberOfNodes").value;

    var nodes_list = [];

    json_list.forEach(element => {
        if (element.query.substring(3, 11) === current_sequence) {
            nodes_list = take_sequences(element);
            return;
        }
    });

    var options = [];

    for (f = nodesToAdd_current; f < nodes_list.length; f++) {
        options.push(nodes_list[f]);
    }

    initializationMenu("selectSequences", options);

}

function addNodeToSpecializedGraph() {

    if (s.graph.edges().length === 0) {
        alert("You have to draw the graph first!");
        return;
    }

    var sequenceToDraw = document.getElementById("selectSequences").value;

    s.graph.addNode({
        id: '' + sequenceToDraw,
        label: '' + sequenceToDraw,
        size: 3
    }).addEdge({
        id: 'e' + document.getElementById("startingSequence").value + sequenceToDraw,
        source: '' + document.getElementById("startingSequence").value,
        target: '' + sequenceToDraw,
        size: 3
    });

    s.graph.nodes().forEach(function (element, k) {
        if (k === 0) {
            s.graph.nodes()[0].x = 1; // It is already added, we have only to specify the coordinates.
            s.graph.nodes()[0].y = 1;
        } else {
            var theta = k * 2 * Math.PI / (s.graph.nodes().length - 1);
            element.x = 10 * Math.sin(theta);
            element.y = 10 * Math.cos(theta);
        }
    });

    s.refresh();

    removeForAdd("selectSequences", "selectSequences2", sequenceToDraw);

}

function optionsInitializationRemoveNodes() {

    current_sequence = document.getElementById("startingSequence").value;
    showedNodes_current = document.getElementById("numberOfNodes").value;

    var nodes_list = [];

    json_list.forEach(element => {
        if (element.query.substring(3, 11) === current_sequence) {
            nodes_list = take_sequences(element);
            return;
        }
    });

    var options = [];

    for (g = 0; g < showedNodes_current; g++) {
        options.push(nodes_list[g]);
    }

    initializationMenu("selectSequences2", options);

}

function removeNodeToSpecializedGraph() {

    if (s.graph.edges().length === 0) {
        alert("You have to draw the graph first!");
        return;
    }

    var sequenceToRemove = document.getElementById("selectSequences2").value;

    s.graph.dropNode(sequenceToRemove);

    for (i = 0; i < nodes_added.length; i++){
        s.graph.dropNode(nodes_added[i]);
    }

    nodes_added = [];

    s.graph.nodes().forEach(element => {
        element.color = "#007fff";
        element.size = 3;
    });

    s.graph.edges().forEach(element => {
        element.color = "#000000";
        element.size = 3;
    });

    s.graph.nodes().forEach(function (element, k) {
        if (k === 0) {
            s.graph.nodes()[0].x = 1; // It is already added, we have only to specify the coordinates.
            s.graph.nodes()[0].y = 1;
        } else {
            var theta = k * 2 * Math.PI / (s.graph.nodes().length - 1);
            element.x = 10 * Math.sin(theta);
            element.y = 10 * Math.cos(theta);
        }
    });

    s.refresh();

    removeForRemove("selectSequences", "selectSequences2", sequenceToRemove);

}