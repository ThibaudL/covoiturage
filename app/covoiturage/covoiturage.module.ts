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
import Driver from "./home/components/driver/driver";
import {MODULE_NAME as AngularAdresseDataGouvFr} from 'angular-adresse-data-gouv-fr/app/main';
import AddDriverModule from "./home/drivers/addDriver/addDriver.module";
import DriversModule from "./home/drivers/drivers.module";
import UserService from "./home/services/UserService";
import ListDriversModule from "./home/drivers/listDrivers/listDrivers.module";
export default angular.module('covoiturage',
    ['ngMaterial', 'ngSanitize', 'ui.router', 'ngMap',
        AngularAdresseDataGouvFr,
        AddDriverModule.name,
        DriversModule.name,
        ListDriversModule.name
    ]
)
    .component(Home.selector, Home.component)
    .component(Map.selector, Map.component)
    .component(Driver.selector, Driver.component)
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