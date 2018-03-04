declare const firebase: any;

import Vue from 'vue';

import { Item } from './item/item'
import { TodoItemComponent } from './components/todoitem';
import { FirebaseControl } from './model/firebasecontrol';
import { DefaultFirebaseCallback } from './model/defaultfirebasecallback';

const itemList = [];

const itemArea = new Vue({
    el: '#item-area',
    data: {
        items: itemList
    },
    methods: {
        handleUpdateItem: function(item: Item) {
            firebaseControl.updateItemForDefaultChannel(item, "anonymous");
        },
        handleDeleteItem: function(item: Item) {
            itemList.some((v: Item, i) => {
                if (v.isSame(item)) {
                    itemList.splice(i, 1);
                    return true;
                }
                return false;
            })
        }
    },
    components: {
        'todo-item': TodoItemComponent
    }
});

const firebaseControl = new FirebaseControl(firebase);
firebaseControl.listenDefaultChannelChange(new DefaultFirebaseCallback(itemList));

