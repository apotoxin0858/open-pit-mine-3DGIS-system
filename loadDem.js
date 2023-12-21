   //................................飞......................................
  function loadDemYx_fly() {
      var url0='http://localhost:8090/iserver/services/3D-kongchangjing/rest/realspace';
      var url1 = 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/dagushan@dixing';
      var url2 = 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/dagushanpicture@dagushan';
      var url3 = 'http://localhost:8090/iserver/services/3D-Empty/rest/realspace/datas/infodagushan@infotest/config';
      var url4 = 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/lineroad@lineroad/config'
      var url5 = 'http://localhost:8090/iserver/services/3D-power/rest/realspace/datas/yh/config';
      var url6 = 'http://localhost:8090/iserver/services/3D-DGSyingli/rest/realspace/datas/yinglichang/config';
      var url7 = 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/%E5%8A%9E%E5%85%AC%E5%AE%A4@BIM/config';
      var url8 = 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/%E5%8A%9E%E5%85%AC%E5%AE%A42@BIM/config';
      var url9 = 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/%E7%AE%A1%E7%BA%BF@BIM/config';
      var url10 = 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/%E6%9D%BF%E6%88%BF@BIM/config'
      //............加载设计strat..................

      var viewer = new Cesium.Viewer('cesiumContainer', {
          //   shadows: true,
          //    infoBox: false,
          //    selectionIndicator: false
      });

      var terrainProvider = new Cesium.CesiumTerrainProvider({
          url: url1,
          //    requestWaterMask: true,
          requestVertexNormals: true,
          isSct: true
      });
      viewer.terrainProvider = terrainProvider;
      Cesium.GroundPrimitive.bottomAltitude = -500;
      viewer.imageryLayers.addImageryProvider(new Cesium.TiandituImageryProvider({
          credit: new Cesium.Credit('天地图全球影像服务     数据来源：国家地理信息公共服务平台 & 四川省测绘地理信息局'),
          token: URL_CONFIG.TOKEN_TIANDITU,
      }));
      var imageryLayers = viewer.imageryLayers;
      var labelImagery = new Cesium.TiandituImageryProvider({

          mapStyle: Cesium.TiandituMapsStyle.CIA_C,
          token: URL_CONFIG.TOKEN_TIANDITU
      });
      var imgLayer_tianditu = imageryLayers.addImageryProvider(labelImagery);

      var provider = new Cesium.SuperMapImageryProvider({
          layer: 'dagushanpicture@dagushan',
          url: url2
      });
      var imglayer_yx = imageryLayers.addImageryProvider(provider);

      setTimeout(function() {
          viewer.flyTo(imglayer_yx, {
              duration: 10
          })
      }, 3000);

      var scene = viewer.scene;
      scene.hdrEnabled = true;
      var widget = viewer.cesiumWidget;
      
      try {
            //     var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-Empty/rest/realspace/datas/infodagushan@infotest/config',{
            //     name : 'infodagushan@infotest'
            // });
            //     var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-power/rest/realspace/datas/yh/config',{
            //     name : 'power@weizhen#1'
            // });
            //     var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-DGSyingli/rest/realspace/datas/yinglichang/config',{
            //     name : 'yinglichang'
            // });
            //     var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/%E5%8A%9E%E5%85%AC%E5%AE%A4@BIM/config', {
            //     name: '办公室@BIM'
            // });
            //     var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/%E5%8A%9E%E5%85%AC%E5%AE%A42@BIM/config', {
            //     name: '办公室2@BIM'
            // });
            //     var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/%E7%AE%A1%E7%BA%BF@BIM/config', {
            //     name: '管线@BIM'
            // });
            //     var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/%E6%9D%BF%E6%88%BF@BIM/config', {
            //     name: '板房@BIM'
            // });
            //     var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/paituchang@BIM/config', {
            //     name: 'paituchang@BIM'
            // }); 
            //     var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/pttbim/config', {
            //     name: 'pttbim'
            // });
            //     var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/water@BIM/config', {
            //     name: 'water@BIM'
            // });
            //    var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/%E7%82%AE%E5%AD%94@BIM/config', {
            //     name: '炮孔@BIM'
            // });

            //    var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/xuanchang/config', {
            //     name: 'xuanchang'
            // });
            //   var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/wajueji@kuangshanjixie/config', {
            //     name: 'wajueji@kuangshanjixie'
            // });
               
            //    var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/pttztt/config', {
            //     name: 'pttztt'
            // });
            //    var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/%E5%B0%BE%E7%9F%BF%E6%B1%A0@BIM/config', {
            //     name: '尾矿池@BIM'
            // });       
          var promise = scene.open(url0);
          viewer.scene.undergroundMode = true;
          Cesium.when.all(promise, function(layers) {
             var layerztt = viewer.scene.layers.find('pttztt');
               console.log(layerztt);
               console.log(viewewr.scene)
                     layerztt.maxVisibleAltitude = 500;
              setTimeout(function() {
                  scene.camera.flyTo({
                      destination: Cesium.Cartesian3.fromDegrees(108.139291712302, 33.170539961401, 19263849.6216055),
                      orientation: {
                          heading: Cesium.Math.toRadians(358.907963416713),
                          pitch: Cesium.Math.toRadians(-89.9999999999987),
                      }
                  });
              }, 15000);
            
    
              

          }, function(e) {
              // if (widget._showRenderLoopErrors) {
              //     var title = '加载SCP失败，请检查网络连接状态或者url地址是否正确？';
              //     widget.showErrorPanel(title, undefined, e);
              // }
          });
      } catch (e) {
          if (widget._showRenderLoopErrors) {
              // var title = '渲染时发生错误，已停止渲染。';
              // widget.showErrorPanel(title, undefined, e);
          }

      
      //............加载设计end..................
      if (!scene.pickPositionSupported) {
          alert('不支持深度纹理,无法绘制多边形,线段，地形修改功能无法使用！');
      };
      return viewer;

  };
};
  //  //。。。。。。。。。。。。。。。。。。。。。。。。定位。。。。。。。。。。。。。。。。。。。
  // function loadDemYx_set() {
  //     var url1 = 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/dagushan@dixing';
  //     var url2 = 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/dagushanpicture@dagushan';
  //     var url3 = 'http://localhost:8090/iserver/services/3D-Empty/rest/realspace/datas/infodagushan@infotest/config';
  //     var url4 = 'http://localhost:8090/iserver/services/3D-dagushanproject/rest/realspace/datas/lineroad@lineroad/config'
  //     //............加载设计strat..................


  //       var viewer = new Cesium.Viewer('cesiumContainer', {
  //         //   shadows: true,
  //         //    infoBox: false,
  //         //    selectionIndicator: false
  //     });

  //    var terrainProvider = new Cesium.CesiumTerrainProvider({
  //         url: url1,
  //         //    requestWaterMask: true,
  //         requestVertexNormals: true,
  //         isSct: true
  //     });
  //     viewer.terrainProvider = terrainProvider;
  //     Cesium.GroundPrimitive.bottomAltitude = -500;
  //     viewer.imageryLayers.addImageryProvider(new Cesium.TiandituImageryProvider({
  //         credit: new Cesium.Credit('天地图全球影像服务     数据来源：国家地理信息公共服务平台 & 四川省测绘地理信息局'),
  //         token: URL_CONFIG.TOKEN_TIANDITU,
  //     }));
  //     var imageryLayers = viewer.imageryLayers;
  //     var labelImagery = new Cesium.TiandituImageryProvider({

  //         mapStyle: Cesium.TiandituMapsStyle.CIA_C,
  //         token: URL_CONFIG.TOKEN_TIANDITU
  //     });
  //     var imgLayer_tianditu = imageryLayers.addImageryProvider(labelImagery);

  //     var provider = new Cesium.SuperMapImageryProvider({
  //         layer: 'dagushanpicture@dagushan',
  //         url: url2
  //     });
  //     var imglayer_yx = imageryLayers.addImageryProvider(provider);

  //     var scene = viewer.scene;
  //     scene.hdrEnabled = true; // 开启hdr
  //     var widget = viewer.cesiumWidget;
  //     try {
  //         var promise = scene.open(url0);
  //         viewer.scene.undergroundMode = true;
  //         Cesium.when.all(promise, function(layers) {
  //                 scene.camera.setView({
  //                     destination: Cesium.Cartesian3.fromDegrees(123.056826937604, 41.0426534220638, 486.811985751614),
  //                     orientation: {
  //                         heading: Cesium.Math.toRadians(49.9308131902922),
  //                         pitch: Cesium.Math.toRadians(-15.496370685788),
  //                     }
  //                 });

  //             },
  //             function(e) {
  //                 if (widget._showRenderLoopErrors) {
  //                     var title = '加载SCP失败，请检查网络连接状态或者url地址是否正确？';
  //                     widget.showErrorPanel(title, undefined, e);
  //                 }
  //             });
  //     } catch (e) {
  //         if (widget._showRenderLoopErrors) {
  //             var title = '渲染时发生错误，已停止渲染。';
  //             widget.showErrorPanel(title, undefined, e);
  //         }
  //     };
  //     //............加载设计end..................
  //     if (!scene.pickPositionSupported) {
  //         alert('不支持深度纹理,无法绘制多边形，地形修改功能无法使用！');
  //     };
  //     return viewer;
  // };

 
