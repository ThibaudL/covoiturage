import ListPersons from "./listPersons";
import './listPerson.css';

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