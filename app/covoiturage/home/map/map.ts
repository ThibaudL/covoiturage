import {API_KEY} from "../../../../ignore/privateOptions";
import INgMap = angular.map.INgMap;
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
            <ng-map zoom="9" center="poitier">
            </ng-map>
        </div>
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
                    this.map.data.addGeoJson(geoJson);
                    this.map.panTo(
                        {
                            lat: geoJson.geometry.coordinates[1],
                            lng: geoJson.geometry.coordinates[0]
                        }
                    )
                }
            });
        }
    }
}