 //1.................正向计算...................................
 function yanmofenxiZ(viewer) {
     //..........设计7个全局变量....
     var maxValue = 669;
     var minValue = 159;

     var positions = null;
     var defaultpositions = [123.049001671615,41.0546318134849,422.131674161181,123.050150878882,41.0513531713307,428.898898584768,123.05260246006,41.0493577352598,431.648008151911,123.056172002397,41.0461901301619,427.682929980569,123.062415768966,41.0450938622669,452.865484881215,123.06995239689,41.0482530113144,481.401127242483,123.068365243422,41.0549525565148,487.458155313507,123.064007599664,41.0592284645968,476.1033770293, 123.051472444692,41.0579080310229,445.660870434716,123.049033433854,41.0552113145182,421.565001976676];
     positions = defaultpositions;



     //.............单击事件的设计start.......................

     var hyp = new Cesium.HypsometricSetting();
     hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE;
     hyp.Opacity = 0.6;
     hyp.LineInterval = 10.0;
     hyp.CoverageArea = positions;
     var colorTable = new Cesium.ColorTable();
     colorTable.insert(560, new Cesium.Color(0/ 255, 0 / 255, 100 / 255));
     colorTable.insert(300, new Cesium.Color(0 / 255, 0 / 255, 50 / 255));
     colorTable.insert(161, new Cesium.Color(0 / 255, 0 / 255, 10 / 255));
     hyp.ColorTable = colorTable;

     $("body").on('click', "[id='beginZ']", function() {
         maxValue = parseInt(document.getElementById("maxHeightZ").value);
         console.log(maxValue);
         currentHeight = minValue;
         console.log(currentHeight);
         //调用计时器
         $('#clockZ').attr('class', 'wrapper1');
         start();
         //计算体积：异步加载
         volum(String(maxValue));
         //计算分层设色的速度
         var speed = Number(document.getElementById("speedZ").value); //一定要注意顺序
         console.log(speed);

         v = stageSpeed(speed);
         //启动分层设色
         int = self.setInterval(flood, 200);
     });

     //清除按钮的单击事件设计
     $("body").on('click', "[id='drawF']", function() {
         self.clearInterval(int);
         reset(); //时间重置
         $('#clockZ').attr('class', 'wrapper');
         var hyp = new Cesium.HypsometricSetting();
         hyp.MaxVisibleValue = 595; //最大高度需要调整
         //设置地形的分层设色属性----区域模式
         viewer.scene.globe.HypsometricSetting = {
             hypsometricSetting: hyp,
             analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
         };
     });

     //.............单击事件的设计end........................
     window.flood = function() {
        if (currentHeight >= maxValue) {
            self.clearInterval(int); //清除循环
            currentHeight = minValue; //当前高度最小
            stop(); //计时关闭
            alert('淹没结束');
            return;
        } else {
            hyp.MaxVisibleValue = currentHeight;
            hyp.MinVisibleValue = minValue;
            //设置地形的分层设色属性----区域模式
            viewer.scene.globe.HypsometricSetting = {
                hypsometricSetting: hyp,
                analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
            };
            currentHeight = calculateCurrentHeight(currentHeight, v);
        };
    };
     //...................体积计算的核心代码..............

     //...................体积计算的核心代码..............
     function volum(z) {
         var data = "{\"baseAltitude\":" + z + ",\"cutFillType\":\"REGIONANDALTITUDE\",\"resultDataset\":\"cutfill\",\"buildPyramid\":true,\"deleteExistResultDataset\":true,\"region\":{\"bounds\":{\"bottom\":41.0424595365026,\"center\":{\"x\":123.058899680113,\"y\":41.0517978850586},\"height\":0.4266666666667,\"left\":123.046350460502,\"leftBottom\":{\"x\":123.046350460502,\"y\":41.0424595365026},\"right\":123.07394062879,\"rightTop\":{\"x\":123.07394062879,\"y\":41.0618661802981},\"top\":41.0618661802981,\"valid\":true,\"width\":0.636666666667},\"center\":{\"x\":0.0,\"y\":0.0},\"id\":0,\"parts\":[5],\"points\":[{\"x\":123.046350460502,\"y\":41.0617325717349},{\"x\":123.046350460502,\"y\":41.0424595365026},{\"x\":123.07394062879,\"y\":41.0424595365026},{\"x\":123.07394062879,\"y\":41.0618661802981},{\"x\":123.046350460502,\"y\":41.0617325717349}],\"type\":\"REGION\"}}"
             //栅格数据集空间分析服务选面填挖方服务地址
         var url = 'http://localhost:8090/iserver/services/spatialAnalysis-dagushanproject/restjsr/spatialanalyst/datasets/dagushanterrain%40dagushan/terraincalculation/cutfill.json'
         $.post(url, data).done(function(result) {
             var path = result.newResourceLocation + ".json";
             $.get(path).done(function(serverResult) {
                 var chenggong = serverResult.succeed;
                 console.log(chenggong);
                 var tiji = serverResult.fillVolume;
                 console.log(tiji);
                 var yanmoTIme = Number(tiji) / (parseInt(document.getElementById("speedZ").value));
                 allTime = document.getElementById('allTimeZ');
                 var timeYear = parseInt(yanmoTIme);
                 var timeMonth = parseInt((yanmoTIme - timeYear) * 12);
                 allTime.innerHTML = '总时间：' + String(timeYear) + '年' + String(timeMonth) + '月'
                     //输出体积serverResult.fillVolume
                     //{"fillArea":745363.2123030967,"remainderArea":0,"succeed":true,"fillVolume":3.132293951844448E7,"message":null,"dataset":"cutfill@data","cutArea":1.2058803484295428E7,"cutVolume":2.648823404836713E9}
             })
         });
     };
     // 绘画图表
     //.....表格关闭按钮的事件设计.....
     $("body").on('click', "[id='closeF']", function() {
         $("#bubbleF").hide();
     });
     $("body").on('click', "[id='showF']", function() {
         $("#bubbleF").show();
     });
     $("body").on('click', "[id='closeChartsF']", function() {
         $("#biaogeF").hide();
         $("#bubbleF").hide();
         $('#biaogeF').remove();
         $('#bubbleF').remove();
     });

     $("#showF").click(function() { // 打开表格气泡
         $("#bubbleF").show();
     });

     //......................函数的设定...................



     //淹没循环
     window.flood = function() {

         if (currentHeight >= maxValue) {
             self.clearInterval(int); //清除循环
             currentHeight = minValue; //当前高度最小
             stop(); //计时关闭
             alert('淹没结束');

             return;
         } else {

             hyp.MaxVisibleValue = currentHeight;
             hyp.MinVisibleValue = minValue;
             //设置地形的分层设色属性----区域模式
             viewer.scene.globe.HypsometricSetting = {
                 hypsometricSetting: hyp,
                 analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
             };

             currentHeight = calculateCurrentHeight(currentHeight, v);

         };

     };
     //......................计时器设计的关键代码......................
     var h = m = s = ms = 0; //定义时，分，秒，毫秒并初始化为0；
     var time = 0;

     function timer() { //定义计时函数
         ms = ms + 200;
         if (ms >= 1000) {
             ms = 0;
             s = s + 1;
         }
         if (s >= 12) {
             s = 0;
             m = m + 1;
         }
         str = toDub(m) + "年" + toDub(s) + "月";
         mytime = document.getElementById('mytimeZ');
         mytime.innerHTML = str;

     };
     //........................调用的函数2.设置计时器有关函数.................
     function start() { //开始
         time = setInterval(timer, 200);
     };

     function stop() { //暂停
         clearInterval(time);
     };

     function reset() { //重置
         clearInterval(time);
         h = m = s = ms = 0;

         document.getElementById('mytimeZ').innerHTML = "00年00月00天";
     };

     function toDub(n) { //补0操作
         if (n < 10) {
             return "0" + n;
         } else {
             return "" + n;
         }
     }
 };