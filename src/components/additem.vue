<template lang="pug">
  img.add-button(src='/images/add_item.png', v-on:click="onAddClicked")
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
          this.addItem();
      }
  }
</script>