import { Campaign } from "./campaign";
import { Mission } from "./mission";
import { Reward } from "./reward";
import { Users } from "./users";
import { Volunteering } from "./volunteering";

export class Review {
    idReview:number=0
    categoryReview:string = '';
    qualificationReview:number = 0;
    textReview:string = '';
    users:Users = new Users();
    mission:Mission = new Mission();
    reward:Reward = new Reward();
    volunteering:Volunteering = new Volunteering();
    campaign:Campaign = new Campaign();
    constructor() {
    }
}