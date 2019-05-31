function drawFetchedSequencesGraph() {

    currentLayout = "Circle Layout";

    s.graph.clear();

    s.settings({
        maxNodeSize: 6
    })

    s.unbind('rightClickNode'); //to deactivate the event rightClickNode

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

    for (q = 0; q < list_edges.length; q++) {  //double for to remove the duplicate edges (edges which have the same source and target nodes)
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

        window.setTimeout(function () { s.killForceAtlas2() }, 500);

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

        window.setTimeout(function () { s.killForceAtlas2() }, 500);

        s.settings({
            maxNodeSize: 30,
            minNodeSize: 3
        });

        sigma.plugins.relativeSize(s, 3);

    }

    if (layout === "Louvain Layout") {

        colors = [
            "#D6C1B0",
            "#9DDD5A",
            "#D06D34",
            "#D28FD8",
            "#5D8556",
            "#71D4C6",
            "#CDCF79",
            "#D8A836",
            "#5E8084",
            "#738ECD",
            "#D36565",
            "#61DC7B",
            "#9B7168",
            "#97C4DE",
            "#A57E42",
            "#D5DA41",
            "#D06B97",
            "#917097",
            "#689534",
            "#90D59B"
        ];

        sigma.layouts.configForceLink(s, {
            outboundAttractionDistribution: true,
            worker: true,
            autoStop: true,
            background: true,
            easing: 'cubicInOut'
        });

        sigma.layouts.startForceLink();

        var louvainInstance;

        document.getElementById('detectCommunities').addEventListener("click", function (e) {

            louvainInstance = sigma.plugins.louvain(s.graph, {
                setter: function (communityId) {
                    this.my_community = communityId;
                }
            });

            var nbLevels = louvainInstance.countLevels();
            var partitions = louvainInstance.getPartitions();
            var nbPartitions = louvainInstance.countPartitions(partitions);

            console.log(louvainInstance.getPartitions());

            s.graph.nodes().forEach(function (node) {
                node.color = colors[node.my_community];
            });

            s.refresh({ skipIndexation: true });

            var levelElt = document.getElementById('levels');
            levelElt.innerHTML = '';

            for (var i = 0; i < nbLevels; i++) {
                var optionElt = document.createElement("option");
                optionElt.text = i + 1;
                if (i === nbLevels - 1) {
                    optionElt.selected = true;
                }
                levelElt.add(optionElt);
            }


            levelElt.addEventListener("change", function (e) {

                var level = +e.target[e.target.selectedIndex].value;
                louvainInstance.setResults({ level: level });

                // Partition count
                partitions = louvainInstance.getPartitions(level);
                nbPartitions = louvainInstance.countPartitions(partitions);
                document.getElementById('numberOfPartitions').textContent = nbPartitions;

                // Color nodes based on their community
                s.graph.nodes().forEach(function (node) {
                    node.color = colors[node.my_community];
                });

                s.refresh({ skipIndexation: true });
           
            });

        });

        document.getElementById('resetCommunities').addEventListener("click", function (e) {

            s.graph.nodes().forEach(function (node) {
                node.color = '#333';
            });

            s.refresh({ skipIndexation: true });

            document.getElementById('numberOfPartitions').textContent = 0;

            document.getElementById('levels').innerHTML = '';

            louvainInstance = null;

        });



    }

    $("#selectLayout").empty().append('<option value="">Choose</option>').append('<option>Circle Layout</option>').append('<option>Force Layout Default</option>').append('<option>Force Layout Edges</option>');

}