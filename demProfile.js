function demProfile(viewer) {
    //定义变量
    var handlerLine = new Cesium.DrawHandler(viewer, Cesium.DrawMode.Line);
    handlerLine.drawEvt.addEventListener(function(result) {
        resultObject = result.object;
    });
    var myChart = echarts.init(document.getElementById('chart'));
    //定义事件
    document.getElementById("drawLine").onclick = function() {
        handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        deactiveAll();
        handlerLine.activate();
    };
    document.getElementById("chooseView").onclick = function() {
        addResultLayer();
    };
    document.getElementById("clear_Dem2D").onclick = function() {
        //线段 
        $('#chart').hide();
        deactiveAll();
    };

    function deactiveAll() {
        handlerLine.deactivate();
        handlerLine.clear();
    };

    function addResultLayer() {
        if (!resultObject) {
            alert('请先画线！');
            return;
        };
        var line = CesiumToSuperMap.convertPolyline(Cesium, SuperMap, resultObject);
        var profileUrl = 'http://localhost:8090/iserver/services/spatialAnalysis-dagushanproject/restjsr/spatialanalyst/datasets/dagushan@dixing/terraincalculation/profile.jsonp?returnContent=true';
        var points = [];
        points.push(new SuperMap.Geometry.Point(line.getVertices()[0].x, line.getVertices()[0].y));
        points.push(new SuperMap.Geometry.Point(line.getVertices()[1].x, line.getVertices()[1].y));
        var serverGeometry = new SuperMap.REST.ServerGeometry({
            id: 0, //必须是number类型
            style: null,
            parts: [2],
            type: 'LINE',
            points: points,
            prjCoordSys: null
        });
        SuperMap.Util.committer({
            method: 'POST',
            url: profileUrl,
            data: {
                line: serverGeometry,
                resampleTolerance: '0.5'
            },
            success: function(args) {
                buildProfile(args);
            },
            failure: function(err) {
                console.log(err);
            }
        });
    };

    function buildProfile(result) {
        var profileRes = result.profile[0];
        var xyCoord = result.xyCoordinate[0];
        if (!profileRes || !xyCoord) {
            return;
        }
        var xMax = 0,
            yMax = 0;
        var points = profileRes.points;
        var xyCoordPoints = xyCoord.points;
        var arr = [];
        for (var i = 0, j = points.length; i < j; i++) {
            var x = points[i].x;
            var y = points[i].y;
            var lon = xyCoordPoints[i].x;
            var lat = xyCoordPoints[i].y;
            arr.push([x, y, lon, lat]);
            xMax = x > xMax ? x : xMax;
            yMax = y > yMax ? y : yMax;
        }
        myChart.clear();
        myChart.setOption({
            title: {
                text: '地形剖面图'
            },
            tooltip: {
                trigger: 'axis',
                formatter: function(params) {
                    var param = params[0];
                    var x = param.data[0];
                    var y = param.data[1];
                    var lon = param.data[2];
                    var lat = param.data[3];
                    return 'x : ' + lon + '</br>' + 'y : ' + lat + '</br>' + 'z : ' + y;
                },
                axisPointer: {
                    animation: false
                }
            },
            toolbox: {
                feature: {
                    saveAsImage: {},
                    myTool1: {
                        show: true,
                        title: '关闭',
                        icon: 'path://M432.45,595.444c0,2.177-4.661,6.82-11.305,6.82c-6.475,0-11.306-4.567-11.306-6.82s4.852-6.812,11.306-6.812C427.841,588.632,432.452,593.191,432.45,595.444L432.45,595.444z M421.155,589.876c-3.009,0-5.448,2.495-5.448,5.572s2.439,5.572,5.448,5.572c3.01,0,5.449-2.495,5.449-5.572C426.604,592.371,424.165,589.876,421.155,589.876L421.155,589.876z M421.146,591.891c-1.916,0-3.47,1.589-3.47,3.549c0,1.959,1.554,3.548,3.47,3.548s3.469-1.589,3.469-3.548C424.614,593.479,423.062,591.891,421.146,591.891L421.146,591.891zM421.146,591.891',
                        onclick: function() {
                            $('#chart').hide();
                        }
                    }
                }
            },
            grid: {
                // left: '3%',
                // right: '4%',
                // bottom: '3%',
                containLabel: true
            },
            xAxis: {
                // min: 'dataMin',
                // max: 'dataMax',
                min: 0,
                max: 1800,
                type: 'value'
            },
            yAxis: {
                type: 'value',
                // min: 'dataMin',
                // max: 'dataMax',
                min: -356,
                max: 180,
            },
            series: [{
                type: 'line',
                data: arr,
                showSymbol: false,
                color: 'yellow'
            }],
            backgroundColor: '#645663',
            color: '#c23531'
        });
        $('#chart').show();
    };
}