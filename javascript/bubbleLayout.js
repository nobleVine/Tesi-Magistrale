function drawBubbleLayout() {

    s.graph.clear();

    s.settings({
        maxNodeSize: 19
    });

    var sequenceForLayout = document.getElementById("sequenceLayout").value;
    var downloaded = false;

    json_list.forEach(element => {
        if (element.query.substring(3, 11) === sequenceForLayout) {
            downloaded = true;
            s.graph.addNode({
                id: '' + sequenceForLayout,
                label: '' + sequenceForLayout,
                x: 1,
                y: 1,
                size: 2,
                color: "#ff0000"
            });
            return;
        }
    });

    if (!downloaded) {
        alert("The sequence has not been fetched!");
        return;
    }

    var weightForLayout = document.getElementById("selectWeightForLayout").value;

    var weight_list = takeWeight(sequenceForLayout, weightForLayout);

    for (i = 0; i < weight_list.length; i++) {
        var theta = i * 2 * Math.PI / weight_list.length;
        s.graph.addNode({
            id: '' + i,
            label: '' + i,
            x: getRandomArbitrary(0, 50) * Math.sin(theta),
            y: getRandomArbitrary(0, 50) * Math.cos(theta),
            size: setWeight(weight_list[i])
        }).addEdge({
            id: 'e' + s.graph.edges().length,
            source: '' + sequenceForLayout,
            target: '' + i,
            size: 3
        });
    }

    s.refresh();

    getNodesOverlap(5);

    s.settings({
        maxNodeSize: 6
    });

}

function setWeight(w_list) {

    var weightForThisString = 0;

    if (w_list <= 100) {
        weightForThisString = 3;
    }

    if (w_list > 100 && w_list <=200) {
        weightForThisString = 6;
    }

    if (w_list > 200 && w_list <=300) {
        weightForThisString = 9;
    }

    if (w_list > 300 && w_list <=400) {
        weightForThisString = 12;
    }

    if (w_list > 400 && w_list <=500) {
        weightForThisString = 15;
    }

    if (w_list > 500) {
        weightForThisString = 18;
    }

    return weightForThisString;

}