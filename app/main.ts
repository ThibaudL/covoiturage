/// <reference types="angular" />
/// <reference types="angular-ui-router" />
import * as angular from 'angular';
import CovoiturageModule from './covoiturage/covoiturage.module';

angular.bootstrap(document, [CovoiturageModule.name]);