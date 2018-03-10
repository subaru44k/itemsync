<template lang="pug">
  form
    .form-group
      label(for='channelName') Channel name
      input.form-control(type='text', id='channelName', placeholder='Input channel name')
    .form-group
      .form-check
        input.form-check-input(type='radio', name='visibility', id='publicRadio', value='public' checked)
        label.form-check-label(for='publicRadio') Public
      .form-check
        input.form-check-input(type='radio', name='visibility', id='privateRadio', value='private' disabled)
        label.form-check-label(for='privateRadio') Private 
    button.btn.btn-primary(type='submit') Create new channel
</template>

<script lang="ts">
  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component
  export default class CreateChannelForm extends Vue {

  }
</script>
