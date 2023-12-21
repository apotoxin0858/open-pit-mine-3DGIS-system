//.....................................................................B添加线or面数据strat..............................................................
function zone(viewer, workspace, datasource, dataset) {
    var trailLineColor = new Cesium.Color(255, 255, 0, 0.1); //初始化尾迹线颜色


    var url = "http://localhost:8090/iserver/services/data-" + workspace + "/rest/data/datasources/" + datasource + "/datasets/" + dataset + "/features.json?fromIndex=0&toIndex=397"

    Cesium.loadJson(url).then(function(jsonData) {
        var featuresPaths = jsonData.childUriList;
        var featuresPathsJson = [];

        for (var i = 0; i < featuresPaths.length; i++) {
            featuresPathsJson.push(featuresPaths[i] + '.json');
        };
        var count = featuresPathsJson.length;
        var i = 0; //递归的条件
        getzonePoints(viewer, trailLineColor, featuresPathsJson, i, count);
    });
};
//1.回调..........................根据获取的features对象，根据feature路径获取相关点信息，并根据点信息,颜色信息绘制尾迹线..........................................
function getzonePoints(viewer, trailLineColor, featuresPathsJson, i, count) {
    if (i < count) {

        var saveObjs = {}; //两个字段：name positions
        $.get(featuresPathsJson[i]).done(function(feature) {
            var index_name;
            for (var j = 0; j < feature.fieldNames.length; j++) {
                if (feature.fieldNames[j] == 'name') {
                    index_name = j;
                } else {
                    continue;
                }
            };
            //注意这里：只有当name属性是最后一个属性方可成立，否则需要修正代码，这个时候就必须要对Name的字段进行索引
            var name = feature.fieldValues.slice(-1).pop();
            saveObjs.name = name;
            saveObjs.type = feature.geometry.type;
            var positions = [];
            var points = feature.geometry.points;
            var Value = feature.geometry.type.indexOf('3D');
            if (Value != -1) {
                for (var k = 0; k < points.length; k++) {
                    positions.push(points[k]['x']);
                    positions.push(points[k]['y']);
                    positions.push(points[k]['z']);
                };
            } else {
                for (var k = 0; k < points.length; k++) {
                    positions.push(points[k]['x']);
                    positions.push(points[k]['y']);
                    positions.push(500); //将z统一归为150
                };
            };
            saveObjs.positions = positions;

            zonefun(viewer, trailLineColor, saveObjs, i);
            i++;
            getPoints(viewer, trailLineColor, featuresPathsJson, i, count)
        });
    } else {
        return null;
    };
};
//画分区
function zonefun(viewer, trailLineColor, saveObjs, i,pol4){
    $.ajax({
        url: "./php/slopezone.php",
        type: "post",
        dataType: "json",
        success: function(data) {
    
            if (data == 0) {
                $.messager.progress({
                    text: "查询失败",
                });
    
            } else {
                //ajax异步加载，遍历数组，获取到的数组赋值
                var zoneObj = [];
                for (var i = 0; i < data.length; i++) {
                    zoneObj.push(data[i]); //对象数组，每个对象都是一个钻孔
                };
                function drawzone(viewer,trailLineColor, saveObjs, i, zoneObj,pol4) {
                    function getRandomColor() {
                        return new Cesium.Color(Math.random(), Math.random(), Math.random(), 0.2);
                    };
                    if (saveObjs.type == "REGION") {
                        var pol4 = viewer.entities.add({
                            polygon: {
                                hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(saveObjs.positions),
                                // material: setMaterial(creatRandomNumber(1, 7)),
                                material: getRandomColor(),
                                clampToGround: true,
                            },
                            id: zoneObj.[i][0],
                        });
                        console.log(pol4.id);
                };}
                drawzone(viewer,trailLineColor, saveObjs, i, zoneObj);
            };
        }
    });
};