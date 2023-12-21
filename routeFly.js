//根据飞行路线.scp文件生成路线站点信息，然后通过三个按钮，控制它的状态
//关于要不要隐现S3m图层，我们可以设置一个复选框进行勾选
function routeFly(viewer, scene) {
    var flyManager;
    var routes = new Cesium.RouteCollection(viewer.entities);
    //添加fpf飞行文件，fpf由SuperMap iDesktop生成
    var fpfUrl = 'routefly/NewSceneRoutes.fpf';
    routes.fromFile(fpfUrl);
    //初始化飞行管理
    var flyManager = new Cesium.FlyManager({
        scene: scene,
        routes: routes
    });
    flyManager.readyPromise.then(function() { // 飞行路线就绪
        var currentRoute = flyManager.currentRoute;
        currentRoute.isLineVisible = false;
        currentRoute.isStopVisible = false;
        //生成飞行文件中的所有站点列表
        var allStops = flyManager.getAllRouteStops();
        $("body").on('click', "[id='play']", function() {
            flyManager && flyManager.play();
        });
        $("body").on('click', "[id='pause']", function() {
            flyManager && flyManager.pause();
        });
        $("body").on('click', "[id='stop']", function() {
            flyManager && flyManager.stop();
        });
    });
};