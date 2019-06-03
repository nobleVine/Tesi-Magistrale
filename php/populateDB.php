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

$globalIndex = 0;
$initial_length = count ($array_content);

while ($globalIndex < $initial_length) {

    $i = 0;
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
    VALUES ";
    
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
    VALUES ";

    foreach ($array_content as $json) {

        $i = $i + 1;

        $greeting = checkAndSetSingleColumn($json['greeting']);
        $query = checkAndSetSingleColumn($json['query']);
        $count = checkAndSetSingleColumn($json['count']);
        $start = checkAndSetSingleColumn($json['start']);
        $number = checkAndSetSingleColumn($json['results'][0]['number']);
        $id = checkAndSetSingleColumn($json['results'][0]['id']);
        $data = checkAndSetSingleColumn($json['results'][0]['data']);
        $name = checkAndSetSingleColumn($json['results'][0]['name']);
        $comment = checkAndSetArrayColumn($json['results'][0]['comment']);
        $reference = checkAndSetArrayColumn($json['results'][0]['reference']);
        $link = checkAndSetArrayColumn($json['results'][0]['link']);

        $sql1 = $sql1 . "($greeting, $query, $count, $start, $number, $id, $data, $name, $comment, $reference, $link),";

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

        $sql2 = $sql2 . "($query, $formula, $example, $maple, $mathematica, $program, $xref, $keyword, $offset, $author, $references, $revision, $time, $created),";

        array_shift($array_content);

        if ($i == 30) {
            break;
        }
    }

    $globalIndex = $globalIndex + 30;
    
    mysqli_query($connectionToDB, substr($sql1, 0, -1));
    mysqli_query($connectionToDB, substr($sql2, 0, -1));

}

echo "<br>" . "Finished population!" . "<br>";
