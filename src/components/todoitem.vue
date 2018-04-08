<template lang="pug">
  .col-xl-3.col-md-4.col-sm-6.pr-2.pl-2.pt-1.pb-1
    .card(v-on:click="onItemClicked(item)")
      .right-align
        img(src="/images/checked.svg", v-on:click.stop="onDeleteClicked(item)")
      .card-body
        h5.card-text.m-0.inline-block(v-if="!isInputVisible") {{ item.getContent() }}
        input.inline-block(type="text", v-model="inputText", v-if="isInputVisible", v-on:click.stop="onInputClicked")
        button.btn.btn-success(type='button', v-if="isInputVisible", v-on:click.stop="onUpdateClicked(item)") Update
        .right-align
          p.font-weght-light.font-italic.m-0
              small {{ item.getCreatedBy() }}
</template>

<script lang='ts'>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  
  import { Item } from '../item/item';
  
  @Component({
      props: {
          item: Item
      }
  })
  export default class TodoItemComponent extends Vue {
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

      onInputClicked() {
        // nothing to do
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
</script>