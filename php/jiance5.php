<?php

    //连接数据库库
    $con = new mysqli("localhost", "lixu", "1801023", "Dgs");
    if (mysqli_connect_errno()) {
        echo '<p>Error:Could not connect to database<br/> Please try again later</p>';
        exit;
    } ;
    //设置查询条件并执行
    $query = "select id,TdN,Datatime,rate from monitor5 where id>0";
    $result =$con->query($query);
    $myrow=mysqli_fetch_all($result);
    echo json_encode($myrow);
    //关闭数据库
    $con->close();