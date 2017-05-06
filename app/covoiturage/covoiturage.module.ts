import * as angular from 'angular';
import Home from './home/home';
import 'angular-animate';
import 'angular-aria';
import 'angular-material';
import 'angular-messages';
import 'angular-sanitize';
import 'angular-material/angular-material.min.css'
import 'ngmap';
import Map from "./home/map/map";
import Driver from "./home/driver/driver";
import {MODULE_NAME as AngularAdresseDataGouvFr} from 'angular-adresse-data-gouv-fr/app/main';

export default angular.module('covoiturage',['ngMaterial', 'ngSanitize','ngMap',AngularAdresseDataGouvFr])
    .component(Home.selector,Home.component)
    .component(Map.selector,Map.component)
    .component(Driver.selector,Driver.component)
;