<?php

    //存储变量
    $registername = $_POST['registername'];
    $realname = $_POST['realname'];
    $password = $_POST['password'];
    $phone = $_POST['phone'];
    $company = $_POST['company'];
    $email = $_POST['email'];
    $date = date('Y-m-d H:i:s', time());
    // $date = datadate('Y-m-d H:i:s');
    //连接数据库库
    $con = new mysqli("localhost", "lixu", "1801023", "Dgs");
    if (mysqli_connect_errno()) {
     echo '<p>Error:Could not connect to database<br/> Please try again later</p>';
     exit;
    } ;
    //设置插入条件并执行
    $query = "insert into users (username,realname,company,phone,password,registertime) values ('$registername','$realname','$company','$phone','$password','$date')";
    $result = mysqli_query($con, $query);
   
    if ($result) {
        echo '<h1>当前用户注册信息如下</h1>';
        echo '<p>注册账号：'.$registername.'</p>';
        echo json_encode($result);
    };
    //关闭数据库
    $con->close();
