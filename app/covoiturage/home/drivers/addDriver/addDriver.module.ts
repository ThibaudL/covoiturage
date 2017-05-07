import AddDriver from "./addDriver";

export default angular.module('addDriver',[])
    .component(AddDriver.selector,AddDriver.component)
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.drivers.add', {
                url : '/add',
                views : {
                    'content@' : {
                        component : AddDriver.selector
                    }
                }
            })
    })
;