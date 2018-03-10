declare const firebase:any;

import Vue from 'vue';
import { FirebaseControl } from './model/firebasecontrol';
import CreateChannelFromComponent from './components/createchannelform';

const createChannel = new Vue({
    el: '#createChannel',
    methods: {
        handleCreateChannel: function(channelName: string, isPublic: boolean) {
            if (isPublic) {
                firebaseControl.addNewPublicChannel(channelName, 'anonymous').then((docRef) => {
                    console.log('channel added as ID: ', docRef.id);
                    location.href = '../channels/' + docRef.id;
                }).catch((err) =>  {
                    console.log(err);
                });
            } else {
                // implement here
            }
        }
    },
    components: {
        'create-channel-form': CreateChannelFromComponent
    }
});

const firebaseControl = new FirebaseControl(firebase);