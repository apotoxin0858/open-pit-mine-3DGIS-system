//-----------回调函数表格的加载的加载................
function chart(yobj) {
    $('#chartsF').show();

    var myChart = echarts.init(document.getElementById("chartsF")); //容器
    //我们这里一点要注意：给height和volumes做了顺序的调整，如果是非线性增加的话，会导致height与volumes无法相互匹配
    var height = [];
    var fillVolume = [];


    for (var i = 0; i < yobj.length; i++) {
        height.push(yobj[i].height);
        fillVolume.push(yobj[i].fillVolume);

    };


    var itemStyle = {
        normal: [{
            color: 'rgba(204, 65, 169, 0.8)'
        }]
    };
    var option = {
        backgroundColor: '#404a59',
        title: {
            text: '矿坑标高-填方体积关系图',
            subtext: 'Data from West OpenPit',
            left: 'center',
            textStyle: {
                color: '#fff'
            }
        },
        legend: {
            data: ['填方体积(m³)'],
            right: 50,
            textStyle: {
                color: 'rgba(133, 165, 237)'
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
            left: '23%',
            right: '110'
        },
        xAxis: [{
            type: 'category',
            name: '标高 (m)',
            boundaryGap: false,
            data: height,
            axisLine: {
                symbol: 'arrow',
                lineStyle: {
                    color: 'green',
                    width: '4',
                }
            },
            axisLabel: {
                textStyle: {
                    color: 'white',
                    fontWeight: 'bold',
                },
                formatter: '{value}m'
            },
            splitLine: {
                show: false
            },
            nameTextStyle: {
                color: 'black',
                fontSize: 15,
                fontWeight: 'bold',
                padding: [3, 4, -20, -20]
            },
        }],
        yAxis: [{
            type: 'value',
            name: '填方体积 (m³)',
            min: 'dataMin',
            max: 'dataMax',
            axisLabel: {
                textStyle: {
                    color: 'white',
                    fontWeight: 'bold',
                },
                formatter: '{value}m³'
            },
            nameTextStyle: {
                color: 'green',
                fontSize: 15,
                fontWeight: 'bold',
            },
            axisLine: {
                symbol: 'arrow',
                lineStyle: {
                    color: 'green',
                    width: '4',

                }
            },
            splitLine: {
                show: false
            }

        }],
        series: [

            {
                name: '填方体积(m³)',
                type: 'line',
                smooth: true,
                symbol: 'circle', //折点的样式
                symbolSize: 10, //折线点的大小
                itemStyle: {
                    normal: {
                        borderWidth: 3,
                        borderColor: 'yellow',
                        color: 'blue'
                    }
                }, //折点的样式设计
                lineStyle: {
                    normal: {
                        width: 3,
                        shadowColor: 'rgba(255,0,0,0.9)',
                        shadowBlur: 10,
                        shadowOffsetY: 15
                    }
                }, //折线的样式设计
                data: fillVolume,
                markLine: {
                    symbolSize: 20, //两端符号标记的大小
                    itemStyle: {
                        normal: {
                            borderWidth: 1,
                            lineStyle: {
                                type: 'dash',
                                color: 'red',
                                width: 2,
                                shadowColor: 'rgba(255,0,0,0.9)',
                                shadowBlur: 4,
                                shadowOffsetY: 7
                            },
                        }
                    },
                    data: [{
                        name: '一亿 (m³)',
                        yAxis: 100000000
                    }, {
                        name: '十亿 (m³)',
                        yAxis: 1000000000
                    }],
                    label: {
                        show: true,
                        color: 'red',
                        fontSize: 20,
                        fontWeight: 'bold',
                        formatter: function(param) {
                            // return param.data.name + ':' + param.data.value;
                            return param.data.name;
                        },
                        position: 'middle'
                    }
                },
                markPoint: {
                    symbolSize: 40,
                    itemStyle: {
                        normal: {
                            borderColor: '#87cefa',
                            borderWidth: 1, // 标注边线线宽，单位px，默认为1
                        },
                        emphasis: {
                            borderColor: '#1e90ff',
                            borderWidth: 5,
                        }
                    },
                    effect: {
                        show: true,
                        shadowBlur: 0
                    },
                    data: [{
                        type: 'max',
                        name: '最大值'
                    }, {
                        type: 'min',
                        name: '最小值'
                    }],
                },

            },
        ],
        //缩放控制键
        dataZoom: [{ // 这个dataZoom组件，默认控制x轴。
            type: 'slider',
            xAxisIndex: 0,
            start: 0,
            end: 100,
            textStyle: {
                color: 'white',
            },
            fillerColor: 'rgba(23,44,127,0.2)',
            borderColor: 'rgba(180,180,0,0.5)',
            height: 20

        }, { // 这个dataZoom组件，也控制x轴。
            type: 'inside',
            start: 10,
            end: 60
        }, {
            type: 'slider',
            yAxisIndex: 0,
            start: 0,
            end: 100,
            textStyle: {
                color: 'white',

            },
            fillerColor: 'rgba(23,44,127,0.2)',
            borderColor: 'rgba(180,180,0,0.5)',
            width: 20

        }],
        //值渐变
        visualMap: {
            type: 'continuous',
            text: ['High', 'Low'],
            align: 'right',
            textStyle: {
                color: 'black',
                fontWeight: 'bold',
                fontSize: 10
            },
            min: 10000000,
            max: 1000000000,
            calculable: true,
            inRange: {
                color: ['#096', '#ffde33', '#ff9933', '#cc0033', '#660099', '#7e0023']
            },
            // padding: [0, 0, 0, 10]
        },
        animationEasing: 'elasticOut',

    };
    myChart.setOption(option);
};


// ...创建下方的表格....
function creatTable(yobj) {

    var info = '<table id=‘fill’ border="10" class="hovertable" style="overflow-x:scroll;overflow-x:scroll;" align="center" width="fit-content" height="300px" ><tbody>' + '<tr onmouseover="this.style.backgroundColor= ' + '\'' + '#ffff66' + '\'' + ';" onmouseout="this.style.backgroundColor=' + '\'' + '#d4e3e5' + '\'' + ';"><th>' + '标高(m)' + '</th></tr>' + '<tr onmouseover="this.style.backgroundColor= ' + '\'' + '#ffff66' + '\'' + ';" onmouseout="this.style.backgroundColor=' + '\'' + '#d4e3e5' + '\'' + ';"><th>' + '填方体积(m³)' + '</th></tr>' + '</tbody></table>"';
    var info = $(info); //转化为jq对象
    $('#tableContainerF').append(info);
    //增加列的方式：（动态添加）
    for (var i = 0; i < yobj.length; i++) {
        var feature = yobj[i]; //这是数组中的一个对象
        delete feature.timenumber;


        var num = Object.getOwnPropertyNames(feature).length;
        var fieldNames = Object.keys(feature);

        for (var j = 0; j < num; j++) {

            var tdValue = feature[fieldNames[j]];

            var ss = "<td>" + tdValue + "</td>";

            var td = $(ss);  
            var s = '#tableContainerF tr' + ':eq(' + j + ')';  

            $(s).append(td); 
        };

    };

    var btn_lable = "<button class='btn btn-primary' style='position:absolute;top:340px;left:0px' id='btn'> 生成excel </button>";
    $(btn_lable).appendTo('#tableContainerF');
    var table2excel = new Table2Excel();
    $("body").on('click', "[id='btn']", function() {
        table2excel.export(document.querySelectorAll('table'), '矿区标高-填方体积表');
    });

};