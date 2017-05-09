import DriverModel from "../../components/driver/DriverModel";
import UserService from "../../services/UserService";

const template: string = `
    <div layout="row">
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

