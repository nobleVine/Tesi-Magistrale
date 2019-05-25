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

function checkAndSetArrayColumn($checkJson)
{
    if (isset($checkJson)) {
        return "'" . str_replace("'", "\'", implode(",", $checkJson)) . "'";
    } else {
        return "NULL";
    }
}

foreach ($array_content as $json) {

    $greeting = checkAndSetSingleColumn($json['greeting']);
    $query = checkAndSetSingleColumn($json['query']);
    $count = checkAndSetSingleColumn($json['count']);
    $start = checkAndSetSingleColumn($json['start']);
    $number = checkAndSetSingleColumn($json['number']);
    $id = checkAndSetSingleColumn($json['results'][0]['id']);
    $data = checkAndSetSingleColumn($json['results'][0]['data']);
    $name = checkAndSetSingleColumn($json['results'][0]['name']);
    $comment = checkAndSetArrayColumn($json['results'][0]['comment']);
    $reference = checkAndSetArrayColumn($json['results'][0]['reference']);
    $link = checkAndSetArrayColumn($json['results'][0]['link']);

    $formula = checkAndSetArrayColumn($json['results'][0]['formula']);
    $example = checkAndSetArrayColumn($json['results'][0]['example']);
    $maple = checkAndSetArrayColumn($json['results'][0]['maple']);
    $mathematica = checkAndSetArrayColumn($json['results'][0]['mathematica']);
    $program = checkAndSetArrayColumn($json['results'][0]['program']);
    $xref = checkAndSetArrayColumn($json['results'][0]['xref']);
    $keyword = checkAndSetSingleColumn($json['results'][0]['keyword']);
    $offset = checkAndSetSingleColumn($json['results'][0]['offset']);
    $author = checkAndSetSingleColumn($json['results'][0]['author']);
    $references = checkAndSetSingleColumn($json['results'][0]['references']);
    $revision = checkAndSetSingleColumn($json['results'][0]['revision']);
    $time = checkAndSetSingleColumn($json['results'][0]['time']);
    $created = checkAndSetSingleColumn($json['results'][0]['created']);

    $sql1 = "INSERT INTO json1 (
                greeting,
                query,
                count,
                start,
                number,
                id,
                data,
                name,
                comment,
                reference,
                link
            ) 
            VALUES (
                $greeting,
                $query,
                $count,
                $start,
                $number,
                $id,
                $data,
                $name,
                $comment,
                $reference,
                $link
            );";
            
         $sql2 ="INSERT INTO json2 (
                query,
                formula,
                example,
                maple,
                mathematica,
                program, 
                xref,
                keyword, 
                offset, 
                author,
                nReferences,
                revision, 
                tTime, 
                created 
            )
            VALUES (
                $query,
                $formula,
                $example,
                $maple,
                $mathematica,
                $program, 
                $xref,
                $keyword, 
                $offset, 
                $author,
                $references,
                $revision, 
                $time, 
                $created
            )";

    mysqli_query($connectionToDB, $sql1);
    mysqli_query($connectionToDB, $sql2);

}

echo "<br>" . "Finished population!" . "<br>";
