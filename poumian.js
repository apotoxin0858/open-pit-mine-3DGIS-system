//..................................剖面分析主函数.................................................
//实现：1.左上角一个分析案板；提供剖分和清除； 2.剖面-激活绘画指针，绘画事件（结束绘画事件之后需要一个profile功能）
function profile(viewer) {
    //1..................单机事件.............

    var scene = viewer.scene;
    var handlerLine = new Cesium.DrawHandler(viewer, Cesium.DrawMode.Line);
    var handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);
    $("body").on('click', "#profile", function() {
        //先清除之前绘制的线
        handlerLine.clear();
        $("#pro").width(0);
        $("#pro").height(0);
        //激活handlerLiner
        if (handlerLine.active) {
            return;
        } else {
            handlerLine.activate();

            handler.setInputAction(function(e) {
                if (handlerLine.polyline._actualPositions.length == 2) {
                    var result = {};
                    result.object = handlerLine.polyline;
                    handlerLine.drawEvt.raiseEvent(result);
                    handlerLine.deactivate();
                    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
                }
            }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
        }
    });
    //B.....清除“按钮”的单击事件......
    $("body").on('click', "#clear", function() {
        handlerLine.clear();
        $("#pro").width(0);
        $("#pro").height(0);
    });

    //2..................回调函数.............

    var profileAnay = new Cesium.Profile(scene);
    var tooltip = createTooltip(document.body);

    handlerLine.activeEvt.addEventListener(function(isActive) {

        if (isActive == true) {
            viewer.enableCursorStyle = false;
            viewer._element.style.cursor = '';
            $('body').removeClass('drawCur').addClass('drawCur');
        } else {
            viewer.enableCursorStyle = true;
            $('body').removeClass('drawCur');
        }
    });

    handlerLine.movingEvt.addEventListener(function(windowPosition) {

        if (handlerLine.isDrawing) {
            tooltip.showAt(windowPosition, '<p>右键单击结束绘制</p>');
        } else {
            tooltip.showAt(windowPosition, '<p>点击绘制第一个点</p>');
        }

    });

    handlerLine.drawEvt.addEventListener(function(result) {

        tooltip.setVisible(false);
        var line = result.object;
        var startPoint = line._positions[0];
        var endPoint = line._positions[line._positions.length - 1];

        var scartographic = Cesium.Cartographic.fromCartesian(startPoint);
        var slongitude = Cesium.Math.toDegrees(scartographic.longitude);
        var slatitude = Cesium.Math.toDegrees(scartographic.latitude);
        var sheight = scartographic.height;

        var ecartographic = Cesium.Cartographic.fromCartesian(endPoint);
        var elongitude = Cesium.Math.toDegrees(ecartographic.longitude);
        var elatitude = Cesium.Math.toDegrees(ecartographic.latitude);
        var eheight = ecartographic.height;


        profileAnay.startPoint = [slongitude, slatitude, sheight];
        profileAnay.endPoint = [elongitude, elatitude, eheight];
        profileAnay.extendHeight = 40;


        profileAnay.getBuffer(function(buffer) {
            var canvas = document.getElementById("pro");
            canvas.height = profileAnay._textureHeight;
            canvas.width = profileAnay._textureWidth;
            var ctx = canvas.getContext("2d");
            var imgData = ctx.createImageData(profileAnay._textureWidth, profileAnay._textureHeight);
            imgData.data.set(buffer);

            ctx.putImageData(imgData, 0, 0);
            $("#pro").width(1200);
            $("#pro").height(900);
        });
        profileAnay.build();
    });
};