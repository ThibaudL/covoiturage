import {API_KEY} from "../../../../ignore/privateOptions";
const template:string = `
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
    public static readonly selector:string = "covoiturageMap";
    public static readonly component: Object = {
        template,
        controller: Map
    };

    private static googleMapsUrl:string = "https://maps.google.com/maps/api/js?key="+API_KEY;

    constructor(){

    }
}