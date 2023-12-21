function shuxingchaxun(viewer,scene){
     var infobubble = '<blockquote id="bubble1" class="bubble" ><img id="myimg"  width="50%" height="auto"><h2 id="mingzi"></h2><p id="des" class="word"></p>';
         $(infobubble).appendTo('body');
      var infoboxContainer = document.getElementById('bubble1');
viewer.customInfobox = infoboxContainer;
      var layer = scene.layers.find('infodagushan@infotest');
                          //设置属性查询参数
         layer.setQueryParameter({
                    url: 'http://localhost:8090/iserver/services/data-Empty/rest/data',
                    dataSourceName: 'infotest',
                    dataSetName: 'infodagushan',
                    keyWord: 'SmID'
        });
                 //添加自定义infobox
        var title = document.getElementById("mingzi");//title等于h2标签
        var des = document.getElementById("des");//des等于p标签
        var myimg = document.getElementById("myimg");
        //注册鼠标点击事件
        viewer.pickEvent.addEventListener(function(feature){
                   
            var title1 = Cesium.defaultValue(feature.NAME,'');
            var description = Cesium.defaultValue(feature.DES,'');
            title.innerText = title1;
            des.innerText = description;
            myimg.src = "./images/" + title1 + ".jpg";
        });
           $("body").on('click', "[id='close']", function() {
        $('#thirdMenu #bubble').hide();
    });
} 