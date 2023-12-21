function clipbox (viewer,scene,clip) {
    document.getElementById(clip)
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