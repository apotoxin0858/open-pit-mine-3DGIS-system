 function measure(viewer) {

     //.................全局变量...............................
     var clampMode = 0; // 空间模式
     var handlerDis, handlerArea, handlerHeight;

     //.................测算代码设计核心...............................
     //初始化测量距离
     handlerDis = new Cesium.MeasureHandler(viewer, Cesium.MeasureMode.Distance, clampMode);
     //注册测距功能事件
     handlerDis.measureEvt.addEventListener(function(result) {

         var dis = Number(result.distance);
         var distance = dis > 1000 ? (dis / 1000).toFixed(2) + 'km' : dis.toFixed(2) + 'm';
         handlerDis.disLabel.text = '距离:' + distance;

     });
     handlerDis.activeEvt.addEventListener(function(isActive) {

         if (isActive == true) {
             viewer.enableCursorStyle = false;
             viewer._element.style.cursor = '';
             $('body').removeClass('measureCur').addClass('measureCur');
         } else {
             viewer.enableCursorStyle = true;
             $('body').removeClass('measureCur');
         }
     });
     //初始化测量面积
     handlerArea = new Cesium.MeasureHandler(viewer, Cesium.MeasureMode.Area, Cesium.ClampMode.Ground);
     handlerArea.measureEvt.addEventListener(function(result) {

         var mj = Number(result.area);
         var area = mj > 1000000 ? (mj / 1000000).toFixed(2) + 'km2' : mj.toFixed(2) + '㎡'
         handlerArea.areaLabel.text = '面积:' + area;
     });
     handlerArea.activeEvt.addEventListener(function(isActive) {
         if (isActive == true) {
             viewer.enableCursorStyle = false;
             viewer._element.style.cursor = '';
             $('body').removeClass('measureCur').addClass('measureCur');
         } else {
             viewer.enableCursorStyle = true;
             $('body').removeClass('measureCur');
         }
     });
     //初始化测量高度
     handlerHeight = new Cesium.MeasureHandler(viewer, Cesium.MeasureMode.DVH);
     handlerHeight.measureEvt.addEventListener(function(result) {

         var distance = result.distance > 1000 ? (result.distance / 1000).toFixed(2) + 'km' : result.distance + 'm';
         var vHeight = result.verticalHeight > 1000 ? (result.verticalHeight / 1000).toFixed(2) + 'km' : result.verticalHeight + 'm';
         var hDistance = result.horizontalDistance > 1000 ? (result.horizontalDistance / 1000).toFixed(2) + 'km' : result.horizontalDistance + 'm';
         handlerHeight.disLabel.text = '空间距离:' + distance;
         handlerHeight.vLabel.text = '垂直高度:' + vHeight;
         handlerHeight.hLabel.text = '水平距离:' + hDistance;
     });
     handlerHeight.activeEvt.addEventListener(function(isActive) {
         if (isActive == true) {
             viewer.enableCursorStyle = false;
             viewer._element.style.cursor = '';
             $('body').removeClass('measureCur').addClass('measureCur');
         } else {
             viewer.enableCursorStyle = true;
             $('body').removeClass('measureCur');
         }
     });

     //.................按钮单击事件注册........................

     $("body").on('click', "#distance", function(e) {
         deactiveAll();
         handlerDis && handlerDis.activate();
         e.stopPropagation();
     });

     $("body").on('click', "#area", function(e) {
         deactiveAll();
         handlerArea && handlerArea.activate();
         e.stopPropagation();
     });
     $("body").on('click', "#height", function(e) {
         deactiveAll();
         handlerHeight && handlerHeight.activate();
         e.stopPropagation();
     });
     $("body").on('click', "#clear", function(e) {
         clearAll();
         e.stopPropagation();
     });
     //................调用函数...................
     function clearAll() {
         handlerDis && handlerDis.clear();
         handlerArea && handlerArea.clear();
         handlerHeight && handlerHeight.clear(); //clear不仅能够将图元删除，还能够将对象删除
     };

     function deactiveAll() {
         handlerDis && handlerDis.deactivate();
         handlerArea && handlerArea.deactivate();
         handlerHeight && handlerHeight.deactivate();
     }
 };