//该js为我们提供了：添加和删去线和面的 enttiy  隐现s3m图层等功能；

//.....................................................................B添加线or面数据strat..............................................................
function addEntity_geometry_stepline(viewer, workspace, datasource, dataset) {


    var url = "http://localhost:8090/iserver/services/data-dagushanproject/rest/data/datasources/lineroad/datasets/roadline/features.json"

    Cesium.loadJson(url).then(function(jsonData) {
        var featuresPaths = jsonData.childUriList;
        var featuresPathsJson = [];

        for (var i = 0; i < featuresPaths.length; i++) {
            featuresPathsJson.push(featuresPaths[i] + '.json');
        };
        var count = featuresPathsJson.length;
        var i = 0; //递归的条件
        getPoints_stepline(viewer, featuresPathsJson, i, count);
    });
};
//1.回调..........................根据获取的features对象，根据feature路径获取相关点信息，并根据点信息,颜色信息绘制尾迹线..........................................
function getPoints_stepline(viewer, featuresPathsJson, i, count) {
    if (i < count) {
        var saveObjs = {}; //两个字段：name positions
        $.get(featuresPathsJson[i]).done(function(feature) {

            //注意这里：只有当name属性是最后一个属性方可成立，否则需要修正代码，这个时候就必须要对Name的字段进行索引
            var name = feature.fieldValues.slice(-1).pop();
            console.log(name);
            saveObjs.name = name;
            saveObjs.type = feature.geometry.type;
            var positions = [];
            var points = feature.geometry.points;

            for (var k = 0; k < points.length; k++) {
                positions.push(points[k]['x']);
                positions.push(points[k]['y']);
                positions.push(points[k]['z']);
            };

            saveObjs.positions = positions;
            drawEntity_stepline(viewer, saveObjs, i);
            i++;
            getPoints_stepline(viewer, featuresPathsJson, i, count)
        });
    } else {
        return null;
    };
};
//2.回调.........................根据positions,id，颜色信息，为了能够方便的去掉特效，需要给维基线提供一个数字类型的id  绘制尾迹线.................................
function drawEntity_stepline(viewer, saveObjs, i) {
    viewer.entities.add({ // 用于打底的线
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights(saveObjs.positions),
            width: 2, // 线的宽度，像素为单位
            material: Cesium.Color.fromCssColorString("rgba(255,0, 0, 0.8)"),
            clampToGround: true
        },
        id: saveObjs.name + i
    });
};