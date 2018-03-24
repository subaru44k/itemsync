declare const firebase: any;
declare const channelId: string;

import Vue from 'vue';

import { Item } from './item/item'
import { FirebaseControl } from './model/firebasecontrol';
import { FirebaseAuthControl } from './model/firebaseauthcontrol';
import { FirebaseUserControl } from './model/firebaseusercontrol';
import { DefaultFirebaseCallback } from './model/defaultfirebasecallback';
import SettingModalComponent from './components/settingmodal';
import NavbarComponent from './components/navbar';
import TodoItemComponent from './components/todoitem';
import AddItemComponent from './components/additem';

const channelName: string[] = [];
const visibleUsers: string[] = [];
const itemList: Item[] = [];

channelName.push('');

const channelArea = new Vue({
    el: '#channel-area',
    data: {
        activeIndex: 2,
        user: null,
        visibleUsers: visibleUsers,
        readyToAddUsers: [],
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
        handlePrepareToAddUser(userId: string) {
            firebaseUserControl.isUserExist(userId).then((result) => {
                if (result) {
                    console.log(userId + ' exists');
                    this.readyToAddUsers.push(userId);
                } else {
                    console.log(userId + ' does not exist');
                }
            });
        },
        handleSubmit() {
            Promise.all(
                this.readyToAddUsers.map((userId) => {
                    return firebaseControl.addPermission(channelId, userId);
                })
            ).then(() => {
                console.log('permission granted')
                // add permitted users to visibleUsers variable
                this.readyToAddUsers.forEach(element => {
                   visibleUsers.push(element); 
                });
                // delete readyToAddUsers variable.
                // Note vue.js cannot detect changed when this.readyToAddUsers.lengh = 0 is used.
                // see: https://jp.vuejs.org/v2/guide/list.html#%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A0%85
                this.readyToAddUsers.splice(0);
            }).catch((err) => {
                // Do not rollback now.
                // TODO: Please consider rollback required or not when some user cannot add to visible group.
                console.warn('failed to add permission');
                console.warn(err);
            });
        },
        handleAddItem: function() {
            // TODO consider user.displayName cannot be changed even account user change its name by google accout setting page
            firebaseControl.addItemForPrivateChannel(channelId, "new item", this.user.displayName);
        },
        handleUpdateItem: function(item: Item) {
            firebaseControl.updateItemForPrivateChannel(channelId, item, "anonymous");
        },
        handleDeleteItem: function(item: Item) {
            firebaseControl.deleteItemForPrivateChannel(channelId, item.getId());
        },
    },
    components: {
        'setting-modal': SettingModalComponent,
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
    firebaseUserControl.isUserExist(user.uid).then((exist) => {
        if (exist) {
            firebaseUserControl.updateUserLogin(user.uid);
        } else {
            firebaseUserControl.addUser(user.uid);
        }
    });
}

function onSignout() {
    console.log('signed out');
    channelArea.unsetUserData();
}

const firebaseControl = new FirebaseControl(firebase);
firebaseControl.getPrivateChannel(channelId).then((channelDoc) => {
    channelName.pop();
    channelName.push(channelDoc.data()['name']);
});
firebaseControl.getPermittedUserIds(channelId).then((userIds) => {
    let id;
    for (id in userIds) {
        visibleUsers.push(id)
    }
});
firebaseControl.listenPrivateChannelChange(channelId, new DefaultFirebaseCallback(itemList));
const firebaseAuthControl = new FirebaseAuthControl(firebase);
firebaseAuthControl.startMonitoringSigninState(onSignin, onSignout);
const firebaseUserControl = new FirebaseUserControl(firebase);