//1...........勘探线函数..............
function kantanxian(viewer, scene) {
    var int = null;
    var count = 0; //控制闪现的次数
    //开启场景单击事件
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    handler.setInputAction(function(e) {
        var entity = viewer.selectedEntity;
        if ($('#seventhMenu #answer').length > 0) {
            $('#seventhMenu #answer').remove();
        };
        if (entity) {
            var lable_kantanxian = ' <div id="answer" class="card_wrap"> </div>';
            $(lable_kantanxian).appendTo('#seventhMenu');
            int = self.setInterval(showOrHideSelectedEntity, 200, entity);
            //添加查询功能：根据查询的结果回调dynamicAddCards
            // sql_kantanxian(entity.id);

        } else {
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
            $('#seventhMenu #answer').hide();
            return;
        };

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);


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