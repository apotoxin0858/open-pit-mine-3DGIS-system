//box裁剪的功能函数
// 主要是场景的事件:移动事件；单击事件；消除事件；右键属性；交互事件；document属性改变事件；
//移动事件：提示框信息
//单击事件：添加boxentity 定义所有图层的裁剪面，以及裁剪线
//销毁事件：销毁==box以及所有图层的裁剪面   增加==单击事件和移动事件，

function boxClip(viewer, scene) {

    //首先部署最基础的：定义必要变量 
    //0
    var boxEntity = undefined;
    var $clipMode = $('#clipMode'),
        $length = $('#length'),
        $width = $('#width'),
        $height = $('#height'),
        $rotate = $('#rotate');
        $rotateY = $('#rotateY');
        $alpha = $('#alpha');

    var tooltip = createTooltip(document.body);
    var layers = viewer.scene.layers.layerQueue;
    //裁剪线的颜色
    setAllLayersClipColor();


    //再次：dom按钮的单击关键事件---启动功能按钮，交互绘制；清除结果
    //0
    $("#drawBox_Model3D").on("click", function() {
        //其次部署最相关事件：移动事件；左单击事件；右单击事件；
        //1
        handler.setInputAction(function(evt) {
            tooltip.showAt(evt.endPosition, '<p>点击模型，添加裁剪盒子</p>');
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

        handler.setInputAction(function(evt) {

            var clipMode = $clipMode.val();
            var length = Number($length.val());
            var width = Number($width.val());
            var height = Number($height.val());
            var rotate = parseFloat($rotate.val());
            var rotateY = parseFloat($rotateY.val());
            console.log(rotateY);
            var alpha = parseFloat($alpha.val());
            // 获取鼠标点击的笛卡尔坐标
            var cartesian = scene.pickPosition(evt.position);
            var boxOption = {
                dimensions: new Cesium.Cartesian3(length, width, height),
                position: cartesian,
                clipMode: clipMode,
                heading: rotate,
                pitch: rotateY
            };
            var hpr = new Cesium.HeadingPitchRoll(0, rotateY, rotate);
            var orientation = Cesium.Transforms.headingPitchRollQuaternion(cartesian, hpr);
            boxEntity = viewer.entities.add({
                box: {
                    dimensions: new Cesium.Cartesian3(length, width, height),
                    material:Cesium.Color.RED.withAlpha(0.1),
                },
                position: cartesian,
                orientation: orientation
            });
            setAllLayersClipOptions(boxOption);
            tooltip.setVisible(false);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
            handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);


        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);


        handler.setInputAction(function() {
            setClipBox();
            handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

    });

    //1
    $("#custom").on("click", function() {
        if (!boxEntity) {
            return;
        }
        handler.setInputAction(
            function(movement) {
                var cartesian = viewer.scene.pickPosition(movement.startPosition);
                boxEntity.position = cartesian;
                handler.setInputAction(function(evt) {
                    setClipBox();
                    handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
                }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE
        );
    });
    //2
    $('#clearbox').click(function() {
        for (var i = 0, j = layers.length; i < j; i++) {
            layers[i].clearCustomClipBox();
        };
        tooltip.setVisible(false);
        viewer.entities.removeAll();
        handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    });
    //3
    $('#drawBox_Model3D').click(function() {

        //添加相应事件
        handler.setInputAction(function(evt) {
            tooltip.showAt(evt.endPosition, '<p>点击模型，添加裁剪盒子</p>');
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
        handler.setInputAction(function(evt) {
            var clipMode = $clipMode.val();
            var length = Number($length.val());
            var width = Number($width.val());
            var height = Number($height.val());
            var rotate = parseFloat($rotate.val());
            var rotateY = parseFloat($rotateY.val());
            var alpha = parseFloat($alpha.val());
            // 获取鼠标点击的笛卡尔坐标
            var cartesian = scene.pickPosition(evt.position);
            var boxOption = {
                dimensions: new Cesium.Cartesian3(length, width, height),
                position: cartesian,
                clipMode: clipMode,
                heading: rotate,
                pitch: rotateY
            };
            var hpr = new Cesium.HeadingPitchRoll(0,rotateY, rotate);
            var orientation = Cesium.Transforms.headingPitchRollQuaternion(cartesian, hpr);
            boxEntity = viewer.entities.add({
                box: {
                    dimensions: new Cesium.Cartesian3(length, width, height),
                    material: Cesium.Color.RED.withAlpha(0.5)
                },
                position: cartesian,
                orientation: orientation
            });

            setAllLayersClipOptions(boxOption);
            tooltip.setVisible(false);


        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    });

    //相关dom事件的绑定
    $length.bind('input propertychange', function() {
        if (!boxEntity) {
            return;
        }
        var dim = boxEntity.box.dimensions.getValue();
        var newValue = Number($(this).val());
        boxEntity.box.dimensions = new Cesium.Cartesian3(newValue, dim.y, dim.z);
        setClipBox();
    });
    $width.bind('input propertychange', function() {
        if (!boxEntity) {
            return;
        }
        var dim = boxEntity.box.dimensions.getValue();
        var newValue = Number($(this).val());
        boxEntity.box.dimensions = new Cesium.Cartesian3(dim.x, newValue, dim.z);
        setClipBox();
    });
    $height.bind('input propertychange', function() {
        if (!boxEntity) {
            return;
        }
        var dim = boxEntity.box.dimensions.getValue();
        var newValue = Number($(this).val());
        boxEntity.box.dimensions = new Cesium.Cartesian3(dim.x, dim.y, newValue);
        setClipBox();
    });
    $rotate.bind('input propertychange', function() {
        if (!boxEntity) {
            return;
        }
        var position = boxEntity.position.getValue(0);
        var newValue = Number($(this).val());
        var rotate = Cesium.Math.toRadians(newValue);
        var hpr = new Cesium.HeadingPitchRoll(0, 0, rotate);
        var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
        boxEntity.orientation = orientation;
        setClipBox();
    });
    $rotateY.bind('input propertychange', function() {
        if (!boxEntity) {
            return;
        }
        var position = boxEntity.position.getValue(0);
        var newValue = Number($(this).val());
        var rotateY = Cesium.Math.toRadians(newValue);
        var hpr = new Cesium.HeadingPitchRoll(0, rotateY, 0);
        var orientation = Cesium.Transforms.headingPitchRollQuaternion(position, hpr);
        boxEntity.orientation = orientation;
        setClipBox();
    });
    $alpha.bind('input propertychange', function() {
        if (!boxEntity) {
            return;
        };
        var newValue = Number($(this).val());
        boxEntity.box.material._color._value.alpha = newValue;
        setClipBox();
        console.log(boxEntity.box.material._color._value.alpha);
    });
    $clipMode.change(function() {
        setClipBox();
    });

    //基础回调函数： 根据dom元素设计box的属参数 设计所有图层的裁剪颜色
    function setClipBox() {
        var newDim = boxEntity.box.dimensions.getValue();
        var position = boxEntity.position.getValue(0);

        var clipMode = $clipMode.val();
        var heading = Cesium.Math.toRadians($rotate.val());
        var pitch = Cesium.Math.toRadians($rotateY.val());
        var boxOptions = {
            dimensions: newDim,
            position: position,
            clipMode: clipMode,
            heading: heading,
            pitch: pitch

        };
        setAllLayersClipOptions(boxOptions);
    };

    function setAllLayersClipColor() {
        for (var i = 0, j = layers.length; i < j; i++) {

            layers[i].clipLineColor = new Cesium.Color(255, 255, 0, 1);
        }
    };

    function setAllLayersClipOptions(boxOptions) {

        for (var i = 0, j = layers.length; i < j; i++) {

            layers[i].setCustomClipBox(boxOptions);
        }
    };


};