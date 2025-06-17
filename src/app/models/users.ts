import { Role} from "./role";

export class Users {
    idUser: number=0;
    username:string="";
    email:string='';
    password: String='';
    enabled:boolean=true;
    roles:Role[] = [];

    constructor() {
        
    }
}