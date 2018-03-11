declare const firebase: any;
declare const channelId: string;

import Vue from 'vue';

import { Item } from './item/item'
import { FirebaseControl } from './model/firebasecontrol';
import { DefaultFirebaseCallback } from './model/defaultfirebasecallback';
import TodoItemComponent from './components/todoitem';
import AddItemComponent from './components/additem';

const channelName: string[] = [];
const itemList: Item[] = [];

channelName.push('');

const itemArea = new Vue({
    el: '#item-area',
    data: {
        channelName: channelName,
        items: itemList
    },
    methods: {
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
        'todo-item': TodoItemComponent,
        'add-item': AddItemComponent
    }
});

const firebaseControl = new FirebaseControl(firebase);
firebaseControl.getPublicChannel(channelId).then((channelDoc) => {
    channelName.pop();
    channelName.push(channelDoc.data()['name']);
});
firebaseControl.listenChannelChange(channelId, new DefaultFirebaseCallback(itemList));
