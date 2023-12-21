<?php

    //存储变量
    $height = (int)$_POST['height'];
    $fillVolume =(int) $_POST['fillVolume'];
    $fillArea =(int) $_POST['fillArea'];
    $speed = (int) $_POST['speed'];
    // $height =(int)$height;
    // $fillVolume =(double)$fillVolume;
    // $fillArea = (double)$fillArea;
    //连接数据库库
    $con = new mysqli("localhost", "lixu", "1801023", "Dgs");
    if (mysqli_connect_errno()) {
        echo '<p>Error:Could not connect to database<br/> Please try again later</p>';
        exit;
    } ;
    //设置插入条件并执行
    $query = "insert into yanmo (height,fillVolume,fillArea,speed) values ('$height','$fillVolume','$fillArea','$speed')";
    $result = mysqli_query($con, $query);
    if ($result) {
        echo json_encode($result);
    };
    //关闭数据库
    $con->close();
