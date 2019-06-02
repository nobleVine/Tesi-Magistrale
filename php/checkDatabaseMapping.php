<?php

function checkDatabaseMapping($column)
{
    if ($column == "time") {
        $column = "tTime";
    }
    if ($column == "references") {
        $column = "nReferences";
    }
    return $column;
}

?>
