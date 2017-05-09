export default angular.module('drivers',[])
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.drivers', {
                url: '/drivers',
                template : '',
                redirectTo : 'home.drivers.list'
            })
    })
;