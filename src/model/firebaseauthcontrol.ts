export class FirebaseAuthControl {
    firebase: any;
    isSignedin: boolean;
    user: any;

    constructor(firebase: any) {
        this.firebase = firebase;
    }

    redirectForLogin() {
        const provider = new this.firebase.auth.GoogleAuthProvider();
        return this.firebase.auth().signInWithRedirect(provider);
    }

    signOut() {
        return this.firebase.auth().signOut();
    }

    startMonitoringSigninState(onSignin, onSignout) {
        this.firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                this.user = user;
                this.isSignedin = true;
                onSignin(user);
            } else {
                this.isSignedin = false;
                this.user = user;
                onSignout();
            }
        });
    }
    
    isSignedIn() {
        return this.isSignedin;
    }
}