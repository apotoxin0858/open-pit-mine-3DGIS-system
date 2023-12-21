function tuli(viewer,scene){

    console.log();
     var infobubble = '<blockquote id="bubble" class="bubble" style="position:absolute;top:100px;right:500px"><h2 id="title"></h2><p id="des" class="word"></p>';
         $(infobubble).appendTo('body');
      var infoboxContainer = document.getElementById('bubble');
      var layer = scene.layers.find('paituchang@BIM');
                          //设置属性查询参数
         layer.setQueryParameter({
                    url: 'http://localhost:8090/iserver/services/data-bimtest/rest/data',
                    dataSourceName: 'BIM',
                    dataSetName: 'paituchang',
                    keyWord: 'SmID'
        });
                 //添加自定义infobox
        var title = document.getElementById("title");
        var des = document.getElementById("des");
        var myimg = document.getElementById("myimg");
        //注册鼠标点击事件
        viewer.pickEvent.addEventListener(function(feature){
                   
            var title1 = Cesium.defaultValue(feature.NAME,'');
            var description = Cesium.defaultValue(feature.DES,'');
            title.innerText = title1;
            des.innerText = description;
        });
        // if($('#firstMenu').remove()){
        //    $('#bubble').remove();
        // }

}
// function showMessageBox(scene, scenePosition) {
//     var infoboxContainer = document.getElementById('bubble');
//     scene.postRender.addEventListener(function() {
//         if (scenePosition) {
//             var canvasHeight = scene.canvas.height;
//             var windowPosition = new Cesium.Cartesian2();
//             Cesium.SceneTransforms.wgs84ToWindowCoordinates(scene, scenePosition, windowPosition);
//             infoboxContainer.style.bottom = (canvasHeight - windowPosition.y + 45) + 'px';
//             infoboxContainer.style.left = (windowPosition.x - 70) + 'px';
//             infoboxContainer.style.visibility = "visible";
//         }
//     });
//     $('#bubble').show();
// }; 
// 