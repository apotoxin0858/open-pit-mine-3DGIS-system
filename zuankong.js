//1...........分区函数..............
function zuankong(viewer, scene) {

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
            showMessageBoxzk(scene, scenePosition);
            showInfo_zk(entity.id);
        } else {

            $('#thirdMenu #bubble').hide();
            return;
        };
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    console.log(handler);
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
function showMessageBoxzk(scene, scenePosition) {
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

function showInfo_zk(sql) {
    console.log("开始查询！");
    doSqlQuery_zk(sql);
    function doSqlQuery_zk(sql) {
        var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams, sqlstyle;
        sqlstyle = "AREAE=" + '\"' + sql + '\"' + 'or ' + "AREAE=" + '\"' + 'zk' + '\"';

        getFeatureParam = new SuperMap.REST.FilterParameter({
            attributeFilter: sqlstyle
        });
        getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
            queryParameter: getFeatureParam,
            toIndex: -1,
            datasetNames: ["zuankong:" + "zuankongE"]
        });
        var url = 'http://localhost:8090/iserver/services/data-dagushanproject/rest/data';
        getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(url, {
            eventListeners: {
                "processCompleted": zuankongchaxun,
                "processFailed": processFailed
            }
        });
        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    };

    function zuankongchaxun(queryEventArgs) {
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
        // $("#bubble").show();
        for (i = table.rows.length - 1; i > -1; i--) {
            table.deleteRow(i);
            console.log("删除钻孔");
        };
        var feature0 = selectedFeatures[0];
        console.log(selectedFeatures);
        for (var i = 1; i < selectedFeatures.length; i++) {
            var feature = selectedFeatures[i];
            for (var j = 0; j < feature.fieldNames.length; j++) {
                if (feature.fieldNames[j] == 'AREAC' || feature.fieldNames[j] == 'DES') {
                    console.log(feature.fieldNames[j]);
                    var newRow = table.insertRow();
                    var cell1 = newRow.insertCell();
                    var cell2 = newRow.insertCell();
                    cell1.innerHTML = feature0.fieldValues[j];
                    cell2.innerHTML = feature.fieldValues[j];
                    $('#tab').css({
                        width: 'auto',
                        height: 'auto'
                    });
                    // $('tr').css({
                    //     width: 'auto',
                    //     height: 'auto'
                    // });

                };
            };
        };
        /* 气泡相关 4/4 end */
    };

    function processFailed() {
        console.log('sorry,server is wrong')
    };
}