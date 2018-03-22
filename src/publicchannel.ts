declare const firebase: any;
declare const channelId: string;

import Vue from 'vue';

import { Item } from './item/item'
import { FirebaseControl } from './model/firebasecontrol';
import { FirebaseAuthControl } from './model/firebaseauthcontrol';
import { DefaultFirebaseCallback } from './model/defaultfirebasecallback';
import NavbarComponent from './components/navbar';
import TodoItemComponent from './components/todoitem';
import AddItemComponent from './components/additem';

const channelName: string[] = [];
const itemList: Item[] = [];

channelName.push('');

const channelArea = new Vue({
    el: '#channel-area',
    data: {
        activeIndex: 1,
        user: null,
        channelName: channelName,
        items: itemList
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
        handleAddItem: function() {
            firebaseControl.addItemForPublicChannel(channelId, "new item", "anonymous");
        },
        handleUpdateItem: function(item: Item) {
            firebaseControl.updateItemForPublicChannel(channelId, item, "anonymous");
        },
        handleDeleteItem: function(item: Item) {
            firebaseControl.deleteItemForPublicChannel(channelId, item.getId());
        },
    },
    components: {
        'navigation-menu': NavbarComponent,
        'todo-item': TodoItemComponent,
        'add-item': AddItemComponent
    }
});

function onSignin(user: any) {
    console.log(user);
    console.log(user.displayName);
    console.log(user.email);
    console.log(user.photoURL);
    console.log(user.uid);
    channelArea.setUserData(user);
}

function onSignout() {
    console.log('signed out');
    channelArea.unsetUserData();
}

const firebaseControl = new FirebaseControl(firebase);
firebaseControl.getPublicChannel(channelId).then((channelDoc) => {
    channelName.pop();
    channelName.push(channelDoc.data()['name']);
});
firebaseControl.listenPublicChannelChange(channelId, new DefaultFirebaseCallback(itemList));
const firebaseAuthControl = new FirebaseAuthControl(firebase);
firebaseAuthControl.startMonitoringSigninState(onSignin, onSignout);
