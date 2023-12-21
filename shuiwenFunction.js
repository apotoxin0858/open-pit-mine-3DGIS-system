//................................根据侧边菜单栏的单机事件，动态添加img_text......start.............................
//2.查询函数
function sql_shuiwen(sql) {
    var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams, sqlstyle;
    sqlstyle = "MENU=" + '\"' + sql + '\"';

    getFeatureParam = new SuperMap.REST.FilterParameter({
        attributeFilter: sqlstyle
    });
    getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
        queryParameter: getFeatureParam,
        toIndex: -1,
        datasetNames: ["HydrogeologyInfo:" + "shuiwenInfo"] //需要修改
    });
    var url = 'http://localhost:8090/iserver/services/data-GeologyInfo/rest/data'; //这里需要修改
    getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(url, {
        eventListeners: {
            "processCompleted": onQueryComplete_shuiwen,
            "processFailed": processFailed
        }
    });
    getFeatureBySQLService.processAsync(getFeatureBySQLParams);
};
//查询成功的函数
function onQueryComplete_shuiwen(queryEventArgs) {

    var selectedFeature = queryEventArgs.originResult.features;
    if (!selectedFeature) {
        console.log('虽然查询你却没有结果');
        return;
    };
    // 这里只有一个对象，所以就不需要进行遍历了
    dynamicAddImgAndTxt(selectedFeature[0]);

};

function processFailed() {
    console.log('sorry,server is wrong')
};

function dynamicAddImgAndTxt(feature) {

    var fieldNames = feature.fieldNames; //对象的属性字段
    var fieldValues = feature.fieldValues; //对象的属性值


    var indexs = [];
    for (var i = 0; i < fieldNames.length; i++) {
        if ((fieldNames[i].indexOf('SUBNAME_TITLE') != -1) && (fieldValues[i] != "")) {
            indexs.push(i);
        };
    };

    for (var i = 0; i < indexs.length; i++) {
        var str_1 = '<div class="col-md-4 col-sm-6"> <div  class="box"><img src=' + '\"' + './image/shuiwen/' + fieldValues[indexs[i] + 2] + '.jpg' + '\"' + 'alt="">' + '<div class="over-layer"> <h3 class="title" style="font-size: 20px;font-weight: bold;top:0px;color:yellow">' + fieldValues[indexs[i]] + '</h3> <p class="description" style="font-size: 15px;top:0px;font-weight: bold">' + fieldValues[indexs[i] + 1] + '</p> </div> </div> </div>';
        $(str_1).appendTo('#img_text');
    };
};

//................................根据侧边菜单栏的单机事件，动态添加img_text......start.............................
function shuiwen_fenqu(viewer, scene) {
    var int = null;
    var count = 0;
    // ...增加鼠标单击事件:获取entity以

    handler.setInputAction(function(e) {
        var scenePosition = null;
        var entity = viewer.selectedEntity;
        var position = scene.pickPosition(e.position);
        if (!position) {
            position = Cesium.Cartesian3.fromDegrees(0, 0, 0);
        };
        scenePosition = position;
        if (entity) {
            int = self.setInterval(showOrHideSelectedEntity, 200, entity);
            showMessageBox_shuiwenfenqu(scene, scenePosition);
            showInfo_shuiwenfenqu(entity.id);

        } else {
            $('#eightthMenu #bubble_shuiwenfenqu').hide();
            return;
        };
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    //关闭气泡事件
    $("body").on('click', "[id='close']", function() {
        $('#bubble_shuiwenfenqu').hide();
    });
    //2. 一闪一闪亮晶晶的效果:z这里是有bug的，在未结束时单击其他entity，就会出错:闪现两次;所以尽量的减少闪烁次数...............
    function showOrHideSelectedEntity(entity) {
        if (count <= 1) {
            if (entity.show) {
                entity.show = false;
                count += 1;
            } else {
                entity.show = true;
            };

        } else {
            //这里我们必须添加一个方法，在一次单击完成闪烁之前，使单击事件无效
            entity.show = true;
            self.clearInterval(int);
            count = 0;
            return;

        };

    };
};

//.........单击entity展示详细的信息.....
//4.控制弹框的位置
function showMessageBox_shuiwenfenqu(scene, scenePosition) {
    var infoboxContainer = document.getElementById('bubble_shuiwenfenqu');
    scene.postRender.addEventListener(function() { // 每一帧都去计算气泡的正确位置
        if (scenePosition) {
            var canvasHeight = scene.canvas.height;
            var windowPosition = new Cesium.Cartesian2();
            Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, scenePosition, windowPosition);
            infoboxContainer.style.bottom = (canvasHeight - windowPosition.y + 45) + 'px';
            infoboxContainer.style.left = (windowPosition.x - 70) + 'px';
            infoboxContainer.style.visibility = "visible";
        }
    });
    $('#bubble_shuiwenfenqu').show();
};

//5.向弹框中添加必要的信息
function showInfo_shuiwenfenqu(sql) {
    doSqlQuery(sql);

    function doSqlQuery(sql) {
        var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams, sqlstyle;
        sqlstyle = "ID=" + '\"' + sql + '\"' + 'or ' + "SMID=" + '\"' + '1' + '\"';

        getFeatureParam = new SuperMap.REST.FilterParameter({
            attributeFilter: sqlstyle
        });
        getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
            queryParameter: getFeatureParam,
            toIndex: -1,
            datasetNames: ["HydrogeologyInfo:" + "bzInfo"]
        });
        var url = 'http://localhost:8090/iserver/services/data-GeologyInfo/rest/data';
        getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(url, {
            eventListeners: {
                "processCompleted": onQueryComplete_shuiwenfenqu,
                "processFailed": processFailed
            }
        });
        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    };

    function onQueryComplete_shuiwenfenqu(queryEventArgs) {
        var table = document.getElementById('tab');
        // 首先移除之前添加标识实体
        var selectedFeatures = queryEventArgs.originResult.features;
        console.log('查询的结果对象' + selectedFeatures.length);
        if (!selectedFeatures) {
            console.log('虽然查询，却没有结果');
            /* 气泡相关 3/4 start */
            scenePosition = null;
            $("#bubble").hide();
            /* 气泡相关 3/4 end */
            return;
        };
        /* 气泡相关 4/4 start */
        $("#bubble_shuiwenfenqu").show();
        for (i = table.rows.length - 1; i > -1; i--) {
            table.deleteRow(i);
        };
        //动态添加表格的行和单元格
        var feature0 = selectedFeatures[0];
        for (var i = 1; i < selectedFeatures.length; i++) {
            var feature = selectedFeatures[i];

            for (var j = 0; j < feature.fieldNames.length; j++) {
                if (feature.fieldNames[j] == 'NAME' || feature.fieldNames[j] == 'HUISHUILIANG' || feature.fieldNames[j] == 'HUISHUIMIANJI') {
                    var newRow = table.insertRow();
                    var cell1 = newRow.insertCell();
                    var cell2 = newRow.insertCell();
                    cell1.innerHTML = feature0.fieldValues[j];
                    cell2.innerHTML = feature.fieldValues[j];
                    $('table').css({
                        width: 'auto',
                        height: 'auto'
                    });
                    $('tr').css({
                        width: 'auto',
                        height: 'auto'
                    });
                };
            };
        };
        /* 气泡相关 4/4 end */

    };

    function processFailed() {
        console.log('sorry,server is wrong')
    };
}