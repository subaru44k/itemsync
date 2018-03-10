import Vue from 'vue';
import CreateChannelFromComponent from './components/createchannelform';

const createChannel = new Vue({
    el: '#createChannel',
    components: {
        'create-channel-form': CreateChannelFromComponent
    }
});