const template: string = `
    <div layout="row">
        <md-card flex>
        
        </md-card>
        <covoiturage-map markers="$ctrl.markers" flex></covoiturage-map>
    </div>
`;

export default class Home {
    public static readonly selector: string = 'home';
    public static readonly component: Object = {
        template,
        controller: Home
    };

    private markers:Array<Object> = [];

    public static $inject = ['NgMap'];

    constructor(NgMap: angular.map.INgMap) {
        NgMap.getMap().then(function (map) {
            NgMap.initMap();
            const center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
    }

    addMarker(item): void {
        this.markers.push(item);
        this.markers = this.markers.map((item) => item);
    }
}

