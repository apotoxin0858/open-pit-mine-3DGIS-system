  function loadDemYx() {
      var url1 = 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/MathAnalystResult_1@dixing';
      var url2 =  'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/dagushanDOM';
      var url3 = 'http://localhost:8090/iserver/services/3D-kongchangjing/rest/realspace';
      //............加载设计strat..................
//总指挥
      var viewer = new Cesium.Viewer('cesiumContainer', {
        animation: true, //创建动画部件
        shouldAnimate : true
          //   shadows: true,
          //    infoBox: false,
          //    selectionIndicator: false
      });
//添加地形
      var terrainProvider = new Cesium.CesiumTerrainProvider({
        url: url1,
        requestWaterMask: true,
        requestVertexNormals: true,
        isSct: true
      });
      viewer.terrainProvider = terrainProvider;
      Cesium.GroundPrimitive.bottomAltitude = -500;
//添加影像-天地图
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
//添加影像-自己的
      var provider = new Cesium.SuperMapImageryProvider({
          layer: 'dagushanpicture@dagushan',
          url: url2
      });
      var imglayer_yx = imageryLayers.addImageryProvider(provider);
      setTimeout(function() {
        viewer.camera.flyTo({
              destination :Cesium.Cartesian3.fromDegrees(123.059790085227, 41.0514522609158,1520.95949484129),
              orientation: {
                  heading: Cesium.Math.toRadians(355.588685551488),
                  pitch: Cesium.Math.toRadians(-89.9850890883418),
              },
              duration: 6
          });
        //   var layers = viewer.scene.layers.find('WKCZTT');
        //   console.log(layer4);
        //    layers.visibleDistanceMax = 6000;
        //   var layer1 = viewer.scene.layers.find('ptcztt');
        //   // console.log(layer1);
        //   layer1.visibleDistanceMax = 6000;
        //设置不可见
        // var layer8 = scene.layers.find('yh');
        // console.log(layer8);          //获取可见性
        // var isVisible = layer8.visible;
        // //设置不可见
        // layer8.visible = false;
        //   var layer5 = scene.layers.find('sigmaxxx');
        //   console.log(layer5);
        //   //获取可见性
        //   var isVisible = layer5.visible;
        //   //设置不可见
        //   layer5.visible = false;
          var layer6 = scene.layers.find('infodagushan@infotest');
          console.log(layer6);          //获取可见性
          var isVisible = layer6.visible;
          //设置不可见
          layer6.visible = false;
          var layer7 = scene.layers.find('TerrainOSGBnew');
          console.log(layer7);          //获取可见性
          var isVisible = layer7.visible;
          //设置不可见
          layer7.visible = false;
          var layer8 = scene.layers.find('hangdao');
          console.log(layer8);          //获取可见性
          var isVisible = layer8.visible;
          //设置不可见
          layer8.visible = false;
          var layer9 = scene.layers.find('after@xuepo');
          console.log(layer9);          //获取可见性
          var isVisible = layer9.visible;
          //设置不可见
          layer9.visible = false;
          var layer10 = scene.layers.find('ago@xuepo');
          console.log(layer10);          //获取可见性
          var isVisible = layer10.visible;
          //设置不可见
          layer10.visible = false;
      }, 3000);
//添加场景
      var scene = viewer.scene;
      scene.hdrEnabled = true;
      var widget = viewer.cesiumWidget;
      try {
          var promise = scene.open(url3);
          viewer.scene.undergroundMode = true;
          Cesium.when.all(promise, function(layers) {
            for(var i = 0; i<layers.length;i++){
                layers[i].selectEnabled = false;
            };
              setTimeout(function() {
                  scene.camera.flyTo({
                    destination :Cesium.Cartesian3.fromDegrees(123.059790085227, 41.0514522609158,2020.95949484129),
                    orientation: {
                        heading: Cesium.Math.toRadians(355.588685551488),
                        pitch: Cesium.Math.toRadians(-89.9850890883418),
                    }
                  });

              }, 6000);
          }, function(e) {
              if (widget._showRenderLoopErrors) {
                //   var title = '加载SCP失败，请检查网络连接状态或者url地址是否正确？';
                //   widget.showErrorPanel(title, undefined, e);
              }
          }).then(function(){
            });
      } catch (e) {
          if (widget._showRenderLoopErrors) {
              var title = '渲染时发生错误，已停止渲染。';
              widget.showErrorPanel(title, undefined, e);
          }
       };
               var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-Empty/rest/realspace/datas/infodagushan@infotest/config',{
                name : 'infodagushan@infotest'
            });
                var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/buildings/config', {
                name: 'buildings'
            });
                var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/wajueji@kuangshanjixie/config', {
                name: 'wajueji@kuangshanjixie'
            });
                var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/%E6%9D%BF%E6%88%BF@BIM/config', {
                name: '板房@BIM'
            });
                var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/water@lineroad/config', {
                name: 'water@lineroad'
            });
               var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/%E7%82%AE%E5%AD%94@BIM/config', {
                name: '炮孔@BIM'
            });
            var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-DGSosgb/rest/realspace/datas/TerrainOSGBnew/config', {
                name: 'TerrainOSGBnew'
            });
            var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/hangdao/config', {
                name: 'hangdao'
            });
            var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/mm/config', {
                name: 'mm'
            });
            var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/ago@xuepo/config',{
                name : 'ago@xuepo'
            });
            var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/after@xuepo/config',{
                name : 'after@xuepo'
            });
            var userAgent = navigator.userAgent; // 取得浏览器的userAgent字符串
            console.log(userAgent);
            var isWebKit =  navigator.userAgent.indexOf('WebKit') > -1  // 是否是WebKit 内核 
            console.log(isWebKit)  // 返回 true  则是，false  则不是
      //............加载设计end..................
      if (!scene.pickPositionSupported) {
          alert('请使用带谷歌内核浏览器进行浏览！');
      };
      return viewer;
    }