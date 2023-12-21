    var yanmofun = '<div id="toolbar" class="param-container tool-bar"><div id="setingBar"><div class="form-group"><input id="maxHeight" value="71" required="required" class="form-control"/><label class="form-label">最大高度  (米) :    </label></div><div class="form-group"><input id="minHeight" value="1" required="required" class="form-control"/><label  class="form-label">最小高度  (米) :</label></div><div class="form-group"><input id="speed" value="1" required="required" class="form-control"/><label class="form-label">淹没速度(米/秒):</label></div></div><div style="margin-left: 40px;"><button type="button" id="begin" class="button black">开始</button><button type="button" id="clear" class="button black">清除</button></div></div>'
    var host = document.location.toString().match(/file:\/\//)?"http://localhost:8090":'http://' + document.location.host;
    var currentHeight = 0;
    var maxValue = 0;
    var minValue = 0;
    var int = null;
    function onload(Cesium) {
        var viewer = new Cesium.Viewer('cesiumContainer');
        viewer.imageryLayers.addImageryProvider(new Cesium.BingMapsImageryProvider({
            url : 'https://dev.virtualearth.net',
            mapStyle : Cesium.BingMapsStyle.AERIAL,
            key : URL_CONFIG.BING_MAP_KEY
        }));
        var scene = viewer.scene;
        $(".form-group").show();
        $(".element").show();
        var widget = viewer.cesiumWidget;
        try{
            //添加S3M图层服务
            var promise = scene.open(URL_CONFIG.SCENE_XGPARK);
            Cesium.when(promise,function(layers){
                // 设置相机视角，便于查看模型
                scene.camera.setView({
                    destination : new Cesium.Cartesian3.fromDegrees(114.2158,22.4169,419),
                    orientation : {
                       up : new Cesium.Cartesian3(-0.1629169048778112, 0.7143202157541026, 0.6805914424014209),
                       direction : new Cesium.Cartesian3(0.5945902470233576, -0.4793925407032518, 0.6454806194323606),
                       heading : 5.899584294129949
                   }
                });
            },function(e){
                if (widget._showRenderLoopErrors) {
                    var title = '渲染时发生错误，已停止渲染。';
                    widget.showErrorPanel(title, undefined, e);
                }
            });
        }
        catch(e){
            if (widget._showRenderLoopErrors) {
                var title = '渲染时发生错误，已停止渲染。';
                widget.showErrorPanel(title, undefined, e);
            }
        }

        //点击“开始”按钮，则开始淹没分析
        document.getElementById("begin").onclick = function() {
            currentHeight = 0;
            int = self.setInterval("flood()", 100);
            maxValue = parseInt(document.getElementById("maxHeight").value);
            minValue = parseInt(document.getElementById("minHeight").value);
        };

        window.flood = function() {
            if(currentHeight > maxValue) {
                self.clearInterval(int);
                return;
            }

            var layer = scene.layers.find("sci_park");
            var hyp = new Cesium.HypsometricSetting();

            //创建分层设色对象   设置最大/最小可见高度   颜色表  显示模式   透明度及线宽
            var colorTable = new Cesium.ColorTable();

            hyp.MaxVisibleValue = currentHeight;
            hyp.MinVisibleValue = minValue;

            var value = $("#colorTable").find("option:selected")[0].value;
            setColorTable(colorTable, value);

            hyp.ColorTable = colorTable;
            hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE;
            hyp.Opacity = 0.5;

            hyp.LineInterval = 10.0;

            //设置图层分层设色属性
            layer.hypsometricSetting = {
                hypsometricSetting : hyp,
                analysisMode : Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
            };

            currentHeight += (parseInt(document.getElementById("speed").value))/10;
        };

        //清除分析结果
        document.getElementById("clear").onclick = function() {
            self.clearInterval(int);
            var layer = scene.layers.find("sci_park");
            var hyp = new Cesium.HypsometricSetting();
            hyp.MaxVisibleValue = 0;

            layer.hypsometricSetting = {
                hypsometricSetting : hyp,
                analysisMode : Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
            }
        };

        function setColorTable(colorTable, key) {
            switch (key) {
                case "1":
                    colorTable.insert(71, new Cesium.Color(0, 39/255, 148/255));
                    colorTable.insert(0, new Cesium.Color(149/255, 232/255, 249/255));
                    break;
                case "2":
                    colorTable.insert(71, new Cesium.Color(162/255, 251/255, 194/255));
                    colorTable.insert(0, new Cesium.Color(1, 103/255, 103/255));
                    break;
                case "3":
                    colorTable.insert(71, new Cesium.Color(230/255, 198/255, 1));
                    colorTable.insert(0, new Cesium.Color(157/255, 0, 1));
                    break;
                case "4":
                    colorTable.insert(71, new Cesium.Color(210/255, 15/255, 15/255));
                    colorTable.insert(54, new Cesium.Color(221/255, 224/255, 7/255));
                    colorTable.insert(36, new Cesium.Color(20/255, 187/255, 18/255));
                    colorTable.insert(18, new Cesium.Color(0, 161/255, 1));
                    colorTable.insert(0, new Cesium.Color(9/255, 9/255, 212/255));
                    break;
                case "5":
                    colorTable.insert(71, new Cesium.Color(186/255, 1, 229/255));
                    colorTable.insert(0, new Cesium.Color(26/255, 185/255, 156/255));
                    break;
              default:
                break;
            }
        }

        $('#colorTable').change(function () {
            var layer = scene.layers.find('sci_park');
            var value = $(this).find("option:selected")[0].value;

            var hyp = new Cesium.HypsometricSetting();

            //创建分层设色对象   设置最大/最小可见高度   颜色表  显示模式   透明度及线宽
            var colorTable = new Cesium.ColorTable();

            hyp.MaxVisibleValue = currentHeight;
            hyp.MinVisibleValue = minValue;

            var value = $("#colorTable").find("option:selected")[0].value;
            setColorTable(colorTable, value);

            hyp.ColorTable = colorTable;
            hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE;
            hyp.Opacity = 0.5;

            hyp.LineInterval = 10.0;

            //设置图层分层设色属性
            layer.hypsometricSetting = {
                hypsometricSetting : hyp,
                analysisMode : Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
            }
        });

        $('#toolbar').show();
        $('#loadingbar').remove();

    }
    if (typeof Cesium !== 'undefined') {
        window.startupCalled = true;
        onload(Cesium);
    }
