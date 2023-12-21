function addS3mLayer(scene) {
    //3D-Rodes--- Trainrode

    var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-bimtest/rest/realspace/datas/MakerResult@BIM/config', {
        name: 'trainrode'
    });
    // promise.then(function(layer) {
    //     layer.visible = true;
    // });
    // //3D-Build-buildings
    // var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-SceneEntity/rest/realspace/datas/bwg/config', {
    //     name: 'bwg'
    // });
    // promise.then(function(layer) {
    //     layer.visible = true;
    // });
    // var promise = scene.addS3MTilesLayerByScp(' http://localhost:8090/iserver/services/3D-SceneEntity/rest/realspace/datas/jituan/config', {
    //     name: 'jituan'
    // });
    // promise.then(function(layer) {
    //     layer.visible = true;
    // });
    // var promise = scene.addS3MTilesLayerByScp(' http://localhost:8090/iserver/services/3D-SceneEntity/rest/realspace/datas/kuangwuju/config', {
    //     name: 'kuangwuju'
    // });
    // promise.then(function(layer) {
    //     layer.visible = true;
    // });
    // var promise = scene.addS3MTilesLayerByScp(' http://localhost:8090/iserver/services/3D-SceneEntity/rest/realspace/datas/hospital/config', {
    //     name: 'hospital'
    // });
    // promise.then(function(layer) {
    //     layer.visible = true;
    // });

    // var promise = scene.addS3MTilesLayerByScp(' http://localhost:8090/iserver/services/3D-SceneEntity/rest/realspace/datas/gaolucu/config', {
    //     name: 'gaolucu'
    // });
    // promise.then(function(layer) {
    //     layer.visible = true;
    // });
    // var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-SceneEntity/rest/realspace/datas/gaoluxi/config', {
    //     name: 'gaoluxi'
    // });
    // promise.then(function(layer) {
    //     layer.visible = true;
    // });
    // //3D-bz
    // var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-SceneEntity/rest/realspace/datas/bznine/config', {
    //     name: 'jiuduan'
    // });
    // promise.then(function(layer) {
    //     layer.visible = true;
    // });
    // var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-SceneEntity/rest/realspace/datas/bzsixseven/config', {
    //     name: 'liushiqi'
    // });
    // promise.then(function(layer) {
    //     layer.visible = true;
    // });
    // var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-SceneEntity/rest/realspace/datas/bzkengxia/config', {
    //     name: 'daopai'
    // });
    // promise.then(function(layer) {
    //     layer.visible = true;
    // });
    // var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-SceneEntity/rest/realspace/datas/bzmajiazi/config', {
    //     name: 'majiazi'
    // });
    // promise.then(function(layer) {
    //     layer.visible = true;
    // });
    // var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-SceneEntity/rest/realspace/datas/bzshiwu/config', {
    //     name: 'shiwu'
    // });
    // promise.then(function(layer) {
    //     layer.visible = true;
    // });
    // var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-SceneEntity/rest/realspace/datas/bzzhengjiu/config', {
    //     name: 'zhengjiu'
    // });
    // promise.then(function(layer) {
    //     layer.visible = true;
    // });
    // var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-SceneEntity/rest/realspace/datas/bzershiba/config', {
    //     name: 'ershiba'
    // });
    // promise.then(function(layer) {
    //     layer.visible = true;
    // });


    // //3D-AllModels---mesh OpenPit
    // var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-SceneEntity/rest/realspace/datas/meshNew/config', {
    //     name: 'mesh'
    // });
    // promise.then(function(layer) {
    //     layer.visible = false;
    // });
    // var promise = scene.addS3MTilesLayerByScp('http://localhost:8090/iserver/services/3D-SceneEntity/rest/realspace/datas/openPitNew/config', {
    //     name: 'openPit'
    // });
    // promise.then(function(layer) {
    //     layer.visible = false;
    // });

    //3D--models


};
//下拉菜单改变视角同时查询泵站信息strat
function changeViewer(scene) {
    //...................功能键：switch-case设置被checked的option的方法.................
    var lable_bzInfo = '<div id="bubble_bz" class="param-container tool-bar" style="bottom:0;left:82%;display:none;"> <div id="tools" style="text-align : right"> <span title="关闭" id="close"> <img src="./images/close.gif" style="height: 20%;width: 20%"> </span> </div> <div style="overflow-y:hidden;height:1000px;width:fit-content" id="tableContainer" style="bottom:0;left:82%;display:none;"></div> </div>';
    $(lable_bzInfo).appendTo('#firstMenu');
    $("body").on('click', "[id='buildings']", function() {
        var selectedOption = $('#buildings option:selected');
        var value = selectedOption.val();
        switch (value) {
            case '01':
                scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(123.050424485562,41.0549171854826,593.705442497507),
                    orientation: {
                        heading: Cesium.Math.toRadians(318.467772203043),
                        pitch: Cesium.Math.toRadians(-28.2508466658415),
                    },

                });
                break;
            case '02':
                clearInterval
                scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(123.053081132184,41.0523134656985, 449.691445985809),
                    orientation: {
                        heading: Cesium.Math.toRadians(310.777439741716),
                        pitch: Cesium.Math.toRadians(-18.1418548190285),
                    }
                });
                break;
            case '03':
                scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(123.06010724406, 41.0514261698449, 236.316777078435),
                    orientation: {
                        heading: Cesium.Math.toRadians(359.398125606266),
                        pitch: Cesium.Math.toRadians(-9.88862781911337),
                    }
                });
                break;
            case '04':
                scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(123.058860130512,41.0503124722668, 282.332295141183),
                    orientation: {
                        heading: Cesium.Math.toRadians(269.054222087461),
                        pitch: Cesium.Math.toRadians(-26.1180843381984),
                    }
                });
                break;
            case '05':
                scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(123.064511469291, 41.0510025571685, 451.048176772892),
                    orientation: {
                        heading: Cesium.Math.toRadians(22.9204123636006),
                        pitch: Cesium.Math.toRadians(-58.0114245453453),
                    }
                });
                break;
             case '06':
                scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(123.098306806045, 41.0647592691279, 1105.96916525718),
                    orientation: {
                        heading: Cesium.Math.toRadians(51.8257907011389),
                        pitch: Cesium.Math.toRadians(-6.74756649488661),
                    }
                });
                break;
            case '07':
                scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(123.077356154445, 41.0452064631385, 605.690328798257),
                    orientation: {
                        heading: Cesium.Math.toRadians(24.6374011840654),
                        pitch: Cesium.Math.toRadians(-41.2514653691056),
                    }
                });
                break;
            case '08':
                scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(123.055736777011,41.0523787663644,490.506534147076),
                    orientation: {
                        heading: Cesium.Math.toRadians(338.962332534635),
                        pitch: Cesium.Math.toRadians(-11.7500767051828),
                    }
                });
                break;
            case '09':
                scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(123.064622931173,41.0493656891859,1242.5480108019),
                    orientation: {
                        heading: Cesium.Math.toRadians(50.4694556841119),
                        pitch: Cesium.Math.toRadians(-89.9999868255693),
                    }
                });
                break;
            case '10':
                scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(123.063534661466,41.0503445144356,1242.54814047832),
                    orientation: {
                        heading: Cesium.Math.toRadians(51.0028656699866),
                        pitch: Cesium.Math.toRadians(-89.9999347563295),
                    }
                    });
                break;
            case '11':
                scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(123.062822004005,41.0511685861876,1242.54814055283),
                    orientation: {
                        heading: Cesium.Math.toRadians(51.0023976797641),
                        pitch: Cesium.Math.toRadians(-89.9999347557294),
                        }
                        });
                break;
            case '12':
                scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(123.061153531545,41.0513386264754,1242.54814106505),
                    orientation: {
                        heading: Cesium.Math.toRadians(51.001301981787),
                        pitch: Cesium.Math.toRadians(-89.9999347540413),
                            }
                            });
                break;
            case '13':
                scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(123.061575268992,41.0531922593799,1967.43616235163),
                    orientation: {
                        heading: Cesium.Math.toRadians(51.0015789756783),
                        pitch: Cesium.Math.toRadians(-89.9993541861992),
                            }
                            });
                break;
            case '14':
                scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(123.059532770145,41.0522290505465,1186.81265737116),
                    orientation: {
                        heading: Cesium.Math.toRadians(51.0012377161523),
                        pitch: Cesium.Math.toRadians(-89.9992611530802),
                                }
                                });
                break;
            case '15':
                scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(123.060226789309,41.0540859393765,2183.14733213),
                    orientation: {
                        heading: Cesium.Math.toRadians(51.001567432726),
                        pitch: Cesium.Math.toRadians(-89.9993543328037),
                                }
                                });
                break;
            case '16':
                scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(123.057949686597,41.054402289324,1846.91347694024),
                    orientation: {
                        heading: Cesium.Math.toRadians(51.000686074131),
                        pitch: Cesium.Math.toRadians(-89.9989006993845),
                                }
                                });
                break;
            case '17':
                scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(123.057629663686,41.0552245511385,1983.39005619567),
                    orientation: {
                        heading: Cesium.Math.toRadians(51.0001750205393),
                        pitch: Cesium.Math.toRadians(-89.9991229753854),
                                }
                                });
                break;
            case '18':
                scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(123.053362603286,41.0537787418242,1203.18738501333),
                    orientation: {
                        heading: Cesium.Math.toRadians(50.9993093477786),
                        pitch: Cesium.Math.toRadians(-89.9976922305624),
                                }
                                });
                break;
            case '19':
                scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(123.05233173053,41.0543010582553,1064.87880393676),
                    orientation: {
                        heading: Cesium.Math.toRadians(50.9989695457016),
                        pitch: Cesium.Math.toRadians(-89.9974431638609),
                                }
                                });
                break;
            case '20':
                scene.camera.flyTo({
                    destination: Cesium.Cartesian3.fromDegrees(123.050744551336,41.0546763451199,1005.70610035025),
                    orientation: {
                    heading: Cesium.Math.toRadians(50.997983511559),
                    pitch: Cesium.Math.toRadians(-89.9974015216376),
                                }
                                });
                break;
        };
    });
};
//..............根据泵站查询数据start...................
function bzQuery(sql) {

    var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
    getFeatureParam = new SuperMap.REST.FilterParameter({
        attributeFilter: 'id=' + '\"' + sql + '\"' + ' or ' + "SmID =" + '\"' + "1" + '\"'
    });

    getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
        queryParameter: getFeatureParam,
        toIndex: -1,
        datasetNames: ["HydrogeologyInfo:" + "bzInfo"]
    });
    var url = 'http://localhost:8090/iserver/services/data-GeologyInfo/rest/data';
    getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(url, {
        eventListeners: {
            "processCompleted": onQueryComplete_bz,
            "processFailed": processFailed
        }
    });
    getFeatureBySQLService.processAsync(getFeatureBySQLParams);
};

function processFailed(queryEventArgs) {
    console.log('查询失败！');

};

function onQueryComplete_bz(queryEventArgs) {

    if ($('#tableContainer_bz').children("table").length > 0) {
        $('#tableContainer_bz').children("table").remove();
    };
    var selectedFeatures = queryEventArgs.originResult.features;

    var feature0 = selectedFeatures[0];
    if (selectedFeatures.length == 1) {
        console.log('查询字段有误');
    } else {

        for (var i = 1; i < selectedFeatures.length; i++) {
            var feature = selectedFeatures[i];
            var id = feature.fieldValues["2"];
            for (var j = 3; j < feature.fieldNames.length; j++) {
                var index = j.toString();
                if (j == 3) {
                    var info = '<table id=‘bz’ border="3"  align="center" width="fit-content" height="300px" ><tbody>' + '<tr><th>' + feature0.fieldValues["3"] + '</th><td align="center">' + feature.fieldValues["3"] + '</td></tr>';
                } else if (j == 4 || j == 5 || j == 6) {
                    string = String(Number(feature.fieldValues[index]).toFixed(1));
                    info += '<tr><th>' + feature0.fieldValues[index] + '</th><td align="center">' + string + '</td></tr>';
                } else if (j == 7) {
                    info += '<tr><th>' + feature0.fieldValues[index] + '</th><td align="center">' + feature.fieldValues[index] + '</td></tr>';
                } else if (j == 10) {
                    info += '<tr><th>' + feature0.fieldValues[index] + '</th><td align="center">' + '<img  src=' + '\"' + './image/shuiwen/bz/' + feature.fieldValues["10"] + '.jpg' + '\"' + 'width=' + '\"' + '100%' + '\"' + 'height=' + '\"' + '70%' + '\"' + '\"' + 'auto' + '\"' + '>' + '</td></tr>';
                } else if (j == 11) {
                    info += '<tr><th>' + feature0.fieldValues[index] + '</th><td>' + '<img  src=' + '\"' + './image/shuiwen/bz/' + feature.fieldValues["11"] + '.jpg' + '\"' + 'width=' + '\"' + '100%' + '\"' + 'height=' + '\"' + '70%' + '\"' + '\"' + 'auto' + '\"' + '>' + '</td></tr>' + "</tbody></table>";
                }
            };

            var obj = $(info);
            $('#tableContainer_bz').append(obj);
        };
    };
    $("#bubble_bz").show();



};
//..............根据泵站查询数据end.................

function changeViewer_bz(scene, id) {
    if ($('#bubble_bz').length > 0) {
        $('#bubble_bz').remove();
    };

    var lable_bzInfo = '<div id="bubble_bz" class="param-container tool-bar" style="bottom:0;left:82%;display:none;"> <div id="tools" style="text-align : right"> <span title="关闭" id="close"> <img src="./images/close.gif" style="height: 20%;width: 20%"> </span> </div> <div style="overflow-y:hidden;height:1000px;width:fit-content" id="tableContainer_bz" style="bottom:0;left:82%;display:none;"></div> </div>';
    $(lable_bzInfo).appendTo('#eightthMenu');
    $("#close").click(function() { // 关闭气泡
        $("#bubble_bz").hide();
    });
    var bz_id = id.split("_")[1];
    switch (bz_id) {
        case 'jiuduan':
            scene.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(123.916683240339, 41.8467223428631, 29.2810585387051),
                orientation: {
                    heading: Cesium.Math.toRadians(335.893184496389),
                    pitch: Cesium.Math.toRadians(-8.3754100816089),
                },
                complete: bzQuery('jiuduan'),
            });

            break;
        case 'liushiqi':
            scene.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(123.903744188192, 41.838488102421, 106.492226584814),
                orientation: {
                    heading: Cesium.Math.toRadians(93.4983935317944),
                    pitch: Cesium.Math.toRadians(-11.7505437454583),
                },
                complete: bzQuery('liushiqi'),
            });

            break;
        case 'daopai':
            scene.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(123.885808955577, 41.8414623553198, 2.85066053830087),
                orientation: {
                    heading: Cesium.Math.toRadians(76.2030854004528),
                    pitch: Cesium.Math.toRadians(-25.2633979160406),
                },
                complete: bzQuery('daopai'),
            });

            break;
        case 'majiazi':
            scene.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(123.843153737503, 41.835114587648, 107.317340342328),
                orientation: {
                    heading: Cesium.Math.toRadians(26.5176328016501),
                    pitch: Cesium.Math.toRadians(-28.5738245784536),
                },
                complete: bzQuery('majiazi'),
            });

            break;
        case 'shiwu':
            scene.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(123.913784654992, 41.84620730942, 7.28410966508091),
                orientation: {
                    heading: Cesium.Math.toRadians(318.868446208227),
                    pitch: Cesium.Math.toRadians(-11.0233218116317),
                },
                complete: bzQuery('shiwu'),
            });

            break;
        case 'zhengjiu':
            scene.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(123.84925528181, 41.8409593538467, 77.2444640053436),
                orientation: {
                    heading: Cesium.Math.toRadians(212.277193112963),
                    pitch: Cesium.Math.toRadians(-12.948825181213),
                },
                complete: bzQuery('zhengjiu'),
            });

            break;
        case 'ershiba':
            scene.camera.flyTo({
                destination: Cesium.Cartesian3.fromDegrees(123.872994943108, 41.8491702636162, 79.2224561022595),
                orientation: {
                    heading: Cesium.Math.toRadians(71.7855156002418),
                    pitch: Cesium.Math.toRadians(-5.40901433874271),
                },
                complete: bzQuery('ershiba'),
            });
            break;
    };

};