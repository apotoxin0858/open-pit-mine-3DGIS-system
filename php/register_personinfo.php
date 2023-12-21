<?php

    //存储变量
    $registername = $_POST['registername'];
    $realname = $_POST['realname'];
    $password = $_POST['password'];
    $phone = $_POST['phone'];
    $company = $_POST['company'];
    $email = $_POST['email'];
    // $date = date('Y-m-d H:i:s', time());
    //向页面中展示相关信息
    echo '<h1>当前用户注册信息如下</h1>';
    echo '<p>注册账号：'.$registername.'</p>';
