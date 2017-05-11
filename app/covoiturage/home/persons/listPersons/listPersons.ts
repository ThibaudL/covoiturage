import PersonModel from "../../components/person/PersonModel";
import UserService from "../../services/UserService";

const template: string = `
    <div layout="row">
        <md-card flex>
            <md-list class="person-list" flex>
                <md-list-item 
                    class="md-3-line person-item" 
                    ng-repeat="person in $ctrl.userService.persons track by $index"
                    ng-class="{'hover' : person.display.hover}"
                    ng-mouseenter="person.display.hover = true"
                    ng-mouseleave="person.display.hover = false"
                    >
                    <div class="md-list-item-text" layout="row" layout-align="space-between center">
                        <div layout="row">
                            <i class="material-icons">{{person.marker.type}}</i>
                            <div layout="column">
                                <h3>
                                    &nbsp;&nbsp;{{ person.firstname }} {{person.name}}
                                </h3>
                                <p>{{person.adresse}}</p>
                            </div>
                        </div>
                        <div layout="row" ng-init="list = $ctrl.initSeats(person)">
                            <i class="free material-icons" ng-repeat="it in list track by $index">event_seat</i>
                        </div>
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

    initSeats(person:PersonModel){
        if(person.nbSeets > 0) {
            return new Array(person.nbSeets);
        }else{
            return 0;
        }
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

