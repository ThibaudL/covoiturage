import DriverModel from "../components/driver/DriverModel";
export default class UserService {
    public static readonly servicename = "userService";

    public static readonly $inject = [];
    public drivers : Array<DriverModel> = [];

    constructor(){

    }
}
