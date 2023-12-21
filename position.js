function position(viewer,scene,handler){
     //设置鼠标左键单击回调事件
     handler.setInputAction(function(e) {
        //首先移除之前添加的点
        //获取点击位置笛卡尔坐标
        var position = scene.pickPosition(e.position);
        //将笛卡尔坐标转化为经纬度坐标
        var cartographic = Cesium.Cartographic.fromCartesian(position);
        var longitude = Cesium.Math.toDegrees(cartographic.longitude);
        var latitude = Cesium.Math.toDegrees(cartographic.latitude);
        var height = cartographic.height;
        var mineHeight = height - 500;
        console.log(longitude);
        console.log(latitude);
        console.log(longitude.type);
        console.log(latitude.type);
        console.log(height);
        //创建弹出框信息
        var entity = new Cesium.Entity({
            name : "位置信息",
            description : createDescription(Cesium, [longitude, latitude, mineHeight])
        });
        viewer.selectedEntity = entity;
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    //创建描述位置的对话框
    function createDescription(Cesium,properties){
        var simpleStyleIdentifiers = ['经度','纬度','高度'];
        var html = '';
        for ( var key in properties) {
            if (properties.hasOwnProperty(key)) {
                if (simpleStyleIdentifiers.indexOf(key) !== -1) {
                    continue;
                }
                var value = properties[key];
                console.log(value);
                if (Cesium.defined(value) && value !== '') {
                    html += '<tr><td>' + simpleStyleIdentifiers[key] + '</td><td>' + value + '</td></tr>';
                }
            }
        }
        if (html.length > 0) {
            html = '<table id="position" style="position:absolute;top:50px;left:500px;color:yellow;font-size:30px;background-color: lightcoral;"><tr style="text-align:center"><td style="color:black">坐标位置信息</td></tr><tbody>' + html + '</tbody></table>';
            var divArr = document.getElementsByTagName('table');//获取div标签
            var cnt = divArr.length;//获取页面div标签出现的次数
            console.log(cnt)
            if(cnt>0){
                $('#position').remove();
            }else{
                $(html).appendTo('body');
                $('#position').show();
            }
        }
        return html;
    }
};
function clearPosition(handler){
    handler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_CLICK);
    handler.removeInputAction(Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    handler.removeInputAction(Cesium.ScreenSpaceEventType.MOUSE_MOVE);
};