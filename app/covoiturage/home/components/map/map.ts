import {API_KEY} from "../../../../../ignore/privateOptions";
import INgMap = angular.map.INgMap;
import './map.css';

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
            <ng-map zoom="13" center="Bois du fief clairet, Ligugé">
              
              <custom-marker position="Bois du fief clairet, Ligugé"  ng-if="$ctrl.displaySiege">
                <div class="mutuelle">
                    <md-tooltip>Siège - Bois du fief clairet, Ligugé</md-tooltip>
                    <i class="material-icons">business</i>
                </div>
              </custom-marker>
              
              <custom-marker 
                  ng-repeat="marker in $ctrl.markers track by $index"
                  id="custom-marker-{{$index}}"
                  on-click="$ctrl.map.showInfoWindow('markerInfo', 'custom-marker-'+$index)"
                  position="{{::marker.geometry.coordinates}}"
              >
                <div class="mutuelle">
                  <md-tooltip>{{marker.driver.firstname}} {{marker.driver.name}} - {{marker.driver.adresse}}</md-tooltip>
                    <i class="material-icons">{{marker.type}}</i>
                </div>
              </custom-marker>
            </ng-map>
        </div>
    </md-card>
    <md-card layout="row" layout-align="left center" style="padding-top:15px;padding-left: 15px">
        <md-checkbox ng-model="$ctrl.displaySiege">
            Afficher siège
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
    private markers:Array<any>;

    private displaySiege: boolean = true;
    private static googleMapsUrl: string = "https://maps.google.com/maps/api/js?key=" + API_KEY;

    private NgMap: INgMap;
    private map: google.maps.Map;
    public static readonly $inject = ['NgMap'];

    constructor(NgMap: INgMap) {
        this.NgMap = NgMap;
        NgMap.getMap().then((map: google.maps.Map) => {
            this.map = map;
        });
    }

    $onChanges(changes): void {
        if (changes.markers.currentValue.length > 0) {
            changes.markers.currentValue.forEach((geoJson) => {
                if (geoJson) {
                    // this.map.data.addGeoJson(geoJson);
                    this.map.panTo(
                        {
                            lat: geoJson.geometry.coordinates[0],
                            lng: geoJson.geometry.coordinates[1]
                        }
                    )
                }
            });
        }
    }

    formatCoordinates(coordinates : Array<number>) : Array<number>{
        console.log(coordinates.reverse())
        return coordinates.reverse();
    }

    toogleDisplay(marker:any) :void{
        this.markers.forEach((m) => {
            if(m.properties.x === marker.properties.x && m.properties.y === marker.properties.y){
                marker.displayMore = !marker.displayMore;
            }else{
                marker.displayMore = false;
            }
        });
    }
}