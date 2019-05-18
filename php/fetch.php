    <?php

    $sequence = $_GET['download'];

    chdir($_SERVER["DOCUMENT_ROOT"]);

    chdir("materiale_Nocentini\oeis-tools-master\src");

    shell_exec("py crawling.py " . $sequence);

    ?>
