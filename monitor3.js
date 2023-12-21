function weiyimonitor(datasets, entity_id, container_echarts) {
    var container = container_echarts;
    if(entity_id =='yanshan_E1'){
        $.ajax({
            url: "./php/weiyia.php",
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
                    var XArray = [];
                    var YArray = [];
                    var SumArray = [];
                    var ZArray = [];
                    var timeArray = [];
                    for (var i = 0; i < data.length; i++) {
                        // arrayObj.push(data[i]); //对象数组，每个对象都是一个钻孔
                        XArray.push(data[i][2]);
                        YArray.push(data[i][3]);
                        SumArray.push(data[i][4]);
                        ZArray.push(data[i][5]);
                        timeArray.push(data[i][1]);
                        // console.log(dataArray);
                    };
                };
                creatMonitorChart (XArray,timeArray,YArray,SumArray,ZArray, container);;
            }
        });
    }else if(entity_id =='yanshan_E2'){
        $.ajax({
            url: "./php/weiyib.php",
            type: "post",
            dataType: "json",
            success: function(data) {
    
                if (data == 0) {
                    $.messager.progress({
                        text: "查询失败",
                    });
    
                }else {
                    //ajax异步加载，遍历数组，获取到的数组赋值
                    // var arrayObj = [];
                    var XArray = [];
                    var YArray = [];
                    var SumArray = [];
                    var ZArray = [];
                    var timeArray = [];
                    for (var i = 0; i < data.length; i++) {
                        // arrayObj.push(data[i]); //对象数组，每个对象都是一个钻孔
                        XArray.push(data[i][2]);
                        YArray.push(data[i][3]);
                        SumArray.push(data[i][4]);
                        ZArray.push(data[i][5]);
                        timeArray.push(data[i][1]);
                        // console.log(dataArray);
                    };
                };
                creatMonitorChart (XArray,timeArray,YArray,SumArray,ZArray, container);
            }
        });  
    }else{
        $.ajax({
            url: "./php/weiyic.php",
            type: "post",
            dataType: "json",
            success: function(data) {
    
                if (data == 0) {
                    console.log("失败");
    
                } else {
                    //ajax异步加载，遍历数组，获取到的数组赋值
                    // var arrayObj = [];
                    var XArray = [];
                    var YArray = [];
                    var SumArray = [];
                    var ZArray = [];
                    var timeArray = [];
                    for (var i = 0; i < data.length; i++) {
                        // arrayObj.push(data[i]); //对象数组，每个对象都是一个钻孔
                        XArray.push(data[i][2]);
                        YArray.push(data[i][3]);
                        SumArray.push(data[i][4]);
                        ZArray.push(data[i][5]);
                        timeArray.push(data[i][1]);
                        // console.log(dataArray);
                    };
                };
                creatMonitorChart (XArray,timeArray,YArray,SumArray,ZArray, container);
            }
        });
    }
        function creatMonitorChart (XArray,timeArray,YArray,SumArray,ZArray, container){
            var myChart = echarts.init(document.getElementById(container));
            let splitNumber = 5; // 分割段数
            let colors = ['#4BC946', '#FDA975', '#27D3E2', '#FF0014'];
            //计算最大值
    function calMax(arr) {
        let min = Math.min.apply(null, arr);
        let max = Math.max.apply(null, arr);
        let interval = (max - min) / splitNumber; // 平均值
        max = Math.ceil(max + interval); // 向上取整
        // console.log(min, max, interval);
        return max;
    }
    
    //计算最小值
    function calMin(arr) {
        let min = Math.min.apply(null, arr);
        let max = Math.max.apply(null, arr);
        let interval = (max - min) / splitNumber; // 平均值
        min = min === 0 ? min : Math.floor(min - interval); // 向下取整
        // console.log(min, max, interval);
        return min;
    }
            var dateIsData =[];
            var powerIsData =[];
            var powerLIsData =[];
            var stressIsData =[];
            var volumeIsData =[];
            dateIsData = timeArray;
            powerIsData = XArray;
            powerLIsData = YArray;
            stressIsData = SumArray;
            volumeIsData = ZArray;
            var option = {
                color: colors,
        backgroundColor: '#fff',
        title: {
            text: '大孤山位移偏移量-时间关系图',
            top: '1%',
            x: 'center',
            textStyle: { color: '#2D527C', fontSize: '20', fontWeight: 'bold'},
            subtextStyle: { color: '#2D527C', fontSize: '14', fontWeight: 'bold' }
        },
        grid: {
            top: '15%',
            bottom: '10%',
            left: '15%',
            right: '15%',
        },
        legend: {
            top: '9%'
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false },
                restore: {},
                saveAsImage: {}
            },
            left: 'left',
            iconStyle: {
                borderColor: 'white',
            },
            },
        tooltip: {
            trigger: 'axis',
            axisPointer: { type: 'shadow' }
        },
        xAxis: {
            type: 'category',
            axisTick: { show: false },
            axisLabel: {
                textStyle: { color: '#333333', fontSize: 11 }
            },
            axisLine: {
                show: false,
                lineStyle: { color: '#707070' }
            },
            data: dateIsData
        },
        yAxis: [{
            // name: '震级',
            type: 'value',
            position: 'left',
            min: calMin(powerLIsData),
            max: calMax(powerLIsData),
            splitNumber: splitNumber,
            interval: (calMax(powerLIsData) - calMin(powerLIsData)) / splitNumber,
            splitLine: {
                lineStyle: { type: 'dashed', color: '#707070' }
            },
            axisLabel: {
                // formatter: '{value}mm',
                formatter: function(value, index) {
                    return (value + '').indexOf('.') != -1 ? value.toFixed(1) + 'Mpa' : value + 'Mpa';
                },
                textStyle: { color: colors[0], fontSize: 11 }
            },
            axisLine: { show: false },
            axisTick: { show: false }
        }, {
            // name: '能量',
            type: 'value',
            position: 'left',
            offset: 65,
            min: calMin(powerIsData),
            max: calMax(powerIsData),
            splitNumber: splitNumber,
            interval: (calMax(powerIsData) - calMin(powerIsData)) / splitNumber,
            splitLine: { show: false },
            axisLine: { show: false },
            axisLabel: {
                // formatter: '{value}°C',
                formatter: function(value, index) {
                    return parseInt(value) + 'Mpa';
                },
                textStyle: { color: colors[1], fontSize: 11 }
            },
            axisTick: { show: false }
        }, {
            // name: '应力降(Mpa)',
            type: 'value',
            position: 'right',
            min: calMin(stressIsData),
            max: calMax(stressIsData),
            splitNumber: splitNumber,
            interval: (calMax(stressIsData) - calMin(stressIsData)) / splitNumber,
            splitLine: { show: false },
            axisLine: { show: false },
            axisLabel: {
                // formatter: '{value}m/s',
                formatter: function(value, index) {
                    return parseInt(value) + 'Mpa';
                },
                textStyle: { color: colors[3], fontSize: 11 }
            },
            axisTick: { show: false }
        }, {
            // name: '视体积(m3)',
            type: 'value',
            position: 'right',
            offset: 54,
            min: calMin(volumeIsData),
            max: calMax(volumeIsData),
            splitNumber: splitNumber,
            interval: (calMax(volumeIsData) - calMin(volumeIsData)) / splitNumber,
            splitLine: { show: false },
            axisLine: { show: false },
            axisLabel: {
                // formatter: '{value}hPa',
                formatter: function(value, index) {
                    return parseInt(value) + 'Mpa';
                },
                textStyle: { color: colors[2], fontSize: 11 }
            },
            axisTick: { show: false }
        }],
        series: [{
            name: '△Y偏移',
            type: 'line',
            barWidth: '40%',
            data: powerLIsData
        },
        {
            name: '△X偏移',
            type: 'line',
            symbol: 'circle',
            symbolSize: 8,
            yAxisIndex: 1,
            data: powerIsData
        },
        {
            name: '总偏移量',
            type: 'bar',
            symbol: 'circle',
            symbolSize: 8,
            yAxisIndex: 3,
            data: stressIsData
        },
        {
            name: '△Z偏移',
            type: 'line',
            symbol: 'circle',
            symbolSize: 8,
            yAxisIndex: 2,
            data: volumeIsData
        }
    ]}
            myChart.setOption(option);
        };
        console.log("绘制表格");
    }