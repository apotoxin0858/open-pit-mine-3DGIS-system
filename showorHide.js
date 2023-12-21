//1........................................................................start.............................................
//根据提供的checkboxs的value以及checked属性对 s3m图层 进行显示或隐藏

//显示隐藏函数
    function showOrHideObject_s3m(scene, ojects,dataSource) {
    for (var i = 0; i < ojects.length; i++) {
        var obj = ojects[i];
        var layername = obj.name;
        var layerbool = obj.bool;
        var layer = scene.layers.find(layername);
        if (layername == 'MathAnalystResult_1@dixing') {
            dataSource.show = layerbool;
           scene.globe.show = layerbool;
            var layer3 = scene.layers.find('mm');
            layer3.visible = layerbool;
            // var layer4 = scene.layers.find('xuanchang');
            // layer4.visible = layerbool;
            var layer6 = scene.layers.find('炮孔@BIM');
            layer6.visible = layerbool;
            var layer7 = scene.layers.find('板房@BIM');
            layer7.visible = layerbool; 
            var layer10 = scene.layers.find('wajueji@kuangshanjixie');
            layer10.visible = layerbool;
            // var layer11 = scene.layers.find('wajueji@kuangshanjixie');
            // layer11.visible = layerbool;
            // var layer14 = scene.layers.find('WKCZTT');
            // layer14.visible = layerbool;   
            // var layer15 = scene.layers.find('sigmaxxx');
            // layer15.visible = layerbool; 
            var layer16 = scene.layers.find('TerrainOSGBnew');
            layer16.visible = layerbool;
            var layer16 = scene.layers.find('hangdao');
            layer16.visible = layerbool;
        }else if (layer) {
            layer.visible = layerbool;
        }
        else{
            continue;
        };
    }
};
//.....................................................................B添加线or面数据strat..............................................................
function addEntity_geometry(viewer, workspace, datasource, dataset) {
    var trailLineColor = new Cesium.Color(255, 255, 0, 0.1); //初始化尾迹线颜色
    // var wjxcolor = new Cesium.Color(255,0, 0, 0.1);
    var url = "http://localhost:8090/iserver/services/data-" + workspace + "/rest/data/datasources/" + datasource + "/datasets/" + dataset + "/features.json?fromIndex=0&toIndex=397"
    console.log(url);
    Cesium.loadJson(url).then(function(jsonData) {
        var featuresPaths = jsonData.childUriList;
        var featuresPathsJson = [];

        for (var i = 0; i < featuresPaths.length; i++) {
            featuresPathsJson.push(featuresPaths[i] + '.json');
        };
        var count = featuresPathsJson.length;
        var i = 0; //递归的条件
        getPoints(viewer, trailLineColor, featuresPathsJson, i, count);
    });
};
//1.回调..........................根据获取的features对象，根据feature路径获取相关点信息，并根据点信息,颜色信息绘制尾迹线..........................................
function getPoints(viewer, trailLineColor, featuresPathsJson, i, count) {
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

            drawEntity(viewer, trailLineColor,saveObjs, i);
            i++;
            getPoints(viewer, trailLineColor,featuresPathsJson, i, count)
        });
    } else {
        return null;
    };
};
//2.回调.........................根据positions,id，颜色信息，为了能够方便的去掉特效，需要给维基线提供一个数字类型的id  绘制尾迹线.................................
function drawEntity(viewer,trailLineColor, saveObjs, i) {

    // viewer.entities.removeAll();
    if (saveObjs.type == "REGION" && (saveObjs.name.indexOf('fenqu') != -1)) {
        var pol4 = viewer.entities.add({
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(saveObjs.positions),
                // material: setMaterial(creatRandomNumber(1, 7)),
                material: getRandomColor(),
                clampToGround: true,
            },
            id: saveObjs.name
            // name:saveObjs.name
        });
    }  else if (saveObjs.type == "LINE" && (saveObjs.name.indexOf('kantanxian') != -1)) {


        viewer.entities.add({ // 用于打底的线
            corridor: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(saveObjs.positions),
                width: 3,
                height: 450,
                extrudedHeight:450,
                outline: true,
                outlineWidth: 4,
                outlineColor: new Cesium.Color(0, 0, 255, 1),
            },
            id: saveObjs.name
        });
    }  else if (saveObjs.type == "LINE3D" && (saveObjs.name.indexOf('sl') != -1)) {
        viewer.entities.add({ // 用于打底的线
            polyline: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(saveObjs.positions),
                width: 2,
                outline: true,
                outlineWidth: 4,
                material: Cesium.Color.fromCssColorString("rgba(128,0, 128, 0.8)"),
                clampToGround: true
            },
            id: saveObjs.name
        });
    } 
    else if (saveObjs.type == "LINE" && (saveObjs.name.indexOf('duanceng') != -1)) {
        viewer.entities.add({ // 用于打底的线
            corridor: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(saveObjs.positions),
                width: 3,
                material: Cesium.Color.fromCssColorString("rgba(255,255, 0, 0.8)"),
                // height: 500,
                // extrudedHeight:500,
                outline: true,
                outlineWidth: 1,
                outlineColor: new Cesium.Color(0, 0, 255, 1),
            },
            id : saveObjs.name
        });
    }
    else if (saveObjs.type == "LINE" && (saveObjs.name.indexOf('yunshu1') != -1)) {
        viewer.entities.add({ // 用于打底的线
            corridor: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(saveObjs.positions),
                width: 5,
                // material: Cesium.Color.RED.withAlpha(0.5),
                // // height: 500,
                // // extrudedHeight:500,
                // outline: true,
                // outlineWidth: 1,
                // outlineColor: new Cesium.Color(0, 0, 255, 1),
                material: new Cesium.PolylineTrailMaterialProperty({
                    color:trailLineColor,
                    trailLength: 0.3,
                    outlineWidth: 2,
                    period: 10
                }),
            },
            id : saveObjs.name
        });
    }
    else if (saveObjs.type == "LINE" && (saveObjs.name.indexOf('yunshu2') != -1)) {
        viewer.entities.add({ // 用于打底的线
            corridor: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(saveObjs.positions),
                width: 3,
                // material: Cesium.Color.fromCssColorString("rgba(255,255, 0, 0.8)"),
                // // height: 500,
                // // extrudedHeight:500,
                // outline: true,
                // outlineWidth: 1,
                // outlineColor: new Cesium.Color(0, 0, 255, 1),
                material: new Cesium.PolylineTrailMaterialProperty({
                    color:trailLineColor,
                    trailLength: 0.3,
                    outlineWidth: 2,
                    period: 10
                }),
            },

            id : saveObjs.name
        });
    }
    else if (saveObjs.type == "LINE" && (saveObjs.name.indexOf('yunshu3') != -1)) {
        viewer.entities.add({ // 用于打底的线
            corridor: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(saveObjs.positions),
                width: 3,
                material: Cesium.Color.fromCssColorString("rgba(0,255, 255, 0.8)"),
                // material: new Cesium.ImageMaterialProperty({
                //     image: './images/yanshi.jpg',
                //     repeat: new Cesium.Cartesian2(2, 2)
                // }),
                outline: true,
                outlineWidth: 1,
                outlineColor: new Cesium.Color(0, 0, 255, 1),
                clampToGround: true
            },
            id: saveObjs.name
        });
    }
    else if(saveObjs.type == "REGION" && (saveObjs.name.indexOf('xijingpidai') != -1)){
        var pol4 = viewer.entities.add({
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(saveObjs.positions),
                material: new Cesium.ImageMaterialProperty({
                    image: './images/yanshi.jpg',
                    repeat: new Cesium.Cartesian2(2, 2)
                }),
                clampToGround: true,
            },
            id: saveObjs.name
            // name:saveObjs.name
        });
    }    else if(saveObjs.type == "REGION" && (saveObjs.name.indexOf('zk') != -1)){
        var pol4 = viewer.entities.add({
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(saveObjs.positions),
                material: Cesium.Color.RED.withAlpha(0.8),
                clampToGround: true,
            },
            id: saveObjs.name
            // name:saveObjs.name
        });
    }
    else if(saveObjs.type == "REGION" && (saveObjs.name.indexOf('huapo') != -1)){
        var pol4 = viewer.entities.add({
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(saveObjs.positions),
                material: Cesium.Color.RED.withAlpha(0.5),
                clampToGround: true,
            },
            id: saveObjs.name
            // name:saveObjs.name
        });
    }else if(saveObjs.type == "REGION" && (saveObjs.name.indexOf('xiexingti') != -1)){
        var pol4 = viewer.entities.add({
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(saveObjs.positions),
                material: Cesium.Color.RED.withAlpha(0.5),
                clampToGround: true,
            },
            id: saveObjs.name
            // name:saveObjs.name
        });
    }
    else if(saveObjs.type == "REGION"){
        var pol4 = viewer.entities.add({
            polygon: {
                hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights(saveObjs.positions),
                material: Cesium.Color.YELLOW.withAlpha(0.5),
                clampToGround: true,
            },
            id: saveObjs.name
        });
    }
    else {
        viewer.entities.add({
            corridor: {
                positions: Cesium.Cartesian3.fromDegreesArrayHeights(saveObjs.positions),
                width: 5,
                material: Cesium.Color.fromCssColorString("rgba(118,128,105,1)"),
                // material: new Cesium.ImageMaterialProperty({
                //     image: './images/yanshi.jpg',
                //     repeat: new Cesium.Cartesian2(2, 2)
                // }),
                outline: true,
                outlineWidth: 1,
                outlineColor: new Cesium.Color(0, 0, 255, 1),
                clampToGround: true
            },
            id: saveObjs.name
        });
    };
};
//...................................创建一个随机颜色...............................
function getRandomColor() {
    return new Cesium.Color(Math.random(), Math.random(), Math.random(), 0.2);
}
//...........................................C删掉线entity--start......................................
//删除实体
function removeEntity_byids(viewer, entityIds) {
    for (var i = 0; i < entityIds.length; i++) {
        var entity = viewer.entities.getById(entityIds[i]);
        viewer.entities.remove(entity);
    };
};
//...........................................C删掉线entity--end......................................
function addEntity_models(viewer, monitor) {
    var entity = viewer.entities.add({
        position: Cesium.Cartesian3.fromDegrees(monitor.position[0], monitor.position[1], monitor.position[2]),
        model: {

            uri: monitor.uri,
            scale: 0.1
        },
        id: monitor.name,
        //这里的monitor因为是外部函数的参数，所以在函数的形参上需要写上
        name: monitor.dataset,
    });
};
 