const template: string = `
    <div layout="row">
        <driver address-selected="$ctrl.addMarker(item)" flex></driver>
        <covoiturage-map markers="$ctrl.markers" flex></covoiturage-map>
    </div>
`;

export default class AddDriver {
    public static readonly selector: string = 'addDriver';
    public static readonly component: Object = {
        template,
        controller: AddDriver
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

