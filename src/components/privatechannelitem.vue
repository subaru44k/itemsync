<template lang="pug">
  .pr-2.pl-2.pt-1.pb-1
    .card
      .card-body 
        a(v-bind:href='url') {{ channel.getName() }} 
</template>

<script lang='ts'>
  import Vue from 'vue'
  import Component from 'vue-class-component'
  import { Channel } from '../item/channel'

  @Component({
      props: {
          channel: Channel
      }
  })
  export default class ChannelItemComponent extends Vue {
    channel: Channel;

    get url() {
      return './privatechannels/' + this.channel.getId();
    }
  }
</script>