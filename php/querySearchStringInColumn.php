<?php

$column = $_POST['string1'];
$string = $_POST['string2'];

require_once 'readAndConnection.php';

function searchInColumn($string, $connectionToDB, $column) {
    if ($column == "greeting" || $column == "count" || $column == "start" || $column == "number" || $column == "id" || $column == "data" || $column == "name" || $column == "comment" || $column == "reference" || $column == "link") {
        $sql_query = "SELECT * FROM json1 " . "WHERE " . $column . " LIKE " . "'%" . $string . "%'";
    } else {
        $sql_query = "SELECT * FROM json2 " . "WHERE " . $column . " LIKE " . "'%" . $string . "%'";
    }
    return $connectionToDB->query($sql_query);
}

$query_result = searchInColumn($string, $connectionToDB, $column);

$r = array();

while ($row = $query_result->fetch_assoc()) {
    array_push($r, $row['query']);
}

echo json_encode($r);
