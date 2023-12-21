function  terrain(viewer,handler){
    var tooltip = createTooltip(viewer._element);
    //绘制多边形
    var handlerPolygon = new Cesium.DrawHandler(viewer,Cesium.DrawMode.Polygon, 0);
    handlerPolygon.activeEvt.addEventListener(function(isActive){
        if(isActive == true){
            viewer.enableCursorStyle = false;
            viewer._element.style.cursor = '';
            $('body').removeClass('drawCur').addClass('drawCur');
        }
        else{
            viewer.enableCursorStyle = true;
            $('body').removeClass('drawCur');
        }
    });
    handlerPolygon.movingEvt.addEventListener(function(windowPosition){
        if(windowPosition.x < 200 && windowPosition.y < 150){
            tooltip.setVisible(false);
            return ;
        }
        if(handlerPolygon.isDrawing){
            tooltip.showAt(windowPosition,'<p>点击确定开挖区域中间点</p><p>右键单击结束绘制,进行开挖</p>');
        }
        else{
            tooltip.showAt(windowPosition,'<p>点击绘制开挖区域第一个点</p>');
        }
    });
    handlerPolygon.drawEvt.addEventListener(function(result){
        if(!result.object.positions){
            tooltip.showAt(result,'<p>请绘制正确的多边形</p>');
            handlerPolygon.polygon.show = false;
            handlerPolygon.polyline.show = false;
            handlerPolygon.deactivate();
            handlerPolygon.activate();
            return;
        };
        var array = [].concat(result.object.positions);
        tooltip.setVisible(false);
        var positions = [];
        for(var i = 0, len = array.length; i < len; i ++){
            var cartographic = Cesium.Cartographic.fromCartesian(array[i]);
            var longitude = Cesium.Math.toDegrees(cartographic.longitude);
            var latitude = Cesium.Math.toDegrees(cartographic.latitude);
            var h=cartographic.height;
            if(positions.indexOf(longitude)==-1&&positions.indexOf(latitude)==-1){
                positions.push(longitude);
                positions.push(latitude);
                positions.push(h);
            }
        }
        var dep = $('#depth').val();
        viewer.scene.globe.removeAllExcavationRegion();
        viewer.scene.globe.addExcavationRegion({
            name : 'ggg' ,
            position : positions,
            height : dep,
            transparent : false
        });
        handlerPolygon.polygon.show = false;
        handlerPolygon.polyline.show = false;
        handlerPolygon.deactivate();
        handlerPolygon.activate();
    });
    handlerPolygon.activate();
    document.getElementById("clearkaiwa").onclick = function() {
        viewer.scene.globe.removeAllExcavationRegion();
        handlerPolygon.polygon.show=false;
        handlerPolygon.polyline.show=false;
        handlerPolygon.clear();
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        $('#toolbarkaiwa').remove();
        $(tooltip).remove();
    };
}