<?php
session_start();
if (isset($_POST['username']) && isset($_POST['password'])) {
    //存储变量
    $username = $_POST['username'];
    $password = $_POST['password'];
   
    //连接数据库库
    $con = new mysqli("localhost", "xpz", "1701060", "userinfo");
    if (mysqli_connect_errno()) {
        echo '<p>Error:Could not connect to database<br/> Please try again later</p>';
        exit;
    } else {
        echo "数据库连接成功";
    };
    //设置查询条件并执行
    $query = "select * from users where username ='".$username."' and password = '".$password."'";
    $result =$con->query($query);
    
    if ($result->num_rows) {
        $_SESSION['valid_user'] = $username;
    };
    //关闭数据库
    $con->close();
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
</head>

<body>
    <h1>Home Page</h1>
    <?php
        if (isset($_SESSION['valid_user'])) {
            echo '<p> You are logged in as: '.$_SESSION['valid_user'].'<br/>';
            echo '<a href="logout.php">Log out</a></p>';
        } else {
            if (isset($username)) {
                echo '<p>Could not log you in.</p>';
            } else {
                echo '<p> You are not logged in.<p>';
            }
        };
    ?>
  <form action="check.php" method="POST">
            <fieldset>
                <legend>
                    Login Now.
                </legend>
                <p>
                    <label for='username'>
                        Username
                    </label>
                    <input type="text" name="username" id="username" size="30">
                </p>
                <p>
                    <label for='password'>
                            Password
                        </label>
                    <input type="text" name="password" id="password" size="30">
                </p>
            </fieldset>
            <button type="submit" name="login">Login</button>

    </form>
    <p><a href = 'members_only.php'>Go to Members Secton</a></P>
</body>


</html>