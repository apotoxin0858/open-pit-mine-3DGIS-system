function addXiaoPin(Cesium, viewer) {
    var handlerPoint, handlerPolygon;
    var defaultUrl = './models/springTree.s3m';
    var viewModel = {
        heading: 1.0,
        pitch: 1.0,
        roll: 1.0,
        scale: 1.0,
    };
    //绑定相应的事件
    Cesium.knockout.track(viewModel);
    var toolbar = document.getElementById('wrapper');
    Cesium.knockout.applyBindings(viewModel, toolbar);
    Cesium.knockout.getObservable(viewModel, 'heading').subscribe(
        function(newValue) {
            var rotationValue = Cesium.Math.toRadians(newValue);
            if (viewer.selectedEntity) {
                var instance = viewer.selectedEntity.primitive;
                var index = viewer.selectedEntity.id;
                instance.updateRotation(new Cesium.HeadingPitchRoll(rotationValue, 0, 0), index);
            }
        }
    );
    Cesium.knockout.getObservable(viewModel, 'pitch').subscribe(
        function(newValue) {
            var rotationValue = Cesium.Math.toRadians(newValue);
            if (viewer.selectedEntity) {
                var instance = viewer.selectedEntity.primitive;
                var index = viewer.selectedEntity.id;
                instance.updateRotation(new Cesium.HeadingPitchRoll(0, rotationValue, 0), index);
            }
        }
    );
    Cesium.knockout.getObservable(viewModel, 'roll').subscribe(
        function(newValue) {
            var rotationValue = Cesium.Math.toRadians(newValue);
            if (viewer.selectedEntity) {
                var instance = viewer.selectedEntity.primitive;
                var index = viewer.selectedEntity.id;
                instance.updateRotation(new Cesium.HeadingPitchRoll(0, 0, rotationValue), index);
            }
        }
    );
    Cesium.knockout.getObservable(viewModel, 'scale').subscribe(
        function(newValue) {
            var scale = parseFloat(newValue);
            if (viewer.selectedEntity) {
                var instance = viewer.selectedEntity.primitive;
                var index = viewer.selectedEntity.id;
                instance.updateScale(new Cesium.Cartesian3(scale, scale, scale), index);
            }
        }
    );

    Cesium.loadJson('./models/models.json').then(function(data) {
        var result = data.s3mModels;
        for (var i = 0, j = result.length; i < j; i++) {
            addItem(result[i]);
        }
    });




    if (!viewer.scene.pickPositionSupported) {
        alert('不支持深度纹理,无法进行鼠标交互绘制！');
    }

    var tooltip = createTooltip(document.body);


    //绘制点的事件
    handlerPoint = new Cesium.DrawHandler(viewer, Cesium.DrawMode.Point);
    handlerPoint.activeEvt.addEventListener(function(isActive) {
        if (isActive == true) {
            viewer.enableCursorStyle = false;
            viewer._element.style.cursor = '';
            $('body').removeClass('drawCur').addClass('drawCur');
        } else {
            viewer.enableCursorStyle = true;
            $('body').removeClass('drawCur');
        }
    });

    handlerPoint.movingEvt.addEventListener(function(windowPosition) {
        if (windowPosition.x < 210 && windowPosition.y < 120) {
            tooltip.setVisible(false);
            return;
        }
        tooltip.showAt(windowPosition, '<p>点击添加小品</p>');
    });

    var s3mInstanceColc = new Cesium.S3MInstanceCollection(viewer.scene._context);
    viewer.scene.primitives.add(s3mInstanceColc);

    handlerPoint.drawEvt.addEventListener(function(result) {
        handlerPoint.clear();
        var point = result.object;
        var color = Cesium.Color.WHITE;
        s3mInstanceColc.add(defaultUrl, {
            position: point.position,
            hpr: new Cesium.HeadingPitchRoll(0, 0, 0),
            scale: new Cesium.Cartesian3(1, 1, 1),
            color: color
        });
        var colorStr = color.toCssColorString();
        viewModel.material = colorStr;
        $('#colorPicker').css({
            color: colorStr
        });
        $("img").removeClass("selected");
        handlerPoint && handlerPoint.deactivate();
        tooltip.setVisible(false);
    });


    //删除按钮的单击功能
    $("#delete").click(function() {
        if (viewer.selectedEntity) {
            var instance = viewer.selectedEntity.primitive;
            var index = viewer.selectedEntity.id;
            instance.updateScale(new Cesium.Cartesian3(0, 0, 0), index);
        }
    });
    $(".close").click(function() {
        $("#sixthMenu").remove();
        $('#mainButton').css('animation-name', 'leftright');
        $('.nav-bar').css('animation-name', 'leftright');
        event.stopPropagation();
    });


    $("#XPlus").click(function() {
        if (viewer.selectedEntity) {
            var x = parseInt(document.getElementById("positionX").value);
            x++;
            document.getElementById("positionX").value = x;
            var instance = viewer.selectedEntity.primitive;
            var index = viewer.selectedEntity.id;
            var pos = instance._position;
            var newPos = new Cesium.Cartesian3(pos.x + 5, pos.y, pos.z);
            instance.updatePosition(newPos, index);
        }
    });
    $("#XMinus").click(function() {
        console.log("减少x");
        if (viewer.selectedEntity) {
            var x = parseInt(document.getElementById("positionX").value);
            x--;
            document.getElementById("positionX").value = x;
            var instance = viewer.selectedEntity.primitive;
            var index = viewer.selectedEntity.id;
            var pos = instance._position;
            var newPos = new Cesium.Cartesian3(pos.x - 5, pos.y, pos.z);
            instance.updatePosition(newPos, index);
        }
    });
    $("#YPlus").click(function() {
        if (viewer.selectedEntity) {
            var y = parseInt(document.getElementById("positionY").value);
            y++;
            document.getElementById("positionY").value = y;
            var instance = viewer.selectedEntity.primitive;
            var index = viewer.selectedEntity.id;
            var pos = instance._position;
            var newPos = new Cesium.Cartesian3(pos.x, pos.y + 5, pos.z);
            instance.updatePosition(newPos, index);
        }
    });
    $("#YMinus").click(function() {
        console.log("减少y");
        if (viewer.selectedEntity) {
            var y = parseInt(document.getElementById("positionY").value);
            y--;
            document.getElementById("positionY").value = y;
            var instance = viewer.selectedEntity.primitive;
            var index = viewer.selectedEntity.id;
            var pos = instance._position;
            var newPos = new Cesium.Cartesian3(pos.x, pos.y - 5, pos.z);
            instance.updatePosition(newPos, index);
        }
    });
    $("#ZPlus").click(function() {
        if (viewer.selectedEntity) {
            var z = parseInt(document.getElementById("positionZ").value);
            z++;
            document.getElementById("positionZ").value = z;
            var instance = viewer.selectedEntity.primitive;
            var index = viewer.selectedEntity.id;
            var pos = instance._position;
            var newPos = new Cesium.Cartesian3(pos.x, pos.y, pos.z + 5);
            instance.updatePosition(newPos, index);
        }
    });
    $("#ZMinus").click(function() {
        if (viewer.selectedEntity) {
            var z = parseInt(document.getElementById("positionZ").value);
            z--;
            document.getElementById("positionZ").value = z;
            var instance = viewer.selectedEntity.primitive;
            var index = viewer.selectedEntity.id;
            var pos = instance._position;
            var newPos = new Cesium.Cartesian3(pos.x, pos.y, pos.z - 5);
            instance.updatePosition(newPos, index);
        }
    });

    //添加信息的功能
    function addItem(data) {
        var str = '<a><img style="width: 18%;height: 100%; margin-top:5px; margin-bottom:5px;" src={thumbnail} id={name}></a>'.replace('{thumbnail}', data.thumbnail).replace('{name}', data.name);
        var $el = $('#icons').append(str);
        var $child = $("#" + data.name);
        $child.on('click', function() {
            defaultUrl = data.path;
            if ($("img").hasClass("selected")) {
                $("img").removeClass("selected");

            } else {
                handlerPoint && handlerPoint.activate();
                $(this).addClass("selected");
            }
        });
    }


}