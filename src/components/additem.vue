<template lang="pug">
  img.add-button.rounded-circle.cursor-item.shadow(src='/images/add_item.png', v-on:click="onAddClicked")
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  
  @Component
  export default class AddItemComponent extends Vue {
      private addItem() {
          this.$emit('add-item-event');
      }
  
      onAddClicked() {
          console.log('add button')
          this.addItem();
      }
  }
</script>