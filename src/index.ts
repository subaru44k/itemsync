import Vue from 'vue';

import { Item } from './item/item'
import { TodoItemComponent } from './components/todoitem';

const itemList = [];

itemList.push(new Item('1', 'one'));
itemList.push(new Item('2', 'two'));
itemList.push(new Item('3', 'three'));
itemList.push(new Item('4', 'four'));
itemList.push(new Item('5', 'five'));
itemList.push(new Item('6', 'six'));
itemList.push(new Item('7', 'seven'));
itemList.push(new Item('8', 'eight'));

const itemArea = new Vue({
    el: '#item-area',
    data: {
        items: itemList
    },
    methods: {
        handleUpdateItem: function(item: Item) {
            itemList.some((v: Item, i) => {
                if (v.isSame(item)) {
                    itemList.splice(i, 1, item);
                    return true;
                }
                return false;
            })

        },
        handleDeleteItem: function(item: Item) {

        }
    },
    components: {
        'todo-item': TodoItemComponent
    }
})