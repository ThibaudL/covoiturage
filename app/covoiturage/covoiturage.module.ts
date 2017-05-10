import * as angular from 'angular';
import Home from './home/home';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-messages';
import 'angular-sanitize';
import 'angular-material/angular-material.min.css'
import 'angular-ui-router';
import 'ngmap';
import Map from "./home/components/map/map";
import Person from "./home/components/person/person";
import {MODULE_NAME as AngularAdresseDataGouvFr} from 'angular-adresse-data-gouv-fr/app/main';


import UserService from "./home/services/UserService";
export default angular.module('covoiturage',
    ['ngMaterial', 'ngSanitize', 'ui.router', 'ngMap',
        AngularAdresseDataGouvFr
    ]
)
    .component(Home.selector, Home.component)
    .component(Map.selector, Map.component)
    .component(Person.selector, Person.component)
    .service(UserService.servicename,UserService)
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/home');
        $stateProvider
            .state('home', {
                url: '/home',
                views : {
                    'content@' : {
                        component: Home.selector
                    }
                }
            })
    });
;
