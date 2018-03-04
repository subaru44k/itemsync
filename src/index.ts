declare const firebase: any;

import Vue from 'vue';

import { Item } from './item/item'
import { TodoItemComponent } from './components/todoitem';
import { FirebaseControl } from './model/firebasecontrol';
import { DefaultFirebaseCallback } from './model/defaultfirebasecallback';
import { AddItemComponent } from './components/additem';

const itemList = [];

const itemArea = new Vue({
    el: '#item-area',
    data: {
        items: itemList
    },
    methods: {
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
        'todo-item': TodoItemComponent,
        'add-item': AddItemComponent
    }
});

const firebaseControl = new FirebaseControl(firebase);
firebaseControl.listenDefaultChannelChange(new DefaultFirebaseCallback(itemList));

