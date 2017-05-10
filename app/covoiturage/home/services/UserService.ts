import DriverModel from "../components/person/PersonModel";
export default class UserService {
    public static readonly servicename = "userService";

    public static readonly $inject = [];
    public persons: Array<DriverModel> = [{
        firstname: 'jean',
        name: 'jack',
        adresse: 'Avenue de Paris',
        marker : {
            geometry: {
                coordinates: [
                    46.599099,
                    0.34081
                ]
            },
            type : 'directions_walk'
        }

    }];

    constructor() {

    }
}
