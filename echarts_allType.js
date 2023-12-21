//-----------回调函数表格的加载的加载................
function chart_fillvolumeArea(arry) {

    $('#chartsF').show();
    var myChart = echarts.init(document.getElementById("chartsF")); //容器
    //我们这里一点要注意：给height和volumes做了顺序的调整，如果是非线性增加的话，会导致height与volumes无法相互匹配
    var height = arry.height;
    var fillVolume = arry.fillvolume;
    var fillarea = arry.fillarea;
    var speed = arry.speed;

    var fillVolume_dif = arry.fillVolume_dif;
    var time_perf = arry.time_per;
    var time_step = arry.time_step;

    var option = {
        backgroundColor: '#404a59',
        title: {
            text: '矿坑标高-体积-速度-时间的关系图',
            subtext: 'Data from West OpenPit',
            left: '32%',
            textStyle: {
                color: '#fff'
            }
        },
        legend: {
            data: ['标高体积(m³)', '时间(y)', '标高面积(㎡)', '速度(m³/y)'],
            right: 0,
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
            left: '15%',
            right: '15%'
        },
        xAxis: [{
            type: 'category',
            // name: '标高 (m)',
            boundaryGap: false,
            nameLocation: 'midele',
            splitNumber: 3,
            offset: 10,
            data: height,
            nameGap: 100,
            axisLine: {
                symbol: 'arrow',
                lineStyle: {
                    color: '#babaf4',
                    width: '4',
                },
                align: 'left'
            },
            axisLabel: {
                textStyle: {
                    color: '#babaf4',
                    fontWeight: 'bold',
                },
                formatter: '{value}m',
                align: 'left'
            },
            splitLine: {
                show: false
            },
            nameTextStyle: {
                color: '#babaf4',
                fontSize: 15,
                fontWeight: 'bold',
                padding: [3, 10, -20, -20]
            },
        }],
        yAxis: [{
                type: 'value',
                boundaryGap: false,
                name: '标高面积(㎡)',
                min: '0',
                max: 'dataMax',
                splitNumber: 3,
                position: 'right',
                nameLocation: 'middle',
                offset: 10,
                nameGap: 10,
                axisLabel: {
                    textStyle: {
                        color: 'yellow',
                        fontWeight: 'bold',
                    },
                    formatter: '{value}㎡',
                    align: 'right',

                },
                nameTextStyle: {
                    color: 'yellow',
                    fontSize: 15,
                    fontWeight: 'bold',

                },
                axisLine: {
                    symbol: 'arrow',
                    lineStyle: {
                        color: 'yellow',
                        width: '4',

                    },

                },
                splitLine: {
                    show: false
                },


            },
            {
                type: 'value',
                name: '标高体积(m³)',
                min: '0',
                max: 'dataMax',
                position: 'left',
                offset: 10,
                splitNumber: 3,
                nameLocation: 'middle',
                axisLabel: {
                    textStyle: {
                        color: 'white',
                        fontWeight: 'bold',
                    },
                    formatter: '{value}m³',
                    align: 'left'
                },
                nameTextStyle: {
                    color: 'white',
                    fontSize: 15,
                    fontWeight: 'bold',
                },
                axisLine: {
                    symbol: 'arrow',
                    lineStyle: {
                        color: 'white',
                        width: '4',
                    }
                },
                splitLine: {
                    show: false
                }

            },
            // {
            //     type: 'value',
            //     name: '体积差值(m³)',
            //     min: 'dataMin',
            //     max: 'dataMax',
            //     position: 'left',
            //     offset: 30,
            //     nameLocation: 'middle',
            //     splitNumber: 3,
            //     axisLabel: {
            //         textStyle: {
            //             color: 'black',
            //             fontWeight: 'bold',
            //         },
            //         formatter: '{value}m³',
            //         align: 'right'

            //     },
            //     nameTextStyle: {
            //         color: 'black',
            //         fontSize: 15,
            //         fontWeight: 'bold',
            //         align: 'right',


            //     },
            //     axisLine: {
            //         symbol: 'arrow',
            //         lineStyle: {
            //             color: 'black',
            //             width: '4',
            //         }
            //     },
            //     splitLine: {
            //         show: false
            //     }

            // },
            {
                type: 'value',
                name: '时间(y)',
                nameGap: 35,
                min: '0',
                max: 'dataMax',
                position: 'left',
                offset: 70,
                nameLocation: 'middle',
                splitNumber: 2,
                axisLabel: {
                    textStyle: {
                        color: '#26de9f',
                        fontWeight: 'bold',
                    },
                    formatter: '{value}y',
                    align: 'right'

                },
                nameTextStyle: {
                    color: '#26de9f',
                    fontSize: 15,
                    fontWeight: 'bold',
                    align: 'right',


                },
                axisLine: {
                    symbol: 'arrow',
                    lineStyle: {
                        color: '#26de9f',
                        width: '4',
                    }
                },
                splitLine: {
                    show: false
                }

            },
            {
                type: 'value',
                name: '速度(m³/y)',
                min: '0',
                max: 'dataMax',
                position: 'right',
                offset: 80,
                nameLocation: 'middle',
                nameGap: -20,
                splitNumber: 2,
                axisLabel: {
                    textStyle: {
                        color: 'green',
                        fontWeight: 'bold',
                    },
                    formatter: '{value}m³/y',
                    align: 'left'

                },
                nameTextStyle: {
                    color: 'green',
                    fontSize: 15,
                    fontWeight: 'bold',
                    align: 'right',
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

            }
        ],
        series: [{
                name: '标高体积(m³)',
                type: 'line',
                smooth: true,
                symbol: 'circle', //折点的样式
                symbolSize: 5, //折线点的大小
                yAxisIndex: 1,
                itemStyle: {
                    normal: {
                        borderWidth: 3,
                        borderColor: 'white',
                        color: 'white'
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
                    symbolSize: 5, //两端符号标记的大小
                    itemStyle: {
                        normal: {
                            borderWidth: 1,
                            lineStyle: {
                                type: 'dash',
                                color: 'white',
                                width: 2,
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
                        color: 'white',
                        fontSize: 15,
                        fontWeight: 'bold',
                        formatter: function(param) {
                            // return param.data.name + ':' + param.data.value;
                            return param.data.name;
                        },
                        position: 'middle'
                    }
                },
                animationDelay: function(idx) {
                    return idx * 10;
                }
            },
            // {
            //     name: '标高体积差值(m³)',
            //     type: 'line',
            //     smooth: true,
            //     symbol: 'circle', //折点的样式
            //     symbolSize: 5, //折线点的大小
            //     yAxisIndex: 2,
            //     itemStyle: {
            //         normal: {
            //             borderWidth: 3,
            //             borderColor: 'green',
            //             color: 'black'
            //         }
            //     }, //折点的样式设计
            //     lineStyle: {
            //         normal: {
            //             width: 3,
            //             shadowColor: 'rgba(255,0,0,0.9)',
            //             shadowBlur: 10,
            //             shadowOffsetY: 15
            //         }
            //     }, //折线的样式设计
            //     data: fillVolume_dif,
            //     markLine: {
            //         symbolSize: 5, //两端符号标记的大小
            //         itemStyle: {
            //             normal: {
            //                 borderWidth: 1,
            //                 lineStyle: {
            //                     type: 'dash',
            //                     color: 'black',
            //                     width: 2,
            //                 },
            //             }
            //         },
            //         data: [{
            //             name: '一亿 (m³)',
            //             yAxis: 100000000
            //         }, {
            //             name: '十亿 (m³)',
            //             yAxis: 1000000000
            //         }],
            //         label: {
            //             show: true,
            //             color: 'black',
            //             fontSize: 15,
            //             fontWeight: 'bold',
            //             formatter: function(param) {
            //                 // return param.data.name + ':' + param.data.value;
            //                 return param.data.name;
            //             },
            //             position: 'middle'
            //         }
            //     },
            //     animationDelay: function(idx) {
            //         return idx * 10;
            //     }
            // },
            {
                name: '时间(y)',
                type: 'line',
                smooth: true,
                symbol: 'circle', //折点的样式
                symbolSize: 5, //折线点的大小
                yAxisIndex: 2,
                itemStyle: {
                    normal: {
                        borderWidth: 3,
                        borderColor: '#26de9f',
                        color: '#26de9f'
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
                data: time_step,
                animationDelay: function(idx) {
                    return idx * 10;
                }
            },

            {
                name: '标高面积(㎡)',
                type: 'line',
                smooth: true,
                symbol: 'circle', //折点的样式
                symbolSize: 5, //折线点的大小
                yAxisIndex: 0,
                itemStyle: {
                    normal: {
                        borderWidth: 3,
                        borderColor: 'yellow',
                        color: 'yellow'
                    }
                }, //折点的样式设计
                lineStyle: {
                    normal: {
                        width: 4,
                        shadowColor: 'rgba(0,0,0,0.9)',
                        shadowBlur: 10,
                        shadowOffsetY: 15
                    }
                }, //折线的样式设计
                data: fillarea,

                animationDelay: function(idx) {
                    return idx * 10 + 100;
                }
            },

            {
                name: '速度(m³/y)',
                type: 'line',
                smooth: true,
                symbol: 'circle', //折点的样式
                symbolSize: 5, //折线点的大小
                yAxisIndex: 3,
                itemStyle: {
                    normal: {
                        borderWidth: 3,
                        borderColor: 'green',
                        color: 'green'
                    }
                }, //折点的样式设计
                lineStyle: {
                    normal: {
                        width: 4,
                        shadowColor: 'rgba(0,0,0,0.9)',
                        shadowBlur: 10,
                        shadowOffsetY: 15
                    }
                }, //折线的样式设计
                data: speed,
                animationDelay: function(idx) {
                    return idx * 10 + 100;
                }
            },
        ],
        //缩放控制键
        dataZoom: [
            //     { // 这个dataZoom组件，默认控制x轴。
            //     type: 'slider',
            //     xAxisIndex: 0,
            //     start: 0,
            //     end: 100,
            //     textStyle: {
            //         color: 'white',
            //     },
            //     fillerColor: 'rgba(23,44,127,0.2)',
            //     borderColor: 'rgba(180,180,0,0.5)',
            //     height: 20

            // }, 
            { // 这个dataZoom组件，也控制x轴。
                type: 'inside',
                // start: 10,
                // end: 60
            },
            //  {
            //     type: 'slider',
            //     yAxisIndex: 0,
            //     start: 0,
            //     end: 100,
            //     textStyle: {
            //         color: 'white',
            //     },
            //     fillerColor: 'rgba(23,44,127,0.2)',
            //     borderColor: 'rgba(180,180,0,0.5)',
            //     width: 20

            // }
        ],

        animationEasing: 'elasticOut',

    };
    myChart.setOption(option);
};


//...创建下方的表格....
function creatTable_fillvolumeAre(arry) {

    var info = '<table id="fill" border="10" class="hovertable" style="overflow-x:scroll;overflow-x:scroll;" align="center" width="fit-content" height="300px" ><tbody>' + '<tr onmouseover="this.style.backgroundColor= ' + '\'' + '#ffff66' + '\'' + ';" onmouseout="this.style.backgroundColor=' + '\'' + '#d4e3e5' + '\'' + ';"><th>' + '标高' + '</th></tr>' + '<tr onmouseover="this.style.backgroundColor= ' + '\'' + '#ffff66' + '\'' + ';" onmouseout="this.style.backgroundColor=' + '\'' + '#d4e3e5' + '\'' + ';"><th>' + '标高体积' + '</th></tr>' + '<tr onmouseover="this.style.backgroundColor= ' + '\'' + '#ffff66' + '\'' + ';" onmouseout="this.style.backgroundColor=' + '\'' + '#d4e3e5' + '\'' + ';"><th>' + '标高面积' + '</th></tr>' + '<tr onmouseover="this.style.backgroundColor= ' + '\'' + '#ffff66' + '\'' + ';" onmouseout="this.style.backgroundColor=' + '\'' + '#d4e3e5' + '\'' + ';"><th>' + '标高速度' + '</th></tr>' + '<tr onmouseover="this.style.backgroundColor= ' + '\'' + '#ffff66' + '\'' + ';" onmouseout="this.style.backgroundColor=' + '\'' + '#d4e3e5' + '\'' + ';"><th>' + '体积差' + '</th></tr>' + '<tr onmouseover="this.style.backgroundColor= ' + '\'' + '#ffff66' + '\'' + ';" onmouseout="this.style.backgroundColor=' + '\'' + '#d4e3e5' + '\'' + ';"><th>' + '差值时间' + '</th></tr>' + '<tr onmouseover="this.style.backgroundColor= ' + '\'' + '#ffff66' + '\'' + ';" onmouseout="this.style.backgroundColor=' + '\'' + '#d4e3e5' + '\'' + ';"><th>' + '累计时间' + '</th></tr>' + "</tbody></table>";
    var info = $(info); //转化为jq对象
    $('#tableContainerF').append(info);
    //增加列的方式：（动态添加）
    var num = Object.getOwnPropertyNames(arry).length;
    var fieldNames = Object.keys(arry);
    console.log(num);

    for (var j = 0; j < num; j++) {
        for (var i = 0; i < arry[fieldNames[j]].length; i++) {
            var tdValue = arry[fieldNames[j]][i];
            console.log(tdValue);
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
        table2excel.export(document.querySelectorAll('table'), '矿区标高-体积-面积表');
    });

};