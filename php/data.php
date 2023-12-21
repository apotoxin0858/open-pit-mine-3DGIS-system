
<?php

if (empty($_POST['time'])) {
    exit();
}

set_time_limit(0);//无限请求超时时间

$i=0;

while (true) {
    sleep(1);    //延迟一秒

    $i++;

    //若得到数据则马上返回数据给客服端，并结束本次请求

    $rand=rand(1, 999);

    if ($rand<=15) {
        $arr=array('status'=>"1",'name'=>'success','text'=>$rand);

        echo json_encode($arr);

        exit();
    }

          

    //到指定超时时间还未返回数据则断开连接

    if ($i==$_POST['time']) {
        $arr=array('status'=>"0",'name'=>'error','text'=>'无数据');

        echo json_encode($arr);

        exit();
    }
}

?>
