function slopeAnalysis(viewer, handlerPolygon, slope, wide, colorTable) {
    if (!viewer.scene.pickPositionSupported) {
        alert('不支持深度纹理,无法绘制多边形，根据多边形显示分析区域功能无法使用！');
    };

    viewer.scene.globe.enableLighting = true; //这个是必须的 否则渲染就会出错

    viewer._cesiumWidget._creditContainer.style.display = "none";
    var tooltip = createTooltip(viewer._element);
    var area = []; //定义坡度分析的区域
    var defaultpositions =  [123.049001671615,41.0546318134849,422.131674161181,123.050150878882,41.0513531713307,428.898898584768,123.05260246006,41.0493577352598,431.648008151911,123.056172002397,41.0461901301619,427.682929980569,123.062415768966,41.0450938622669,452.865484881215,123.06995239689,41.0482530113144,481.401127242483,123.068365243422,41.0549525565148,487.458155313507,123.064007599664,41.0592284645968,476.1033770293, 123.051472444692,41.0579080310229,445.660870434716,123.049033433854,41.0552113145182,421.565001976676];

    //.................绘制多边形.................
    //1.激活事件
    handlerPolygon.activeEvt.addEventListener(function(isActive) {
        if (isActive == true) {
            viewer.enableCursorStyle = false;
            viewer._element.style.cursor = '';
            $('body').removeClass('drawCur').addClass('drawCur');
        } else {
            viewer.enableCursorStyle = true;
            $('body').removeClass('drawCur');
        }
    });
    // 1.移动事件
    handlerPolygon.movingEvt.addEventListener(function(windowPosition) {
        if (windowPosition.x < 200 && windowPosition.y < 150) {
            tooltip.setVisible(false);
            return;
        };
        if (handlerPolygon.isDrawing) {
            tooltip.showAt(windowPosition, '<p>右键单击结束绘制</p>');
        } else {
            tooltip.showAt(windowPosition, '<p>点击绘制第一个点</p>');
        }
    });
    // 1.绘制完成事件
    handlerPolygon.drawEvt.addEventListener(function(result) {
        if (!result.object.positions) {
            handlerPolygon.polygon.show = false;
            handlerPolygon.polyline.show = false;
            handlerPolygon.deactivate();
            handlerPolygon.activate();
            return;
        };
        var array = [].concat(result.object.positions);
        tooltip.setVisible(false);
        var positions = [];
        for (var i = 0, len = array.length; i < len; i++) {
            var cartographic = Cesium.Cartographic.fromCartesian(array[i]);
            var longitude = Cesium.Math.toDegrees(cartographic.longitude);
            var latitude = Cesium.Math.toDegrees(cartographic.latitude);
            var h = cartographic.height;
            if (positions.indexOf(longitude) == -1 && positions.indexOf(latitude) == -1) {
                positions.push(longitude);
                positions.push(latitude);
                positions.push(h);
            }
        };

        slope.CoverageArea = positions;

        viewer.scene.globe.SlopeSetting = {
            slopeSetting: slope,
            analysisMode: wide,
        };

        handlerPolygon.polygon.show = false;
        handlerPolygon.polyline.show = false;
        handlerPolygon.deactivate();

    });

    //.....................................按钮功能的设计................................

    $("body").on('click', "[id='cance']", function(slope) {
        viewer.scene.globe.SlopeSetting = {
            slopeSetting: slope, //坡度
            analysisMode: Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_NONE
        };
        viewer.enableCursorStyle = true;
        $('body').removeClass('drawCur');
        handlerPolygon.deactivate();
        handlerPolygon.clear();
    });

    $("body").on('click', "[id='draw_poduArea']", function() {
        handlerPolygon.activate();
    });


    $("body").on('click', "[id='split']", function() {
        $("#float").slideToggle(500);
    });


    $("body").on('input change', "[id='trans']", function() {
        slope.Opacity = this.value;
        viewer.scene.globe.SlopeSetting = {
            slopeSetting: slope,
            analysisMode: wide
        };
    });

    //坡度起始滑块
    $("body").on('input change', "[id='wideminR']", function() {
        var a = document.getElementById("widemin");
        a.value = this.value;
        slope.MinVisibleValue = this.value;
        viewer.scene.globe.SlopeSetting = {
            slopeSetting: slope,
            analysisMode: wide
        };
    });

    $("body").on('input change', "[id='widemin']", function() {
        var a = document.getElementById("wideminR");
        a.value = this.value;
    });

    //坡度终了滑块
    $("body").on('input change', "[id='widemaxR']", function() {
        var a = document.getElementById("widemax");
        a.value = this.value;
        slope.MaxVisibleValue = this.value;
        viewer.scene.globe.SlopeSetting = {
            slopeSetting: slope,
            analysisMode: wide
        };
    });

    $("body").on('input change', "[id='widemax']", function() {
        var a = document.getElementById("widemaxR");
        a.value = this.value;
    });

    //定义充填的区域方式：default或者多边形圈定的
    $("body").on('input change', "[id='calMode']", function() {
        var index = document.getElementById("calMode").selectedIndex;
        switch (index) {
            case 0:
                area = [];
                break;
            case 1:
                area = defaultpositions;
                break;
            default:
                break;
        }
        slope.CoverageArea = area;
        viewer.scene.globe.SlopeSetting = {
            slopeSetting: slope,
            analysisMode: wide,

        };
    });
    //充填（颜色 箭头 颜色和箭头0样式
    $("body").on('change', ":radio[name='fill']", function() {
        if (document.getElementById("showcolor").checked) {
            slope.DisplayMode = Cesium.SlopeSettingEnum.DisplayMode.FACE;
        } else if (document.getElementById("showarrow").checked) {
            slope.DisplayMode = Cesium.SlopeSettingEnum.DisplayMode.ARROW;
        } else {
            slope.DisplayMode = Cesium.SlopeSettingEnum.DisplayMode.FACE_AND_ARROW;
        }
        viewer.scene.globe.SlopeSetting = {
            slopeSetting: slope,
            analysisMode: wide
        };
    });
    //分层设色过度色
    $("body").on('input change', "#colorTable1", function() {

        colorTable.remove(0);
        colorTable.remove(20);
        colorTable.remove(30);
        colorTable.remove(50);
        colorTable.remove(80);
        var value = document.getElementById("colorTable1").selectedIndex; //根据索引值而非value
        switch (value) {
            case 0:
                colorTable.insert(80, new Cesium.Color(255 / 255, 0 / 255, 0 / 255));
                colorTable.insert(50, new Cesium.Color(221 / 255, 224 / 255, 7 / 255));
                colorTable.insert(30, new Cesium.Color(20 / 255, 187 / 255, 18 / 255));
                colorTable.insert(20, new Cesium.Color(0, 161 / 255, 1));
                colorTable.insert(0, new Cesium.Color(9 / 255, 9 / 255, 255 / 255));
                break;

            case 1:
                colorTable.insert(0, new Cesium.Color(230 / 255, 198 / 255, 1));
                colorTable.insert(20, new Cesium.Color(210 / 255, 150 / 255, 1));
                colorTable.insert(30, new Cesium.Color(190 / 255, 100 / 255, 1));
                colorTable.insert(50, new Cesium.Color(165, 50 / 255, 1));
                colorTable.insert(80, new Cesium.Color(157 / 255, 0, 1));
                break;
            case 2:
                colorTable.insert(80, new Cesium.Color(0, 39 / 255, 148 / 255));
                colorTable.insert(50, new Cesium.Color(0, 39 / 255, 148 / 255));
                colorTable.insert(30, new Cesium.Color(70 / 255, 116 / 255, 200 / 255));
                colorTable.insert(20, new Cesium.Color(149 / 255, 232 / 255, 249 / 255));
                colorTable.insert(0, new Cesium.Color(149 / 255, 232 / 255, 249 / 255));
                break;
            default:
                break;
        }
        slope.ColorTable = colorTable;
        viewer.scene.globe.SlopeSetting = {
            slopeSetting: slope,
            analysisMode: wide
        };
    });
};