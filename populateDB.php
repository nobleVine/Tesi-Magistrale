<?php

require_once 'readAndConnection.php';

foreach ($array_content as $json) {

    if (isset($json['query'])) {
        $query = "'" . str_replace("'", "\'", $json['query']) . "'";
    } else {
        $query = "NULL";
    }

    if (isset($json['results'][0]['id'])) {
        $id = "'" . str_replace("'", "\'", $json['results'][0]['id']) . "'";
    } else {
        $id = "NULL";
    }

    if (isset($json['results'][0]['data'])) {
        $data ="'" . str_replace("'", "\'", $json['results'][0]['data']) . "'";
    } else {
        $data = "NULL";
    }

    if (isset($json['results'][0]['name'])) {
        $name ="'" . str_replace("'", "\'", $json['results'][0]['name']) . "'";
    } else {
        $name = "NULL";
    }

    if (isset($json['results'][0]['comment'])) {
        $comment = "'" . str_replace("'", "\'", implode(",", $json['results'][0]['comment'])) . "'";
    } else {
        $comment = "NULL";
    }

    if (isset($json['results'][0]['reference'])) {
        $reference = "'" . str_replace("'", "\'", implode(",", $json['results'][0]['reference'])) . "'";
    } else {
        $reference = "NULL";
    }

    if (isset($json['results'][0]['formula'])) {
        $formula = "'" . str_replace("'", "\'", implode(",", $json['results'][0]['formula'])) . "'";
    } else {
        $formula = "NULL";
    }

    if (isset($json['results'][0]['example'])) {
        $example = "'" . str_replace("'", "\'", implode(",", $json['results'][0]['example'])) . "'";
    } else {
        $example = "NULL";
    }

    if (isset($json['results'][0]['xref'])) {
        $xref = "'" . str_replace("'", "\'", implode(",", $json['results'][0]['xref'])) . "'";
    } else {
        $xref = "NULL";
    }

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
