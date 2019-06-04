function drawFetchedSequencesGraph() {

    currentLayout = "Circle Layout";

    s.graph.clear();

    s.settings({
        maxNodeSize: 6
    });

    s.unbind('rightClickNode'); // To deactivate the event rightClickNode.

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
            size: 3
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
                    });
                }
            }
        }
    }

    list_edges = s.graph.edges();

    for (q = 0; q < list_edges.length; q++) { // Double for to remove the duplicate edges (edges which have the same source and target nodes).
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

        currentLayout = "Force Layout Default";

        configuration = {
            outboundAttractionDistribution: true,
        }

        s.startForceAtlas2(configuration);

        window.setTimeout(function () {
            s.killForceAtlas2()
        }, 500);

        s.settings({
            maxNodeSize: 10,
            minNodeSize: 3
        });

        sigma.plugins.relativeSize(s, 3);

    }

    if (layout === "Force Layout Edges") {

        currentLayout = "Force Layout Edges";

        configuration = {
            linLogMode: true,
            scalingRation: 10000,
            outboundAttractionDistribution: true,
            slowDown: 50,
            edgeWeightInfluence: 1000
        }

        s.startForceAtlas2(configuration);

        window.setTimeout(function () {
            s.killForceAtlas2()
        }, 500);

        s.settings({
            maxNodeSize: 30,
            minNodeSize: 3
        });

        sigma.plugins.relativeSize(s, 3);

    }

    if (layout === "FR Layout") {

        currentLayout = "FR Layout";

        // Configure the Fruchterman-Reingold algorithm:
        var frListener = sigma.layouts.fruchtermanReingold.configure(s, {
            gravity: 50,
            iterations: 500,
            easing: 'quadraticInOut',
            duration: 800
        });

        // Start the Fruchterman-Reingold algorithm:
        sigma.layouts.fruchtermanReingold.start(s);

        s.settings({
            maxNodeSize: 30,
            minNodeSize: 3
        });

        sigma.plugins.relativeSize(s, 3);

    }

    $("#selectLayout").empty().append('<option value="">Choose</option>').append('<option>Circle Layout</option>').append('<option>Force Layout Default</option>').append('<option>Force Layout Edges</option>').append('<option>FR Layout</option>');

}

function louvainLayout() {

    if (currentLayout === "Circle Layout" || currentLayout === "Force Layout Default" || currentLayout === "Force Layout Edges" || currentLayout === "FR Layout") {

    var colors = [];

    for(c=0; c < 100; c++) { // Color random generation.
        colors[c] = '#' + (
            Math.floor(Math.random() * 16777215).toString(16) + '000000'
          ).substr(0, 6);
    }

    var louvainInstance;

        louvainInstance = sigma.plugins.louvain(s.graph, {
            setter: function (communityId) {
                this.my_community = communityId;
            }
        });

        var nbLevels = louvainInstance.countLevels();
        var partitions = louvainInstance.getPartitions();
        var nbPartitions = louvainInstance.countPartitions(partitions);

        document.getElementById('numberOfCommunities').value = nbPartitions;

        s.graph.nodes().forEach(function (node) { // This loop is useful to color the nodes of the same community with the same color.
            node.color = colors[node.my_community];
        });

        s.refresh();

        var levelElt = document.getElementById('selectLevel');
        levelElt.innerHTML = '';

        for (var i = 0; i < nbLevels; i++) { // Levels menu option population.
            var optionElt = document.createElement("option");
            optionElt.text = i + 1;
            if (i === nbLevels - 1) {
                optionElt.selected = true;
            }
            levelElt.add(optionElt);
        }

        levelElt.addEventListener("change", function (e) { // Listener for the user. When he/she changes the value in the drop down menù.

            var level = +e.target[e.target.selectedIndex].value; // It is a long that reflects the index of the first or last selected <option> element, depending on the value of multiple. The value -1 indicates that no element is selected.
            louvainInstance.setResults({ level: level });

            // Partition count
            partitions = louvainInstance.getPartitions(level);
            nbPartitions = louvainInstance.countPartitions(partitions);
            document.getElementById('numberOfCommunities').value = nbPartitions;

            // Color nodes based on their community
            s.graph.nodes().forEach(function (node) {
                node.color = colors[node.my_community];
            });

            s.refresh();

        });

    } else {

        alert("This algorithm is not applicable to " + currentLayout);

    }

}