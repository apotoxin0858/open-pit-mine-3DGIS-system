
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script type="text/javascript" src="./jsdlzc/easyui/jquery.min.js">
    </script>
    <script type="text/javascript" src="./jsdlzc/easyui/jquery.easyui.min.js">
    </script>
    <script type="text/javascript" src="./jsdlzc/easyui/locale/easyui-lang-zh_CN.js">
    </script>
    <link rel="stylesheet" type="text/css" href="./jsdlzc/easyui/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="./jsdlzc/easyui/demo/demo.css">
    <link rel="stylesheet" type="text/css" href="./jsdlzc/easyui/themes/icon.css">
    <link rel="stylesheet" type="text/css" href="./jsdlzc/easyui/themes/color.css">


    <script type="text/javascript" src="./js/require.min.js" data-main="js/main"></script>
    <script src="./js/config.js"></script>
    <script src="./js/supermap/SuperMap.Include.js"></script>
    <script src="./js/spectrum.js"></script>

    <link href="../Build/Cesium/Widgets/widgets.css" rel="stylesheet">
    <link href="./css/pretty.css" rel="stylesheet">
    <style>
        body {
            background-repeat: no-repeat;
            background-size: cover;
        }
    </style>

    <title>注册界面</title>

</head>

<body background="./images/背景图01.jpg">
   
    <?php
    session_start();
    if (isset($_SESSION['valid_user'])) {
        echo ' <div id="zc" style="padding :0px 40px"> <br> <p>注册账户： <input id="user" type="text" style="border: 1px solid #95B8E7;border-radius: 5px 5px 5px 5px;width: 147px;height: 30px"></p> <p>真实姓名： <input id="realname" type="text" style="border: 1px solid #95B8E7;border-radius: 5px 5px 5px 5px;width: 147px;height: 30px"></p> <p>电&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp话： <input id="phone" type="text" style="border: 1px solid #95B8E7;border-radius: 5px 5px 5px 5px;width: 147px;height: 30px"></p> <p>公司单位： <input id="company" type="text" style="border: 1px solid #95B8E7;border-radius: 5px 5px 5px 5px;width: 147px;height: 30px"></p> <p>电子邮件： <input id="email" type="text" style="border: 1px solid #95B8E7;border-radius: 5px 5px 5px 5px;width: 147px;height: 30px"></p> <p>密&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp码： <input id="pw1" type="password" style="border: 1px solid #95B8E7;border-radius: 5px 5px 5px 5px;width: 147px;height: 30px"></p> <p>确认密码： <input id="pw2" type="password" style="border: 1px solid #95B8E7;border-radius: 5px 5px 5px 5px;width: 147px;height: 30px"></p>  <div id="btn" style="text-align:center"> <button id="register"> 注册提交</button> </div> </div>   <script type="text/javascript" src="./jsdlzc/register.js"></script>';
    }else{
        
        echo '<script type="text/javascript"> $("body").css("background-image","url(./images/大孤山01.jpg)");  $.messager.alert("警告", "页面将在5s后跳转到登录界面", "warning"); $(".panel-tool").css({"top" :"16px"});</script>';
        echo '<div style="position: absolute;top: 200px;left: 40%" > <p style="font-size: 20px;font-weight: bolder"> 禁止非法注册，注册功能仅为管理员开放</p></div>';
        echo '<meta http-equiv="refresh" content="5;url=./index.html">';
    };

   ?>

</body>

</html>