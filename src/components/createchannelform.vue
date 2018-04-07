<template lang="pug">
  form.needs-validation(novalidate)
    .form-group
      label(for='channelInput') Channel name
      input.form-control(type='text', id='channelInput', placeholder='Input channel name', v-model='channelName' required)
    .form-group
      .form-check
        input.form-check-input(type='radio', v-model='visibility', id='publicRadio', value='public' checked required)
        label.form-check-label(for='publicRadio') Public
      .form-check
        input.form-check-input(type='radio', v-model='visibility', id='anonymousRadio', value='anonymous')
        label.form-check-label(for='anonymousRadio') Anonymous(User who knows url can access this channel)
      .form-check
        input.form-check-input(type='radio', v-model='visibility', id='privateRadio', value='private' v-bind:disabled='!user')
        label.form-check-label(for='privateRadio') Private 
    button.btn.btn-primary(v-on:click="onClick(channelName, visibility)") Create new channel
</template>

<script lang="ts">
  declare const window: any;
  declare const document: any;

  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    props: {
      user: Object
    }
  })
  export default class CreateChannelForm extends Vue {
    channelName: string = '';
    visibility: string = 'public';
    isChannelNameInvalid: boolean = false;
    isVisibilityInvalid: boolean = false;

    constructor() {
      super();
      this.setClientValidation();
    }

    private setClientValidation() {
      window.addEventListener('load', function() {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function(form) {
          form.addEventListener('submit', function(event) {
            event.preventDefault();
            event.stopPropagation();
            form.classList.add('was-validated');
          }, false);
        });
      }, false);
    }

    private isChannelNameValid(channelName: string) {
      if (channelName === '') {
        return false;
      }
      return true;
    }

    private isVisibilityValid(visibility: string) {
      if (visibility === 'public' || visibility === 'anonymous' || visibility === 'private') {
        return true;
      }
      return false;
    }

    private alertChannelName() {
      this.isChannelNameInvalid = true;
    }

    private alertVisibility() {
      this.isVisibilityInvalid = true;
    }

    onClick() {
      console.log('clicked: ', this.channelName, this.visibility);
      if (this.isChannelNameValid(this.channelName) && this.isVisibilityValid(this.visibility)) {
        this.$emit('create-channel-event', this.channelName, this.visibility);
      } else {
        console.log('invalid input');
      }
    }
  }
</script>
