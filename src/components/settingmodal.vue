<template lang="pug">
#permissionSetting.modal.fade(tabindex='-1', role='dialog', aria-labelledby='exampleModalLabel', aria-hidden='true')
  .modal-dialog(role='document')
    .modal-content
      .modal-header
        h5#permissionSettingLabel.modal-title Channel setting
        button.close(type='button', data-dismiss='modal', aria-label='Close')
          span(aria-hidden='true') ×
      .modal-body
        label.col-form-label Currently visible users:
        .card
          ul.list-group.list-group-flush
            li.list-group-item(v-for='user in visibleusers') {{ user }}
        label.col-form-label(v-if='isReadyToAddSeen') Ready to add:
        .card(v-if='isReadyToAddSeen')
          ul.list-group.list-group-flush(v-if='isReadyToAddSeen')
            li.list-group-item(v-for='user in readytoaddusers') {{ user }}
        form
          .form-group
            label.col-form-label Add visible user:
            input.form-control(type='text', placeholder='input user id here', v-model='addingUserId')
        button.btn.btn-success(type='button', v-on:click='onAddUserClick(addingUserId)') Prepare to add user
      .modal-footer
        button.btn.btn-primary(type='button', v-on:click='onSubmitClick') Save changes
        button.btn.btn-secondary(type='button', data-dismiss='modal') Close
</template>

<script lang="ts">
  declare const window: any;
  declare const document: any;

  import Vue from 'vue'
  import Component from 'vue-class-component'

  @Component({
    props: {
      visibleusers: Array,
      readytoaddusers: Array,
    }
  })
  export default class SettingModalComponent extends Vue {
    addingUserId: string = '';
    visibleusers: string[];
    readytoaddusers: string[];

    get isReadyToAddSeen() {
      return this.readytoaddusers.length !== 0;
    }

    private addUser(userId: string) {
      this.$emit('prepare-to-add-event', userId);
    }

    private addPermission() {
      this.$emit('submit-event');
    }

    private clearUserId() {
      this.addingUserId = '';
    }

    onAddUserClick(userId: string) {
      console.log('add user : ' + userId);
      this.clearUserId();
      if (this.readytoaddusers.includes(userId)) {
        console.log('user id is ready to add');
        return;
      }
      if (this.visibleusers.includes(userId)) {
        console.log('user is already visible');
        return;
      }
      if (userId === '') {
        return;
      }
      this.addUser(userId);
    }

    onSubmitClick() {
      console.log('submit button clicked');
      this.addPermission();
    }
  }
</script>
