import PersonModel from "../../components/person/PersonModel";
import UserService from "../../services/UserService";

const template: string = `
    <div layout="row">
        <md-card flex>
            <md-list  flex>
                <md-list-item class="md-3-line" 
                    ng-repeat="person in $ctrl.userService.persons track by $index">
                    
                    <div class="md-list-item-text" layout="row" layout-align="start center">
                        <i class="material-icons">{{person.marker.type}}</i>
                        <h3>
                            &nbsp;&nbsp;{{ person.firstname }} {{person.name}} - {{person.adresse}}
                        </p>
                    </div>
                    <md-divider ng-if="!$last"></md-divider>
                </md-list-item>
            </md-list>
        </md-card>
    </div>
`;

export default class ListPersons {
    public static readonly selector: string = 'listPersons';
    public static readonly component: Object = {
        template,
        controller: ListPersons
    };

    private markers:Array<Object> = [];
    private userService:UserService;

    public static $inject = [UserService.servicename];
    constructor(userService:UserService) {
        this.userService = userService;

    }

    $onInit(){
        console.log("$onInit()",this.userService.persons)
        this.userService.persons.forEach((person) => {
            this.addMarker(person.marker);
        });
    }

    addMarker(item:any): void {
        console.log("adding marker", item);
        this.markers.push(item);
        this.markers = this.markers.map((item) => item);
    }

    addDriver(person:PersonModel):void{
        this.userService.persons.push(person);
    }
}

