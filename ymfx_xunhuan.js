 //...................循环计算体积计算的核心代码..............
 function calculate(viewer) {

     var count = 1; //计数器..记录加载的数据个数
     //.........................................按钮功能设计...............................................
     $("body").on('click', "[id='beginF']", function() {
        $.messager.alert('消息框','开始计算!','info');
         var maxValue = parseInt(document.getElementById("maxHeightF").value);
         var interval = parseInt(document.getElementById("intervalF").value);
         var minValue = parseInt(document.getElementById("minHeightF").value);
         var speed_ini = parseInt(document.getElementById("speed_ini").value);
         var speed_zf = parseFloat(document.getElementById("speed_zf").value);
         volum(minValue, maxValue, interval, count, speed_ini, speed_zf);
     });
     $("body").on('click', "[id='delet']", function() {
        $.ajax({
            url: "./php/deleteyanmo.php",
            type: "post",
            dataType: "json",
            success: function(data) {

                if (data) {
                    $.messager.progress({
                        title:'清除数据完毕',
                    });
                    setTimeout(function() {
                        $.messager.progress('close');;
                    }, 1000);
                } else {
                    $.messager.progress({
                        title:'清除数据失败',
                    });

                    setTimeout(function() {
                        $.messager.progress('close');;
                    }, 1000);

                };
            }

        });
    });
     $("body").on('click', "[id='clearF']", function() {
         var speed_ini = parseInt(document.getElementById("speed_ini").value);
         var speed_zf = parseFloat(document.getElementById("speed_zf").value);
         $('#biaogeF').remove();
         $('#bubbleF').remove();
         //查询数据库中的数
         $.ajax({
             url: "./php/yanmo_sql.php",
             type: "post",
             dataType: "json",
             success: function(data) {
                 if (data == 0) {
                    $.messager.alert('消息框!','存储数据失败','error');
                 } else {
                    $.messager.progress({
                        title:'开始查询！',
                    });
                     setTimeout(function() {
                         $.messager.progress('close');;
                     }, 1000);
                     var lable_echartAndTable = '<div id="biaogeF" ><div style="text-align : right"><span title="打开数据表格" id="showF" style="z-index:1000"> <img src="./images/close.gif" style="height:2%;width: 2%"> </span></div><div style="text-align : right"><span title="关闭图表" id="closeChartsF" style="z-index:1000"> <img src="./images/close.gif" style="height:2%;width: 2%"> </span></div><div id="chartsF" style="z-index:100"></div></div><div style="display: none" id="bubbleF" style="color: dimgray;"><div id="tools" style="text-align : right"><span title="关闭" id="closeF"> <img src="./images/close.gif" style="height:1%;width: 1%"> </span></div><div style="overflow:scroll; height:100%;width:100%" id="tableContainerF" style="top:20%;left:20%;display:none;"></div></div>';
                     $(lable_echartAndTable).appendTo('#secondMenu');
                     var height = [];
                     var fillvolume = [];
                     var fillarea = [];
                     var speed = [];
                     var fillVolume_dif = [];
                     var time_per = [];
                     var time_step = [];
                     var yobj = {};
                     for (var i = 0; i < data.length; i++) {
                         height.push(parseInt(data[i][0]));
                         console.log(height);
                         fillvolume.push(parseInt(data[i][1]));
                         fillarea.push(parseInt(data[i][2]));
                         speed.push((speed_ini - parseInt(data[i][2]) * speed_zf));

                         if (i == 0) {
                             fillVolume_dif.push(parseInt(data[i][1]));
                         } else {
                             fillVolume_dif.push(parseInt(data[i][1]) - parseInt(data[i - 1][1]));
                         };
                         time_per.push(Number(fillVolume_dif[i] / speed[i]).toFixed(2));

                         if (i == 0) {
                             time_step.push(parseFloat(time_per[i]).toFixed(2));
                         } else {
                             time_step.push(Number(parseFloat(time_per[i]) + parseFloat(time_step[i - 1])).toFixed(2));
                         };
                     };
                     yobj.height = height;
                     yobj.fillvolume = fillvolume;
                     yobj.fillarea = fillarea;
                     yobj.speed = speed;
                     yobj.fillVolume_dif = fillVolume_dif;
                     yobj.time_perf = time_per;
                     yobj.time_step = time_step;
                     chart_fillvolumeArea(yobj);
                     creatTable_fillvolumeAre(yobj);
                 };
             }

         });

     });


 };


 function volum(currentHeight, maxValue, interval, count, speed_ini, speed_zf) {

     if (currentHeight > maxValue) {
        $.messager.alert('消息框!','存储数据完毕','info');
         return null;
     } else {
         var z = String(currentHeight); //这里一定要留神---必须是字符串
         var data = "{\"baseAltitude\":" + z + ",\"cutFillType\":\"REGIONANDALTITUDE\",\"resultDataset\":\"cutfill\",\"buildPyramid\":true,\"deleteExistResultDataset\":true,\"region\":{\"bounds\":{\"bottom\":41.0424595365026,\"center\":{\"x\":123.058899680113,\"y\":41.0517978850586},\"height\":0.4266666666667,\"left\":123.046350460502,\"leftBottom\":{\"x\":123.046350460502,\"y\":41.0424595365026},\"right\":123.07394062879,\"rightTop\":{\"x\":123.07394062879,\"y\":41.0618661802981},\"top\":41.0618661802981,\"valid\":true,\"width\":0.636666666667},\"center\":{\"x\":0.0,\"y\":0.0},\"id\":0,\"parts\":[5],\"points\":[{\"x\":123.046350460502,\"y\":41.0617325717349},{\"x\":123.046350460502,\"y\":41.0424595365026},{\"x\":123.07394062879,\"y\":41.0424595365026},{\"x\":123.07394062879,\"y\":41.0618661802981},{\"x\":123.046350460502,\"y\":41.0617325717349}],\"type\":\"REGION\"}}"
         //栅格数据集空间分析服务选面填挖方服务地址
         var url = 'http://localhost:8090/iserver/services/spatialAnalysis-dagushanproject/restjsr/spatialanalyst/datasets/dagushanterrain%40dagushan/terraincalculation/cutfill.json'
         //经过试验验证，先post，几乎所有post完毕之后，才进行get，但是get返回的时候，也并非按照顺序返回的结果；问题关键：控制每post一次，get一次再进行下一次的post和get
         $.post(url, data).done(function(result) {
             var path = result.newResourceLocation + ".json";
             $.get(path).done(function(serverResult) {
                 var fillVolume = parseInt(serverResult.fillVolume);
                 console.log(fillVolume);
                 var fillArea = parseInt(serverResult.fillArea);
                 console.log(fillArea);
                 //由于这个post和get都是异步的，导致height和get后的结果（结果是随机异步的，所以并不和height一一对应）
                 //  addInfo(currentHeight, fillVolume, fillArea, count);
                 var speed = parseInt(speed_ini) - fillArea * (Number(speed_zf).toFixed(2));
                 $.ajax({
                     url: "./php/yanmo_Info.php",
                     type: "post",
                     data: {
                         height: currentHeight,
                         fillVolume: fillVolume,
                         fillArea: fillArea,
                         speed: speed
                     },
                     success: function(data) {
                         if (data == 0) {
                            $.messager.alert('消息框!','存储数据失败','error');
                         } else {
                             count++;
                             currentHeight = currentHeight + interval;
                             volum(currentHeight, maxValue, interval, count, speed_ini, speed_zf);
                             $.messager.progress({
                                text: "存储数据条数————" + String(count - 1),
                            });
                             setTimeout(function() {
                                 $.messager.progress('close');
                             }, 5000)
                         };
                     }
                 });
             })
         });
        }
 };

 //...对象排序规则：根据某一个字段，对对象进行排序..
 function sortBy(field) {
     return function(a, b) {
         return a[field] - b[field];
     }
 };


 //计算体积差