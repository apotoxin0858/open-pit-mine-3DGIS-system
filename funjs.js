function onload(Cesium) {
    $('#loadingbar').remove();//移除加载圈
    //进行初始化定义场景
    var viewer = loadDemYx();
    $(".cesium-viewer-animationContainer").hide();
    var scene = viewer.scene;
    handler = new Cesium.ScreenSpaceEventHandler(scene.canvas)
    addEntity_geometry(viewer, 'dagushanproject', 'road', 'entity_road');
    addEntity_geometry(viewer, 'dagushanproject', 'duanceng', 'duanceng');
    addEntity_geometry(viewer, 'dagushanproject', 'TopLine', 'slopeline');
    $('.cesium-viewer-bottom').remove();
    $('.cesium-viewer-navigationContainer').remove();
    var weather = '<div style="position: absolute;top: 5px;right:6%;height:80px;width:auto;background:#fff;border-radius: 20px;z-index:10"><<iframe width="320" height="85" frameborder="0" scrolling="no" hspace="0" src="https://i.tianqi.com/?c=code&a=getcode&id=6&py=anshan&icon=1"></iframe></div>';
    $(weather).appendTo('body');
      //加载kml图层
    //   viewer.scene._globe.depthTestAgainstTerrain=false;
     viewer.dataSources.add(Cesium.KmlDataSource.load('./kml/biaogao.kml',{
        camera : viewer.scene.camera,
        canvas : viewer.scene.canvas
    })).then(function(dataSource){
    //云平台联动代码
    $(function(){
        window.addEventListener('message', function (e) {
            var info = e.data;
            changeViewerCG(scene,info);
        });
    });
//     var transition = '<div style="position:absolute;top:17px;right:15.5%;" class="containers_one"><input id="text" type="text" value="" /><button class="btn btn-primary" id="send" >发送消息</button></div>';
//     $(transition).appendTo('body');
//     $(function(){
//         var receiver = document.getElementById('receiver').contentWindow;
//         var btn = document.getElementById('send');
//         btn.addEventListener('click', function (e) {
//         e.preventDefault();
//         var val = document.getElementById('text').value;
//         receiver.postMessage(val, "http://www.enterdata.cn:40182/neu/bi.html");
//     })
// });
//云平台联动   end！ 
    //1——li click设计
    var firstMenu = '<div id="firstMenu" style="display:none"><div id="firstContainer"  style="position:absolute;top:63px;left:0px;"> <div id="first_mainmenu" style="position:fixed;background-image:url(./images/splitShow.gif); width: 13px;height: 72px;top: 70px" title="功能模块"></div> <div id="fly" style="background-image:url(./images/lantian.jpg); background-size: cover;width: 250px;text-align :center;width:300px;height:200px"><span type="button" id="play" class=" button black" title="开始"></span> <span type="button" id="pause" class="button black" title="暂停"></span> <span type="button" id="stop" class="button black" title="停止"></span> <div class="selectBox"><select id="buildings" class="form-control" style="width: 90%;font-size: 20px;font-family:"仿宋";"aria-placeholder="请选择查看的标志物"> <optgroup style="color:rgb(216, 54, 231);" id="jianzhu" label="标志建筑物"> <option style="color:rgb(216, 54, 231);" value="01">大孤山行政办公楼</option> <option style="color:rgb(216, 54, 231);" value="02">大孤山水站</option> <option style="color:rgb(216, 54, 231);" value="03">大孤山工作区</option> <option style="color:rgb(216, 54, 231);" value="04">破碎站</option> <option style="color:rgb(216, 54, 231);" value="05">大孤山尾矿坝</option> <option style="color:rgb(216, 54, 231);" value="06">大孤山排土场</option><option style="color:rgb(216, 54, 231);" value="07">大孤山选厂</option><option style="color:rgb(216, 54, 231);" value="08">大孤结构面监测点</option> </optgroup> </select> </div> <div class="divider"> <div class="param-item"> <label style=" color: red;" for="bloomShow">开启HDR</label> <input type="checkbox" id="openHDR" checked> </div> </div><div class="divider"> <div class="param-item"><button type="button" id="positionSearch" class="btn btn-primary" style="color: yellow; border-radius: 10px;">坐标点查询</button><button type="button" id="clearSearch" class="btn btn-primary" style="color: yellow; border-radius: 10px;">查询清除</button></div> </div></div></div>';
//第一个菜单，单击后出现的效果
    $('#first').click(function() {
        viewer.entities.removeAll(); 
        addEntity_geometry(viewer, 'dagushanproject', 'road', 'entity_road');
        addEntity_geometry(viewer, 'dagushanproject', 'duanceng', 'duanceng');
        addEntity_geometry(viewer, 'dagushanproject', 'TopLine', 'slopeline');
        dataSource.show = true;
        var entityIds = ['xiexingti_1'];
        removeEntity_byids(viewer, entityIds);
      //其余菜单全部移除
        $('#secondMenu').remove();
        $("#thirdMenu").remove();
        $('#forthMenu').remove();
        $('#fifthMenu').remove();
        $("#sixthMenu").remove();
        $('#seventhMenu').remove();
        $('#settingsMenu').remove();
        $('#eightthMenu').remove();
        $('#fifthdes').remove();
        $("#ninethMenu").remove();
     //二次单击后移除
        if ($("#firstMenu").length > 0) {
            $("#firstMenu").remove();
        };
        var infobubble = '<blockquote id="bubble2" class="bubble" ><video id="shipin"  width="100%" height="100%"controls="controls" autoplay ></video><img id="tupian"  width="800px" height="auto"><h2 id="title"></h2><p id="miaoshu" class="word"></p>';
        $(infobubble).appendTo('body');
        //第一个功能菜单加入主体
        $(firstMenu).appendTo('body');
        $('#firstMenu').show();
        viewer.scene.globe.enableLighting = false;
        event_manYou();
    });
    function event_manYou() {
        //如果单击第一个菜单左上按钮，将会隐藏
        $("body").on('click', "[id='first_mainmenu']", function() {
            if (!$("#fly").is(":animated")) {
                $("#fly").slideToggle(300);
            };
        });
        $("body").on('input change', "[id='openHDR']", function() {
            scene.hdrEnabled = this.checked;
        });
        $('#positionSearch').click(function(){
            position(viewer,scene,handler)
        })
        $('#clearSearch').click(function(){
            clearPosition(handler)
        })
        routeFly(viewer, scene);
        changeViewer(scene);
        BIMchaxun(viewer,scene);
    };
     //2——li click设计
   var secondMenu = '<div id="secondMenu" style="display:none"> <div id="second_mainmenu" style="position:fixed;background-image:url(./images/splitShow.gif); width: 13px;height: 72px;top: 70px" title="功能模块"></div> <div id="float" style="background-image:url(./images/sea.jpg);height: auto;top: 75px;left: 1.5%;opacity: 1;width:230px"> <span title="关闭" id="closeMenuSecond" style="position:absolute;top: 5px;left:200px;"> <img src="./images/close.gif" style="height: 5%;width: 9%"> </span> <div id="setingBarZ" style="padding: 10px 0px 5px 0px"><div class="form-group"><input id="maxHeightZ" value="669" required="required" class="form-control" /><label class="form-label">最大高度(米) :</label></div><div class="form-group"><input id="speedZ" value="90000000" required="required" class="form-control" /><label class="form-label">淹没速度(米) :</label></div> </div> <div style="margin-left: 40px;"><button type="button" id="beginZ" class="btn btn-primary">开始</button><button type="button" id="drawF" class="btn btn-primary">清除</button></div> <div class="divider" style="color:black;opacity: 1; margin:0px"></div> <div id="setingBarF" style="padding: 10px 0px 5px 0px"> <div class="form-group"><input id="maxHeightF" value="669" required="required" class="form-control" /><label class="form-label">最大高度 (m) :</label></div> <div class="form-group"><input id="minHeightF" value="159" required="required" class="form-control" /><label class="form-label">最小高度 (m) :</label></div> <div class="form-group"><input id="intervalF" value="20" required="required" class="form-control" /><label class="form-label">间隔量 (m):</label></div> </div>  <div class="divider" style="color:black;opacity: 1; margin:0px"></div> <div id="setingBarF" style="padding: 10px 0px 5px 0px"> <div class="form-group"><input id="speed_ini" value="17000000" required="required" class="form-control" /><label class="form-label">初始速度(m³/y):</label></div> <div class="form-group"><input id="speed_zf" value="0.7" required="required" class="form-control" /><label class="form-label">蒸发速度(m³/y):</label></div> </div>  <div> <button type="button" id="beginF" class="btn btn-primary">开始</button> <button type="button" id="clearF" class="btn btn-primary">绘图</button> <button type="button" id="delet" class="btn btn-primary">清除</button></div> </div> </div> <div id="clockZ" class="wrapper"> <p id="jishiqiZ">计时器</p><img id="imgZ" src="./images/clock.gif" height="80%" width="80%"> <p id="mytimeZ"></p> <p id="allTimeZ"></p> </div></div>';
   $('#second').click(function() {
    viewer.entities.removeAll(); 
    dataSource.show = true;
    var entityIds = ['xiexingti_1'];
    removeEntity_byids(viewer, entityIds);
    $('#eightthMenu').remove();
    $('#fifthMenu').remove();
    $('#firstMenu').remove();
    $("#thirdMenu").remove();
    $('#forthMenu').remove();
    $("#sixthMenu").remove();
    $('#seventhMenu').remove();
    $("#eightthMenu").remove();
    $('#settingsMenu').remove();
    $("#infobubble").remove();
    $('#fifthdes').remove();
    $("#ninethMenu").remove();
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    if ($("#secondMenu").length > 0) {
        $("#secondMenu").remove();
    };
    $(secondMenu).appendTo('body');
    $("#secondMenu").show();
    $('#mainButton').css('animation-name', 'rightleft');
    $('.nav-bar').css('animation-name', 'rightleft');
    //启动相应的功能
    viewer.scene.globe.enableLighting = false;
    event_yanmofenXi();
});
function event_yanmofenXi() {
    $("body").on('click', "[id='second_mainmenu']", function() {
        if (!$("#float").is(":animated")) {
            $("#float").slideToggle(500);
        };
    });
    $("body").on('click', "[id='closeMenuSecond']", function() {
        $("#secondMenu").hide();
        $('#secondMenu').remove();
    });
    yanmofenxiZ(viewer);
    calculate(viewer);
    };
        //3——li click设计
    var thirdMenu = '<div id="thirdMenu" style="display: none"><table id="table_show" class="containers_tableOne containers_one_position containers_tableOne_animation" style="height:auto;width: auto;max-width: 630px;"> <tr> <td> <div id="showModelsButton_dizhi" class="containers_one" style="border-style: none ;border-radius: 50%;;background-image: url(./images/dizhicaidan.png); background-size: cover; width:100px;height:100px"></div><td> <div id="showModels_dizhi" class="containers_one"  style="border-radius: 10%"> <fieldset><fieldset><legend>地质层次</legend>地质模型<input type="checkbox" id="openPit" name="show" value="infodagushan@infotest"> 地形影像 <input type="checkbox" id="dem" name="show" value="MathAnalystResult_1@dixing" checked>勘探线<input type="checkbox" id="kantanxian" name="show" value="kantanxian">边坡分区 <input type="checkbox" id="fenqu" name="show" value="fenqu">断层<input type="checkbox" id="duanceng" name="show" value="duanceng" checked>地形数据<input type="checkbox" id="TerrainOSGBnew" name="show" value="TerrainOSGBnew">滑坡面<input type="checkbox" id="huapo" name="show" value="huapo">钻孔<input type="checkbox" id="zuankong" name="show" value="zuankong"></fieldset><br><fieldset><legend>模拟层次</legend>应力场（comsol）<input type="checkbox" id="sigmaxxx" name="show" value="sigmaxxx">X方向应变<input type="checkbox" id="sigmaxxx" name="show" value="Xstrain">Z方向应变<input type="checkbox" id="sigmaxxx" name="show" value="Zstrain">中间主应力<input type="checkbox" id="sigmaxxx" name="show" value="middlestress">最大主应力<input type="checkbox" id="sigmaxxx" name="show" value="maxstress"><br>最小主应力<input type="checkbox" id="sigmaxxx" name="show" value="minstress"></fieldset><br><fieldset><legend>运输层次</legend>矿石运输路线<input type="checkbox" id="yunshu_1" name="show" value="yunshu_1">碎石运输路线<input type="checkbox" id="yunshu_2" name="show" value="yunshu_2">运输线路3（坑底到-258到-78排水泵房）<input type="checkbox" id="yunshu_3" name="show" value="yunshu_3"><br>四期井口皮带廊道<input type="checkbox" id="xijingpidai" name="show" value="hangdao"><fieldset></fieldset> <br> </div> </td> </tr> </table><div class="params-setting-container" > <div id="third_mainmenu"  class="params-setting-anchor" style="background-image:url(./images/suofang.png); background-size: cover;" title="显示/隐藏参数面板"><span class="fui-expand"></span></div> <div id="third_caidan" class="params-setting" style="background-image:url(./images/fy02.jpg); background-size: cover;max-width:300px; padding: 0px 5px 5px 5px;"> <span title="关闭" id="closeMenuThird" style="position:absolute;top: 0px;left:270px;"> <img src="./images/close.jpg" style="height: 7%;width: 7%"> </span> <fieldset> <legend style="color: khaki"> 剖面分析功能</legend> <div class="param-item" style="border-width: 2px;border-style:dashed;"> <button type="button" id="profile" class="btn btn-primary" style="color: yellow; border-radius: 10px;">剖面分析</button> <button type="button" id="clear" class="btn btn-primary" style="color: yellow; border-radius: 10px;">清除</button> </div> </fieldset> <fieldset> <legend style="color: khaki"> 测量分析功能</legend> <div class="param-item" style="border-width: 2px;border-style:dashed"> <button type="button" id="distance" class="btn btn-success" style="color: yellow; border-radius: 10px;">测距</button> <button type="button" id="area" class="btn btn-success" style="color: yellow; border-radius: 10px;">测面</button> <button type="button" id="height" class="btn btn-success" style="color: yellow; border-radius: 10px;">测高</button> <button type="button" id="clear" class="btn btn-success" style="color: yellow; border-radius: 10px;">清除</button> </div> </fieldset></div> </div><canvas style="position : absolute; left : 50%; bottom : 50%;background-color:rgba(65, 65, 65, 0.5)" id="pro" height="0" width="0"></canvas></div>';
    $('#third').click(function() {
        viewer.entities.removeAll(); 
        addEntity_geometry(viewer, 'dagushanproject', 'road', 'entity_road');
        addEntity_geometry(viewer, 'dagushanproject', 'duanceng', 'duanceng');
        addEntity_geometry(viewer, 'dagushanproject', 'TopLine', 'slopeline');
        var entityIds = ['xiexingti_1'];
        removeEntity_byids(viewer, entityIds);
        $('#fifthMenu').remove();
        $("#firstMenu").remove();
        $('#secondMenu').remove();
        $('#forthMenu').remove();
        $("#sixthMenu").remove();
        $('#seventhMenu').remove();
        $('#settingsMenu').remove();
        $('#eightthMenu').remove();
        $('#fifthdes').remove();
        $("#ninethMenu").remove();
        if ($("#thirdMenu").length > 0) {
            $("#thirdMenu").remove();
        };
        $(thirdMenu).appendTo('body');
        $('#thirdMenu').show();
        viewer.scene.globe.enableLighting = false;
        var lable = '<div id="bubble" class="bubble" style="bottom:0;left:82%;display:none;max-height:445px"> <div id="tools" style="text-align : right"> <span style="color: rgb(95, 74, 121);padding: 5px;position: absolute;left: 10px;top: 4px;">对象信息</span> <span class="fui-cross" title="关闭" id="close" style="color: darkgrey;padding:5px"></span> </div> <div style="overflow-y:scroll;max-height:400px" id="tableContainer"> <table id="tab"></table> </div> </div>';
        $(lable).appendTo('#thirdMenu');
        if ($(".twipsy").length > 0) {
            $(".twipsy").remove();
        };
        event_dizhiInfo();
        profile(viewer);
        celiang(viewer);
        function celiang(viewer){
            viewer.enableCursorStyle = false;
            var clampMode = 0; // 空间模式
                    var scene = viewer.scene;
                    var widget = viewer.cesiumWidget;
                    var handlerDis,handlerArea,handlerHeight;
                    //初始化测量距离
                    handlerDis = new Cesium.MeasureHandler(viewer,Cesium.MeasureMode.Distance,clampMode);
                    //注册测距功能事件
                    handlerDis.measureEvt.addEventListener(function(result){
                        var dis = Number(result.distance);
                        var distance = dis > 1000 ? (dis/1000).toFixed(2) + 'km' : dis.toFixed(2) + 'm';
                        handlerDis.disLabel.text = '距离:' + distance;
                        
                    });
                    handlerDis.activeEvt.addEventListener(function(isActive){
                        if(isActive == true){
                            viewer.enableCursorStyle = false;
                            viewer._element.style.cursor = '';
                            $('body').removeClass('measureCur').addClass('measureCur');
                        }
                        else{
                            viewer.enableCursorStyle = true;
                            $('body').removeClass('measureCur');
                        }
                    });
            
                    //初始化测量面积
                    handlerArea = new Cesium.MeasureHandler(viewer,Cesium.MeasureMode.Area,clampMode);
                    handlerArea.measureEvt.addEventListener(function(result){
                        var mj = Number(result.area);
                        var area = mj > 1000000 ? (mj/1000000).toFixed(2) + 'km²' : mj.toFixed(2) + '㎡'
                        handlerArea.areaLabel.text = '面积:' + area;
                    });
                    handlerArea.activeEvt.addEventListener(function(isActive){
                        if(isActive == true){
                            viewer.enableCursorStyle = false;
                            viewer._element.style.cursor = '';
                            $('body').removeClass('measureCur').addClass('measureCur');
                        }
                        else{
                            viewer.enableCursorStyle = true;
                            $('body').removeClass('measureCur');
                        }
                    });
                    //初始化测量高度
                    handlerHeight = new Cesium.MeasureHandler(viewer,Cesium.MeasureMode.DVH);
                    handlerHeight.measureEvt.addEventListener(function(result){
                        var distance = result.distance > 1000 ? (result.distance/1000).toFixed(2) + 'km' : result.distance + 'm';
                        var vHeight = result.verticalHeight > 1000 ? (result.verticalHeight/1000).toFixed(2) + 'km' : result.verticalHeight + 'm';
                        var hDistance = result.horizontalDistance > 1000 ? (result.horizontalDistance/1000).toFixed(2) + 'km' : result.horizontalDistance + 'm';
                        handlerHeight.disLabel.text = '空间距离:' + distance;
                        handlerHeight.vLabel.text = '垂直高度:' + vHeight;
                        handlerHeight.hLabel.text = '水平距离:' + hDistance;
                    });
                    handlerHeight.activeEvt.addEventListener(function(isActive){
                        if(isActive == true){
                            viewer.enableCursorStyle = false;
                            viewer._element.style.cursor = '';
                            $('body').removeClass('measureCur').addClass('measureCur');
                        }
                        else{
                            viewer.enableCursorStyle = true;
                            $('body').removeClass('measureCur');
                        }
                    });
            
                    $('#distance').click(function(){
                        deactiveAll();
                        handlerDis && handlerDis.activate();
                        console.log("1");
                    });
            
                    $('#area').click(function(){
                        deactiveAll();
                        handlerArea && handlerArea.activate();
                        console.log("2");
                    });
                    $('#height').click(function(){
                        deactiveAll();
                        handlerHeight && handlerHeight.activate();
                        console.log("3");
                    });
                    $('#clear').click(function(){
                        clearAll();
                        console.log("4");
                    });
                    if(!scene.pickPositionSupported){
                        alert('不支持深度拾取,量算功能无法使用(无法进行鼠标交互绘制)！');
                    }
                    function clearAll(){
                        handlerDis  && handlerDis.clear();
                        handlerArea  && handlerArea.clear();
                        handlerHeight && handlerHeight.clear();
                    }
            
                    function deactiveAll(){
                        handlerDis  && handlerDis.deactivate();
                        handlerArea  && handlerArea.deactivate();
                        handlerHeight && handlerHeight.deactivate();
                    }
        }
    });
    function event_dizhiInfo() {
        $("body").on('click', "#showModelsButton_dizhi", function(e) {
            if (!$("#showModels_dizhi").is(":animated")) {
                $('#showModels_dizhi').animate({
                    height: 'toggle',
                    width: 'toggle',
                }, 500)
            };
            e.stopPropagation();
        });
        $("body").on('click', "#third_mainmenu", function() {
            if (!$("#third_caidan").is(":animated")) {
                $('#third_caidan').animate({
                    height: 'toggle',
                    width: 'toggle',
                }, 500)
            };
        });
        $("body").on('click', "[id='closeMenuThird']", function() {
            $("#thirdMenu").find('*').remove();
            $('#thirdMenu').remove();
            $("#thirdMenu").hide();
            $('#mainButton').css('animation-name', 'leftright');
            $('.nav-bar').css('animation-name', 'leftright');
        });
        $("body").on('change', "#showModels_dizhi input", function() {
            var checkboxResultArry = [];
            var checkboxArr = $('#showModels_dizhi input').toArray()
            for (var i = 0; i < checkboxArr.length; i++) {
                var optionResult = {};
                optionResult.name = checkboxArr[i].value;
                optionResult.bool = checkboxArr[i].checked;
                checkboxResultArry.push(optionResult);
            };
                  showOrHideObject_s3m(scene, checkboxResultArry,dataSource);
        });
        $("body").on('click', "#showModels_dizhi input[value='infodagushan@infotest']", function(e) {
            shuxingchaxun(viewer,scene);
            e.stopPropagation();
        });
        $("body").on('click', "#showModels_dizhi input[value='sigmaxxx']", function(e) {
            if ($("#showModels_dizhi input[value='sigmaxxx']").get(0).checked) {
                var imageryLayers = viewer.imageryLayers;
                var imageryProvidersigma = new Cesium.SuperMapImageryProvider({
                    url : 'http://localhost:8090/iserver/services/3D-dagushanjisuan/rest/realspace/datas/sigmaxxx'
                }); 
                var layer0 = imageryLayers.addImageryProvider(imageryProvidersigma);
                layer0.alpha = 0.8;
            } else {
                deleYx_Insar(viewer);
            };
            e.stopPropagation();
        });
        $("body").on('click', "#showModels_dizhi input[value='Xstrain']", function(e) {
            if ($("#showModels_dizhi input[value='Xstrain']").get(0).checked) {
                var imageryLayers = viewer.imageryLayers;
                var imageryProvidersigma = new Cesium.SuperMapImageryProvider({
                    url : 'http://localhost:8090/iserver/services/3D-dagushanjisuan/rest/realspace/datas/xstrain'
                }); 
                var layer1 = imageryLayers.addImageryProvider(imageryProvidersigma);
                layer1.alpha = 0.8;
                var img1 = '<div id="XS" style="position:absolute;bottom:30%;right:5%;"><img src="./simulation/Xstrain.jpg"></div>'
                $(img1).appendTo('body');
            } else {
                deleYx_Insar(viewer);
                $('#XS').remove();
            };
            e.stopPropagation();
        });
        $("body").on('click', "#showModels_dizhi input[value='Zstrain']", function(e) {
            if ($("#showModels_dizhi input[value='Zstrain']").get(0).checked) {
                var imageryLayers = viewer.imageryLayers;
                var imageryProvidersigma = new Cesium.SuperMapImageryProvider({
                    url : 'http://localhost:8090/iserver/services/3D-dagushanjisuan/rest/realspace/datas/Zstrain'
                }); 
                var layer2 = imageryLayers.addImageryProvider(imageryProvidersigma);
                layer2.alpha = 0.8;
                var img2 = '<div id="ZS" style="position:absolute;bottom:30%;right:5%;"><img src="./simulation/Zstrain.png"></div>'
                $(img2).appendTo('body');    
            } else {
                deleYx_Insar(viewer);
                $('#ZS').remove(); 
            };
            e.stopPropagation();
        });
        $("body").on('click', "#showModels_dizhi input[value='maxstress']", function(e) {
            if ($("#showModels_dizhi input[value='maxstress']").get(0).checked) {
                var imageryLayers = viewer.imageryLayers;
                var imageryProvidersigma = new Cesium.SuperMapImageryProvider({
                    url : 'http://localhost:8090/iserver/services/3D-dagushanjisuan/rest/realspace/datas/maxstress'
                }); 
                var layer3 = imageryLayers.addImageryProvider(imageryProvidersigma);
                layer3.alpha = 0.8;
                var img3 = '<div id="max" style="position:absolute;bottom:30%;right:5%;"><img src="./simulation/maxStress.jpg"></div>'
                $(img3).appendTo('body');  
            } else {
                deleYx_Insar(viewer);
                $('#max').remove(); 
            };
            e.stopPropagation();
        });
        $("body").on('click', "#showModels_dizhi input[value='minstress']", function(e) {
            if ($("#showModels_dizhi input[value='minstress']").get(0).checked) {
                var imageryLayers = viewer.imageryLayers;
                var imageryProvidersigma = new Cesium.SuperMapImageryProvider({
                    url : 'http://localhost:8090/iserver/services/3D-dagushanjisuan/rest/realspace/datas/minstress'
                }); 
                var layer4 = imageryLayers.addImageryProvider(imageryProvidersigma);
                layer4.alpha = 0.8;
                var img4 = '<div id="min" style="position:absolute;bottom:30%;right:5%;"><img src="./simulation/minStress.jpg"></div>'
                $(img4).appendTo('body');  
            } else {
                deleYx_Insar(viewer);
                $('#min').remove(); 
            };
            e.stopPropagation();
        });
        $("body").on('click', "#showModels_dizhi input[value='middlestress']", function(e) {
            if ($("#showModels_dizhi input[value='middlestress']").get(0).checked) {
                var imageryLayers = viewer.imageryLayers;
                var imageryProvidersigma = new Cesium.SuperMapImageryProvider({
                    url : 'http://localhost:8090/iserver/services/3D-dagushanjisuan/rest/realspace/datas/middlestress'
                }); 
                var layer5 = imageryLayers.addImageryProvider(imageryProvidersigma);
                layer5.alpha = 0.8;
                var img5 = '<div id="middle" style="position:absolute;bottom:30%;right:5%;"><img src="./simulation/middleStress.jpg"></div>'
                $(img5).appendTo('body');  
            } else {
                deleYx_Insar(viewer);
                $('#middle').remove(); 
            };
            e.stopPropagation();
        });
        $("body").on('click', "#showModels_dizhi input[value='fenqu']", function(e) {
            if ($("#showModels_dizhi input[value='fenqu']").get(0).checked) {
               var workspace = "dagushanproject";
                var datasource = "bianpofenqu";
                var dataset = " slopzone";
                addEntity_geometry(viewer, workspace, datasource, dataset);
                bpfenqu(viewer, scene, handler);
            } else {

                $('#thirdMenu #bubblebp').remove();
                var entityIds = ['fenqu_xbb', 'fenqu_nb', 'fenqu_db','fenqu_bb'];
                removeEntity_byids(viewer, entityIds);

            };
            e.stopPropagation();
        });
        $("body").on('click', "#showModels_dizhi input[value='huapo']", function(e) {
            if ($("#showModels_dizhi input[value='huapo']").get(0).checked) {
                var workspace = "dagushanproject";
                var datasource = "huapomian";
                var dataset = "huapo";
                addEntity_geometry(viewer, workspace, datasource, dataset);
                huapo(viewer, scene);
            } else {
                $('#thirdMenu #bubblehuapo').remove();
                var entityIds = ['huapo_1', 'huapo_2', 'huapo_3'];
                removeEntity_byids(viewer, entityIds);
            };
            e.stopPropagation();
        });
        $("body").on('click', "#showModels_dizhi input[value='kantanxian']", function(e) {
            if ($("#showModels_dizhi input[value='kantanxian']").get(0).checked) {
                var workspace = "dagushanproject";
                var datasource = "kantanxian";
                var dataset = " kantanxian";
                addEntity_geometry(viewer, workspace, datasource, dataset);

            } else {
                var entityIds = ['kantanxian_I', 'kantanxian_II', 'kantanxian_III', 'kantanxian_IV', 'kantanxian_V', 'kantanxian_VI', 'kantanxian_VII', 'kantanxian_VIII', 'kantanxian_IX', 'kantanxian_X', 'kantanxian_XI', 'kantanxian_XII'];
                removeEntity_byids(viewer, entityIds);
            };

            kantanxian(viewer, scene);
            e.stopPropagation();
        });
        $("body").on('click', "#showModels_dizhi input[value='zuankong']", function(e) {
            if ($("#showModels_dizhi input[value='zuankong']").get(0).checked) {
                console.log('aaa?');
                var zkkt ='<div id="zkkt" class="params-setting-container" style="height:100px;width: 230px;position:absolute;top:12%;left:14%;background-image:url(./images/lantian.jpg)"><div id="zuankong_anchor" class="params-setting-anchor" title="显示/隐藏参数面板"><span class="fui-expand"></span></div> <legend style="color: khaki;font-size: 15px"> 勘探线定位功能</legend> <div class="param-item" style="border-width: 2px;"> <select id="buildings" class="form-control" style="width: 100%;" aria-placeholder="请选择查看的标志物"> <optgroup label="勘探线编号"> <option value="09">XII号勘探线</option> <option value="10">XI号勘探线</option> <option value="11">X号勘探线</option> <option value="12">VI号勘探线</option> <option value="13">I号勘探线</option> <option value="14">VII号勘探线</option><option value="15">II号勘探线</option><option value="16">III号勘探线</option><option value="17">VIII号勘探线</option><option value="18">IV号勘探线</option><option value="19">IX号勘探线</option><option value="20">V号勘探线</option> </optgroup> </select> </div> </fieldset></div>'
                $(zkkt).appendTo('body');
                changeViewer(scene);
                var workspace = "dagushanproject";
                var datasource = "zuankong";
                var dataset = "zuankong";
                addEntity_geometry(viewer, workspace, datasource, dataset);
                zuankong(viewer, scene);
            } else {
                viewer.scene.bloomEffect.show = false;
                var entityIds = ['zk_a','zk_b','zk_c','zk_d','zk_e','zk_f','zk_g','zl_h','zk_i','zk_j','zk_k','zk_l','zk_m','zk_n','zk_p','zk_q','zk_r','zk_s','zk_t','zk_v','zk_w','zk_x','zk_z','zk_aa','zk_bb','zk_cc','zk_dd','zk_ee','zk_ff','zk_gg','zk_hh','zk_ii','zk_jj','zk_kk','zk_ll','zk_mm','zk_nn','zk_oo','zk_pp','zk_qq','zk_rr','zk_ss','zk_tt','zk_uu','zk_vv','zk_o','zk_u'
                ];
                $("#zkkt").remove();
                $('#thirdMenu #bubblezk').remove();
                removeEntity_byids(viewer, entityIds);
            };
            e.stopPropagation();
        });
    $("body").on('click', "#showModels_dizhi input[value='yunshu_1']", function(e) {
            if ($("#showModels_dizhi input[value='yunshu_1']").get(0).checked) {
                var workspace = "dagushanproject";
                var datasource = "dagushantrans";
                var dataset = "yunshu_1";
                addEntity_geometry(viewer, workspace, datasource, dataset);
                viewer.scene.bloomEffect.show = true;
                viewer.scene.bloomEffect.bloomIntensity = 0.001;
            } else {
                viewer.scene.bloomEffect.show = false;
                var entityIds = ['yunshu1_1','yunshu1_2','yunshu1_wx1'];
                removeEntity_byids(viewer, entityIds);
            };
            e.stopPropagation();
        });
        $("body").on('click', "#showModels_dizhi input[value='yunshu_2']", function(e) {
            if ($("#showModels_dizhi input[value='yunshu_2']").get(0).checked) {
                var workspace = "dagushanproject";
                var datasource = "dagushantrans";
                var dataset = "yunshu_2";
                addEntity_geometry(viewer, workspace, datasource, dataset);
                viewer.scene.bloomEffect.show = true;
                viewer.scene.bloomEffect.bloomIntensity = 0.001;

            } else {
                viewer.scene.bloomEffect.show = false;
                var entityIds = ['yunshu2_1','yunshu2_2','yunshu2_3','yunshu2_wx2'];
                removeEntity_byids(viewer, entityIds);
            };
            e.stopPropagation();
        });
        $("body").on('click', "#showModels_dizhi input[value='yunshu_3']", function(e) {
            if ($("#showModels_dizhi input[value='yunshu_3']").get(0).checked) {
                var workspace = "dagushanproject";
                var datasource = "dagushantrans";
                var dataset = "yunshu_3";
                addEntity_geometry(viewer, workspace, datasource, dataset);
                viewer.scene.bloomEffect.show = true;
                viewer.scene.bloomEffect.bloomIntensity = 0.001;
            } else {
                viewer.scene.bloomEffect.show = false;
                var entityIds = ['yunshu3_1','yunshu3_2','yunshu3_3'];
                removeEntity_byids(viewer, entityIds);
            };
            e.stopPropagation();
        });
    };
     //4............坡度分析star......................................
    $('#forth').click(function() {
        viewer.entities.removeAll(); 
        var entityIds = ['xiexingti_1'];
        removeEntity_byids(viewer, entityIds);
        dataSource.show = true;
        $('#firstMenu').remove();
        $("#secondMenu").remove();
        $("#thirdMenu").remove();
        $('#fifthMenu').remove();
        $("#sixthMenu").remove();
        $('#seventhMenu').remove();
        $('#settingsMenu').remove();
        $('#eightthMenu').remove();
        $('#fifthdes').remove();
        $("#ninethMenu").remove();
        if ($("#forthMenu").length > 0) {
            $("#forthMenu").remove();
        };
        var forthMenu = '<div id="forthMenu"> <div id="forth_mainmenu" style="position:fixed;background-image:url(./images/splitShow.gif); width: 13px;height: 72px;top: 70px;cursor:pointer;" title="功能模块"></div> <div id="float" style="background:rgba(251, 235, 4, 0.966);width: 250px;height: auto;top: 75px;left: 1.5%;opacity: 0.8;resize:both;cursor:pointer;"> <div id="con" style="background:rgba(233, 232, 232, 0.75);width: 230px;height:auto;top: 85px;left: 1.1%;margin: 10px"> <label for="calMode">1、计算模式：</label> <select id="calMode"> <option  selected="selected">指定多边形区域</option> <option >全部区域参与分析</option> </select><br> <label style="display:block">2、坡度区间：</label> <label style="display:block"> 起：</label> <input type="range" id="wideminR" min="0" max="90" value="0" style="width: 170px;display:inline" ;> <input type="number" id="widemin" min="0" max="90" value="0" style="width: 40px;padding:0px"> <label style="display:block"> 终：</label> <input type="range" id="widemaxR" min="0" max="90" value="78" style="width: 170px;display:inline"> <input type="number" id="widemax" min="0" max="90" value="78" style="width: 40px;padding:0px"> <label style="display:block">3、显示样式：</label> <label style="display:block"><input type="radio"  id="showcolor" name="fill">显示填充颜色</label> <label style="display:block"><input type="radio"  id="showarrow" name="fill">显示坡向箭头</label> <label style="display:block"><input type="radio" id="showall"  name="fill" checked="checked">填充颜色和坡向箭头</label> <label >4、颜色条带：</label> <div id="bar" style="display:block" > <select id="colorTable1"  class="selectpicker"> <option value="1" data-content="<span class="label band4">&nbsp</span>">&nbsp</option> <option value="2" data-content="<span class="label band2">&nbsp</span>">&nbsp</option> <option value="3" data-content="<span class="label band3">&nbsp</span>">&nbsp</option> <option value="4" data-content="<span class="label band1">&nbsp</span>">&nbsp</option> <option value="5" data-content="<span class="label band5">&nbsp</span>">&nbsp</option> </select> </div><br> <label>5、透明调节：</label> <input type="number" step="0.1" id="trans" min="0" max="1" value="1" style="width:100px"> <input type="button" id="cance" class="btn btn-success" value="清除"> <input type="button"  class ="btn btn-success" id="draw_poduArea" value="开始绘制区域"></div> </div> </div>';
        $(forthMenu).appendTo('body');
        $("#forthMenu").show();
        $('#mainButton').css('animation-name', 'rightleft');
        $('.nav-bar').css('animation-name', 'rightleft');

        var slope = new Cesium.SlopeSetting();
        slope.DisplayMode = Cesium.SlopeSettingEnum.DisplayMode.FACE_AND_ARROW;
        slope.MaxVisibleValue = document.getElementById("widemax").value;;
        slope.MinVisibleValue = document.getElementById("widemin").value;
        var colorTable = new Cesium.ColorTable();
        colorTable.insert(80, new Cesium.Color(255 / 255, 0 / 255, 0 / 255));
        colorTable.insert(50, new Cesium.Color(221 / 255, 224 / 255, 7 / 255));
        colorTable.insert(30, new Cesium.Color(20 / 255, 187 / 255, 18 / 255));
        colorTable.insert(20, new Cesium.Color(0, 161 / 255, 1));
        colorTable.insert(0, new Cesium.Color(9 / 255, 9 / 255, 255 / 255));
        slope.ColorTable = colorTable;
        slope.Opacity = 0.5;
        var handlerPolygon = new Cesium.DrawHandler(viewer, Cesium.DrawMode.Polygon, 0);
        var wide; //slop分析模式
        wide = Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION;
        slopeAnalysis(viewer, handlerPolygon, slope, wide, colorTable);
        event_podu();
    });

    function event_podu() {
        $("body").on('click', "[id='forth_mainmenu']", function() {
            $("#float").slideToggle(500);
            event.stopPropagation();
        });
    };
       //5555.............监测点信息查询功能start...................................

    $('#fifth').click(function() {
        viewer.entities.removeAll(); 
        addEntity_geometry(viewer, 'dagushanproject', 'road', 'entity_road');
        addEntity_geometry(viewer, 'dagushanproject', 'duanceng', 'duanceng');
        addEntity_geometry(viewer, 'dagushanproject', 'TopLine', 'slopeline');
        $('#firstMenu').remove();
        dataSource.show = true;
        $("#secondMenu").remove();
        $("#thirdMenu").remove();
        $('#forthMenu').remove();
        $("#sixthMenu").remove();
        $('#seventhMenu').remove();
        $('#settingsMenu').remove();
        $('#eightthMenu').remove();
        $("#ninethMenu").remove();
        dataSource.show = true;
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        if ($("#fifthMenu").length > 0) {
            $("#fifthMenu").remove();
        };
        addEntity_geometry(viewer, 'dagushanproject', 'yujing', 'xiexingti');
        var fifthMenu = '<div id="fifthMenu"><div class="params-setting-container" style="top:70px" ><div id="fifth_mainmenu" class="params-setting-anchor" title="显示/隐藏参数面板"><span class="fui-expand"></span></div> <div class="params-setting" style="width: 200px" id="fifthMenu_main"><fieldset> <legend style="color: khaki;font-size: 15px"> 监测分析功能-位移</legend> <div class="param-item" style="border-width: 2px;border-style:dashed;"> <button type="button" id="all" class="button black" style="color: yellow; border-radius: 50%;margin-left: 50px;margin-top: 5px">位移监测</button><button type="button" id="rate" class="button black" style="color: yellow; border-radius: 50%;margin-left: 50px;margin-top: 5px">位移速率</button></div> </fieldset><fieldset><legend style="color: khaki;font-size: 15px"> 监测分析功能-监测机器人</legend><div class="param-item" style="border-width: 2px;border-style:dashed;"> <button type="button" id="weiyi" class="button black" style="color: yellow; border-radius: 50%;margin-left: 50px;margin-top: 5px">位移变化量</button> <button type="button" id="rader" class="button black" style="color: yellow; border-radius: 50%;margin-left: 50px;margin-top: 5px">雷达监测云图</button></div> </fieldset><fieldset><legend style="color: khaki;font-size: 15px"> 监测分析功能-TM30</legend><div class="param-item" style="border-width: 2px;border-style:dashed;"><input type="text" id="SQL" style="width: 50%" list="dx" required placeholder="请选择点性"> <datalist id="dx"><option value="20190818TM30">20190818TM30</option><option value="20190906TM30">20190906TM30</option><option value="20190912TM30">20190912TM30</option><option value="20190926TM30">20190926TM30</option><option value="20191010TM30">20191010TM30</option><option value="20191113TM30">20191113TM30</option> <option value="20191213TM30">20191213TM30</option></fieldset> <button type="button" id="search_TM30" class="button black" style="color: yellow; border-radius: 10px;padding:0px 10px 0px 10px">查询</button> <button type="button" id="close_TM30" class="button black" style="color: yellow; border-radius: 10px;;padding:0px 10px 0px 10px">清除</button></div> </div>   <div class="params-setting-container" style="top:70px;left: 200px;"> <div id="seventh_mainmenu_InSar" class="params-setting-anchor" title="显示/隐藏参数面板" style="background-image:url(./images/suofang.png); background-size: cover;"><span class="fui-expand"></span></div> <div id="content_inSar" class="params-setting" style="max-width:300px; padding: 0px 5px 5px 5px;"> <span title="打开或关闭InSar图" id="closeMenuSeventh_InSar" style="position:absolute;top: 0px;left:270px;"> <img src="./images/close.jpg" style="height: 7%;width: 7%"> </span>  <fieldset> <legend style="color: khaki"> 大孤山位移变形InSar图</legend>20171108<input type="radio" id="Insar_horizontal_20171108" name="show" value="Insar_horizontal_20171108"> 20171120 <input type="radio" id="Insar_horizontal_20171120" name="show" value="Insar_horizontal_20171120">20171202 <input type="radio" id="Insar_horizontal_20171202" name="show" value="Insar_horizontal_20171202"> 20171214 <input type="radio" id="Insar_horizontal_20171214" name="show" value="Insar_horizontal_20171214"> 20171226 <input type="radio" id="Insar_horizontal_20171226" name="show" value="Insar_horizontal_20171226"> 20180107 <input type="radio" id="Insar_horizontal_20180107" name="show" value="Insar_horizontal_20180107">20180119 <input type="radio" id="Insar_horizontal_20180119" name="show" value="Insar_horizontal_20180119">20180131 <input type="radio" id="Insar_horizontal_20180131" name="show" value="Insar_horizontal_20180131">20180212  <input type="radio" id="Insar_horizontal_20180212" name="show" value="Insar_horizontal_20180212">20180224<input type="radio" id="Insar_horizontal_20180224" " name="show " value="Insar_horizontal_20180224">20180320   <input type="radio" id="Insar_horizontal_20180320" name="show" value="Insar_horizontal_20180320">20180401 <input type="radio" id="Insar_horizontal_20180401" name="show" value="Insar_horizontal_20180401">20180413<input type="radio" id="Insar_horizontal_20180413" name="show" value="Insar_horizontal_20180413"> 20180425 <input type="radio" id="Insar_horizontal_20180425" name="show" value="Insar_horizontal_20180425">20180507 <input type="radio" id="Insar_horizontal_20180507" name="show" value="Insar_horizontal_20180507">20180519 <input type="radio" id="Insar_horizontal_20180519" name="show" value="Insar_horizontal_20180519">20180624<input type="radio" id="Insar_horizontal_20180624" name="show" value="Insar_horizontal_20180624">20180718 <input type="radio" id="Insar_horizontal_20180718" name="show" value="Insar_horizontal_20180718">20180730 <input type="radio" id="Insar_horizontal_20180730" name="show" value="Insar_horizontal_20180730">20180811 <input type="radio" id="Insar_horizontal_20180811" name="show" value="Insar_horizontal_20180811">20180904 <input type="radio" id="Insar_horizontal_20180904" name="show" value="Insar_horizontal_20180904">20180916  <input type="radio" id="Insar_horizontal_20180916" name="show" value="Insar_horizontal_20180916">20180928 <input type="radio" id="Insar_horizontal_20180928" name="show" value="Insar_horizontal_20180928">20181010 <input type="radio" id="Insar_horizontal_20181010" name="show" value="Insar_horizontal_20181010">20181022<input type="radio" id="Insar_horizontal_20181022" name="show" value="Insar_horizontal_20181022"></fieldset><fieldset> <legend style="color: khaki"> 大孤山位移变形InSar图（时序推演）</legend><button type="button" title="请推演完毕后再进行清除" id="insarStart" class="btn btn-primary" style="color: yellow; border-radius: 10px;">开始推演</button><button type="button" id="clearInsar" class="btn btn-primary" style="color: yellow; border-radius: 10px;">清除</button></fieldset><fieldset> <legend style="color: khaki"> 大孤山激光扫描云图</legend><input type="text" id="SQLJG" style="width: 50%" list="jg" required placeholder="请选择三维激光扫描时间"> <datalist id="jg"><option value="T20190816">2019年8月16日</option><option value="T20190818">2019年8月18日</option><option value="T20190828">2019年8月28日</option><option value="T20190906">2019年9月6日</option><option value="T20190912">2019年9月12日</option><option value="T20190926">2019年9月26日</option> <option value="T20191010">2019年10月10日</option><option value="T20191213">2019年12月13日</option></fieldset> <button type="button" id="search_T" class="button black" style="color: yellow; border-radius: 10px;padding:0px 10px 0px 10px">查询</button> <button type="button" id="close_T" class="button black" style="color: yellow; border-radius: 10px;;padding:0px 10px 0px 10px">清除</button></fieldset></div> </div><canvas style="position : absolute; right : 2%; bottom : 2%;background-color:rgba(65, 65, 65, 0.5)" id="pro" title="剖面分析" height="0" width="0"></canvas><div class="params-setting-container" style="top:70px;left:500px" ><div id="fifth_mainmenu" class="params-setting-anchor" title="显示/隐藏参数面板"><span class="fui-expand"></span></div> <div class="params-setting" style="width: 200px" id="fifthMenu_main"> <fieldset> <legend style="color: khaki;font-size: 15px"> 微震信息监测</legend> <div class="param-item" style="border-width: 2px;border-style:dashed"> <button type="button" id="power3D" class="button black" style="color: yellow; border-radius: 20%;">3D微震视角</button> <button type="button" id="power2D" class="button black" style="color: yellow; border-radius: 20%;">2D微震视角</button><button type="button" id="clearpower" class="button black" style="color: yellow; border-radius: 20%;">清除</button>  </div> </fieldset></div></div><div id="protect" style="position:absolute;left:65%;top:0%;width:200px;height:200px;">';
        $(fifthMenu).appendTo('body');
        $("#fifthMenu").show();
        handler.setInputAction(function() {
            var entity = viewer.selectedEntity;
            if (entity) {
                 var fifthDes = '<div id="fifthdes" class="parent" style="position:absolute;bottom:40px;left:30px;    width:600px;height: 400px;"><div id="closefifthDes" class="params-setting-anchor" title="显示/隐藏参数面板" style="background-image:url(./images/close.jpg); background-size: cover;z-index:999"><span class="fui-expand"></span></div> <div class="slider"><button type="button" id="right" class="right" name="button"><svg version="1.1" id="Capa_1" width="40px" height="40px" xmlns=\"http://www.w3.org/2000/svg\"	xmlns:xlink=\"http://www.w3.org/1999/xlink\"x="0px" y="0px"viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xml:space="preserve"><g><path style="fill: #9d9d9d;" d="M360.731,229.075l-225.1-225.1c-5.3-5.3-13.8-5.3-19.1,0s-5.3,13.8,0,19.1l215.5,215.5l-215.5,215.5c-5.3,5.3-5.3,13.8,0,19.1c2.6,2.6,6.1,4,9.5,4c3.4,0,6.9-1.3,9.5-4l225.1-225.1C365.931,242.875,365.931,234.275,360.731,229.075z"/></g></svg></button><button type="button" id="left" class="left" name="button"><svg version="1.1" id="Capa_2" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" x="0px" y="0px"viewBox="0 0 477.175 477.175" style="enable-background:new 0 0 477.175 477.175;" xml:space="preserve"><g><path style="fill: #9d9d9d;" d="M145.188,238.575l215.5-215.5c5.3-5.3,5.3-13.8,0-19.1s-13.8-5.3-19.1,0l-225.1,225.1c-5.3,5.3-5.3,13.8,0,19.1l225.1,225c2.6,2.6,6.1,4,9.5,4s6.9-1.3,9.5-4c5.3-5.3,5.3-13.8,0-19.1L145.188,238.575z"/></g></svg></button><svg id="svg2" class="up2" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><circle id="circle1" class="circle1 steap" cx="34px" cy="49%" r="20"  /><circle id="circle2" class="circle2 steap" cx="34px" cy="49%" r="100"  /><circle id="circle3" class="circle3 steap" cx="34px" cy="49%" r="180"/><circle id="circle4" class="circle4 steap" cx="34px" cy="49%" r="260"  /><circle id="circle5" class="circle5 steap" cx="34px" cy="49%" r="340"/><circle id="circle6" class="circle6 steap" cx="34px" cy="49%" r="420" /><circle id="circle7" class="circle7 steap" cx="34px" cy="49%" r="500"  /><circle id="circle8" class="circle8 steap" cx="34px" cy="49%" r="580"  /><circle id="circle9" class="circle9 steap" cx="34px" cy="49%" r="660"  /></svg><svg id="svg1" class="up2" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\"><circle id="circle10" class="circle10 steap" cx="648px" cy="49%" r="20"/><circle id="circle11" class="circle11 steap" cx="648px" cy="49%" r="100" /><circle id="circle12" class="circle12 steap" cx="648px" cy="49%" r="180"/><circle id="circle13" class="circle13 steap" cx="648px" cy="49%" r="260"  /><circle id="circle14" class="circle14 steap" cx="648px" cy="49%" r="340"  /><circle id="circle15" class="circle15 steap" cx="648px" cy="49%" r="420"  /><circle id="circle16" class="circle16 steap" cx="648px" cy="49%" r="500"  /><circle id="circle17" class="circle17 steap" cx="648px" cy="49%" r="580"  /><circle id="circle18" class="circle18 steap" cx="648px" cy="49%" r="660"/></svg><div id="slide1" class="slide1 up1"></div><div id="slide2" class="slide2"></div><div id="slide3" class="slide3"></div><div id="slide4" class="slide4"></div></div></div>';
        $(fifthDes).appendTo('body');
        $('#fifthdes').show();
        menuimg();
            } else {
                $("#fifthdes").remove();
                return;
            };
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        viewer.scene.globe.enableLighting = false;
        var weizhen_chart = ' <div id="echart_weizhen" style="z-index:9999;position: absolute;left: 400px;top:300px;width: 1000px;height: 500px;"></div>';
        yujing();
        function yujing(){
            var myChart = echarts.init(document.getElementById('protect'));
            option = {
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} <br/>{b} : {c} ({d}%)'
                },
                series: [
                    {
                        name: '监测预警指标',
                        type: 'pie',
                        radius: '55%',
                        center: ['50%', '60%'],
                        data: [
                            {value: 120, name: '高风险',itemStyle:{color:'rgb(255, 0, 0)'}},
                            {value: 120, name: '中风险',itemStyle:{color:'rgb(255, 165, 0)'}},
                            {value: 120, name: '低风险',itemStyle:{color:'rgb(0, 0, 255)'}},
                        ],
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(255, 255, 255, 1)'
                            }
                        }
                    }
                ]
            };
            myChart.setOption(option); 
        };
        function modelObject(position, uri, name, dataset) {
            this.position = position;
            this.uri = uri;
            this.name = name;
            this.dataset = dataset;
        };
        var monitor1 = new modelObject([123.056434262167,41.054811922199 ,387.326003747061], './models/jizhan.gltf', 'JC_1', 'monitor1');
        var monitor2 = new modelObject([123.056670397619,41.0549079252943,389.198417709209], './models/jizhan.gltf', 'JC_2', 'monitor2');
        var monitor3 = new modelObject([123.056956196665,41.0549523356825,389.60549611412], './models/jizhan.gltf', 'JC_3', 'monitor3');
        monitors = [monitor1, monitor2, monitor3];
        for (var i = 0; i < monitors.length; i++) {
            addEntity_models(viewer, monitors[i]);
        };
        function TMobject(position,name){
            this.position = position;
            this.name = name;
        };
        var TM1 = new TMobject([123.056434262167,41.054811922199 ,387.326003747061], 'TM_1');
        var TM2 = new TMobject([123.056670397619,41.0549079252943,389.198417709209], 'TM_2');
        var TM3 = new TMobject([123.056956196665,41.0549523356825,389.60549611412], 'TM_3');
        TMs = [TM1,TM2,TM3];
        $("body").on('click', "#search_TM30", function() {
            var TM = $("#SQL").val();
            var img = '<div id="imgTM30" style="position:absolute;top:300px;left:700px;width:700px;height:auto;"><img src = "./dataimg/'+TM+'.jpg"></div>'
            $(img).appendTo('body');
            if(TM.length==0){
                alert('请选择TM30分类');
            $('#imgTM30').remove();
            }
        });
        $("body").on('click', "#close_TM30", function() {
            $('#imgTM30').remove();
        });
        $("body").on('click', "#search_T", function() {
            var TM = $("#SQLJG").val();
            var imageryLayers = viewer.imageryLayers;
            function addjg(imageryLayers){
                var imageryProviderT = new Cesium.SuperMapImageryProvider({
                    url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/'+TM+''
                });
                var layerT = imageryLayers.addImageryProvider(imageryProviderT);
                layerT.alpha = 0.3;
            }
            console.log('哈哈哈');
            addjg(imageryLayers);
            if(TM.length==0){
                alert('请选择三维激光扫描选项');
            }
        });
        $("body").on('click', "#close_T", function() {
            deleYx_Insar(viewer);
        });
        $("body").on('click', "#power3D", function(e) {
            console.log(viewer);
                        //添加entity 
                        $.ajax({
                            url: "./php/weizhen.php",
                            type: "post",
                            dataType: "json",
                            success: function(data) {
                                if (data == 0) {
                                    $.messager.progress({
                                        text: "查询失败",
                                    });
                                } else {
                                    console.log("查询成功");
                                    var arrayObj = [];
                                    for (var i = 0; i < data.length; i++) {
                                        arrayObj.push(data[i]); //对象数组，每个对象都是一个钻孔
                                    };
                                    //添加钻孔
                                    function addEntity_models(viewer, arrayObj) {
                                        for (var i = 0; i < arrayObj.length; i++) {
                                            var color = parseFloat(arrayObj[i][4]);
                                            console.log(color);
                                            var colorR; 
                                            var colorG;
                                            var colorB;
                                            function colorweizhen(color){
                                                if(color<=-2.11){
                                                    colorR = 37;
                                                    colorG = 73;
                                                    colorB = 255;
                                                }else if(color<=-1.87){
                                                    colorR = 22;
                                                    colorG = 142;
                                                    colorB = 255;
                                                }else if(color<=-1.63){
                                                    colorR = 79;
                                                    colorG = 242;
                                                    colorB = 251;
                                                }else if(color<=-1.39){
                                                    colorR = 63;
                                                    colorG = 248;
                                                    colorB = 154;
                                                }else if(color<=1.15){
                                                    colorR = 56;
                                                    colorG = 255;
                                                    colorB = 66;
                                                }else if(color<=-0.91){
                                                    colorR = 121;
                                                    colorG = 246;
                                                    colorB = 40;
                                                }else if(color<=-0.67){
                                                    colorR = 235;
                                                    colorG = 224;
                                                    colorB = 34;
                                                }else if(color<=-0.43){
                                                    colorR = 253;
                                                    colorG = 113;
                                                    colorB = 0;
                                                }else if(color<=-0.19){
                                                    colorR = 255;
                                                    colorG = 22;
                                                    colorB = 8;
                                                }else{
                                                    colorR = 255;
                                                    colorG = 0;
                                                    colorB = 0;
                                                }
                                            };
                                            colorweizhen(color);
                                            var entity = viewer.entities.add({
                                                position: Cesium.Cartesian3.fromDegrees(parseFloat(arrayObj[i][1]), parseFloat(arrayObj[i][2]), parseFloat(arrayObj[i][3])),
                                                ellipsoid: {
                                                    radii: new Cesium.Cartesian3(arrayObj[i][5], arrayObj[i][5], arrayObj[i][5]),
                                                    material: Cesium.Color.fromCssColorString("rgba("+colorR+","+colorG+", "+colorB+", 1)")
                                                },
                                                id: arrayObj[i][0],
                                                name: arrayObj[i][0],
                                            });
                                        };
                                    };
                                    addEntity_models(viewer, arrayObj);
                                };
                            }
                        });
                        e.stopPropagation();
        });
        $("body").on('click', "#clearpower", function(e) {
            console.log("hahaha");
            $('#echart_weizhen').remove();
            $.ajax({
                url: "./php/weizhen.php",
                type: "post",
                dataType: "json",
                success: function(data) {
                if (data == 0) {
                    $.messager.progress({
                    text: "查询失败",
                    });
                } else {
                console.log("查询成功");
                var arrayObj = [];
                for (var i = 0; i < data.length; i++) {
                arrayObj.push(data[i]); //对象数组，每个对象都是一个钻孔
                };
                //添加钻孔
                function removeEntity_models(viewer, arrayObj) {
                    for (var i = 0; i < arrayObj.length; i++) {
                        var entity = viewer.entities.remove({
                            position: Cesium.Cartesian3.fromDegrees(parseFloat(arrayObj[i][1]), parseFloat(arrayObj[i][2]), parseFloat(arrayObj[i][3])),
                            ellipsoid: {
                                radii: new Cesium.Cartesian3(arrayObj[i][5], arrayObj[i][5], arrayObj[i][5]), //设置球体的xyz
                                material: Cesium.Color.fromCssColorString("rgba("+colorR+","+colorG+", "+colorB+", 1)")
                            },
                            id: arrayObj[i][0],
                            name: arrayObj[i][0],
                        });
                    };
               };
               removeEntity_models(viewer, arrayObj);
           };
              }   
        });
        });
        $("body").on('click', "#power2D", function(e) {
            console.log("哈哈哈");
            weizhen(weizhen_chart);
            e.stopPropagation();
        });
        function menuimg(){
        $('#closefifthDes').click(function(){
            console.log("关闭啊");
            $('#fifthdes').remove();
        });
  var curpage = 1;
  var sliding = false;
  var click = true;
  var left = document.getElementById('left');
  var right = document.getElementById('right');
  var pagePrefix = 'slide';
  var pageShift = 500;
  var transitionPrefix = 'circle';
  var svg = true;
  function leftSlide() {
    if (click) {
      if (curpage == 1) curpage = 5;
        console.log('woek');
        sliding = true;
        curpage--;
        svg = true;
        click = false;
        for(k=1;k<=3;k++){
          var a1 = document.getElementById(pagePrefix + k);
          a1.className += ' tran';
        }
        setTimeout(()=>{
          move();
        },200);
        setTimeout(()=>{
          for(k=1;k<=4;k++){
            var a1 = document.getElementById(pagePrefix + k);
            a1.classList.remove('tran');
          };
        },1400);
      }
  }
   function rightSlide() {
    if (click) {
      if (curpage == 3) curpage = 0;
      console.log('woek');
      sliding = true;
      curpage++;
      svg = false;
      click = false;
      for(k=1;k<=4;k++){
        var a1 = document.getElementById(pagePrefix + k);
        a1.className += ' tran';
      }
      setTimeout(()=>{
        move();
      },200);
      setTimeout(()=>{
        for(k=1;k<=3;k++){
          var a1 = document.getElementById(pagePrefix + k);
        //   a1.classList.remove('tran');
        };
      },1400);
    }
  }
  function move() {
    if (sliding) {
      sliding = false;
      if (svg) {
        for (j = 1; j <= 9; j++) {
          var c = document.getElementById(transitionPrefix + j);
          c.classList.remove("steap");
          c.setAttribute("class", (transitionPrefix + j) + " streak")
          console.log('streak');
        }
      } else {
        for (j = 10; j <= 18; j++) {
          var c = document.getElementById(transitionPrefix + j);
          c.classList.remove("steap");
          c.setAttribute("class", (transitionPrefix + j) + " streak")
          console.log('streak');
        }
      }
      setTimeout(() => {
        for (i = 1; i <= 3; i++) {
          if (i == curpage) {
            var a = document.getElementById(pagePrefix + i);
            a.className += ' up1';
          } else {
            var b = document.getElementById(pagePrefix + i);
            b.classList.remove("up1");
          }
        };
        sliding = true;
      }, 600);
      setTimeout(() => {
        click = true;
      }, 1700);
      setTimeout(() => {
        if (svg) {
          for (j = 1; j <= 9; j++) {
            var c = document.getElementById(transitionPrefix + j);
            c.classList.remove("streak");
            c.setAttribute("class", (transitionPrefix + j) + " steap");
          }
        } else {
          for (j = 10; j <= 18; j++) {
            var c = document.getElementById(transitionPrefix + j);
            c.classList.remove("streak");
            c.setAttribute("class", (transitionPrefix + j) + " steap");
          }
          sliding = true;
        }
      }, 850);
      setTimeout(() => {
        click = true;
      }, 1700);
    }
  }
  left.onmousedown=()=>{
    leftSlide();
  }
  right.onmousedown=()=>{
    rightSlide();
  }
  document.onkeydown=(e)=>{
    if(e.keyCode==37){
      leftSlide();
    }
    else if (e.keyCode==39) {
      rightSlide();

    }
  }
	//for codepen header
	setTimeout(()=>{
		      rightSlide();
	},500)
        };
        event_jianceInfo()

    });

    function event_jianceInfo() {
        $("body").on('click', "[id='fifth_mainmenu']", function() {
            $(".params-setting").toggleClass("params-setting-hide");

        });
        $("body").on('click', "#fifthMenu_main", function(e) {
            if (e.target.id == 'all') {
                if (($('#tableEchart_all').length == 0)) {
                    var lable_table = '<table id="tableEchart_all" border="5" style="position: absolute;top:100px;left:300px;max-width: auto;min-width: auto;height: 650px;border-color: chartreuse;z-index: 100;background-color: #191970"> <tr> <td id="one_model" name="yanshan_E1" style="min-width: 300px;height: 300px;" valign="top">  </td> <td id="two_model" name="yanshan_E2" style="min-width: 300px;height: 300px;" valign="top"></td><td id="three_model" name="yanshan_E3" style="min-width: 300px;height: 300px;" valign="top"></td></tr> <tr> <th style="height: 5px"> <p style="color:yellow">1号检测点</p> </th> <th style="height: 5px"> <p style="color:yellow">2号检测点</p> </th> <th style="height: 5px"><p style="color:yellow">3号检测点</p></th></tr><tr><td id="four_model" name="yanshan_E4" style="min-width: 300px;height: 300px;" valign="top"></td><td id="five_model" name="yanshan_E5" style="min-width: 300px;height: 300px;" valign="top"></td><td id="six_model" name="yanshan_E6" style="min-width: 300px;height: 300px;" valign="top"></td> </tr><tr> <th style="height: 5px"> <p style="color:yellow">4号检测点</p> </th> <th style="height: 5px"> <p style="color:yellow">5号检测点</p> </th> <th style="height: 5px"> <p style="color:yellow">6号检测点</p> </th>  </th></tr> <tr> <th style="height: 5px"></th> </tr> </table>';
                    $(lable_table).appendTo('#fifthMenu');
                    monitorsql("monitor1", "yanshan_E1", "one_model");
                    monitorsql("monitor2", "yanshan_E2", "two_model");
                    monitorsql("monitor3", "yanshan_E3", "three_model");
                    monitorsql("monitor4", "yanshan_E4", "four_model");
                    monitorsql("monitor5", "yanshan_E5", "five_model");
                    monitorsql("monitor6", "yanshan_E6", "six_model");
                } else {
                    $('#tableEchart_all').remove();
                };
            } else {
                var entity = viewer.entities.getById(e.target.id);
                if (entity) {
                    viewer.flyTo(entity);
                };
            };
            if (e.target.id == 'rate') {
                if (($('#tablerate_all').length == 0)) {
                    var rate_table = '<table id="tablerate_all" border="5" style="position: absolute;top:100px;left:300px;max-width: auto;min-width: auto;height: 650px;border-color: chartreuse;z-index: 100;background-color: #191970"> <tr> <td id="one_model" name="yanshan_E1" style="min-width: 300px;height: 300px;" valign="top">  </td> <td id="two_model" name="yanshan_E2" style="min-width: 300px;height: 300px;" valign="top"></td><td id="three_model" name="yanshan_E3" style="min-width: 300px;height: 300px;" valign="top"></td></tr> <tr> <th style="height: 5px"> <p style="color:yellow">1号检测点</p> </th> <th style="height: 5px"> <p style="color:yellow">2号检测点</p> </th> <th style="height: 5px"><p style="color:yellow">3号检测点</p></th></tr><tr><td id="four_model" name="yanshan_E4" style="min-width: 300px;height: 300px;" valign="top"></td><td id="five_model" name="yanshan_E5" style="min-width: 300px;height: 300px;" valign="top"></td><td id="six_model" name="yanshan_E6" style="min-width: 300px;height: 300px;" valign="top"></td> </tr><tr> <th style="height: 5px"> <p style="color:yellow">4号检测点</p> </th> <th style="height: 5px"> <p style="color:yellow">5号检测点</p> </th> <th style="height: 5px"> <p style="color:yellow">6号检测点</p> </th>  </th></tr> <tr> <th style="height: 5px"></th> </tr> </table>';
                    $(rate_table).appendTo('#fifthMenu');
                    ratesql("monitor1", "yanshan_E1", "one_model");
                    ratesql("monitor2", "yanshan_E2", "two_model");
                    ratesql("monitor3", "yanshan_E3", "three_model");
                    ratesql("monitor4", "yanshan_E4", "four_model");
                    ratesql("monitor5", "yanshan_E5", "five_model");
                    ratesql("monitor6", "yanshan_E6", "six_model");
                } else {
                    $('#tablerate_all').remove();
                };
            } else {
                var entity = viewer.entities.getById(e.target.id);
                if (entity) {
                    viewer.flyTo(entity);
                };
            };
            if(e.target.id == 'weiyi'){
                if(($('#tablerate_wy').length == 0)){
                    var weiyi_echart = '<table id="tablerate_wy" border="5" style="position: absolute;top:100px;left:300px;max-width: auto;min-width: auto;height: 500px;border-color: chartreuse;z-index: 100;background-color: #191970"> <tr> <td id="one_model" name="yanshan_E1" style="min-width: 400px;height: 300px;" valign="top">  </td> <td id="two_model" name="yanshan_E2" style="min-width: 400px;height: 300px;" valign="top"></td><td id="three_model" name="yanshan_E3" style="min-width: 400px;height: 300px;" valign="top"></td></tr> <tr> <th style="height: 5px"> <p style="color:yellow">A检测点</p> </th> <th style="height: 5px"> <p style="color:yellow">B检测点</p> </th> <th style="height: 5px"><p style="color:yellow">C检测点</p></th></tr></table>';
                    $(weiyi_echart).appendTo('#fifthMenu'); //只有添加到这里才能够保证，当推出去的时候，所有框框关闭
                    console.log("开始吧");
                    weiyimonitor("monitor1", "yanshan_E1", "one_model");
                    weiyimonitor("monitor2", "yanshan_E2", "two_model");
                    weiyimonitor("monitor3", "yanshan_E3", "three_model");
                }else{
                    $('#tablerate_wy').remove(); 
                }
            }
        });
        $("body").on('click', ".params-setting input", function(e) {


            var imglayers = viewer.scene.imageryLayers;

            for (var i = 0; i < imglayers.length; i++) {

                if (imglayers._layers[i]._imageryProvider.tablename == e.target.id) {
                    var yx_target = viewer.scene.imageryLayers._layers[i];
                    console.log(e.target.id);
                    viewer.scene.imageryLayers.raiseToTop(yx_target);
                    return;
                };
            };
        });

        $("body").on('click', "#closeMenuSeventh_InSar", function(e) {
            if (!e.isPropagationStopped()) {
                var lable = 0;
                var imglayers = viewer.scene.imageryLayers;
                for (var i = 0; i < imglayers.length; i++) {
                    if (imglayers._layers[i]._imageryProvider.tablename == "Insar_horizontal_20171108") {
                        console.log("开始删除");
                        lable += 1;
                        deleYx_Insar(viewer);
                    };
                };
                if (lable == 0) {
                    console.log(lable.length);
                    console.log("开始绘制！");
                    addYx_Insar(viewer);
                };

            };
            e.stopPropagation();
        });
        $("body").on('click', "#insarStart", function(e) {
            var insarProgress = '<div id="toolbarinsar" style="position : absolute;left : 50%; top :2%;display : none;" ><div id="progressBar" class="jquery-ui-like"><div></div></div></div>';
            $(insarProgress).appendTo('body');
            $("#toolbarinsar").show();
            var num = 10;
            var imageryLayers = viewer.imageryLayers;
    //依次利用图片服务url创建SuperMapImageryProvider实例
    var imageryProvider0 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20171108'
    });
    var imageryProvider1 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20171120'
    });
    var imageryProvider2 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20171202'
    });
    var imageryProvider3 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20171214'
    });
    var imageryProvider4 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20171226'
    });
    var imageryProvider5 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20180107'
    });
    var imageryProvider6 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20180119'
    });
    var imageryProvider7 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20180131'
    });
    var imageryProvider8 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20180212'
    });
    var imageryProvider9 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20180224'
    });
    var imageryProvider10 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20180308'
    });
    var imageryProvider11 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20180320'
    });
    var imageryProvider12 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20180401'
    });
    var imageryProvider13 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20180413'
    });
    var imageryProvider14 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20180425'
    });
    var imageryProvider15 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20180507'
    });
    var imageryProvider16 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20180519'
    });
    var imageryProvider17 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20180624'
    });
    var imageryProvider18 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20180718'
    });
    var imageryProvider19 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20180730'
    });
    var imageryProvider20 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20180811'
    });
    var imageryProvider21 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20180904'
    });
    var imageryProvider22 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20180916'
    });
    var imageryProvider23 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20180928'
    });
    var imageryProvider24 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20181010'
    });
    var imageryProvider25 = new Cesium.SuperMapImageryProvider({
        url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/Insar_horizontal_20181022'
    });
    //先将第1、第2个provider添加到图层集合中，并将第2个图层设为完全透明
    var layer0 = imageryLayers.addImageryProvider(imageryProvider0);
    var layer1 = imageryLayers.addImageryProvider(imageryProvider1);
    layer1.alpha = 0;
    viewer.animation.viewModel.timeFormatter = function(date, viewModel) {
        $(".cesium-viewer-bottom").css("left", "0");
        //在layer0完全透明前，layer0透明度减少，layer1透明度增加
        if(layer0.alpha >= 0 ) {
            layer0.alpha -= 0.005;
            layer1.alpha += 0.005;
        }
        if(layer0.alpha < 0) {
            //当第一个图层完全透明,开始执行下一轮渐变
            changeTimeFormatter(layer0, layer1, imageryProviders);
        }
            e.stopPropagation();
        }
        var n = 0;
        //数组包含除了第1、第2的剩余provider的数组
        imageryProviders = [imageryProvider2, imageryProvider3, imageryProvider4, imageryProvider5, imageryProvider6, imageryProvider7, imageryProvider8, imageryProvider9, imageryProvider10,imageryProvider11,imageryProvider12,imageryProvider13,imageryProvider14,imageryProvider15,imageryProvider16,imageryProvider17,imageryProvider18,imageryProvider19,imageryProvider20,imageryProvider21,imageryProvider22,imageryProvider23,imageryProvider24,imageryProvider25];
        function changeTimeFormatter(layer0, layer1, imageryProviders) {
            if(typeof imageryProviders[n] === "undefined") {
                //数组中没有成员时,将此回调函数置为空
                viewer.animation.viewModel.timeFormatter = function(){};
                return ;
            }
            //移除掉已经不可见的图层
            imageryLayers.remove(layer0);
            //将layer0指向下一个图层,并将它先设置成完全透明
            layer0 = imageryLayers.addImageryProvider(imageryProviders[n++]);
            layer0.alpha = 0;
            layer1.alpha = 1;
            function progress(percent, $element) {
                var progressBarWidth = percent * $element.width() / 100;
                $element.find('div').animate({ width: progressBarWidth }, 10).html(percent + "% ");
            }
            //改变该回调函数，执行下一轮渐变
            viewer.animation.viewModel.timeFormatter = function(date, viewModel) {
                if(layer1.alpha >= 0 ) {
                    layer1.alpha -= 0.005;
                    layer0.alpha += 0.005;
                    num += 0.01875;
                    progress(num.toFixed(1), $('#progressBar'));
                }
                if(layer1.alpha < 0) {
                    //执行下一轮渐变
                    changeTimeFormatter(layer1, layer0, imageryProviders);
                }
            }
        };
        var insarwenben = '<div id="textinsar" style="position:absolute;top:5%;left:20%;color:yellow;"><span  id = "insarDate" style="width:100%;height:50px;font-size:20px;"></span></div>';
        $(insarwenben).appendTo('body');
        for(var i=0;i<26;i++){
            var j = 0;
            var timeDate = ["2017年11月8日","2017年11月20日","2017年12月2日","2017年12月14日","2017年12月26日","2018年1月7日","2018年1月19日","2018年1月31日","2018年2月12日","2018年2月24日","2018年3月8日","2018年3月20日","2018年4月1日","2018年4月13日","2018年4月25日","2018年5月7日","2018年5月19日","2018年6月24日","2018年7月18日","2018年7月30日","2018年8月11日","2018年9月4日","2018年9月16日","2018年9月28日","2018年10月10日","2018年10月22日"];
             var insardata = setTimeout(function(){
                $("#insarDate").html(timeDate[j ++]);
                // console.log(timeDate[j ++]);
                　　},i*3360); 
            if(j>26){
                clearTimeout(insardata);
                console.log("跳出循环！");
            };   
        };
    });
    var cont = 0
    $("body").on('click', "#rader", function(e) {
        var imageryLayers = viewer.imageryLayers;
        cont ++
        var rader = '<div id="leida" style="position:absolute;left:80%;top:40%;width:400px;height:650px"><img src="./images/rader.png"></div>'
        if(cont%2 == 0){
            deleYx_Insar(viewer);
            $('#leida').remove();
        }else{
            var imageryProviderrd = new Cesium.SuperMapImageryProvider({
                url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/redermonitor'
            });
            var layer_rd = imageryLayers.addImageryProvider(imageryProviderrd);
            layer_rd.alpha = 1;
            $(rader).appendTo('body')
        }
        e.stopPropagation();
    });
    $("body").on('click', "#clearInsar", function(e) {
        deleYx_Insar(viewer);
        $("#toolbarinsar").remove();
        $("#textinsar").remove();
        e.stopPropagation();
    });
    };
    //66666.............环境治理start............................................
        $('#sixth').click(function() {
            viewer.entities.removeAll(); 
            addEntity_geometry(viewer, 'dagushanproject', 'road', 'entity_road');
            addEntity_geometry(viewer, 'dagushanproject', 'duanceng', 'duanceng');
            addEntity_geometry(viewer, 'dagushanproject', 'TopLine', 'slopeline');
            dataSource.show = true;
            var entityIds = ['xiexingti_1'];
            removeEntity_byids(viewer, entityIds);
            $('#firstMenu').remove();
            $("#secondMenu").remove();
            $("#thirdMenu").remove();
            $('#forthMenu').remove();
            $('#fifthMenu').remove();
            $('#seventhMenu').remove();
            $('#settingsMenu').remove();
            $('#eightthMenu').remove();
            $('#fifthdes').remove();
            $("#ninethMenu").remove();
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            if ($("#sixthMenu").length > 0) {
                $("#sixthMenu").remove();
            };
            var sixthMenu = '<div id="sixthMenu"> <div id="toolbar" class="param-container tool-bar" style="top:70px"> <button type="button" id="point" class="button black">绘制点</button> <button type="button" id="polyline" class="button black">绘制线</button> <button type="button" id="polygon" class="button black">绘制面</button> <button type="button" id="marker" class="button black">添加地标</button>        <button type="button" id="clear" class="button black">清除</button> </div> <div id="wrapper" style=" min-height: 560px;margin: 0px auto;position: absolute;top: 20px;right: 0px;width: 300px;height: 100%;"> <div id="login" class="animate form" style="z-index:2;top:40px;right:10px"> <span class="close" aria-hidden="true">×</span> <form> <h1 class="title">模型库</h1> <p id="icons"> </p> <h1>模型属性编辑</h1> <p> <div> <label style="display: inline-block;margin: 5px;font-weight: bold;">绕X轴旋转</label><input style="width: 170px;" id="pitch" type="range" min="0" max="360" step="1.0" title="pitch" data-bind="value: pitch, valueUpdate: " input ""> </div> <div> <label style="display: inline-block;margin: 5px;font-weight: bold;">绕Y轴旋转</label><input style="width: 170px;" id="roll" type="range" min="0" max="360" step="1.0" title="roll" data-bind="value: roll, valueUpdate: " input ""> </div> <div> <label style="display: inline-block;margin: 5px;font-weight: bold;">绕Z轴旋转</label><input style="width: 170px;" id="heading" type="range" min="0" max="360" step="1.0" title="heading" data-bind="value: heading, valueUpdate: " input "">    </div> </p>  <p> <div> <label style="display: inline-block;margin: 5px;font-weight: bold;">缩放</label><input style="width: 170px;" type="range" id="scale" min="1" max="10" step="0.1" value="1" title="模型缩放比例" data-bind="value: scale, valueUpdate: " input ""> </div> </p> <p><lable>移动</lable></p> <p> <div> <div class="positionAdjust"> <label>X:</label><input type="text" readonly id="positionX" value="0" style="width:100px;height:25px"> <span id="XPlus" style="position: absolute; top: -8px; height: 40%; right: 16px; width:8px;" class="fa fa-caret-up"></span> <span id="XMinus" style=" position: absolute;top: 4px; height: 40%; right: 28px; width:8px" class="fa fa-caret-down"></span> </div> <div class="positionAdjust"> <label>Y:</label><input type="text" readonly id="positionY" value="0" style="width:100px;height:25px"> <span id="YPlus" style="position: absolute; top: -8px; height: 40%; right: 16px; width:8px" class="fa fa-caret-up"></span> <span id="YMinus" style=" position: absolute;top: 4px; height: 40%; right: 28px; width:8px" class="fa fa-caret-down"></span> </div> <div class="positionAdjust"> <label>Z:</label><input type="text" readonly id="positionZ" value="0" style="width:100px;height:25px"> <span id="ZPlus" style="position: absolute; top: -8px; height: 40%; right: 16px; width:8px" class="fa fa-caret-up"></span> <span id="ZMinus" style=" position: absolute;top: 4px; height: 40%; right: 28px; width:8px" class="fa fa-caret-down"></span> </div> <label id="delete" style=" right:0px;position:absolute;top:0;display: inline-block;margin: 5px;font-weight: bold;border-color: black">删除</label> </div> </p> </form> </div> </div> </div>';
            $(sixthMenu).appendTo('body');
            $("#sixthMenu").show();
            viewer.scene.globe.enableLighting = false;
            $('#mainButton').css('animation-name', 'rightleft');
            $('.nav-bar').css('animation-name', 'rightleft');
            if ($(".twipsy").length > 0) {
                $(".twipsy").remove();
            };
            addXiaoPin(Cesium, viewer);
            drawGeometry(Cesium, viewer);
            event_dizhiInfo();
        });
     //66666.............环境治理end............................................
    // 77777.............边坡分析start............................................
    $('#seventh').click(function() {
        viewer.entities.removeAll(); 
        addEntity_geometry(viewer, 'dagushanproject', 'road', 'entity_road');
        addEntity_geometry(viewer, 'dagushanproject', 'duanceng', 'duanceng');
        addEntity_geometry(viewer, 'dagushanproject', 'TopLine', 'slopeline');
        dataSource.show = true;
        $('#firstMenu').remove();
        $("#secondMenu").remove();
        $("#thirdMenu").remove();
        $('#forthMenu').remove();
        $('#fifthMenu').remove();
        $('#sixthMenu').remove();
        $('#settingsMenu').remove();
        $('#eightthMenu').remove();
        $('#fifthdes').remove();
        $("#ninethMenu").remove();
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        if ($("#seventhMenu").length > 0) {
            $("#seventhMenu").remove();
        };
        var seventhMenu = '<div id="seventhMenu" ><div class="params-setting-container" style="top:70px"> <div id="seventh_mainmenu" class="params-setting-anchor" title="显示/隐藏参数面板" style="background-image:url(./images/suofang.png); background-size: cover;"><span class="fui-expand"></span></div> <div id="content_poumian" class="params-setting" style="max-width:300px; padding: 0px 5px 5px 5px;height:auto;"> <span title="关闭" id="closeMenuSeventh" style="position:absolute;top: 0px;left:270px;"> <img src="./images/close.jpg" style="height: 7%;width: 7%"> </span> <fieldset> <legend style="color: khaki"> 地形二维剖面功能</legend> <div class="param-item" style="border-width: 2px;border-style:dashed;"> <button type="button" id="drawLine" class="button black">绘制线</button> <button type="button" id="chooseView" class="button black">剖面分析</button> <button type="button" id="clear_Dem2D" class="button black" style="color: yellow; border-radius: 10px;">清除</button> </div> </fieldset> <fieldset> <legend style="color: khaki"> 模型二维剖面功能</legend> <div class="param-item" style="border-width: 2px;border-style:dashed;">  <button type="button" id="profile" class="button black" style="color: yellow; border-radius: 10px;">剖面分析</button> <button type="button" id="clear_Model2D" class="button black" style="color: yellow; border-radius: 10px;">清除</button> </div> </fieldset> <fieldset> <legend style="color: khaki">模型三位剖面功能</legend> <div class="param-item" style="border-width: 2px;border-style:dashed ;padding:10px 0px 0px 3px"> <button type="button" id="drawBox_Model3D" class="button black">绘制裁剪盒</button> <div style="color:black"> <select style="width: 180px;" id="clipMode"> <option value="clip_behind_all_plane">裁剪包围盒内</option> <option value="clip_behind_any_plane">裁剪包围盒外</option> </select> <button type="button" id="clearbox" class="button black" style="float: right;">清 除</button> </div> <div class="param-item"> <b>改变长度：</b> <input type="range" id="length" min="1" max="3000" step="5" value="500"> </div> <div class="param-item"> <b>改变宽度：</b> <input type="range" id="width" min="1" max="5000" step="10" value="2000"> </div> <div class="param-item"> <b>改变高度：</b> <input type="range" id="height" min="1" max="5000" step="10" value="1000"> </div> <div class="param-item"> <b>Z轴进行旋转：</b> <input type="range" id="rotate" min="0" max="360" step="1" value="0"><div class="param-item"> <b>Y轴进行旋转：</b> <input type="range" id="rotateY" min="0" max="360" step="1" value="0"> </div> <div class="param-item"> <b>改变透明度：</b> <input type="range" id="alpha" min="0" max="1" step="0.1" value="0.3"> </div> <div class="param-item"> <b>交互裁剪：</b> <input class="button black" type="button" id="custom" value="移动裁剪" title="左键移动裁剪，右键结束" style="width: 88px"> </div> </div> </fieldset><fieldset><legend style="color: khaki"> 地形开挖功能</legend> <div class="param-item" style="border-width: 2px;border-style:dashed;"> <button type="button" id="kaiwa" class="button black">开挖</button><button type="button" id="clearkaiwa" class="button black">清除</button></div></fieldset> </div> </div> <div id="chart" style="width: 1200px;height:400px;position: absolute;top: 0;left: 0;bottom : 0;right : 0;margin: auto;display: none;background-color: #ffffff"></div>  <table id="table_show" class="containers_tableOne containers_one_position containers_tableOne_animation" style="height:auto;width: auto;max-width: 630px;"> <tr> <td> <div id="showModelsButton_dizhi" class="containers_one" style="border-style: none ;border-radius: 50%;;background-image: url(./images/dizhicaidan.png); background-size: cover; width:100px;height:100px"></div><td> <div id="showModels_dizhi" class="containers_one"  style="border-radius: 20%"> <fieldset> <legend style="color: khaki";"position"> 请选择需要显示的模型</legend> 地质模型<input type="checkbox" id="openPit" name="show" value="infodagushan@infotest"> 地形影像 <input type="checkbox" id="dem" name="show" value="MathAnalystResult_1@dixing" checked>应力场<input type="checkbox" id="sigmaxxx" name="show" value="sigmaxxx">断层<input type="checkbox" id="duanceng" name="show" value="duanceng">地形数据<input type="checkbox" id="TerrainOSGBnew" name="show" value="TerrainOSGBnew"> </fieldset> <br> </div> </td> </tr> </table> </div> </div>';
        $(seventhMenu).appendTo('body');
        viewer.scene.globe.enableLighting = false;
        $("#seventhMenu").show();
        if ($(".twipsy").length > 0) {
            $(".twipsy").remove();
        };
        event_analysis();
        event_dizhiInfo();
        profile(viewer);
        demProfile(viewer);
        boxClip(viewer, scene);
        function event_analysis() { 
            //动态功能
            $("body").on('click', "[id='seventh_mainmenu']", function(e) {
                if (!$("#content_poumian").is(":animated")) {
                    $('#content_poumian').animate({
                        height: 'toggle',
                    }, 1000)
                };
                e.stopPropagation();
            });
            $("body").on('click', "[id='closeMenuSeventh']", function() {
                $("#seventhMenu").find('*').remove();
                $('#seventhMenu').remove();
                $('#mainButton').css('animation-name', 'leftright');
                $('.nav-bar').css('animation-name', 'leftright');
            });
            $("body").on('click', "[id='kaiwa']", function() {
                var terrainkaiwa = '<div id="toolbarkaiwa" class="param-container tool-bar" style="position:absolute;left:400px;"><div class="param-item"><label class="form-label">开挖深度(米) :</label><input id="depth" type="number" value="500" required="required" style="width:90px;"/></div></div>';
                $(terrainkaiwa).appendTo('body');
                terrain(viewer,handler);
            });
        }
    });
    //777777.............边坡分析end............................................
   //88888.............水文分析start............................................
   $('#eightth').click(function() {
    viewer.entities.removeAll(); 
    addEntity_geometry(viewer, 'dagushanproject', 'road', 'entity_road');
    addEntity_geometry(viewer, 'dagushanproject', 'duanceng', 'duanceng');
    addEntity_geometry(viewer, 'dagushanproject', 'TopLine', 'slopeline');
    dataSource.show = true;
    var entityIds = ['xiexingti_1'];
    removeEntity_byids(viewer, entityIds);
    $('#firstMenu').remove();
    $("#secondMenu").remove();
    $("#thirdMenu").remove();
    $('#forthMenu').remove();
    $('#fifthMenu').remove();
    $('#sixthMenu').remove();
    $('#seventhMenu').remove();
    $('#settingsMenu').remove();
    $('#fifthdes').remove();
    $("#ninethMenu").remove();
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    if ($("#eightthMenu").length > 0) {
        $("#eightthMenu").remove();
    };
    var eightthMenu = '<div id="eightthMenu"><div class="params-setting-container" > <div id="eightth_mainmenu"  class="params-setting-anchor" style="background-image:url(./images/suofang.png); background-size: cover;" title="显示/隐藏参数面板"><span class="fui-expand"></span> </div><div id="eightth_caidan" style="width:600px;height:auto;"><span title="关闭滑坡预测云图" id="closeImage" style="position:absolute;top: 0px;left:90%;"> <img src="./images/close.jpg" style="height: 4%;width: 4%"> </span><ul style="width: 500px;height: auto;" class="mainmenu"><li><div id="PD_jiaquan"><b><img src="./images/podu.png" /></b><span>坡度加权</span></div></li><li><div id="PX_jiaquan"><b><img src="./images/poxiang.png" /></b><span>坡向加权</span></div></li><li id="PXing_jiaquan"><div><b><img src="./images/poxiang.png" /></b><span>坡形加权</span></div></li><li id="GC_jiaquan"><div><b><img src="./images/gaocheng.png" /></b><span>高程加权</span></div></li><li id="YX_jiaquan"><div><b><img src="./images/yanxing.png" /></b><span>岩性加权</span></div></li><li id="DC_jiaquan"><div><b><img src="./images/duanceng.png" /></b><span>断层加权</span></div></li><li id="sigmax_jiaquan"><div><b><img src="./images/sigmax.png" /></b><span>最大主应力加权</span></div></li><li id="safe_jiaquan"><div><b><img src="./images/anquan.png" /></b><span>安全系数加权</span></div></li><li id="huapo_jiaquan"><div><b><img src="./images/warning.png" /></b><span>滑坡风险图</span></div></li></ul></div></div></div>';
    $(eightthMenu).appendTo('body');
    viewer.scene.globe.enableLighting = false;
    var imageryLayers = viewer.imageryLayers;
    $("#eightthMenu").show();
    $("body").on('click', "#eightth_mainmenu", function() {
        if (!$("#eightth_caidan").is(":animated")) {
            $('#eightth_caidan').animate({
                height: 'toggle',
                width: 'toggle',
            }, 500)
        };
    });
    $("#closeImage").click(function(){
        deleYx_Insar(viewer);
    });
    $("#PD_jiaquan").click(function(){
        deleYx_Insar(viewer);
        var imageryProvider0 = new Cesium.SuperMapImageryProvider({
            url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/podujiaquan'
     });
     var layer_pd = imageryLayers.addImageryProvider(imageryProvider0);
     layer_pd.alpha = 0.3;
    });
    $("#PX_jiaquan").click(function(){
        deleYx_Insar(viewer);
        var imageryProvider1 = new Cesium.SuperMapImageryProvider({
            url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/%E5%9D%A1%E5%90%91%E5%8A%A0%E6%9D%83@dixing'
     });
     var layer_px = imageryLayers.addImageryProvider(imageryProvider1);
     layer_px.alpha = 0.3;
    });
    $("#PXing_jiaquan").click(function(){
        deleYx_Insar(viewer);
        var imageryProvider2 = new Cesium.SuperMapImageryProvider({
            url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/%E5%9D%A1%E5%BD%A2%E5%8A%A0%E6%9D%83@dixing'
     });
     var layer_pxing = imageryLayers.addImageryProvider(imageryProvider2);
     layer_pxing.alpha = 0.3;
    });
    $("#GC_jiaquan").click(function(){
        deleYx_Insar(viewer);
        var imageryProvider3 = new Cesium.SuperMapImageryProvider({
            url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/%E9%AB%98%E7%A8%8B%E5%8A%A0%E6%9D%83@dixing'
     });
     var layer_gc = imageryLayers.addImageryProvider(imageryProvider3);
     layer_gc.alpha = 0.3;
    });
    $("#YX_jiaquan").click(function(){
        deleYx_Insar(viewer);
        var imageryProvider4 = new Cesium.SuperMapImageryProvider({
            url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/%E5%9C%B0%E8%B4%A8%E5%B2%A9%E6%80%A7%E5%8A%A0%E6%9D%83@dixing'
     });
     var layer_yx = imageryLayers.addImageryProvider(imageryProvider4);
     layer_yx.alpha = 0.3;
    });
    $("#DC_jiaquan").click(function(){
        deleYx_Insar(viewer);
        var imageryProvider5 = new Cesium.SuperMapImageryProvider({
            url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/%E6%96%AD%E5%B1%82%E5%8A%A0%E6%9D%83@dixing'
     });
     var layer_dc = imageryLayers.addImageryProvider(imageryProvider5);
     layer_dc.alpha = 0.3;
    });
    $("#sigmax_jiaquan").click(function(){
        deleYx_Insar(viewer);
        var imageryProvider6 = new Cesium.SuperMapImageryProvider({
            url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/%E6%9C%80%E5%A4%A7%E4%B8%BB%E5%BA%94%E5%8A%9B%E5%8A%A0%E6%9D%83@dixing'
     });
     var layer_sig = imageryLayers.addImageryProvider(imageryProvider6);
     layer_sig.alpha = 0.3;
    });
    $("#safe_jiaquan").click(function(){
        deleYx_Insar(viewer);
        var imageryProvider7 = new Cesium.SuperMapImageryProvider({
            url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/%E5%AE%89%E5%85%A8%E7%B3%BB%E6%95%B0%E5%8A%A0%E6%9D%83@dixing'
     });
     var layer_aq = imageryLayers.addImageryProvider(imageryProvider7);
     layer_aq.alpha = 0.3;
    });
    $("#huapo_jiaquan").click(function(){
        deleYx_Insar(viewer);
        var imageryProvider8 = new Cesium.SuperMapImageryProvider({
            url : 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/%E6%BB%91%E5%9D%A1%E6%A6%82%E7%8E%87%E5%9B%BE@dixing'
     });
     var layer_hp = imageryLayers.addImageryProvider(imageryProvider8);
     layer_hp.alpha = 0.3;
    });
});
//滑坡治理功能
$('#nineth').click(function() {
    dataSource.show = true;
    $('#firstMenu').remove();
    $("#secondMenu").remove();
    $("#thirdMenu").remove();
    $('#forthMenu').remove();
    $('#fifthMenu').remove();
    $('#sixthMenu').remove();
    $('#seventhMenu').remove();
    $('#eightthMenu').remove();
    $('#fifthdes').remove();
    $('#settings').remove();
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    if ($("#ninethMenu").length > 0) {
        $("#ninethMenu").remove();
    };
    var nineMenu = '<div id="ninethMenu"><table border="1"style="position:absolute;right:10%;top:18%;background:#fff;width:500px;height:600px"><tr align="left"><td border="1"colspan="2"><p>&emsp; 在大孤山铁矿随着深部坡脚的采矿开挖，导致边坡阻滑力削减，同时开挖段卸荷应力释放致使上部应力重分布，引发不同程度的蠕变变形破坏。在西北帮平台中，前期在-68m平台已经出现了裂缝，并且已经确定-68m平台至-210m平台之间存在潜在滑移面，因此采用边坡削坡与疏干排水、运矿廊道锚索加固并举的措施，对大孤山西北边坡进行治理。<br>&emsp;削坡减重的剖面图如图7.5.9所示，削坡区域主要集中在F14与F15断层之间的低品位矿石条带。从-66m平台至-138m平台从上向下进行削坡，折返式布置临时道路。削坡前局部边坡角为50°，削坡之后边坡角降低至42°，削坡现场如图7.5.10所示。低品位矿石输送至选厂，带来的经济效益可以抵消削坡带来的费用。在不产生额外费用的同时保证了局部边坡和运矿廊道的稳定性。</td></tr><tr align="center"><td border="1"><img src="./dataimg/xuepo.png"><br><p>图7.5.9</p></td><td border="1"><img src="./dataimg/bianpo.png"><br><p>图7.5.10</p></td></tr><tr align="center"><td border="1"colspan="2"><img src="./dataimg/xuepo.gif"></td></tr></table><table id="table_show" class="containers_tableOne containers_one_position containers_tableOne_animation" style="height:auto;width: auto;max-width: 630px;"> <tr> <td> <div id="showModelsButton_dizhi" class="containers_one" style="border-style: none ;border-radius: 50%;;background-image: url(./images/dizhicaidan.png); background-size: cover; width:100px;height:100px"></div><td> <div id="showModels_dizhi" class="containers_one"  style="border-radius: 10%"> <fieldset><fieldset>地形影像 <input type="checkbox" id="dem" name="show" value="MathAnalystResult_1@dixing" checked>削坡前模型<input type="checkbox" id="kantanxian" name="show" value="ago@xuepo">削坡后模型<input type="checkbox" id="fenqu" name="show" value="after@xuepo"></div></td></tr></table></div>';
    $(nineMenu).appendTo('body');
    viewer.entities.removeAll(); 
    $("body").on('change', "#showModels_dizhi input", function() {
        var checkboxResultArry = [];
        var checkboxArr = $('#showModels_dizhi input').toArray()
        for (var i = 0; i < checkboxArr.length; i++) {
            var optionResult = {};
            optionResult.name = checkboxArr[i].value;
            optionResult.bool = checkboxArr[i].checked;
            checkboxResultArry.push(optionResult);
        };
              showOrHideObject_s3m(scene, checkboxResultArry,dataSource);
    });  
})
//设置按钮功能
$('#settings').click(function() {
    viewer.entities.removeAll(); 
    addEntity_geometry(viewer, 'dagushanproject', 'road', 'entity_road');
    addEntity_geometry(viewer, 'dagushanproject', 'duanceng', 'duanceng');
    addEntity_geometry(viewer, 'dagushanproject', 'TopLine', 'slopeline');
    dataSource.show = true;
    $('#firstMenu').remove();
    $("#secondMenu").remove();
    $("#thirdMenu").remove();
    $('#forthMenu').remove();
    $('#fifthMenu').remove();
    $('#sixthMenu').remove();
    $('#seventhMenu').remove();
    $('#eightthMenu').remove();
    $('#fifthdes').remove();
    $("#ninethMenu").remove();
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    if ($("#settingsMenu").length > 0) {
        $("#settingsMenu").remove();
    };
    var settingsMenu = '<div id="settingsMenu"><div id="toolbar" class="param-container tool-bar"> <table><tbody><td><span  style="width:auto;height:35px;font-size:30px;color:#bac702;">场景参数设置</span></td><tr><td>亮度</td><td><input type="range" min="0" max="3" step="0.02" data-bind="value: brightness, valueUpdate: "input""></td></tr><tr><td>对比度</td><td><input type="range" min="0" max="3" step="0.02" data-bind="value: contrast, valueUpdate:"input""></td></tr><tr><td>色调</td><td><input type="range" min="0" max="3" step="0.02" data-bind="value: hue, valueUpdate:"input""></td></tr><tr><td>饱和度</td><td><input type="range" min="0" max="3" step="0.02" data-bind="value: saturation, valueUpdate:"input""></td></tr><tr><td>伽马</td><td><input type="range" min="0" max="3" step="0.02" data-bind="value: gamma, valueUpdate:"input""></td><tr><td><span  style="width:auto;height:35px;font-size:30px;color:#bac702;">地形透明度设置</span></td></tr><tr><td><button id="terrinalpha" class="btn btn-primary ">地形透明</button></td>><td><button id="terrinclear" class="btn btn-primary ">地形透明还原</button></td></tr></tbody></table></div></div>'
    $(settingsMenu).appendTo('body');
    viewer.scene.globe.enableLighting = false;
    $("#settingsMenu").show();
    var imageryLayers = viewer.imageryLayers;
    var viewModel = {
        brightness: 0,
        contrast: 0,
        hue: 0,
        saturation: 0,
        gamma: 0
    };
    $("#terrinalpha").click(function(){
        var scene = viewer.scene;
        scene.globe.globeAlpha=0.4;
    });
    $("#terrinclear").click(function(){
        var scene = viewer.scene;
        scene.globe.globeAlpha=1;
    })
    Cesium.knockout.track(viewModel);
    var toolbar = document.getElementById('toolbar');
    Cesium.knockout.applyBindings(viewModel, toolbar);
    function subscribeLayerParameter(name) {
        Cesium.knockout.getObservable(viewModel, name).subscribe(
            function(newValue) {
                if (imageryLayers.length > 1) {
                    var layer = imageryLayers.get(3);
                    var layer1 = imageryLayers.get(1);
                    layer[name] = newValue;
                    layer1[name] = newValue;
                }
            }
        );
    }
    subscribeLayerParameter('brightness');
    subscribeLayerParameter('contrast');
    subscribeLayerParameter('hue');
    subscribeLayerParameter('saturation');
    subscribeLayerParameter('gamma');
    function updateViewModel() {
        if (imageryLayers.length > 1) {
            var layer = imageryLayers.get(1);
            viewModel.brightness = layer.brightness;
            viewModel.contrast = layer.contrast;
            viewModel.hue = layer.hue;
            viewModel.saturation = layer.saturation;
            viewModel.gamma = layer.gamma;
        }
    }
    imageryLayers.layerAdded.addEventListener(updateViewModel);
    imageryLayers.layerRemoved.addEventListener(updateViewModel);
    imageryLayers.layerMoved.addEventListener(updateViewModel);
    updateViewModel();
}) 
}); 
}