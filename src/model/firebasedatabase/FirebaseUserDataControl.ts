export class FirebaseUserDataControl {
    private firebase: any;
    private db: any;
    private userDataCollectionName: string = 'userData';

    constructor(firebase: any) {
        this.firebase = firebase;
        this.db = firebase.firestore();
    }

    getUserName(userId: string) {
        return this.db.collection(this.userDataCollectionName).doc(userId).get().then((doc) => {
            if (doc.exists) {
                return doc.data()['userName'];
            } else {
                return "not found";
            }
        })
    }
}