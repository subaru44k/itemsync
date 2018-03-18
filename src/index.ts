declare const firebase: any;

import Vue from 'vue';

import { Item } from './item/item'
import { FirebaseControl } from './model/firebasecontrol';
import { FirebaseAuthControl } from './model/firebaseauthcontrol';
import { DefaultFirebaseCallback } from './model/defaultfirebasecallback';
import NavbarComponent from './components/navbar';
import SigninButtonComponent from './components/signinbutton';
import SignoutButtonComponent from './components/signoutbutton';
import TodoItemComponent from './components/todoitem';
import AddItemComponent from './components/additem';

const itemList: Item[] = [];
const indexArea = new Vue({
    el: '#index-area',
    data: {
        activeIndex: 0,
        user: null,
        items: itemList
    },
    methods: {
        setUserData(user: any) {
            this.user = user;
        },
        unsetUserData() {
            this.user = null;
        },
        handleLogout: function() {
            firebaseAuthControl.signOut();
        },
        handleSignin: function() {
            firebaseAuthControl.redirectForLogin();
        },
        handleSignout: function() {
            firebaseAuthControl.signOut();
        },
        handleAddItem: function() {
            firebaseControl.addItemForDefaultChannel("new item", "anonymous");
        },
        handleUpdateItem: function(item: Item) {
            firebaseControl.updateItemForDefaultChannel(item, "anonymous");
        },
        handleDeleteItem: function(item: Item) {
            firebaseControl.deleteItemForDefaultChannel(item.getId());
        },
    },
    components: {
        'navigation-menu': NavbarComponent,
        'signin-button': SigninButtonComponent,
        'signout-button': SignoutButtonComponent,
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
    indexArea.setUserData(user);
}

function onSignout() {
    console.log('signed out');
    indexArea.unsetUserData();
}

const firebaseControl = new FirebaseControl(firebase);
const firebaseAuthControl = new FirebaseAuthControl(firebase);
firebaseControl.listenDefaultChannelChange(new DefaultFirebaseCallback(itemList));
firebaseAuthControl.startMonitoringSigninState(onSignin, onSignout);