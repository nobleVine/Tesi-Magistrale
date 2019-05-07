<?php

// here we have to read the data passed from the ajax request.

require_once 'readAndConnection.php';

function doQuery($selectArgument, $connectionToDB)
{
    $sql_query = "SELECT " . $selectArgument . " FROM json LIMIT 5";
    return mysqli_query($connectionToDB, $sql_query);
}

$query_result = doQuery("query", $connectionToDB);

echo "<br>" . " Query results: " . "<br>";

while ($row = mysqli_fetch_assoc($query_result)) { // print all results.
    echo "<br>" . $row['query'];
}