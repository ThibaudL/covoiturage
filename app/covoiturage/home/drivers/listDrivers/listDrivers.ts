import DriverModel from "../../components/driver/DriverModel";
import UserService from "../../services/UserService";

const template: string = `
    <div layout="row">
        <md-card flex>
            <md-list  flex>
                <md-list-item class="md-3-line" 
                    ng-repeat="driver in $ctrl.userService.drivers track by $index">
                    
                    <div class="md-list-item-text" layout="row" layout-align="start center">
                        <i class="material-icons">{{driver.marker.type}}</i>
                        <h3>
                            &nbsp;&nbsp;{{ driver.firstname }} {{driver.name}} - {{driver.adresse}}
                        </p>
                    </div>
                    <md-divider ng-if="!$last"></md-divider>
                </md-list-item>
            </md-list>
        </md-card>
        <covoiturage-map markers="$ctrl.markers" flex></covoiturage-map>
    </div>
`;

export default class ListDrivers {
    public static readonly selector: string = 'listDriver';
    public static readonly component: Object = {
        template,
        controller: ListDrivers
    };

    private markers:Array<Object> = [];
    private userService:UserService;

    public static $inject = [UserService.servicename];
    constructor(userService:UserService) {
        this.userService = userService;
        console.log("constructor",this.userService.drivers)

    }

    $onInit(){
        console.log("$onInit()",this.userService.drivers)
        this.userService.drivers.forEach((driver) => {
            this.addMarker(driver.marker);
        });
    }

    addMarker(item:any): void {
        console.log("adding marker", item);
        this.markers.push(item);
        this.markers = this.markers.map((item) => item);
    }

    addDriver(driver:DriverModel):void{
        this.userService.drivers.push(driver);
    }
}

