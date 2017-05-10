/// <reference types="angular" />
/// <reference types="angular-ui-router" />
import * as angular from 'angular';
import CovoiturageModule from './covoiturage/covoiturage.module';

import "./covoiturage/home/persons/persons.routes";
import "./covoiturage/home/persons/listPersons/listPersons.routes";

angular.bootstrap(document, [CovoiturageModule.name]);