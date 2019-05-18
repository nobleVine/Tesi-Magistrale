function drawIncrementalGraph() {

    s.graph.clear();

    specGraph = false;

    document.getElementById("nodesClick").style.display = "block";
    document.getElementById("nodesClick2").style.display = "none";

    // Common listeners.
    initializationCommonListeners();

    // Specialized listeners.
    document.getElementById("initialSequence").addEventListener("click", clearInput);

    var initial_sequence = document.getElementById("initialSequence").value;

    if (initial_sequence === "") {
        alert("There is no sequence inserted");
        return;
    }

    s.graph.addNode({
        id: '' + initial_sequence,
        label: '' + initial_sequence,
        x: 1,
        y: 1,
        size: 5
    });

    s.refresh();

    s.bind("clickNode", function (e) {
        id = e.data.node.id; // id of the last clicked node.
        optionsInitializationAddNodesIncremental(id);
        optionsInitializationRemoveNodesIncremental();
    })
}

function optionsInitializationAddNodesIncremental(sequence_id) {

    var nodes_list = [];

    json_list.forEach(element => {
        if (element.query.substring(3, 11) === sequence_id) {
            nodes_list = take_sequences(element);
            return;
        }
    });

    var options = [];
    var addIt = true;

    for (f = 0; f < nodes_list.length; f++) {
        s.graph.nodes().forEach(element => {
            if (nodes_list[f] === element.id) {
                addIt = false;
                return;
            }
        });
        if (addIt) {
            options.push(nodes_list[f]);
        }
        addIt = true;
    }

    initializationMenu("selectSequences3", options);

}

function optionsInitializationRemoveNodesIncremental() {

    var options = [];

    for (g = 0; g < s.graph.nodes().length; g++) {
        options.push(s.graph.nodes()[g].id);
    }

    initializationMenu("selectSequences4", options);

}

function addNodeToIncrementalGraph() {

    if (s.graph.nodes().length === 0) {
        alert("You have to draw the graph first!");
        return;
    }

    var sequenceToDraw = document.getElementById("selectSequences3").value;

    s.graph.addNode({
        id: '' + sequenceToDraw,
        label: '' + sequenceToDraw,
        size: 3,
        x: Math.round(getRandomArbitrary(0, 10000)),
        y: Math.round(getRandomArbitrary(0, 10000))
    }).addEdge({
        id: 'e' + id + sequenceToDraw,
        source: '' + id,
        target: '' + sequenceToDraw,
        size: 3
    });

    s.refresh();

    removeForAdd("selectSequences3", "selectSequences4", sequenceToDraw);

}

function removeNodeToIncrementalGraph() {

    if (s.graph.nodes().length === 0) {
        alert("You have to draw the graph first!");
        return;
    }

    var sequenceToRemove = document.getElementById("selectSequences4").value;

    s.graph.dropNode(sequenceToRemove);

    s.refresh();

    removeForRemove("selectSequences3", "selectSequences4", sequenceToRemove);

}

function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
}