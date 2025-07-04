import { Users } from "./users";
import { Forum } from "./forum";

export class Comment {
    idComment: number = 0;
    categoryComment: string = '';
    descriptionComment: string = '';
    dateComment: Date = new Date();
    users: Users = new Users();
    forum: Forum = new Forum();

    constructor() {
       
    }
}
