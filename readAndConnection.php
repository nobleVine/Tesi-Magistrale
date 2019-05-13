<?php

$array_content = array();

chdir($_SERVER["DOCUMENT_ROOT"]);\

chdir("materiale_Nocentini\oeis-tools-master\src");

chdir("fetched");

$list = glob("*.json");

foreach ($list as $value) {
    array_push($array_content, json_decode(file_get_contents($value), true));
}

require_once 'dbConfiguration.php';

try {
    $connectionToDB = mysqli_connect($host, $username, $password, $dbname);
    //echo "Connected to $dbname at $host successfully!" . "<br>";
} catch (PDOException $pe) {
    die("Could not connect to the database $dbname :" . $pe->getMessage());
}

?>