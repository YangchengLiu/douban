angular.module('top250Module',[])
    .controller('top250Ctrl', ['$scope', '$http', 'myService', '$stateParams', '$location', function ($scope, $http, myService, $stateParams, $location) {
        //当前页
        var page = $stateParams['page'];
        //每次请求数据的条数
        var count = 12;
        //从第几条数据开始取
        var start = (page - 1) * count;
        //总页数
        var totalPage = 0;
        myService.myJsonp('https://api.douban.com/v2/movie/top250', {
            count: count,
            start: start
        }, function (res) {
            $scope.result = res;
            totalPage = Math.ceil(res.total / count);
            //通知angularjs更新HTML页面
            $scope.$apply();
        });
        $scope.changePage = function (type) {
            if (type == 'next') {
                //下一页
                page++;
                if (page > totalPage) {
                    page = totalPage
                }
            } else if (type == 'prev') {
                //上一页
                page--;
                //跳转页面
                if (page < 1) {
                    page = 1
                }
            }
            $location.path('/top250/' + page);
        }
    }]);