    function changeViewerCG(scene,info) {
        console.log(info);
        //...................功能键：switch-case设置被checked的option的方法.................
        switch (info) {
                case '01':
                    scene.camera.flyTo({
                        destination: Cesium.Cartesian3.fromDegrees(123.061044778072,41.0580148103434,620.105772602372),
                        orientation: {
                            heading: Cesium.Math.toRadians(343.787246892486),
                            pitch: Cesium.Math.toRadians(-22.0216389716794),
                        },
    
                    });
                    break;
                case '02':
                    clearInterval
                    scene.camera.flyTo({
                        destination: Cesium.Cartesian3.fromDegrees(123.061086118757,41.0547715825264,367.198995820247),
                        orientation: {
                            heading: Cesium.Math.toRadians(348.608702603958),
                            pitch: Cesium.Math.toRadians(-10.6421690102718),
                        }
                    });
                    break;
                case '03':
                    scene.camera.flyTo({
                        destination: Cesium.Cartesian3.fromDegrees(123.063794361308, 41.058411336886,704.363374847919),
                        orientation: {
                            heading: Cesium.Math.toRadians(344.59262504277),
                            pitch: Cesium.Math.toRadians(-48.1451315260837),
                        }
                    });
                    break;
                case '04':
                    scene.camera.flyTo({
                        destination: Cesium.Cartesian3.fromDegrees(123.058665992532,41.0564540575649,616.654441133142),
                        orientation: {
                            heading: Cesium.Math.toRadians(346.196399291737),
                            pitch: Cesium.Math.toRadians(-43.8942972598686),
                        }
                    });
                    break;
                case '05':
                    scene.camera.flyTo({
                        destination: Cesium.Cartesian3.fromDegrees(123.060475539772, 41.0548661240127,434.059863004833),
                        orientation: {
                            heading: Cesium.Math.toRadians(338.161873519438),
                            pitch: Cesium.Math.toRadians(-38.5174993788065),
                        }
                    });
                    break;
                 case '06':
                    scene.camera.flyTo({
                        destination: Cesium.Cartesian3.fromDegrees(123.060326538157, 41.0550306451385, 440.165348977782),
                        orientation: {
                            heading: Cesium.Math.toRadians(338.161775657965),
                            pitch: Cesium.Math.toRadians(-38.517552496214),
                        }
                    });
                    break;
                case '07':
                    scene.camera.flyTo({
                        destination: Cesium.Cartesian3.fromDegrees(123.062549978595,41.0549986820053,566.172564283945),
                        orientation: {
                            heading: Cesium.Math.toRadians(337.225736002799),
                            pitch: Cesium.Math.toRadians(-44.0186045985568),
                        }
                    });
                    break;
                case '08':
                    scene.camera.flyTo({
                        destination: Cesium.Cartesian3.fromDegrees(123.058963689693, 41.0541685406898, 488.327788153663),
                        orientation: {
                            heading: Cesium.Math.toRadians(327.044809129567),
                            pitch: Cesium.Math.toRadians(-39.393686),
                        }
                    });
                    break;
    }
    };