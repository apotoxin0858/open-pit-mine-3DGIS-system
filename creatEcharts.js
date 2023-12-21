

//.................................创建关于监测信息的图表start..............................................
function creatMonitorChart(dataArray, timeArray, container) {

    var myChart = echarts.init(document.getElementById(container));


    //存放的数据的集合
    var weiyilsData = [];
    var timelsData = [];
    weiyilsData[0] = dataArray[0];
    timelsData[0] = timeArray[0];
    var itemStyle = {
        normal: [{
            color: 'rgba(204, 65, 169, 0.8)'
        }]
    };

    var option = {
        backgroundColor: '#404a59',
        title: {
            text: '西露天矿监测位移-时间关系图',
            subtext: 'DataResult from West OpenPit',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: { readOnly: false },
                magicType: { type: ['line', 'bar'] },
                restore: {},
                saveAsImage: {}
            },
            left: 'left',
            iconStyle: {
                borderColor: 'white',
            },
        },

        tooltip: {
            trigger: 'axis'
        }, //这个属性的设置非常的关键 能够显示折点坐标
        grid: {
            left: '12%',
            right: '110'
        },
        xAxis: [{
            type: 'category',
            name: '监测时间',
            nameTextStyle: {
                color: 'black',
                fontSize: 18,
                fontWeight: 'bold',
                align: 'center',
                padding: [3, 50, -20, -20]
            },
            boundaryGap: false,
            data: timelsData,
            axisLine: {
                symbol: 'arrow',
                lineStyle: {
                    color: 'green',
                    width: '4'
                }
            },
            axisLabel: {
                textStyle: {
                    color: '#ffffff',
                    fontWeight: 'bold'
                },
                formatter: '{value}'
            },
            splitLine: {
                show: false
            },
        }],
        yAxis: [{
            type: 'value',
            name: '位移变化量mm/s',
            nameTextStyle: {
                color: 'black',
                fontSize: 15,
                fontWeight: 'bold',

            },
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

        }],
        series: [{
            name: '当前时间',
            type: 'scatter',
            symbolSize: 10,
            data: timelsData,
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: 'white',
                    color: 'red'
                }
            }
        }, {
            name: '位移',
            type: 'line',
            smooth: true,
            data: weiyilsData,
            symbol: 'circle',
            symbolSize: 10,
            itemStyle: {
                normal: {
                    borderWidth: 3,
                    borderColor: 'yellow',
                    color: 'blue'
                }
            },
            lineStyle: {
                normal: {
                    width: 3,
                    shadowColor: 'rgba(255,0,0,0.9)',
                    shadowBlur: 10,
                    shadowOffsetY: 15
                }
            },
            markLine: {
                symbolSize: 20,
                itemStyle: {
                    normal: {
                        borderWidth: 1,
                        lineStyle: {
                            type: 'dash',
                            color: 'red',
                            width: 5,
                            shadowColor: 'rgba(255,0,0,0.9)',
                            shadowBlur: 4,
                            shadowOffsetY: 7
                        },
                    }
                },
                data: [{
                    type: 'average',
                    name: '平均值',
                    lineStyle: {
                        type: 'dash',
                        color: 'yellow',
                        width: 2,
                    },
                    label: {
                        show: true,
                        color: 'red',
                        fontSize: 20,
                        fontWeight: 'bold',
                        formatter: function(param) {
                            return param.data.name + ':' + param.data.value;
                        },
                        position: 'middle'
                    }
                }, {
                    name: '警戒值',
                    yAxis: 20,
                    lineStyle: {
                        type: 'dash',
                        color: 'blue',
                        width: 2,
                    },
                    label: {
                        show: true,
                        color: 'black',
                        fontSize: 20,
                        fontWeight: 'bold',
                        formatter: function(param) {
                            return param.data.name + ':' + param.data.value;
                        },
                        position: 'middle'
                    }
                }],
            },
            markPoint: {
                data: [{
                    type: 'max',
                    name: '最大值'
                }, {
                    type: 'min',
                    name: '最小值'
                }]
            }
        }],
        dataZoom: [{
            type: 'slider',
            xAxisIndex: 0,
            start: 50,
            end: 100
        }, {
            type: 'inside',
            start: 10,
            end: 60
        }, {
            type: 'slider',
            yAxisIndex: 0,
            start: 40,
            end: 100
        }],
        visualMap: {
            textStyle: {
                color: 'white',
                fontWeight: 'bold',
                fontSize: 10
            },
            pieces: [{
                gt: -20,
                lte: -15,
                color: 'red'
            }, {
                gt: -15,
                lte: -10,
                color: 'green'
            }, {
                gt: -10,
                lte: -5,
                color: 'blue'
            }, {
                gt: -5,
                lte: 0,
                color: 'yellow'
            }, {
                gt: 0,
                lte: 5,
                color: 'white'
            }, {
                gt: 5,
                lte: 10,
                color: 'black'
            }, {
                gt: 10,
                lte: 15,
                color: 'purple'
            }, {
                gt: 15,
                lte: 20,
                color: 'pink'
            }],
            outOfRange: {
                color: '#999'
            }
        },

    };

    myChart.setOption(option);
    //......动态加载......
    var count = 1

    function addData() {
        if (count < dataArray.length) {
            timelsData.push(timeArray[count]);
            weiyilsData.push(dataArray[count]);
            count++;

        } else {
            return null;
        };
    };
    setInterval(function() {
        addData();
        myChart.setOption({
            xAxis: {
                type: 'category',
                data: timelsData,
            },
            series: [{
                name: '位移',
                type: 'line',
                data: weiyilsData,
            }]
        });
    }, 500);
};