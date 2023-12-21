 //1.................正向计算...................................
 function yanmofenxiZ(viewer) {
           function getRandomColor(){
            return "#"+("00000"+((Math.random()*16777215+0.5)>>0).toString(16)).slice(-6);
            //return "#FF0000FF";
        }
           //创建分层设色对象
        var hyp = new Cesium.HypsometricSetting();
        //设置显示模式
        hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE;
        //设置线颜色为红色
        hyp._lineColor = new Cesium.Color(1.0, 0.0, 0.0, 1.0);
        //设置最大/最小可见高度
        hyp.MinVisibleValue = -400;
        //设置颜色表的最大/最小key值,表示高度
        hyp.ColorTableMinKey = -400;
        hyp.ColorTableMaxKey = 1000;
        //新建颜色表
        var colorTable = new Cesium.ColorTable();
        var height=1;
        //每隔200m向颜色表插入一个随机色
        for(var i= 0;i<90;i++){
            height+=200;
            colorTable.insert(height,getRandomColor());
        }
        //返回随机颜色
        function getRandomColor(){
            return new Cesium.Color(Math.random(),Math.random(),Math.random());
        }
        hyp.ColorTable = colorTable;
        hyp.Opacity = 0.8;
        //等高线间隔为200m
        hyp.LineInterval = 200.0;
                //创建分层设色对象
        var hyp = new Cesium.HypsometricSetting();
        //设置显示模式
        hyp.DisplayMode = Cesium.HypsometricSettingEnum.DisplayMode.FACE;
        //设置线颜色为红色
        hyp._lineColor = new Cesium.Color(1.0, 0.0, 0.0, 1.0);
        //新建颜色表
        var colorTable = new Cesium.ColorTable();
        var height=1;
        //每隔200m向颜色表插入一个随机色
        for(var i= 0;i<90;i++){
            height+=200;
            colorTable.insert(height,getRandomColor());
        }
        //返回随机颜色
        function getRandomColor(){
            return new Cesium.Color(Math.random(),Math.random(),Math.random());
        }
        hyp.ColorTable = colorTable;
        hyp.Opacity = 0.8;
        //等高线间隔为200m
        hyp.LineInterval = 200.0;
        //点击“开始”按钮
        var positions = null;
        //绘制多边形
        // var polygonHandler = new Cesium.DrawHandler(viewer,Cesium.DrawMode.Polygon);
        // polygonHandler.activate();
        // polygonHandler.drawEvt.addEventListener(function(polygon){
        //     var array = [].concat(polygon.object.positions);
        //     positions = [];
        //     for(var i = 0, len = array.length; i < len; i ++){

        //         var cartographic = Cesium.Cartographic.fromCartesian(array[i]);
        //         var longitude = Cesium.Math.toDegrees(cartographic.longitude);
        //         var latitude = Cesium.Math.toDegrees(cartographic.latitude);
        //         var h=cartographic.height;
        //         if(positions.indexOf(longitude)==-1&&positions.indexOf(latitude)==-1){
        //             positions.push(longitude);
        //             positions.push(latitude);
        //             positions.push(h);
        //         }
        //     }
        //     polygonHandler.deactivate();
        //     polygonHandler.activate();
        // });
        function flood(positions){
            currentHeight = 0;
            int = self.setInterval("flood()", 100);
            maxValue = parseInt(document.getElementById("maxHeight").value);
            minValue = parseInt(document.getElementById("minHeight").value);
            hyp.MinVisibleValue = minValue;
            currentHeight = minValue;
            window.flood = function() {
                if(currentHeight > maxValue) {
                    self.clearInterval(int);
                    return;
                }
                hyp.MaxVisibleValue = currentHeight;
                hyp.CoverageArea = positions;
                viewer.scene.globe.HypsometricSetting = {
                    hypsometricSetting : hyp,
                    analysisMode : Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_REGION
                };
                currentHeight += (parseInt(document.getElementById("speed").value))/10;
            }
        }

        document.getElementById("begin").onclick = function() {
            if(!positions){
                var defaultpositions=[123.049001671615,41.0546318134849,422.131674161181,123.050150878882,41.0513531713307,428.898898584768,123.05260246006,41.0493577352598,431.648008151911,123.056172002397,41.0461901301619,427.682929980569,123.062415768966,41.0450938622669,452.865484881215,123.06995239689,41.0482530113144,481.401127242483,123.068365243422,41.0549525565148,487.458155313507,123.064007599664,41.0592284645968,476.1033770293, 123.051472444692,41.0579080310229,445.660870434716,123.049033433854,41.0552113145182,421.565001976676];
                flood(defaultpositions);
                return;
            }
            flood(positions);
            polygonHandler.polygon.show=false;
            polygonHandler.polyline.show=false;
        };

        document.getElementById("clear").onclick = function() {
            self.clearInterval(int);
            hyp.MaxVisibleValue = 0;
            viewer.scene.globe.HypsometricSetting = {
                hypsometricSetting : hyp,
                analysisMode : Cesium.HypsometricSettingEnum.AnalysisRegionMode.ARM_ALL
            }
        };
        $('#toolbar').show();
        $('#loadingbar').remove();
 }
 