<?php 

chdir($_SERVER["DOCUMENT_ROOT"]); //returns the path of the root of the server (htdocs)

chdir("materiale_Nocentini\oeis-tools-master\src");

chdir("fetched");

$list = glob("*.json"); //returns the list of the json files in the fetched directory

echo json_encode($list); //convert the list in string

?>