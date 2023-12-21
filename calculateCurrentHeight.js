//阶段速度的函数--返回阶段速度m/s
function stageSpeed(speed) {
    var tiji = [0.349024925,2192293.44,13378614.55,31689001.85,50945418.5,75154902.36,105136816.6,142216506.1,
188338750.3,244019189.4,311640592.2,351176872.8,393607695.2,437414175.3,481726408.5];

    var gaodu = [159,209,259,309,349,389,429,449,489,529,589,609,629,649,669];
    //......分段速度计算:根据分段的容量以及速度计算出时间，同时根据根据高程查推算出分层设色的速度(m/s)...........
    var stepTime = [];
    var v = [];
    console.log(Number(speed));
    for (var i = 0; i < tiji.length - 1; i++) {
        var value = tiji[1];
        console.log(value);
        var result = ((tiji[i + 1] - tiji[i]) / (Number(speed)))*12 ; //结果是月(result 的单位是月，阶段性上升需要几个月--阶段时间这个是有工程实际意义的)
        var ceshi = (tiji[i+1]-tiji[i]);
        console.log(ceshi);
        console.log(result);
        stepTime.push(result); //阶段性时间集合---月
        v.push((gaodu[i + 1] - gaodu[i]) / stepTime[i]); //阶段性分层设色速度集合---m/月份（这个速度没有工程实际意义，就是分层设色的上升的高度，但是由于时间是有实际工程意义的所以在阶段节点上是准确的，但是在阶段与阶段之间是是不准确的，因为取的是平均值）
    };
    console.log('分层设色体积的个数：' + tiji.length);
    console.log('分层设色高度的个数：' + gaodu.length);
    console.log('只有当分层设色的体积个数和高度个数一致的时候计算正确');
    console.log('分层设色阶段性速度的个数：' + v.length);
    return v;
};

function calculateCurrentHeight(currentheight, v) {
    //根据每个阶段分层设色的速度(m/s)去定currentHeight，当然这个currentHeight在‘阶段’节点上是精确的，但是在‘阶段’之间是不精确的
    //因此currentheight必须以阶段为准
    if (currentheight <= 209) {
        currentheight += v[0]/5;
    } else if (currentheight <= 259) {
        console.log("哈哈哈");
        currentheight += v[1]/5;
    }else if (currentheight <= 309) {
        currentheight += v[2]/5;
        console.log("到221啦");
    } else if (currentheight <= 349) {
        currentheight += v[3]/5;
        console.log("到241啦");
    } else if (currentheight <= 389) {
        currentheight += v[4]/5;
    } else if (currentheight <= 429) {
        currentheight += v[5]/5;
    } else if (currentheight <= 469) {
        currentheight += v[6]/5;
    } else if (currentheight <= 509) {
        currentheight += v[7]/5;
    } else if (currentheight <= 549) {
        currentheight += v[8]/5;
    } else if (currentheight <= 589) {
        currentheight += v[9]/5;
    } else if (currentheight <= 609) {
        currentheight += v[10]/5;
    } else if (currentheight <= 629) {
        currentheight += v[11]/5;
    } else if (currentheight <= 649) {
        currentheight += v[12]/5;
    }else if (currentheight <= 669) {
        currentheight += v[13]/5;
    }
    return currentheight;
};