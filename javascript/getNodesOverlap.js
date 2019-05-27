function getNodesOverlap(node_m) {

    var config = {
        nodeMargin: node_m,
        scaleNodes: 1.3
    };

    var listener = s.configNoverlap(config);

    s.startNoverlap();

}