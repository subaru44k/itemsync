declare const firebase:any;

import Vue from 'vue';
import { FirebaseControl } from './model/firebasecontrol';
import { FirebaseAuthControl } from './model/firebaseauthcontrol';
import NavbarComponent from './components/navbar';
import CreateChannelFromComponent from './components/createchannelform';
import { FirebaseUserControl } from './model/firebaseusercontrol';

const createChannel = new Vue({
    el: '#createChannel',
    data: {
        activeIndex: 3,
        user: null,
    },
    methods: {
        handleLogout: function() {
            firebaseAuthControl.signOut();
        },
        setUserData(user: any) {
            this.user = user;
        },
        unsetUserData() {
            this.user = null;
        },
        handleCreateChannel: function(channelName: string, isPublic: boolean) {
            if (isPublic) {
                firebaseControl.addNewPublicChannel(channelName, 'anonymous').then((docRef) => {
                    console.log('public channel added as ID: ', docRef.id);
                    location.href = './publicchannels/' + docRef.id;
                }).catch((err) => {
                    console.log(err);
                });
            } else {
                // Check authentication by client side
                // You should aware this value can be set by attacker since this is client side verification
                if (!this.user) {
                    console.log('You are not authenticated. Operation not allowed.');
                    return;
                }
                // Note: Check authentication by server side with security rules of Firebase Cloud Firestore
                // You have to ensure this rule works correctly.
                firebaseControl.addNewPrivateChannel(channelName, this.user.uid).then((docRef) => {
                    console.log('private channel added as ID: ', docRef.id);
                    location.href = './privateChannels/' + docRef.id;
                }).catch((err) => {
                    // If server side verification fails, this catch clause will be called
                    console.warn('error occurs when creating private channel');
                    console.warn('Do you try to create private channel without authentication?');
                    console.warn(err);
                })
            }
        }
    },
    components: {
        'navigation-menu': NavbarComponent,
        'create-channel-form': CreateChannelFromComponent
    }
});

function onSignin(user: any) {
    console.log(user);
    console.log(user.displayName);
    console.log(user.email);
    console.log(user.photoURL);
    console.log(user.uid);
    createChannel.setUserData(user);
    firebaseUserControl.isUserExist(user.uid).then((exist) => {
        if (exist) {
            firebaseUserControl.updateUserLogin(user.uid, user.displayName);
        } else {
            firebaseUserControl.addUser(user.uid, user.displayName);
        }
    });
}

function onSignout() {
    console.log('signed out');
    createChannel.unsetUserData();
}

const firebaseControl = new FirebaseControl(firebase);
const firebaseAuthControl = new FirebaseAuthControl(firebase);
firebaseAuthControl.startMonitoringSigninState(onSignin, onSignout);
const firebaseUserControl = new FirebaseUserControl(firebase);