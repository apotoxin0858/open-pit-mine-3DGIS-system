<?php
    header("Content-type: text/html; charset=utf-8"); 
    date_default_timezone_set("PRC");
    $conn = mysqli_connect("localhost", "lixu", "1801023", "Dgs");
    if (!$conn) {
        die("Connection failed: " . mysqli_connect_error());
    }
    $startdate = $_POST['startdate'];
    $stopdate = $_POST['stopdate'];
    mysqli_query($conn,"set name utf-8");
    if($stopdate == null){
        $showdate = date("Y-m-d");
        $sql = "SELECT id, TdN, datetime FROM monitornow WHERE ((date(datetime) >= '$startdate')and(date(datetime) <= '$showdate')) order by ID DESC";
    }else{
        $sql = "SELECT id, TdN, datetime FROM monitornow WHERE ((date(datetime) >= '$startdate')and(date(datetime) <= '$stopdate')) order by ID DESC";
    }
    $retval = mysqli_query($conn, $sql);
    $num = mysqli_num_rows($retval);

    $result = array();
    for($i=0;$i<$num;$i++){
        $result[$i]=mysqli_fetch_assoc($retval);
    }
    echo json_encode($result);
    mysqli_close($conn);
?>