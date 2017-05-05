const template: string = `
            <div layout="column">
                <md-toolbar class="md-primary">
                    <div class="md-toolbar-tools">
                        <h2 class="md-flex">Covoiturage</h2>
                    </div>
                </md-toolbar>
                <md-content layout-padding>
                    <div layout="row">
                        <driver flex></driver>
                        <covoiturage-map flex></covoiturage-map>
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

    public static $inject = ['NgMap'];
    constructor(NgMap:angular.map.INgMap){
        NgMap.getMap().then(function(map) {
            NgMap.initMap();
            var center = map.getCenter();
            google.maps.event.trigger(map, "resize");
            map.setCenter(center);
        });
    }

}

