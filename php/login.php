<?php

if (isset($_POST['username']) && isset($_POST['password'])) {
    //存储变量
    $username = $_POST['username'];
    $password = $_POST['password'];
   
    //连接数据库库
    $con = new mysqli("localhost", "lixu", "1801023", "Dgs");
    if (mysqli_connect_errno()) {
     echo '<p>Error:Could not connect to database<br/> Please try again later</p>';
     exit;
    } ;
    //设置查询条件并执行
    $query = "select * from users where username ='".$username."' and password = '".$password."'";
    $result =$con->query($query);
    
    if ($result->num_rows) {
        session_start();
        $_SESSION['valid_user'] = $username;
        echo  $_SESSION['valid_user'];
    };
    //关闭数据库
    $con->close();
};
