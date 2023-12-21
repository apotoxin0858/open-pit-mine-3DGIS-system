//添加影像功能
function addYx_Insar(viewer) {
    console.log("开始绘制Insar图");
    var urlBegin = "http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/";
    var imaglayersName = ["Insar_horizontal_20171108", "Insar_horizontal_20171120", "Insar_horizontal_20171202", "Insar_horizontal_20171214", "Insar_horizontal_20171226", "Insar_horizontal_20180107", "Insar_horizontal_20180119", "Insar_horizontal_20180131", "Insar_horizontal_20180212", "Insar_horizontal_20180224", "Insar_horizontal_20180308","Insar_horizontal_20180320","Insar_horizontal_20180401","Insar_horizontal_20180413","Insar_horizontal_20180425","Insar_horizontal_20180507","Insar_horizontal_20180519","Insar_horizontal_20180624","Insar_horizontal_20180718","Insar_horizontal_20180730","Insar_horizontal_20180811","Insar_horizontal_20180904","Insar_horizontal_20180916","Insar_horizontal_20180928","Insar_horizontal_20181010","Insar_horizontal_20181022"];

    var imageryLayers = viewer.imageryLayers;
    for (var i = 0; i < imaglayersName.length; i++) {
        var urlyx = urlBegin + imaglayersName[i];
        var provider = new Cesium.SuperMapImageryProvider({
            url: urlyx,
            layer: imaglayersName[i]
        });
        var layer = imageryLayers.addImageryProvider(provider);
    };

};
//删除影像功能
function deleYx_Insar(viewer) {
    viewer.scene.imageryLayers.removeAll();
    viewer.imageryLayers.addImageryProvider(new Cesium.TiandituImageryProvider({
        credit: new Cesium.Credit('天地图全球影像服务     数据来源：国家地理信息公共服务平台 & 四川省测绘地理信息局'),
        token: URL_CONFIG.TOKEN_TIANDITU,
    }));
    var imageryLayers = viewer.imageryLayers;
    var labelImagery = new Cesium.TiandituImageryProvider({
        mapStyle: Cesium.TiandituMapsStyle.CIA_C,
        token: URL_CONFIG.TOKEN_TIANDITU
    });
    imageryLayers.addImageryProvider(labelImagery);
    var url2 = 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/dagushanDOM';
    var provider = new Cesium.SuperMapImageryProvider({
        layer: 'dagushanDOM',
        url: url2
    });
    var layer = imageryLayers.addImageryProvider(provider);
};