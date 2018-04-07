import { UserData } from "../../item/userdata";

export class FirebaseUserDataControl {
    private firebase: any;
    private db: any;
    private userDataCollectionName: string = 'userData';

    constructor(firebase: any) {
        this.firebase = firebase;
        this.db = firebase.firestore();
    }

    getUserData(userId: string) {
        return this.db.collection(this.userDataCollectionName).doc(userId).get().then((doc) => {
            if (doc.exists) {
                return new UserData(userId, doc.data()['userName']);
            } else {
                return new UserData('no_id', 'no_name');
            }
        })
    }
}