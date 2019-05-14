<?php

require_once 'readAndConnection.php';

function checkAndSetSingleColumn($checkJson)
{
    if (isset($checkJson)) {
        return "'" . str_replace("'", "\'", $checkJson) . "'";
    } else {
        return "NULL";
    }
}

function checkAndSetComplexColumn($checkJson)
{
    if (isset($checkJson)) {
        return "'" . str_replace("'", "\'", implode(",", $checkJson)) . "'";
    } else {
        return "NULL";
    }
}

foreach ($array_content as $json) {

    $query = checkAndSetSingleColumn($json['query']);
    $id = checkAndSetSingleColumn($json['results'][0]['id']);
    $data = checkAndSetSingleColumn($json['results'][0]['data']);
    $name = checkAndSetSingleColumn($json['results'][0]['name']);

    $comment = checkAndSetComplexColumn($json['results'][0]['comment']);
    $reference = checkAndSetComplexColumn($json['results'][0]['reference']);
    $formula = checkAndSetComplexColumn($json['results'][0]['formula']);
    $example = checkAndSetComplexColumn($json['results'][0]['example']);
    $xref = checkAndSetComplexColumn($json['results'][0]['xref']);

    $sql = "INSERT INTO json (
                query,
                id,
                data,
                name,
                comment,
                reference,
                formula,
                example,
                xref
            ) 
            VALUES (
                $query,
                $id,
                $data,
                $name,
                $comment,
                $reference,
                $formula,
                $example,
                $xref
            )";

    mysqli_query($connectionToDB, $sql);
}

echo "<br>" . "Finished population!" . "<br>";
