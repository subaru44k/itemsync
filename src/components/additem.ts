const templateTags = ''
+ '<img class="add-button" src="/images/add_item.png" v-on:click="onAddClicked">'

import Vue from 'vue'
import Component from 'vue-class-component'

@Component({
    template: templateTags
})
export class AddItemComponent extends Vue {
    private addItem() {
        this.$emit('add-item-event');
    }

    onAddClicked() {
        this.addItem();
    }
}