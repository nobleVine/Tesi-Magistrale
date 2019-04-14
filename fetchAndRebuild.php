<html>

<head>

    <style>
        body {
            margin: 10;
            background-color: #D3D3D3;
        }

        #back {
            width: 70px;
            height: 50px;
        }
    </style>

</head>

<body>

    <font face="Comics Sans MC" size=5>
        The sequence has been fetched correctly! 
    </font>

    <br>
    <br>

    <form action="index.html" id="form">
        <input type="image" src="backIcon.png" class="btTxt submit" id="back"/>
    </form>

    <?php

    $sequence = $_POST['sequence'];

    $wd = getcwd();

    shell_exec("py py_utility.py");

    chdir($_SERVER["DOCUMENT_ROOT"]);

    chdir("materiale_Nocentini\oeis-tools-master\src");

    shell_exec("py crawling.py " . $sequence);

    chdir($_SERVER["DOCUMENT_ROOT"]);

    chdir($wd);

    shell_exec("py py_convert.py");

    ?>

    <body>

</html>