const templateTags = ''
+ '<div class="col-xl-2 col-md-3 col-sm-6 item-padding">'
+ '  <div class="alert alert-info" v-on:click="itemClicked(item)">'
+ '    <h3 v-if="!isInputVisible">{{ item.getContent() }}</h3>'
+ '    <input type="text" v-model="inputText" v-if="isInputVisible"></input>'
+ '    <button class="btn btn-default" v-if="isInputVisible" v-on:click.stop="itemUpdate(item)">Update</button>'
+ '    <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>'
+ '    <button class="btn btn-default"> View details »</button>'
+ '  </div>'
+ '</div>';

import Vue from 'vue'
import Component from 'vue-class-component'

import { Item } from '../item/item';

@Component({
    props: {
        item: Item
    },
    template: templateTags
})
export class TodoItemComponent extends Vue {
    isInputVisible: boolean = false;
    inputText: string = "";

    updateItem(item: Item) {
        console.log('update ' + item.getContent())
        this.$emit('update-item-event', item);
    }

    deleteItem(item: Item) {

    }

    itemClicked(item: Item) {
        console.log(item.getContent()+ ' clicked');
        this.isInputVisible = true;
        this.inputText = item.getContent();
    }

    itemUpdate(item: Item) {
        this.updateItem(new Item(item.getId(), this.inputText))
        this.isInputVisible = false;
        this.inputText = "";
    }
}