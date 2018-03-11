declare const firebase:any;

import Vue from 'vue';
import { FirebaseControl } from './model/firebasecontrol';
import { Channel } from './item/channel';
import ChannelItem from './components/channelitem';

const channelList: Channel[] = [];

const channelItem = new Vue({
    el: '#publicChannels',
    data: {
        channels: channelList
    },
    components: {
        'channel-item': ChannelItem
    }
});

const firebaseControl = new FirebaseControl(firebase);
firebaseControl.getPublicChannels(10).then((channels) => {
    channels.forEach((channel) => {
        channelList.push(channel);
    });
});