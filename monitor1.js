function ratesql(datasets, entity_id, container_echarts) {
    var container = container_echarts;
    if(entity_id =='yanshan_E1'){
        $.ajax({
            url: "./php/jiance2.php",
            type: "post",
            dataType: "json",
            success: function(data) {
    
                if (data == 0) {
                    $.messager.progress({
                        text: "查询失败",
                    });
    
                } else {
                    //ajax异步加载，遍历数组，获取到的数组赋值
                    // var arrayObj = [];
                    var dataArray = [];
                    var timeArray = [];
                    for (var i = 0; i < data.length; i++) {
                        // arrayObj.push(data[i]); //对象数组，每个对象都是一个钻孔
                        dataArray.push(data[i][3]);
                        timeArray.push(data[i][2]);
                        // console.log(dataArray);
                    };
                };
                creatMonitorChart (dataArray, timeArray, container);
            }
        });
    }else if(entity_id =='yanshan_E2'){
        $.ajax({
            url: "./php/jiance2.php",
            type: "post",
            dataType: "json",
            success: function(data) {
    
                if (data == 0) {
                    $.messager.progress({
                        text: "查询失败",
                    });
    
                } else {
                    //ajax异步加载，遍历数组，获取到的数组赋值
                    // var arrayObj = [];
                    var dataArray = [];
                    var timeArray = [];
                    for (var i = 0; i < data.length; i++) {
                        // arrayObj.push(data[i]); //对象数组，每个对象都是一个钻孔
                        dataArray.push(data[i][3]);
                        timeArray.push(data[i][2]);
                        // console.log(dataArray);
                    };
                };
                creatMonitorChart (dataArray, timeArray, container);
            }
        });  
    }else if(entity_id =='yanshan_E3'){
        $.ajax({
            url: "./php/jiance3.php",
            type: "post",
            dataType: "json",
            success: function(data) {
    
                if (data == 0) {
                    $.messager.progress({
                        text: "查询失败",
                    });
    
                } else {
                    //ajax异步加载，遍历数组，获取到的数组赋值
                    // var arrayObj = [];
                    var dataArray = [];
                    var timeArray = [];
                    for (var i = 0; i < data.length; i++) {
                        // arrayObj.push(data[i]); //对象数组，每个对象都是一个钻孔
                        dataArray.push(data[i][3]);
                        timeArray.push(data[i][2]);
                        // console.log(dataArray);
                    };
                };
                creatMonitorChart (dataArray, timeArray, container);
            }
        });  
    }else if(entity_id =='yanshan_E4'){
        $.ajax({
            url: "./php/jiance4.php",
            type: "post",
            dataType: "json",
            success: function(data) {
    
                if (data == 0) {
                    $.messager.progress({
                        text: "查询失败",
                    });
    
                } else {
                    //ajax异步加载，遍历数组，获取到的数组赋值
                    // var arrayObj = [];
                    var dataArray = [];
                    var timeArray = [];
                    for (var i = 0; i < data.length; i++) {
                        // arrayObj.push(data[i]); //对象数组，每个对象都是一个钻孔
                        dataArray.push(data[i][3]);
                        timeArray.push(data[i][2]);
                        // console.log(dataArray);
                    };
                };
                creatMonitorChart (dataArray, timeArray, container);
            }
        });  
    }else if(entity_id =='yanshan_E5'){
        $.ajax({
            url: "./php/jiance5.php",
            type: "post",
            dataType: "json",
            success: function(data) {
    
                if (data == 0) {
                    $.messager.progress({
                        text: "查询失败",
                    });
    
                } else {
                    //ajax异步加载，遍历数组，获取到的数组赋值
                    // var arrayObj = [];
                    var dataArray = [];
                    var timeArray = [];
                    for (var i = 0; i < data.length; i++) {
                        // arrayObj.push(data[i]); //对象数组，每个对象都是一个钻孔
                        dataArray.push(data[i][3]);
                        timeArray.push(data[i][2]);
                        // console.log(dataArray);
                    };
                };
                creatMonitorChart (dataArray, timeArray, container);
            }
        });  
    }else{
        $.ajax({
            url: "./php/jiance6.php",
            type: "post",
            dataType: "json",
            success: function(data) {
    
                if (data == 0) {
                    $.messager.progress({
                        text: "查询失败",
                    });
    
                } else {
                    var dataArray = [];
                    var timeArray = [];
                    for (var i = 0; i < data.length; i++) {
                        dataArray.push(data[i][3]);
                        timeArray.push(data[i][2]);
                    };
                };
                creatMonitorChart (dataArray, timeArray, container);
            }
        });  
    }
    function creatMonitorChart (dataArray, timeArray, container){
        var myChart = echarts.init(document.getElementById(container));
        var weiyiIsData =[];
        var timeIsData =[];
        weiyiIsData = dataArray;
        timeIsData =  timeArray ;
        var option = {
            backgroundColor: '#404a59',
            color:['red','red'],
        toolbox: {
    show: true,
    feature: {
        dataZoom: {
            yAxisIndex: 'none'
        },
        dataView: { readOnly: false },
        restore: {},
        saveAsImage: {}
    },
    left: 'left',
    iconStyle: {
        borderColor: 'white',
    },
    },
    tooltip: {
                show: true,
                trigger:'axis',
             dataZoom: {
            yAxisIndex: 'none'
        },
                axisPointer:{
                    type:'cross',
                    crossStyle:{
                        type:'dotted',
                        color:'red',
                        width:2
                    },
                },
            dataView: { readOnly: false },
        magicType: { type: ['line', 'bar'] },
        restore: {},
        saveAsImage: {}
            },
            xAxis : [
                {
                    type : 'category',
                    data : timeIsData,
                    name:'监测时间',
                    nameTextStyle:{
                        color:'black',
                        fontSize: 12,
                        fontWeight: 'bold',
                        align: 'center',
                        padding: [3, 50, -20, -20]
                    },
                    boundaryGap: false,
                    axisLabel:{
                        textStyle:{
                            color:'red',
                            fontWeight:'bold'
                        }
                    },
                     axisLine: {
                     symbol: 'arrow',
                     lineStyle: {
                       color: 'green',
                       width: '4'
                          }
                },
                }
            ],
            yAxis : [
                {
                    type : 'value', 
                    min: 'dataMin',
                    max: 'dataMax',
                                axisLabel: {
        textStyle: {
            color: 'yellow',
            fontWeight: 'bold',
        },
    },
    axisLine: {
        symbol: 'arrow',
        lineStyle: {
            color: 'yellow',
            width: '4',
        }
    },
    splitLine: {
        show: false
    },
                    name:'位移速率mm/d',
                    nameTextStyle: {
                    color: 'black',
                    fontSize: 10,
                    fontWeight: 'bold',
    
                 }
                }
            ],
            series : [{
    name: '当前时间',              
    type: 'scatter',
    symbolSize: 1,
    data: timeIsData,
    itemStyle: {
        normal: {
            borderWidth: 3,
            borderColor: 'white',
            color: '#c7ff3d',
            fontSize:10
        }
    }
    },{
    name:"位移速率",
    type:"line",
    data:weiyiIsData,
    itemStyle:{
            normal: {
            width: 3,
            shadowColor: 'rgba(255,0,0,0.9)',
            shadowBlur: 10,
            shadowOffsetY: 15
        }
    },
    lineStyle:{
    type:'solid',
    color: '#c7ff3d'
    },
    markArea:  {
        data: [
             [{
                 yAxis: '0',
                 itemStyle:{
                     color:'#0000FF'
                 }
             }, {
                 yAxis: '3'
             }],
              [{
                 yAxis: '3',
                 itemStyle:{
                     color:'#FFA500'
                 }
             }, {
                 yAxis: '10',
                 itemStyle:{
                    color:'#FF0000'
                }
             }]
         ],
     }
    }
     ]};
    myChart.setOption(option);
}}