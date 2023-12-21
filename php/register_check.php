<?php
session_start();
if (isset($_POST['username']) && isset($_POST['password'])) {
    //存储变量
    $username = $_POST['username'];
    $password = $_POST['password'];
    // else if(strlen($user)<0){
    //     echo '用户名不能为空';
    //     exit;
    // }
    // else if(strlen($psd)<0){
    //     echo '密码不能为空';
    //     exit;
    // }
   
    //连接数据库库
    $con = new mysqli("localhost", "lixu", "1801023", "Dgs");
    if (mysqli_connect_errno()) {
     echo '<p>Error:Could not connect to database<br/> Please try again later</p>';
     exit;
    } ;
    //设置查询条件并执行
    $query = "select * from users where username ='".$username."' and password = '".$password."'";
    $result =$con->query($query);
    if (mysqli_fetch_array($result)['username'] == 'lixu') {
        $_SESSION['valid_user'] = $username;
        echo 'hahahaha';
        echo json_encode($result);
    };
    //关闭数据库
    $con->close();
};
