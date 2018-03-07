const templateTags = ''
+ '<div class="col-xl-2 col-md-3 col-sm-6 item-padding">'
+ '  <div class="alert item-color" v-on:click="onItemClicked(item)">'
+ '    <div class="right-align">'
+ '      <img src="/images/checked.svg" v-on:click.stop="onDeleteClicked(item)">'
+ '    </div>'
+ '    <h3 class="no-margin inline-block" v-if="!isInputVisible">{{ item.getContent() }}</h3>'
+ '    <input class="inline-block" type="text" v-model="inputText" v-if="isInputVisible"></input>'
+ '    <button class="btn btn-default" v-if="isInputVisible" v-on:click.stop="onUpdateClicked(item)">Update</button>'
+ '    <div class="right-align">'
+ '      <h5 class="no-margin"><small>{{ item.getCreatedBy() }}</small></h5>'
+ '    </div>'
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

    private updateItem(item: Item) {
        console.log('update ' + item.getContent())
        this.$emit('update-item-event', item);
    }

    private deleteItem(item: Item) {
        console.log('delete ' + item.getContent());
        this.$emit('delete-item-event', item);
    }

    onItemClicked(item: Item) {
        console.log(item.getContent()+ ' clicked');
        this.isInputVisible = true;
        this.inputText = item.getContent();
    }

    onUpdateClicked(item: Item) {
        if (this.inputText !== item.getContent()) {
            this.updateItem(new Item(item.getId(), this.inputText, item.getTimestamp(), item.getCreatedBy()))
        }
        this.isInputVisible = false;
        this.inputText = "";
    }

    onDeleteClicked(item: Item) {
        this.deleteItem(item);
    }
}