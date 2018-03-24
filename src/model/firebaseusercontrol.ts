
export class FirebaseUserControl {
    private firebase: any;
    private db: any;
    private userDataCollectionName: string = 'userData';

    constructor(firebase: any) {
        this.firebase = firebase;
        this.db = firebase.firestore();
    }

    addUser(userId: string) {
        return this.getUserDataReference().doc(userId).set({
            userId: userId,
            lastLogin: this.firebase.firestore.FieldValue.serverTimestamp(),
            createdAt: this.firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    updateUserLogin(userId: string) {
        return this.getUserDataReference().doc(userId).update({
           lastLogin: this.firebase.firestore.FieldValue.serverTimestamp() 
        })
    }

    isUserExist(userId: string) {
        return this.getUserDataReference()
        .doc(userId)
        .get()
        .then((doc) => {
            console.log(doc);
            return doc.exists;
        });
    }

    private getUserDataReference() {
        return this.db.collection(this.userDataCollectionName);
    }
}