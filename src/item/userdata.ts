export class UserData {
    private userId: string;
    private userName: string;

    constructor(userId: string, userName: string)  {
        this.userId = userId;
        this.userName = userName;
    }

    getUserId() {
        return this.userId;
    }

    getUserName() {
        return this.userName;
    }
}