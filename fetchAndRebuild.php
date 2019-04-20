    
    <?php

    $sequence = $_GET['download'];

    $wd = getcwd();

    shell_exec("py py_utility.py");

    chdir($_SERVER["DOCUMENT_ROOT"]);

    chdir("materiale_Nocentini\oeis-tools-master\src");

    shell_exec("py crawling.py " . $sequence);

    chdir($_SERVER["DOCUMENT_ROOT"]);

    chdir($wd);

    shell_exec("py py_convert.py");

    ?>
