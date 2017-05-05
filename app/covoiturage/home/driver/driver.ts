const template:string = `
    <md-card >
        <md-toolbar class="md-primary">
            <div class="md-toolbar-tools">
                <h3 class="md-flex">Conducteur</h3>
            </div>
        </md-toolbar>
        <md-input-container>
            <label>Adresse</label>
            <input ng-model="$ctrl.driver.adresse"></input>
        </md-input-container>
    </md-card>
`;

export default class Driver {
    public static readonly selector:string = "driver";
    public static readonly component:Object = {
        template,
        controller : Driver
    }
}