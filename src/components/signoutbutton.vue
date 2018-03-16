<template lang="pug">
  a.btn.btn-primary.btn-lg(v-on:click='onClick') Sign out
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  
  @Component
  export default class SignoutButton extends Vue {
      onClick() {
          console.log('signout button')
          this.$emit('signout-event');
      }
  }
</script>