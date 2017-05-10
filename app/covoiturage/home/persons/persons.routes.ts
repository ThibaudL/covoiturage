import Person from '../components/person/person';

angular.module('covoiturage')
    .config(function ($stateProvider) {
        $stateProvider
            .state('home.persons', {
                url: '/persons',
                template : '',
                redirectTo : 'home.persons.list'
            })
            .state('home.persons.add', {
                url: '/add',
                views : {
                    'content@home' : {
                        component : Person.selector
                    }
                }
            })
    })
;