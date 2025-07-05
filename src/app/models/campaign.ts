import { Role } from './role';

export class Campaign {
    idCampaign: number = 0;
    nameCampaign: string = ''; 
    descriptionCampaign: string = '';
    dateCampaign: Date = new Date();
    role: Role = new Role();

    constructor() {
        // Initialization logic can go here if needed
    }
}
