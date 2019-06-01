function drawSpecializedGraph() {

    currentLayout = "Specialized Layout";
    
    s.graph.clear();

    s.settings({
        maxNodeSize: 6
    });

    var present = false;

    specGraph = true;

    // Common listeners.
    initializationCommonListeners();

    // Specialized listeners.
    document.getElementById("startingSequence").addEventListener("click", clearInput);

    sequence = document.getElementById("startingSequence").value;
    nodesToAdd = document.getElementById("numberOfNodes").value;

    if (sequence === "" && nodesToAdd === "") {
        alert("Both the starting sequence and the number of nodes not inserted");
        return;
    } else if (sequence === "") {
        alert("There is no sequence inserted");
        return;
    } else if (nodesToAdd === "") {
        alert("Number of nodes not inserted");
        return;
    }

    json_list.forEach(element => {
        if (element.query.substring(3, 11) === sequence) {
            s.graph.addNode({
                id: '' + sequence,
                label: '' + sequence,
                x: 1,
                y: 1,
                size: 5
            });
            initial_sequence = element;
            present = true;
            return;
        }
    });

    if (typeof initial_sequence === 'undefined' || present === false) {
        alert("The sequence " + sequence + " has not been fetched!");
        return;
    }

    let nodes_list = take_sequences(initial_sequence);

    if (nodesToAdd > nodes_list.length) {
        alert("The maximum number of nodes that can be requested is " + nodes_list.length);
    } else {
        for (i = 0; i < nodesToAdd; i++) {
            var theta = i * 2 * Math.PI / nodesToAdd;
            s.graph.addNode({
                id: '' + nodes_list[i],
                label: '' + nodes_list[i],
                x: 10 * Math.sin(theta),
                y: 10 * Math.cos(theta),
                size: 3
            }).addEdge({
                id: 'e' + '(' + sequence + ',' + nodes_list[i] + ')',
                source: '' + sequence,
                target: '' + nodes_list[i],
                size: 3
            });
        }
        s.refresh();
        document.getElementById("nodesClick").style.display = "block";
        document.getElementById("nodesClick2").style.display = "block";
        showXref();
        optionsInitializationAddNodes();
        optionsInitializationRemoveNodes();
    }
}