import DriverModel from "./DriverModel";
import AdresseDataGouvFrService from 'angular-adresse-data-gouv-fr/app/adresseDataGouvFr/service/AdresseDataGouvFrService';
import GeoCodeJSON from 'angular-adresse-data-gouv-fr/app/adresseDataGouvFr/types/GeoCode/GeoCodeJSON';
const template:string = `
    <md-card >
        <md-toolbar class="md-primary">
            <div class="md-toolbar-tools">
                <h3 class="md-flex">Conducteur</h3>
            </div>
        </md-toolbar>
        <md-input-container class="md-block">
            <md-autocomplete flex required
                md-input-name="autocompleteField"
                md-input-minlength="2"
                md-input-maxlength="18"
                md-selected-item="$ctrl.selectedItem"
                md-selected-item-change="$ctrl.itemChanged($ctrl.selectedItem)"
                md-search-text="$ctrl.searchText"
                md-items="item in $ctrl.search($ctrl.searchText)"
                md-item-text="item.properties.label"
                md-floating-label="Adresse">
            <md-item-template>
                <span md-highlight-text="$ctrl.searchText">{{item.properties.label}}</span>
            </md-item-template>
            <md-not-found>
                Not found.
            </md-not-found>
        </md-input-container>
        <md-input-container class="md-block">
          <label>Nom</label>
          <input ng-model="$ctrl.driver.name" type="text">
        </md-input-container>
        <md-input-container  class="md-block">
          <label>Téléphone</label>
          <input ng-model="$ctrl.driver.phone" type="text" >
        </md-input-container>
        <md-input-container class="md-block">
          <label>E-mail</label>
          <input ng-model="$ctrl.driver.email" type="email" ng-required="true">
        </md-input-container>
        <md-button>Ajouter</md-button>
    </md-card>
`;

export default class Driver {
    public static readonly selector:string = "driver";
    public static readonly component:Object = {
        template,
        controller : Driver,
        bindings : {
            addressSelected : '&'
        }
    };

    private addressSelected:Function;
    private driver:DriverModel;
    private adresseService:AdresseDataGouvFrService;
    private results: GeoCodeJSON;


    public static readonly $inject = [AdresseDataGouvFrService.SERVICE_NAME];
    constructor(adresseService:AdresseDataGouvFrService) {
        this.driver = {

        };
        this.adresseService = adresseService;
    }

    search(searchText:string){
        return this.adresseService.search(searchText)
            .then((results) => {
                this.results = results;
                return this.results.features;
            })
    }

    itemChanged(item:Object) : void{
        this.addressSelected({item});
    }
}