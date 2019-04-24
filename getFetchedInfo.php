<?php 

chdir($_SERVER["DOCUMENT_ROOT"]);

chdir("materiale_Nocentini\oeis-tools-master\src");

chdir("fetched");

$list = glob("*.json"); 

echo json_encode($list);

?>