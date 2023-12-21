function posuizhan(viewer,scene){
    var infoboxContainer = document.getElementById('bubble2');
    viewer.customInfobox = infoboxContainer;
    var layer = scene.layers.find('buildings');
       layer.setQueryParameter({
                  url: 'http://localhost:8090/iserver/services/data-dagushanproject/rest/data',
                  dataSourceName: 'jiegoumian',
                  dataSetName: 'mm',
                  keyWord: 'SmID'
      });
      //添加自定义infobox
      var title = document.getElementById("title");
      var des = document.getElementById("miaoshu");
      var myvdo = document.getElementById("shipin");
      //注册鼠标点击事件
      viewer.pickEvent.addEventListener(function(feature){            
        var title4 = Cesium.defaultValue(feature.NAME1,'');
        console.log(title2);
        var description = Cesium.defaultValue(feature.MIAOSHU2,'');
          title.innerText = title4;
          des.innerText = description;
          myvdo.src = "./Viedo/" + title4 + ".mp4";
      });
         $("body").on('click', "[id='close']", function() {
      $('#firstMenu #bubble2').hide();
  });
} 