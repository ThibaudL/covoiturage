import DriverModel from "../components/driver/DriverModel";
export default class UserService {
    public static readonly servicename = "userService";

    public static readonly $inject = [];
    public drivers: Array<DriverModel> = [{
        firstname: 'jean',
        name: 'jack',
        adresse: '2 allée traversière',
        marker : {
            geometry: {
                coordinates: [
                    46.599099,
                    0.34081
                ]
            },
            type : 'home'
        }

    }];

    constructor() {

    }
}
