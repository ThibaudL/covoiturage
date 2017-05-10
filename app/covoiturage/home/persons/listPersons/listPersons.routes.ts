import ListPersons from "./listPersons";

angular.module('covoiturage')
    .component(ListPersons.selector,ListPersons.component)
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.persons.list', {
                url : '/list',
                views : {
                    'content@home' : {
                        component : ListPersons.selector
                    }
                }
            })
    })
;