import { FirebaseCallback } from './firebasecallback';
import { Item } from '../item/item';
import { Channel } from '../item/channel';
import { FirebaseDefaultChannelControl } from './firebasedatabase/FirebaseDefaultChannelControl';
import { FirebasePublicChannelControl } from './firebasedatabase/FirebasePublicChannelControl';

export class FirebaseControl {
    defaultChannelControl: FirebaseDefaultChannelControl;
    publicChannelControl: FirebasePublicChannelControl;

    constructor(firebase: any) {
        this.defaultChannelControl = new FirebaseDefaultChannelControl(firebase);
        this.publicChannelControl = new FirebasePublicChannelControl(firebase);
    }

    addItemForDefaultChannel(itemContent: string, itemCreatedBy: string) {
        return this.defaultChannelControl.addItem('not used', itemContent, itemCreatedBy);
    }

    addItemForPublicChannel(channelId: string, itemContent: string, itemCreatedBy: string) {
        return this.publicChannelControl.addItem(channelId, itemContent, itemCreatedBy);
    }

    updateItemForDefaultChannel(item: Item, itemUpdatedBy: string) {
        return this.defaultChannelControl.updateItem('not used', item, itemUpdatedBy);
    }

    updateItemForPublicChannel(channelId: string, item: Item, itemUpdatedBy: string) {
        return this.publicChannelControl.updateItem(channelId, item, itemUpdatedBy);
    }

    deleteItemForDefaultChannel(itemId: string) {
        return this.defaultChannelControl.deleteItem('not used', itemId);
    }

    deleteItemForPublicChannel(channelId: string, itemId: string) {
        return this.publicChannelControl.deleteItem(channelId, itemId);
    }

    addNewPublicChannel(channelName: string, itemUpdatedBy: string) {
        return this.publicChannelControl.addChannel(channelName, itemUpdatedBy);
    }

    getPublicChannel(channelId: string) {
        return this.publicChannelControl.getChannel(channelId);
    }

    getPublicChannels(limit: number) {
        return this.publicChannelControl.getChannels(limit);
    }

    listenDefaultChannelChange(callback: FirebaseCallback) {
        this.defaultChannelControl.listenChannelChange('not used', callback);
    }

    listenChannelChange(channelId: string, callback: FirebaseCallback) {
        this.publicChannelControl.listenChannelChange(channelId, callback);
    }
}