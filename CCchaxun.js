function chuanganqi(viewer,scene){
    var infoboxContainer = document.getElementById('bubble2');
    viewer.customInfobox = infoboxContainer;
    var layer = scene.layers.find('reder');
    console.log(layer);
       layer.setQueryParameter({
                  url: 'http://localhost:8090/iserver/services/data-dagushanproject/rest/data',
                  dataSourceName: 'rader',
                  dataSetName: 'reder',
                  keyWord: 'SmID'
      });
      //添加自定义infobox
      var title = document.getElementById("title");
      var des = document.getElementById("miaoshu");
      var myvdo = document.getElementById("tupian");
      //注册鼠标点击事件
      viewer.pickEvent.addEventListener(function(feature){            
        var title3 = Cesium.defaultValue(feature.MINGCHENG,'');
        console.log(title2);
        var description = Cesium.defaultValue(feature.MIAOSHU,'');
          title.innerText = title3;
          des.innerText = description;
          myimg.src = "./images/" + title3 + ".jpg";
      });
         $("body").on('click', "[id='close']", function() {
      $('#bubble').hide();
  });
} 