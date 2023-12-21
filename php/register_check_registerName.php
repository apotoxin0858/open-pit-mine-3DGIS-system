<?php

if (isset($_POST['registername'])) {
    //存储变量
    $registername = $_POST['registername'];
    //连接数据库库
    $con = new mysqli("localhost", "lixu", "1801023", "Dgs");
    if (mysqli_connect_errno()) {
     echo '<p>Error:Could not connect to database<br/> Please try again later</p>';
     exit;
    } ;
    //设置查询条件并执行
    $query = "select * from users where username ='".$registername."'";
    $result =$con->query($query);
    if ($result->num_rows) {
        echo json_encode($result);
    };
    //关闭数据库
    $con->close();
};
