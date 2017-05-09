import ListDrivers from "./listDrivers";

export default angular.module('listDrivers',[])
    .component(ListDrivers.selector,ListDrivers.component)
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.drivers.list', {
                url : '/list',
                views : {
                    'content@' : {
                        component : ListDrivers.selector
                    }
                }
            })
    })
;