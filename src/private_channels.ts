declare const firebase:any;

import Vue from 'vue';
import { FirebaseControl } from './model/firebasecontrol';
import { FirebaseAuthControl } from './model/firebaseauthcontrol';
import { Channel } from './item/channel';
import NavbarComponent from './components/navbar';
import ChannelItem from './components/privatechannelitem';
import { FirebaseUserControl } from './model/firebaseusercontrol';

const channelList: Channel[] = [];

const channelItem = new Vue({
    el: '#privateChannels',
    data: {
        activeIndex: 2,
        user: null,
        channels: channelList
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
        }
    },
    components: {
        'navigation-menu': NavbarComponent,
        'channel-item': ChannelItem
    }
});

function onSignin(user: any) {
    console.log(user);
    console.log(user.displayName);
    console.log(user.email);
    console.log(user.photoURL);
    console.log(user.uid);
    channelItem.setUserData(user);
    // Note: user.uid can be modified by attacker. You also have to limit access by server side.
    firebaseControl.getPrivateChannels(user.uid, 10).then((channels) => {
        channels.forEach((channel) => {
            channelList.push(channel);
        });
    });
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
    channelItem.unsetUserData();
}

const firebaseControl = new FirebaseControl(firebase);
const firebaseAuthControl = new FirebaseAuthControl(firebase);
firebaseAuthControl.startMonitoringSigninState(onSignin, onSignout);
const firebaseUserControl = new FirebaseUserControl(firebase);