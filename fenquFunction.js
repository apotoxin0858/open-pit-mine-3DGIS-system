//1...........分区函数..............
function bpfenqu(viewer, scene, handler) {

    var int = null;
    var count = 0;


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
            showMessageBox(scene, scenePosition);
            showInfo(entity.id);
            console.log(entity.id);
        } else {

            $('#thirdMenu #bubble').hide();
            return;
        };
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    $("body").on('click', "[id='close']", function() {
        $('#thirdMenu #bubble').hide();
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
            entity.show = true;
            self.clearInterval(int);
            count = 0;
            return;

        };

    };

};
//.........单击entity展示详细的信息.....
//4.控制弹框的位置
function showMessageBox(scene, scenePosition) {
    var infoboxContainer = document.getElementById('bubble');
    scene.postRender.addEventListener(function() {
        if (scenePosition) {
            var canvasHeight = scene.canvas.height;
            var windowPosition = new Cesium.Cartesian2();
            Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, scenePosition, windowPosition);
            infoboxContainer.style.bottom = (canvasHeight - windowPosition.y + 45) + 'px';
            infoboxContainer.style.left = (windowPosition.x - 70) + 'px';
            infoboxContainer.style.visibility = "visible";
        }
    });
    $('#bubble').show();
};
//5.向弹框中添加必要的信息

function showInfo(sql) {
    console.log("开始查询！");
    doSqlQuery(sql);
    function doSqlQuery(sql) {
        var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams, sqlstyle;
        sqlstyle = "AREAE=" + '\"' + sql + '\"' + 'or ' + "AREAE=" + '\"' + 'fenqu' + '\"';
        getFeatureParam = new SuperMap.REST.FilterParameter({
            attributeFilter: sqlstyle
        });
        getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
            queryParameter: getFeatureParam,
            toIndex: -1,
            datasetNames: ["bianpofenqu:" + "slopzoneE"]
        });
        var url = 'http://localhost:8090/iserver/services/data-dagushanproject/rest/data';
        getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(url, {
            eventListeners: {
                "processCompleted": fenquchaxun,
                "processFailed": processFailed
            }
        });
        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    };

    function fenquchaxun(queryEventArgs) {
        console.log("执行分区");
        var table = document.getElementById('tab');
        // 首先移除之前添加标识实体
        var selectedFeatures = queryEventArgs.originResult.features; // 选中楼层的楼层面信息对象
        if (!selectedFeatures) {
            console.log('虽然查询你却没有结果');

            scenePosition = null;
            $("#bubble").hide();

            return;
        }
        /* 气泡相关 4/4 start */
        $("#bubble").show();
        for (i = table.rows.length - 1; i > -1; i--) {
            table.deleteRow(i);
            console.log("删除分区");
        };
  
        var feature0 = selectedFeatures[0];
        console.log(selectedFeatures);
        for (var i = 1; i < selectedFeatures.length; i++) {
            console.log(selectedFeatures);
            var feature = selectedFeatures[i];
            for (var j = 0; j < feature.fieldNames.length; j++) {
                if (feature.fieldNames[j] == 'AREAC' || feature.fieldNames[j] == 'DES') {
                    var newRow = tab.insertRow();
                    var cell1 = newRow.insertCell();
                    var cell2 = newRow.insertCell();
                    cell1.innerHTML = feature0.fieldValues[j];
                    cell2.innerHTML = feature.fieldValues[j];
                    $('#tab').css({
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