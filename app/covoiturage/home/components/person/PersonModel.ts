interface PersonModel{
    adresse?:string;
    firstname?:string;
    name?:string;
    phone?:number;
    email?:string;
    marker?:any;
    type?:'driver' | 'drivee';
    nbSeets?:number;

    // display properties
    display: any
}
export default PersonModel;