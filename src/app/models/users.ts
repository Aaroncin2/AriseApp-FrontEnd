import { Role} from "./role";

export class Users {
    idUser: number=0;
    username:string="";
    password: string='';
    enabled:boolean=true;
    email:string='';
    roles:Role[] = [];

    constructor() {
        
    }
}