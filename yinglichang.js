function yinglichang (viewer,scene) {
      var layer = scene.layers.find('yinglichang');         
             var hyp = new Cesium.HypsometricSetting(); 
            var color = new Cesium.ColorTable();     
            color.insert(layer._fMaxValue, new Cesium.Color(210/255, 15/255, 15/255));
            // color.insert(2*(layer._fMinValue+layer._fMaxValue)/3.0, new Cesium.Color(221/255, 224/255, 7/255));
            // color.insert((layer._fMinValue+layer._fMaxValue)/2.0, new Cesium.Color(20/255, 187/255, 18/255));
            // color.insert((layer._fMinValue+layer._fMaxValue)/4.0, new Cesium.Color(0, 161/255, 1));
            color.insert((layer._fMinValue+layer._fMaxValue)/2.0, Cesium.Color.GREEM);
            color.insert((layer._fMinValue+layer._fMaxValue)/3.0, Cesium.Color.YELLOW);
            color.insert((layer._fMinValue+layer._fMaxValue)/4.0, Cesium.Color.BLUE);
            color.insert((layer._fMinValue+layer._fMaxValue)/5.0, Cesium.Color.PINK);
            color.insert((layer._fMinValue+layer._fMaxValue)/6.0, Cesium.Color.PURPLE); 
            color.insert((layer._fMinValue+layer._fMaxValue)/7.0, Cesium.Color.RED);         
            color.insert(layer._fMinValue, new Cesium.Color(9/255, 9/255, 212/255));
               
            hyp.ColorTable = color;
            hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE;
            hyp.Opacity = 0.618;
           
            hyp.ColorTableMaxKey = layer._fMaxValue;
            hyp.ColorTableMinKey = layer._fMinValue;
            hyp.MaxVisibleValue = layer._fMaxValue;
            hyp.MinVisibleValue = layer._fMinValue;
            layer.hypsometricSetting = { //设置图层分层设色属性
                hypsometricSetting : hyp,
                analysisMode : Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
            };
            clipbox(viewer,scene);
}
function clipbox (viewer,scene) {
    var clip = '<div id="toolbar" class="param-container tool-bar" style="position:absolute;top:80px;left:350px"><button type="button" id="polygon" class="button black">绘制裁剪面</button><button type="button" id="clear" class="button black">清除</button></div>'
    $(clip).appendTo('#thirdMenu');
     var layer = scene.layers.find('yinglichang');
    viewer.scene.undergroundMode = true; 
     var BIMLayer;
      layer.clipLineColor = new Cesium.Color(1,1,1,0);
      BIMLayer = layer;
              var clampMode = 0;
        var tooltip = createTooltip(document.body);
        

        var handlerPolygon = new Cesium.DrawHandler(viewer,Cesium.DrawMode.Polygon,clampMode);
        handlerPolygon.activeEvt.addEventListener(function(isActive){
            if(isActive == true){
                viewer.enableCursorStyle = false;
                viewer._element.style.cursor = '';
                $('#thirdMenu').removeClass('drawCur').addClass('drawCur');
            }
            else{
                viewer.enableCursorStyle = true;
                $('#thirdMenu').removeClass('drawCur');
            }
        });
        handlerPolygon.movingEvt.addEventListener(function(windowPosition){
            if(handlerPolygon.isDrawing){
                tooltip.showAt(windowPosition,'<p>点击确定多边形中间点</p><p>绘制三点即可</p><p>右键单击结束绘制</p>');
            }
            else{
                tooltip.showAt(windowPosition,'<p>点击绘制第一个点</p>');
            }
        });
        handlerPolygon.drawEvt.addEventListener(function(result){
            tooltip.setVisible(false);
            handlerPolygon.polygon.show = false;
            var positions = result.object.positions;
            //通过多边形的顶点设置裁剪面，裁剪方向为裁剪面的法线方向
            BIMLayer.setCustomClipPlane(positions[0],positions[1],positions[2]);
        });

        $('#polygon').click(function(){
            handlerPolygon.activate();
        });

        $('#clear').click(function(){
            handlerPolygon.clear();
            //清除裁剪结果
            BIMLayer.clearCustomClipBox();
        });
        $('#toolbar').show();
        $('#loadingbar').remove();
        if(!scene.pickPositionSupported){
            alert('不支持深度拾取,无法进行鼠标交互绘制！');
        }
}