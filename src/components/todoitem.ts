const templateTags = ''
+ '<div class="col-xl-2 col-md-3 col-sm-6">'
+ '  <h3>Heading</h3>'
+ '  <p>Donec id elit non mi porta gravida at eget metus. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Etiam porta sem malesuada magna mollis euismod. Donec sed odio dui.</p>'
+ '  <button class="btn btn-default">View details »</button>'
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
    updateItem(item: Item) {

    }

    deleteItem(item: Item) {

    }

}