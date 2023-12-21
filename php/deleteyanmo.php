<?php

    //连接数据库库
    $con = new mysqli("localhost", "lixu", "1801023", "Dgs");
    if (mysqli_connect_errno()) {
        echo '<p>Error:Could not connect to database<br/> Please try again later</p>';
        exit;
    } ;
    //设置插入条件并执行
    $query = "delete from yanmo ";
    $result = mysqli_query($con, $query);
   
    if ($result) {
        echo json_encode($result);
    };
    //关闭数据库
    $con->close();