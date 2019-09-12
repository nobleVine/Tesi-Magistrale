<?php

$textQuery = $_GET['string1'];

require_once 'readAndConnection.php';

function freeQuery($textQuery, $connectionToDB) {
    return $connectionToDB->query($textQuery);
}

$query_result = freeQuery($textQuery, $connectionToDB);

$r = array();

while ($row = $query_result->fetch_assoc()) {
    array_push($r, $row);
}

echo json_encode($r);

?>