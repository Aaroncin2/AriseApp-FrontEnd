import { Campaign } from "./campaign";
import { Donation } from "./donations";
import { Role } from "./role";


export class Volunteering {
    idVolunteering: number = 0;
    nameVolunteering: string = '';
    activityVolunteering: boolean = false;
    attendanceVolunteering: boolean = false;
    areaVolunteering: string = '';
    campaign: Campaign = new Campaign();
    role: Role = new Role();    
    donation: Donation = new Donation();

    constructor() {
      
    }



}