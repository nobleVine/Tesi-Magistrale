<?php

$column = $_POST['string1'];
$string = $_POST['string2'];

require_once 'readAndConnection.php';

function searchInName($string, $connectionToDB, $column) {
    $sql_query = "SELECT * FROM json " . "WHERE " . $column . " LIKE " . "'%" . $string . "%'";
    return $connectionToDB->query($sql_query);
}

$query_result = searchInName($string, $connectionToDB, $column);

$r = array();

while ($row = $query_result->fetch_assoc()) {
    array_push($r, $row['query']);
}

echo json_encode($r);

?>