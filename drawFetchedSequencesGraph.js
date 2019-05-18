function drawFetchedSequencesGraph() {

    s.graph.clear();

    document.getElementById("nodesClick2").style.display = "none";

    // Common listeners.
    initializationCommonListeners();

    // Specialized listeners.
    document.getElementById("numberOfNodes2").addEventListener("click", clearInput);

    nodesToShow = document.getElementById("numberOfNodes2").value;

    if (nodesToShow > 100) {
        alert("Insert a number of nodes less or equal than 100");
        return;
    }

    if (nodesToShow > json_list.length) {
        alert("The maximum possible number of nodes that you can inserted is " + json_list.length);
        return;
    }

    if (nodesToShow === "") {
        alert("Number of nodes not inserted");
        return;
    }

    var list_refs = [];

    for (z = 0; z < nodesToShow; z++) {
        seq = take_sequences(json_list[z]);
        if (typeof seq !== 'undefined') {
            list_refs.push(seq);
        }
    }

    sessionStorage.setItem('list_refs', list_refs);

    for (i = 0; i < nodesToShow; i++) {
        var theta = i * 2 * Math.PI / nodesToShow;
        s.graph.addNode({
            id: '' + json_list[i].query.substring(3, 11),
            label: '' + json_list[i].query.substring(3, 11),
            x: 10 * Math.cos(theta),
            y: 10 * Math.sin(theta),
            size: 1
        });
    }

    for (i = 0; i < nodesToShow; i++) {
        for (j = 0; j < list_refs[i].length; j++) {
            for (k = 0; k < nodesToShow; k++) {
                if (list_refs[i][j] === json_list[k].query.substring(3, 11) && (json_list[i].query.substring(3, 11) !== json_list[k].query.substring(3, 11))) {
                    s.graph.addEdge({
                        id: 'e' + '(' + json_list[i].query.substring(3, 11) + ',' + json_list[k].query.substring(3, 11) + ')',
                        source: '' + json_list[i].query.substring(3, 11),
                        target: '' + json_list[k].query.substring(3, 11),
                        size: 1
                    });
                }
            }
        }
    }

    list_edges = s.graph.edges();

    for (q = 0; q < list_edges.length; q++) {
        for (p = q + 1; p < list_edges.length; p++) {
            if ((list_edges[q].source === list_edges[p].target) && (list_edges[q].target === list_edges[p]
                .source)) {
                s.graph.dropEdge(list_edges[p].id);
            }
        }
    }

    s.refresh();
    document.getElementById("nodesClick").style.display = "block";

    var layout = document.getElementById("selectLayout").value;

    if (layout === "Force Layout Default") {

        configuration = {
            outboundAttractionDistribution: true,
        }

        s.startForceAtlas2(configuration);

        window.setTimeout(function () { s.killForceAtlas2() }, 500);

    }

    if (layout === "Force Layout Edges") {

        configuration = {
            linLogMode: true,
            scalingRation: 10000,
            outboundAttractionDistribution: true,
            slowDown: 50,
            edgeWeightInfluence : 1000
        }

        s.startForceAtlas2(configuration);

        window.setTimeout(function () { s.killForceAtlas2() }, 500);

    }

$("#selectLayout").empty().append('<option value="">Choose</option>').append('<option>Circle Layout</option>').append('<option>Force Layout Default</option>').append('<option>Force Layout Edges</option>');

}