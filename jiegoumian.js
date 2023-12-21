function BIMchaxun(viewer,scene){
    console.log("哈哈哈");
      var infoboxContainer = document.getElementById('bubble2');
      viewer.customInfobox = infoboxContainer;
      var layer = scene.layers.find('mm');
      console.log(layer);
                          //设置属性查询参数
         layer.setQueryParameter({
                    url: 'http://localhost:8090/iserver/services/data-dagushanproject/rest/data',
                    dataSourceName: 'jiegoumian',
                    dataSetName: 'mm',
                    keyWord: 'SmID'
        });
                 //添加自定义infobox
        var title = document.getElementById("title");
        var des = document.getElementById("miaoshu");
        var myimg = document.getElementById("tupian");
        var myvdo = document.getElementById("shipin");
        //注册鼠标点击事件
        viewer.pickEvent.addEventListener(function(feature){        
            var title2 = Cesium.defaultValue(feature.MINGCHENG,'');
            var description = Cesium.defaultValue(feature.MIAOSHU,'');
            console.log(description);
            if (description == "结构面"||description == "监测传感器"){
                console.log("嘻嘻");
                title.innerText = title2;
                des.innerText = description;
                $("#bubble2 #tupian").show();
                myimg.src = "./images/" + title2 + ".jpg";
                $("#bubble2 #shipin").hide();
            }else{
                console.log("哈哈");
                console.log(title2);
                title.innerText = title2;
                des.innerText = description;
                $("#bubble2 #shipin").show();
                myvdo.src = "./Viedo/" + title2 + ".mp4";
                $("#bubble2 #tupian").hide();
            };
        });
            // console.log(myimg);
           $("body").on('click', "[id='close']", function() {
        $('#firstMenu #bubble2').hide();
    });
} 