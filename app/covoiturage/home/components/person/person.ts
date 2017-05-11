import PersonModel from "./PersonModel";
import AdresseDataGouvFrService from 'angular-adresse-data-gouv-fr/app/adresseDataGouvFr/service/AdresseDataGouvFrService';
import GeoCodeJSON from 'angular-adresse-data-gouv-fr/app/adresseDataGouvFr/types/GeoCode/GeoCodeJSON';
import UserService from "../../services/UserService";
const template: string = `
    <md-card >
        <md-toolbar class="md-primary">
            <div class="md-toolbar-tools">
                <h3 class="md-flex">Covoitureur</h3>
            </div>
        </md-toolbar>
        <form name="$ctrl.form" ng-submit="$ctrl.submitForm($ctrl.form)">
            <div class="md-block">
                <md-autocomplete flex 
                    md-input-name="autocompleteField"
                    md-input-minlength="2"
                    md-selected-item="$ctrl.selectedItem"
                    md-selected-item-change="$ctrl.itemChanged($ctrl.selectedItem)"
                    md-search-text="$ctrl.searchText"
                    md-items="item in $ctrl.search($ctrl.searchText)"
                    md-item-text="item.properties.label"
                    md-floating-label="Adresse"
                    required
                >
                <md-item-template>
                    <span md-highlight-text="$ctrl.searchText">{{item.properties.label}}</span>
                </md-item-template>
                <md-not-found>
                    Not found.
                </md-not-found>
            </div>
            <md-input-container class="md-block">
              <label>Prénom</label>
              <input ng-model="$ctrl.person.firstname" type="text" required>
            </md-input-container>
            <md-input-container class="md-block">
              <label>Nom</label>
              <input ng-model="$ctrl.person.name" type="text" required>
            </md-input-container>
            <md-input-container  class="md-block">
              <label>Téléphone</label>
              <input ng-model="$ctrl.person.phone" type="text" >
            </md-input-container>
            <md-input-container class="md-block">
              <label>E-mail</label>
              <input ng-model="$ctrl.person.email" type="email">
            </md-input-container>
            <md-input-container class="md-block">
            <md-radio-group ng-model="$ctrl.person.type" >
              <md-radio-button value="drivee" class="md-primary">Pièton</md-radio-button>
              <md-radio-button value="driver" class="md-primary">Conducteur</md-radio-button>
              </md-radio-group>
            </md-input-container>
            <md-input-container ng-if="$ctrl.person.type === 'driver'">
                <label>Nombre de places</label>
                <input ng-model="$ctrl.person.nbSeets" type="number" ng-init="$ctrl.person.nbSeets = $ctrl.person.nbSeets || 4">
            </md-input-container>
            <div layout="row" layout-align="end center">
                <md-button type="submit" class="md-primary md-raised">Ajouter</md-button>
            </div>
        </form>
    </md-card>
`;

export default class Person {
    public static readonly selector: string = "person";
    public static readonly component: Object = {
        template,
        controller: Person,
        bindings: {
            onAddressSelected: '&',
            onAdd: '&'
        }
    };

    private onAddressSelected: Function;
    private onAdd: Function;
    private person: PersonModel;
    private results: GeoCodeJSON;

    private adresseService: AdresseDataGouvFrService;
    private userService: UserService;
    private $state: ng.ui.IStateService;

    public static readonly $inject = [AdresseDataGouvFrService.SERVICE_NAME, UserService.servicename, '$state'];

    constructor(adresseService: AdresseDataGouvFrService, userService: UserService, $state: ng.ui.IStateService) {
        this.person = {
            type:"drivee",
            display : {

            }
        };
        this.adresseService = adresseService;
        this.userService = userService;
        this.$state = $state;
    }


    search(searchText: string) {
        return this.adresseService.search(searchText)
            .then((results) => {
                this.results = results;
                return this.results.features;
            })
    }

    itemChanged(item: any): void {
        item.geometry.coordinates = item.geometry.coordinates.reverse();
        item.type = "arrow_downward";
        this.person.adresse = item.properties.label;
        this.person.marker = item;
        this.userService.persons.push(this.person);
    }

    submitForm(form): void {
        if(form.$valid) {
            this.person.marker.type = this.person.type === 'driver' ? 'directions_car' : 'directions_walk';
            this.$state.go("home.persons.list");
        }
    }


}