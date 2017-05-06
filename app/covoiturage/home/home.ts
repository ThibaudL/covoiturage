const template: string = `
            <div layout="column">
                <md-toolbar class="md-primary">
                    <div class="md-toolbar-tools">
                        <h2 class="md-flex">Covoiturage</h2>
                    </div>
                </md-toolbar>
                <md-content layout-padding>
                    <div layout="row">
                        <driver address-selected="$ctrl.addMarker(item)" flex></driver>
                        <covoiturage-map markers="$ctrl.markers" flex></covoiturage-map>
                    </div>
                </md-content>
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

