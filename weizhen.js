function weizhen(weizhen_chart){
    $(weizhen_chart).appendTo('body');
    $('#echart_weizhen').show();
    $.ajax({
        url: "./php/weizhenSQL.php",
        type: "post",
        dataType: "json",
        success: function(data) {
            if (data == 0) {
                $.messager.progress({
                    text: "查询失败",
                });
            } else {
                var dateArray = [];
                var powerLArray = [];
                var powerArray = [];
                var stressArray = [];
                var volumeArray = [];
                for (var i = 0; i < data.length; i++) {
                    dateArray.push(data[i][1]);
                    powerLArray.push(data[i][2]);
                    powerArray.push(data[i][3]);
                    stressArray.push(data[i][4]);
                    volumeArray.push(data[i][5]);
                };
            };
            creatWeizhenChart(dateArray,powerLArray,powerArray,stressArray,volumeArray,weizhen_chart);
        }
    }); 
    function creatWeizhenChart(dateArray,powerLArray,powerArray,stressArray,volumeArray){
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
        $('#echart_weizhen').show();
        var dateIsData =[];
        var powerIsData =[];
        var powerLIsData =[];
        var stressIsData =[];
        var volumeIsData =[];
        dateIsData = dateArray;
        powerIsData = powerArray;
        powerLIsData = powerLArray;
        stressIsData = stressArray;
        volumeIsData = volumeArray;
        var myChart = echarts.init(document.getElementById("echart_weizhen")); //容器
        var option = {
            color: colors,
    backgroundColor: '#fff',
    title: {
        text: '大孤山微震-时间关系图',
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
                return (value + '').indexOf('.') != -1 ? value.toFixed(1) + 'mm' : value + 'mm';
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
                return parseInt(value) + 'J';
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
                return parseInt(value) + 'm3';
            },
            textStyle: { color: colors[2], fontSize: 11 }
        },
        axisTick: { show: false }
    }],
    series: [{
        name: '震级',
        type: 'bar',
        barWidth: '40%',
        data: powerLIsData
    },
    {
        name: '能量',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        yAxisIndex: 1,
        data: powerIsData
    },
    {
        name: '应力降',
        type: 'line',
        symbol: 'circle',
        symbolSize: 8,
        yAxisIndex: 3,
        data: stressIsData
    },
    {
        name: '视体积',
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
    };
    function clearwzchart(){
        $('echart_weizhen').remove();
    };