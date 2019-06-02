<?php

$column = $_POST['string'];

require_once 'readAndConnection.php';

if ($column == "greeting" || $column == "count" || $column == "start" || $column == "number" || $column == "id" || $column == "data" || $column == "name" || $column == "comment" || $column == "reference" || $column == "link") {
    $sql_query = "SELECT query, " . $column . " FROM json1";
} else {
    $sql_query = "SELECT query, " . $column . " FROM json2";
}

$query_result = mysqli_query($connectionToDB, $sql_query);

$r = array();

while ($row = mysqli_fetch_assoc($query_result)) {
    array_push($r, $row['query']);
    array_push($r, $row[$column]);
}

echo json_encode($r);

?>