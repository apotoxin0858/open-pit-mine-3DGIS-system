function(viewer){
                    //加载kml文件
                viewer.dataSources.add(Cesium.KmlDataSource.load('./kml/zhuangxie.kml',{
                    camera : scene.camera,
                    canvas : scene.canvas
                })).then(function(kmlDatasource){
                    var entity = kmlDatasource.entities.values[0];
                    if(entity.path){
                        entity.path.show = false;
                    }
                });
};