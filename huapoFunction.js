//1...........分区函数..............
function huapo(viewer, scene) {
    var int = null;
    var count = 0; //控制闪现的次数
    // ...增加鼠标单击事件:获取entity以及pickposition.............
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
            showMessageBox_huapo(scene, scenePosition);
            showInfo_huapo(entity.id);
        } else {

            $('#thirdMenu #bubble').hide();
            return;
        };
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    //关闭气泡事件
    $("body").on('click', "[id='close']", function() {
        $('#bubble').hide();
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
function showMessageBox_huapo(scene, scenePosition) {
    var infoboxContainer = document.getElementById('bubble');
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
    $('#thirdMenu #bubble').show();
};
//5.向弹框中添加必要的信息

function showInfo_huapo(sql) {
    console.log("开始查询！");
    doSqlQuery_huapo(sql);
    function doSqlQuery_huapo(sql) {
        var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams, sqlstyle;
        sqlstyle = "SLOPEE=" + '\"' + sql + '\"';

        getFeatureParam = new SuperMap.REST.FilterParameter({
            attributeFilter: sqlstyle
        });
        getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
            queryParameter: getFeatureParam,
            toIndex: -1,
            datasetNames: ["huapomian:" + "huapoE"]
        });
        var url = 'http://localhost:8090/iserver/services/data-dagushanproject/rest/data';
        getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(url, {
            eventListeners: {
                "processCompleted": huapochaxun,
                "processFailed": processFailed
            }
        });
        getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    };

    function huapochaxun(queryEventArgs) {
        console.log("执行滑坡");
        var table = document.getElementById('tab');
        var selectedFeatures = queryEventArgs.originResult.features;
        if (!selectedFeatures) {
            console.log('虽然查询你却没有结果');
            /* 气泡相关 3/4 start */
            scenePosition = null;
            $("#bubble").hide();
            /* 气泡相关 3/4 end */
            return;
        }
        /* 气泡相关 4/4 start */
        for (i = table.rows.length - 1; i > -1; i--) {
            table.deleteRow(i);
            console.log("删除滑坡");
        };

        //动态添加表格的行和单元格
        for (var i = 0; i < selectedFeatures.length; i++) {
            var feature = selectedFeatures[i];
            for (var j = 3; j < feature.fieldNames.length; j = j + 2) {
                var newRow = table.insertRow();
                var cell1 = newRow.insertCell();
                var cell2 = newRow.insertCell();
                cell1.innerHTML = feature.fieldValues[j];
                if (feature.fieldValues[j + 1].indexOf('_') == -1) {
                    cell2.innerHTML = feature.fieldValues[j + 1];
                } else {
                    var lable_img = '<img  src=' + '\"' + './images/' + feature.fieldValues[j + 1] + '.jpg' + '\"' + 'width=' + '\"' + '100%' + '\"' + 'height=' + '\"' + '100%' + '\"' + '>'
                    $(lable_img).appendTo('#tab td:last');
                };
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
        $("#bubble").show();
        /* 气泡相关 4/4 end */
    };

    function processFailed() {
        console.log('sorry,server is wrong')
    };
}