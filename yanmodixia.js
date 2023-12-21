 //1.................正向计算...................................
 function yanmodixia(viewer,scene) {
    //..........设计7个全局变量....
    var maxValue = 2;
    var minValue = -155;
    var currentHeight = -155;
    var int = null;
    // var positions = null;
    var v = []; //阶段性分层设色的速度
    // var defaultpositions = [123.057325565019,41.0512615801486 , 0.000295559875667095 ,123.065238672061 , 41.0512677261761 ,0.000576500780880451,123.065274241426 , 41.0510013251267 , -0.0167843587696552 ,123.057202589851 ,41.0509066893198 ,0.0661332691088319];
    // positions = defaultpositions;
    //.............单击事件的设计start.......................
    //开始按钮的单击事件设计
    $("body").on('click', "[id='beginZ']", function() {
        maxValue = parseInt(document.getElementById("maxHeightZ").value);
        minValue = parseInt(document.getElementById("minHeightZ").value);
        currentHeight = minValue;
        //调用计时器
        $('#clockZ').attr('class', 'wrapper1');
        start();
        //计算体积：异步加载
        volum(String(maxValue));
        //计算分层设色的速度
        var speed = Number(document.getElementById("speedZ").value); //一定要注意顺序
        v = stageSpeed(speed);
        //启动分层设色
        int = self.setInterval(flood, 200);
    });
    //.............单击事件的设计end........................

    //...................体积计算的核心代码..............
    function volum(z) {
        var data = "{\"baseAltitude\":" + z + ",\"cutFillType\":\"REGIONANDALTITUDE\",\"resultDataset\":\"cutfill\",\"buildPyramid\":true,\"deleteExistResultDataset\":true,\"region\":{\"bounds\":{\"bottom\":41.0512659491579 ,\"center\":{\"x\":123.060229185405 ,\"y\":41.0512589394461},\"height\":-89,\"left\":123.057299959423 ,\"leftBottom\":{\"x\":123.057299959423,\"y\":41.0512221994673 },\"right\":123.065231546255 ,\"rightTop\":{\"x\":123.065231546255 ,\"y\":41.0512449698143},\"top\":41.0512449698143,\"valid\":true,\"width\":0.08142969269630385},\"center\":{\"x\":0.0,\"y\":0.0},\"id\":0,\"parts\":[4],\"points\":[{\"x\":123.84130598553263,\"y\":41.0517840146227},{\"x\":123.07732596714,\"y\":41.0517840146227},{\"x\":123.07732596714,\"y\":41.0533580702359},{\"x\":123.84130598553263,\"y\":41.0533580702359}],\"type\":\"REGION\"}}"
            //栅格数据集空间分析服务选面填挖方服务地址
        var url = 'http://localhost:8090/iserver/services/spatialAnalysis-xiangdaoyanmo/restjsr/spatialanalyst/datasets/DatasetDSM%40tijijisuan/terraincalculation/cutfill.json'
        $.post(url, data).done(function(result) {
            var path = result.newResourceLocation + ".json";
            $.get(path).done(function(serverResult) {
                var tiji = serverResult.fillVolume;
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
//淹没事件开始
    window.flood = function() {
        if (currentHeight >= maxValue) {
            self.clearInterval(int); //清除循环
            currentHeight = minValue; //当前高度最小
            stop(); //计时关闭
            alert('淹没结束');
            return;
        } else {
            var layer = scene.layers.find("caichang");
            var hyp = new Cesium.HypsometricSetting();
            hyp.MaxVisibleValue = currentHeight;
            hyp.MinVisibleValue = minValue;
            hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE;
            hyp.Opacity = 0.6;
            hyp.LineInterval = 10.0;
    // hyp.CoverageArea = positions;
            var colorTable = new Cesium.ColorTable();
            colorTable.insert(0, new Cesium.Color(255 / 255, 0 / 255, 0 / 255));
            colorTable.insert(-50, new Cesium.Color(0 / 255, 83 / 255, 255 / 255));
            colorTable.insert(-155, new Cesium.Color(0 / 255, 255 / 255, 0 / 255));
            hyp.ColorTable = colorTable;
            layer.hypsometricSetting = {
                hypsometricSetting : hyp,
                analysisMode : Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
            };
            //设置地形的分层设色属性----区域模式
            currentHeight = calculateCurrentHeight(currentHeight, v);
        };

    };
        //清除按钮的单击事件设计
        $("body").on('click', "[id='clearZ']", function() {
            self.clearInterval(int);
            reset(); //时间重置
            $('#clockZ').attr('class', 'wrapper');
            var layer = scene.layers.find("caichang");
            var hyp = new Cesium.HypsometricSetting();
            hyp.MaxVisibleValue = -180; //最大高度需要调整
            //设置地形的分层设色属性----区域模式
            layer.hypsometricSetting = {
                hypsometricSetting : hyp,
                analysisMode : Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
            }
        });
        $('#colorTable').change(function () {
            var layer = scene.layers.find('caichang');
            var value = $(this).find("option:selected")[0].value;

            var hyp = new Cesium.HypsometricSetting();

            //创建分层设色对象   设置最大/最小可见高度   颜色表  显示模式   透明度及线宽
            var colorTable = new Cesium.ColorTable();

            hyp.MaxVisibleValue = currentHeight;
            hyp.MinVisibleValue = minValue;

            var value = $("#colorTable").find("option:selected")[0].value;
            setColorTable(colorTable, value);

            hyp.ColorTable = colorTable;
            hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE;
            hyp.Opacity = 0.5;

            hyp.LineInterval = 10.0;

            //设置图层分层设色属性
            layer.hypsometricSetting = {
                hypsometricSetting : hyp,
                analysisMode : Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
            }
        });
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
//阶段速度的函数--返回阶段速度m/s
function stageSpeed(speed) {
    var tiji = [0,2796994.56,3276539.344,3285480.25447,3525048.49445757,4608085.51742256,4634016.62390164,4701274.13129879];
    var gaodu = [-155,-138,-130,-126,-33,-29,0,2];
    //......分段速度计算:根据分段的容量以及速度计算出时间，同时根据根据高程查推算出分层设色的速度(m/s)...........
    var stepTime = [];
    var v = [];
    for (var i = 0; i < tiji.length - 1; i++) {
        var result = ((tiji[i + 1] - tiji[i]) / (Number(speed))) * 12; //结果是月(result 的单位是月，阶段性上升需要几个月--阶段时间这个是有工程实际意义的)
        stepTime.push(result); //阶段性时间集合---月
        v.push((gaodu[i + 1] - gaodu[i]) / stepTime[i]); //阶段性分层设色速度集合---m/月份（这个速度没有工程实际意义，就是分层设色的上升的高度，但是由于时间是有实际工程意义的所以在阶段节点上是准确的，但是在阶段与阶段之间是是不准确的，因为取的是平均值）
    };
    console.log('分层设色体积的个数：' + tiji.length);
    console.log('分层设色高度的个数：' + gaodu.length);
    console.log('只有当分层设色的体积个数和高度个数一致的时候计算正确');
    console.log('分层设色阶段性速度的个数：' + v.length);
    console.log('只有当分层设色阶段性速度的个数=38时候计算正确');
    return v;
};
//速度调整
function calculateCurrentHeight(currentheight, v) {
    //根据每个阶段分层设色的速度(m/s)去定currentHeight，当然这个currentHeight在‘阶段’节点上是精确的，但是在‘阶段’之间是不精确的
    //因此currentheight必须以阶段为准
    if (currentheight <= -138) {
        currentheight += v[0] / 10;
    } else if (currentheight <= -130) {
        currentheight += v[1] / 100;
    } else if (currentheight <= -126) {
        currentheight += v[2] / 100;
    } else if (currentheight <= -33) {
        currentheight += v[3] / 100;
    } else if (currentheight <= -29) {
        currentheight += v[4] / 100;
    } else if (currentheight <= 0) {
        currentheight += v[5] / 100;
    } else if (currentheight <= 2) {
        currentheight += v[6] / 100;
    } 
    return currentheight;
};