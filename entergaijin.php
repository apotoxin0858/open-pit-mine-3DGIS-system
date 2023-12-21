<?php
   session_start();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no">
    <title>鞍山大孤山3D GIS系统</title>
    <!-- easyui组件引入 -->
    <script src="./js/jquery.min.js"></script>
    <script type="text/javascript" src="./js/jquery.easyui.min.js"></script>
    <link rel="stylesheet" type="text/css" href="./css/easyui.css">
    <link rel="stylesheet" type="text/css" href="./css/icon.css">
    <link href="./css/style.css" rel="stylesheet">
    <link rel="stylesheet" type="text/css" href="./css/eightth.css">
    <link rel="stylesheet" type="text/css" href="./css/predict.css">
    <link rel="stylesheet" type="text/css" href="./css/minecss.css">
    <!-- 千万要注意这个必须放在require.min.js是前面---血的教训-->
    <script src="./js/echarts.min.js"></script>
    <script src="./dist/table2excel.js"></script>
    <!-- 出场按钮设计以及加载设计 -->
    <link href="./diycss/container.css" rel="stylesheet">
    <link href="./css/buttonEffect.css" rel="stylesheet">
    <link href="./css/loadingstyle.css" rel="stylesheet">
    <link href="./css/yanmofenxi.css" rel="stylesheet">
    <link href="./diycss/imgmenu.css" rel="stylesheet">
    <!-- webgl必要加载设计 -->
    <link href="../Build/Cesium/Widgets/widgets.css" rel="stylesheet">
    <!-- 界面导航UI设计插件 -->
    <link href="./css/bootstrap.min.css" rel="stylesheet">
    <link href="./css/pretty.css" rel="stylesheet">
    <script src="./js/supermap/SuperMap.Include.js"></script>
    <script src="./js/bootstrap.min.js"></script>
    <script src="./js/bootstrap-select.min.js"></script>
    <script src="./js/config.js"></script>
    <script type="text/javascript" src="./js/require.min.js" data-main="js/main"></script>
    <script src="./js/spectrum.js"></script>
    <script src="./js/slider.js"></script>
    <script src="./js/Convert.js"></script>
    <script src="./js/prefixfree.min.js"></script>
    <!-- <script src='./js/jquery.js'></script> -->
    <script src="./js/index.js"></script>
    <!-- <script src="./jsfun/jquery-accordion-menu.js"></script> -->
     <!-- 功能函数的设计 -->
    <!-- 1.漫游 -->
   <!--  <script src="./loadDem.js"></script> -->
     <script src="./load.js"></script>
     <!-- <script src="./jianceMenu.js"></script> -->
    <script src="./routeFly.js"></script>
      <!-- 2.淹没 -->
      <script src="./ymfxzxFunction.js"></script>
      <script src="./ymfx_xunhuan.js"></script>
      <script src="./calculateCurrentHeight.js"></script>
      <script src="./echarts_allType.js"></script>
        <!-- 3.分区专设js文件 -->
    <script src="./showorHide.js"></script>
    <script src="./js/tooltip.js"></script>
        <!--  4.坡度坡向分析 -->
    <script src="./slopeFunction.js"></script>
       <!-- 勘探线 -->
    <script src="./kantanxianFunction.js"></script>
    <script src="./measureFunction.js"></script>
    <script src="./fenquFunction.js"></script>
    <script src="./shuxingchaxun.js"></script>
    <script src="./yinglichang.js"></script>
    <script src="./changeviewer.js"></script>
    <script src="./jiegoumian.js"></script>
    <script src="./poumian.js"></script>
    <script src="./boxClip.js"></script>
    <script src="./demProfile.js"></script>
    <script src="./addxiaopin.js"></script>
    <script src="./drawGeoly.js"></script>
    <script src="./shuiwenFunction.js"></script>
    <script src="./models.json"></script>
    <script src="./answerCard.js"></script>
    <script src="./huapoFunction.js"></script>
    <script src="./zuankong.js"></script>
    <script src="./dagushaninsar.js"></script>
    <script src="./guanjingtaichaxun.js"></script>
    <script src="./posuichaxun.js"></script>
    <script src="./dagushaninsar.js"></script>
    <script src="./chuancan.js"></script>
    <script src="./CCchaxun.js"></script>
    <script src="./position.js"></script>
    <script src="./kaiwa.js"></script>
    <!-- 监测点信息echarts -->
    <script src="./monitor1.js"></script>
    <script src="./monitor2.js"></script>
    <script src="./monitor3.js"></script>
    <script src="./weizhen.js"></script>
     <!-- diycss文件引入 -->
     <!-- 界面上端UI -->
    <link rel="stylesheet" type="text/css" href="./diycss/css_shuiwen/bootstrap-3.3.6/css/bootstrap.min.css">
    <!-- 水文分析UI -->
    <!-- <link rel="stylesheet" type="text/css" href="./diycss/css_shuiwen/zzsc-demo_imgup.css">
    <link rel="stylesheet" type="text/css" href="./diycss/css_shuiwen/style_imgup.css">
    <link href="./diycss/css_shuiwen/jquery-accordion-menu.css" rel="stylesheet" type="text/css" />
    <link href="./diycss/css_shuiwen/font-awesome.css" rel="stylesheet" type="text/css" /> --> -->
</head>

<style>
        .drawCur {
        cursor: url(./images/cur/draw.cur), auto;
        }  
        #split {
            position: fixed
        }
        #float {
            position: fixed;
        }
        .content {
            width: 260px;
            height: 600px;
            position: absolute;
            top: 20px;
            left: 20px
        }
        * {
            box-sizing: border-box;
            -moz-box-sizing: border-box;
            -webkit-box-sizing: border-box;
            margin:0;padding:0;list-style-type:none;
        }
        .filterinput {
            background-color: rgba(249, 244, 244, 0);
            border-radius: 15px;
            width: 90%;
            height: 30px;
            border: thin solid #FFF;
            text-indent: 0.5em;
            font-weight: bold;
            color: #FFF;
        }
        #demo-list a {
            overflow: hidden;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            white-space: nowrap;
            width: 100%;
        }
</style>

<body>
<script type="text/javascript" src="./funjs.js">
window.onload = function() {
window.addEventListener('message', function (e) {
    var info = e.data;
    revive(info);
});
};
</script>
<?php
    echo '<div id="cesiumContainer"></div><div id="loadingbar" class="spinner"> <div class="spinner-container container1"> <div class="circle1"></div> <div class="circle2"></div> <div class="circle3"></div> <div class="circle4"></div> </div> <div class="spinner-container container2"> <div class="circle1"></div> <div class="circle2"></div> <div class="circle3"></div> <div class="circle4"></div> </div> <div class="spinner-container container3"> <div class="circle1"></div> <div class="circle2"></div> <div class="circle3"></div> <div class="circle4"></div></div></div><ul id="daohang" class="nav-bar"><li id="first" class="level-one selected" style="background-image: url(./images/flynav.png); background-size: cover "><ul class="level-two">漫游飞行</ul></li><li id="second" class="level-one selected" style="background-image: url(./images/yanmo.png); background-size: cover "><ul class="level-two">淹没分析</ul></li><li id="third" class="level-one selected" style="background-image: url(./images/dizhi.png); background-size: cover "><ul class="level-two">地质信息</ul></li><li id="forth" class="level-one selected" style="background-image: url(./images/podu.gif); background-size: cover "><ul class="level-two">坡度分析</ul></li><li id="fifth" class="level-one selected" style="background-image: url(./images/jiance.png); background-size: cover "><ul class="level-two">监测信息</ul></li><li id="sixth" class="level-one selected" style="background-image: url(./images/huanjing.png); background-size: cover "><ul class="level-two">环境治理</ul></li><li id="seventh" class="level-one selected" style="background-image: url(./images/bianpo.png); background-size: cover "><ul class="level-two">边坡分析</ul><li id="eightth" class="level-one selected" style="background-image: url(./images/alerthuapo.png); background-size: cover "><ul class="level-two">滑坡预警</ul></li><li id="settings" class="level-one selected" style="background-image: url(./images/settings.png); background-size: cover "><ul class="level-two">选项</ul></li></ul><script type="text/javascript"> </script></script><script>
            $("#daohang").hover(function(){
                $("#daohang").stop().css("animation-name", "leftright");
            },function(){
                $("#daohang").stop().css("animation-name", "rightleft");
            }
        );
            </script>';
            //连接数据库库
    $con = new mysqli("localhost", "lixu", "1801023", "Dgs");
    if (mysqli_connect_errno()) {
        echo '<p>Error:Could not connect to database<br/> Please try again later</p>';
        exit;
        } ;
    //设置更新条件并执行
    $date = date('Y-m-d H:i:s', time());
    $query = "update users set lasttime ='".$date."' where username ='". $_SESSION['valid_user']."'";
    $result = mysqli_query($con, $query);
    $con->close();            
    ?>
</body>