<template lang="pug">
  button.btn.btn-primary('button', v-on:click='onClick') Try now with google account
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'
  
  @Component
  export default class SigninButton extends Vue {
      onClick() {
          console.log('Signin button')
          this.$emit('signin-event');
      }
  }
</script>