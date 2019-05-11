<?php

$column = $_POST['string'];

require_once 'readAndConnection.php';

$sql_query = "SELECT query, " . $column . " FROM json";
$query_result = mysqli_query($connectionToDB, $sql_query);

$r = array();

while ($row = mysqli_fetch_assoc($query_result)) { // print all results.
    array_push($r, $row['query']);
    array_push($r, $row[$column]);
}

echo json_encode($r);

?>