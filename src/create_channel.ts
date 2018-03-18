declare const firebase:any;

import Vue from 'vue';
import { FirebaseControl } from './model/firebasecontrol';
import { FirebaseAuthControl } from './model/firebaseauthcontrol';
import NavbarComponent from './components/navbar';
import CreateChannelFromComponent from './components/createchannelform';

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
                    console.log('channel added as ID: ', docRef.id);
                    location.href = './channels/' + docRef.id;
                }).catch((err) =>  {
                    console.log(err);
                });
            } else {
                // implement here
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
}

function onSignout() {
    console.log('signed out');
    createChannel.unsetUserData();
}

const firebaseControl = new FirebaseControl(firebase);
const firebaseAuthControl = new FirebaseAuthControl(firebase);
firebaseAuthControl.startMonitoringSigninState(onSignin, onSignout);