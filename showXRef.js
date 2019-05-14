function showXref() {

    var nodes_added = [];

    s.bind('rightClickNode', function (e) {

        fetched = false;

        for (f = 0; f < nodes_added.length; f++) {
            s.graph.dropNode(nodes_added[f]);
        }

        s.graph.nodes().forEach(element => {
            element.color = "#007fff";
            element.size = 3;
        });

        s.graph.edges().forEach(element => {
            element.color = "#000000";
            element.size = 3;
        });

        nodes_added = [];

        for (w = 0; w < json_list.length; w++) {
            if (e.data.node.id === json_list[w].query.substring(3, 11) && typeof json_list[w].results[0].xref !== 'undefined') {
                xref = take_sequences(json_list[w]);
                fetched = true;
                break;
            }
        }

        if (!fetched) {
            alert('The sequence ' + e.data.node.id + ' is not fetched');
            return;
        }

        var angle = 5;

        for (i = 0; i < xref.length; i++) {
            var theta = angle * 2 * Math.PI / xref.length;
            try {
                s.graph.nodes(e.data.node.id).color = "#ff0000";
                s.graph.nodes(e.data.node.id).size = 6;

                s.graph.addNode({
                    id: xref[i],
                    label: '' + xref[i],
                    x: 20 * Math.sin(theta),
                    y: 20 * Math.cos(theta),
                    size: 6,
                    color: "#0a0a0a"
                }).addEdge({
                    id: 'e' + s.graph.edges().length,
                    source: '' + e.data.node.id,
                    target: '' + xref[i],
                    size: 20,
                    color: "#0a0a0a"
                });
                nodes_added.push(xref[i]);
            } catch (error) {
                s.graph.nodes(xref[i]).color = "#0a0a0a";
                s.graph.nodes(xref[i]).size = 6;
                s.graph.edges().forEach(element => {
                    if (element.source === e.data.node.id) {
                        element.size = 20;
                        element.color = "#0a0a0a"
                    }
                })
                console.log("Node " + xref[i] + " already exists");
            }
            angle = angle + 0.2;
        }
        s.refresh();
    });

}