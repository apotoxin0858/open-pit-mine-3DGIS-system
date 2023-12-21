<?php
session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>

<body>
    <h1>Member Only</h1>
    <?php
        if (isset($_SESSION['valid_user'])) {
            echo '<p> You are logged in as: '.$_SESSION['valid_user'].'<br/>';
            echo '<p><em>Members_Only content goes here.</em></p>';
        } else {
            echo '<p> You are not logged in.<p>';
            echo '<p>Only logged in members may see this page<</p>';
        };
    ?>
 <p><a href="check.php">Back to Home Page</a></P>
</body>


</html>