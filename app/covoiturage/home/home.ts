const template: string = `
    <div layout="row">
        <div ui-view="content" flex></div>
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

    constructor() {

    }

    addMarker(item): void {
        this.markers.push(item);
        this.markers = this.markers.map((item) => item);
    }
}

