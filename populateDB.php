<?php

$array_content = array();

chdir($_SERVER["DOCUMENT_ROOT"]);

chdir("materiale_Nocentini\oeis-tools-master\src");

chdir("fetched");

$list = glob("*.json");

foreach ($list as $value) {
    array_push($array_content, json_decode(file_get_contents($value), true));
}

require_once 'dbConfiguration.php';

try {
    $connectionToDB = mysqli_connect($host, $username, $password, $dbname);
    echo "Connected to $dbname at $host successfully!";
} catch (PDOException $pe) {
    die("Could not connect to the database $dbname :" . $pe->getMessage());
}

foreach ($array_content as $json) {

    $greeting = " ' " . str_replace("'", "\'", $json['greeting']) . " ' ";
    $query = " ' " . str_replace("'", "\'", $json['query']) . " ' ";
    $count = " ' " . str_replace("'", "\'", $json['count']) . " ' ";
    $start = " ' " . str_replace("'", "\'", $json['start']) . " ' ";
    $number = " ' " . str_replace("'", "\'", $json['results'][0]['number']) . " ' ";
    $id = " ' " . str_replace("'", "\'", $json['results'][0]['id']). " ' ";
    $data = " ' " . str_replace("'", "\'", $json['results'][0]['data']). " ' ";
    $name = " ' " . str_replace("'", "\'", $json['results'][0]['name']). " ' ";
    $comment = " ' " . str_replace("'", "\'", implode(",",  $json['results'][0]['comment']) ). " ' ";
    $reference = " ' " . str_replace("'", "\'", implode(", ", $json['results'][0]['reference']) ). " ' ";
    $link = " ' " . str_replace("'", "\'", implode($json['results'][0]['link']) ). " ' ";
    $formula = " ' " . str_replace("'", "\'", implode($json['results'][0]['formula'])) . " ' ";
    $example = " ' " . str_replace("'", "\'", implode($json['results'][0]['example'])) . " ' ";
    $maple = " ' " . str_replace("'", "\'", implode($json['results'][0]['maple'])) . " ' ";
    $mathematica = " ' " . str_replace("'", "\'", implode($json['results'][0]['mathematica'])) . " ' ";
    $program = " ' " . str_replace("'", "\'", implode($json['results'][0]['program'])) . " ' ";
    $xref = " ' " . str_replace("'", "\'", implode($json['results'][0]['xref'])) . " ' ";
    $keyword = " ' " . str_replace("'", "\'", $json['results'][0]['keyword']). " ' ";
    $offset = " ' " . str_replace("'", "\'", $json['results'][0]['offset']). " ' ";
    $author = " ' " . str_replace("'", "\'", $json['results'][0]['author']) . " ' ";
    $referencesJSON = " ' " . str_replace("'", "\'", $json['results'][0]['references']). " ' ";
    $revision = " ' " . str_replace("'", "\'", $json['results'][0]['revision']) . " ' ";
    $time = " ' " . str_replace("'", "\'", $json['results'][0]['time']). " ' ";
    $created = " ' " . str_replace("'", "\'", $json['results'][0]['created']) . " ' ";

    $sql = "INSERT INTO json (
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
                link,
                formula,
                example,
                maple,
                mathematica,
                program,
                xref,
                keyword,
                offset,
                author,
                referencesJSON,
                revision,
                time,
                created
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
                $link,
                $formula,
                $example,
                $maple,
                $mathematica,
                $program,
                $xref,
                $keyword,
                $offset,
                $author,
                $referencesJSON,
                $revision,
                $time,
                $created
            )";

            mysqli_query($connectionToDB, $sql);

}