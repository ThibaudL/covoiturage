import {API_KEY} from "../../../../../ignore/privateOptions";
import INgMap = angular.map.INgMap;
import './map.css';
import UserService from "../../services/UserService";

const template: string = `
    <md-card >
        <md-toolbar class="md-primary">
            <div class="md-toolbar-tools">
                <h3 class="md-flex">Carte</h3>
            </div>
        </md-toolbar>
        <div map-lazy-load="https://maps.google.com/maps/api/js"
             map-lazy-load-params="{{$ctrl.googleMapsUrl}}"        
            >
            <ng-map zoom="13" zoom-to-include-markers="auto" center="Bois du fief clairet, Ligugé" style="height:600px">
              
              <custom-marker position="[46.539627,0.319984]"  ng-if="$ctrl.displaySiege">
                <div class="mutuelle">
                    <md-tooltip>Siège - Bois du fief clairet, Ligugé</md-tooltip>
                    <i class="material-icons">business</i>
                </div>
              </custom-marker>
              
              <custom-marker 
                  ng-repeat="person in $ctrl.userService.persons | filter : {marker : {type : 'arrow_downward'}} track by $index"
                  id="custom-marker-{{$index}}"
                  on-click="$ctrl.map.showInfoWindow('markerInfo', 'custom-marker-'+$index)"
                  position="{{::person.marker.geometry.coordinates}}"
              >               
                <div class="mutuelle person-item" >
                  <md-tooltip>{{person.firstname}} {{person.name}} - {{person.adresse}}</md-tooltip>
                    <i class="material-icons">{{person.marker.type}}</i>
                </div>
              </custom-marker>

              <custom-marker ng-if="$ctrl.displayDrivees"
                  ng-repeat="person in $ctrl.userService.persons | filter : {marker : {type : 'directions_walk'}} track by $index"
                  id="custom-marker-{{$index}}"
                  on-click="$ctrl.map.showInfoWindow('markerInfo', 'custom-marker-'+$index)"
                  position="{{::person.marker.geometry.coordinates}}"
              >                
                <div class="mutuelle person-item"
                  ng-class="{'hover' : person.display.hover}"
                  ng-mouseenter="person.display.hover = true"
                  ng-mouseleave="person.display.hover = false"
                >
                  <md-tooltip>{{person.firstname}} {{person.name}} - {{person.adresse}}</md-tooltip>
                    <i class="material-icons">{{person.marker.type}}</i>
                </div>
              </custom-marker>

              <custom-marker ng-if="$ctrl.displayDrivers" 
                  ng-repeat="person in $ctrl.userService.persons | filter : {marker : {type : 'directions_car'}} track by $index"
                  id="custom-marker-{{$index}}"
                  on-click="$ctrl.map.showInfoWindow('markerInfo', 'custom-marker-'+$index)"
                  position="{{::person.marker.geometry.coordinates}}"
              >
                <div class="mutuelle person-item"
                    ng-class="{'hover' : person.display.hover}"
                    ng-mouseenter="person.display.hover = true"
                    ng-mouseleave="person.display.hover = false"
                >
                  <md-tooltip>{{person.firstname}} {{person.name}} - {{person.adresse}}</md-tooltip>
                    <i class="material-icons">{{person.marker.type}}</i>
                </div>
              </custom-marker>
            </ng-map>
        </div>
    </md-card>
    <md-card layout="row" layout-align="left center" style="padding-top:15px;padding-left: 15px">
        <md-checkbox ng-model="$ctrl.displaySiege">
            Afficher siège
        </md-checkbox>
        <md-checkbox ng-model="$ctrl.displayDrivers">
            Afficher conducteurs
        </md-checkbox>
        <md-checkbox ng-model="$ctrl.displayDrivees">
            Afficher pietons
        </md-checkbox>
    </md-card>
`;
export default class Map {
    public static readonly selector: string = "covoiturageMap";
    public static readonly component: Object = {
        template,
        controller: Map,
        bindings: {
            markers: '<'
        }
    };

    private displaySiege: boolean = true;
    private displayDrivers: boolean = true;
    private displayDrivees: boolean = true;

    private static googleMapsUrl: string = "https://maps.google.com/maps/api/js?key=" + API_KEY;

    private NgMap: INgMap;
    private userService:UserService;
    public static readonly $inject = ['NgMap',UserService.servicename];
    constructor(NgMap: INgMap,userService:UserService) {
        this.NgMap = NgMap;
        this.userService = userService;
        // this.NgMap.getMap().then((map: google.maps.Map) => {
        //     const center = map.getCenter();
        //     google.maps.event.trigger(map, "resize");
        //     map.setCenter(center);
        // });

    }

    formatCoordinates(coordinates : Array<number>) : Array<number>{
        return coordinates.reverse();
    }

}