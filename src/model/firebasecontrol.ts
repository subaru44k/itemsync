import { FirebaseCallback } from './firebasecallback';
import { Item } from '../item/item';
import { Channel } from '../item/channel';
import { FirebaseDefaultChannelControl } from './firebasedatabase/FirebaseDefaultChannelControl';
import { FirebasePublicChannelControl } from './firebasedatabase/FirebasePublicChannelControl';
import { FirebasePrivateChannelControl } from './firebasedatabase/FirebasePrivateChannelControl';

export class FirebaseControl {
    defaultChannelControl: FirebaseDefaultChannelControl;
    publicChannelControl: FirebasePublicChannelControl;
    privateChannelControl: FirebasePrivateChannelControl;

    constructor(firebase: any) {
        this.defaultChannelControl = new FirebaseDefaultChannelControl(firebase);
        this.publicChannelControl = new FirebasePublicChannelControl(firebase);
        this.privateChannelControl = new FirebasePrivateChannelControl(firebase);
    }

    addItemForDefaultChannel(itemContent: string, itemCreatedBy: string) {
        return this.defaultChannelControl.addItem('not used', itemContent, itemCreatedBy);
    }

    addItemForPublicChannel(channelId: string, itemContent: string, itemCreatedBy: string) {
        return this.publicChannelControl.addItem(channelId, itemContent, itemCreatedBy);
    }

    addItemForPrivateChannel(channelId: string, itemContent: string, itemCreatedBy: string) {
        return this.privateChannelControl.addItem(channelId, itemContent, itemCreatedBy);
    }

    updateItemForDefaultChannel(item: Item, itemUpdatedBy: string) {
        return this.defaultChannelControl.updateItem('not used', item, itemUpdatedBy);
    }

    updateItemForPublicChannel(channelId: string, item: Item, itemUpdatedBy: string) {
        return this.publicChannelControl.updateItem(channelId, item, itemUpdatedBy);
    }

    updateItemForPrivateChannel(channelId: string, item: Item, itemUpdatedBy: string) {
        return this.privateChannelControl.updateItem(channelId, item, itemUpdatedBy);
    }

    deleteItemForDefaultChannel(itemId: string) {
        return this.defaultChannelControl.deleteItem('not used', itemId);
    }

    deleteItemForPublicChannel(channelId: string, itemId: string) {
        return this.publicChannelControl.deleteItem(channelId, itemId);
    }

    deleteItemForPrivateChannel(channelId: string, itemId: string) {
        return this.privateChannelControl.deleteItem(channelId, itemId);
    }

    addNewPublicChannel(channelName: string, itemUpdatedBy: string) {
        return this.publicChannelControl.addChannel(channelName, itemUpdatedBy);
    }

    addNewPrivateChannel(channelName: string, itemUpdatedBy: string) {
        return this.privateChannelControl.addChannel(channelName, itemUpdatedBy);
    }

    getPublicChannel(channelId: string) {
        return this.publicChannelControl.getChannel(channelId);
    }

    getPrivateChannel(channelId: string) {
        return this.privateChannelControl.getChannel(channelId);
    }

    getPublicChannels(limit: number) {
        // FIXME argument 'limit' can be modified by clients
        // This also should be restricted on server.
        // see https://firebase.google.com/docs/firestore/security/rules-query#evaluating_constraints_on_queries
        return this.publicChannelControl.getChannels('not used', limit);
    }

    getPrivateChannels(userId: string, limit: number) {
        // FIXME argument 'userId' and 'limit' can be modified by clients
        return this.privateChannelControl.getChannels(userId, limit);
    }

    getPermittedUserIds(channelId: string) {
        return this.privateChannelControl.getPermittedUserIds(channelId);
    }

    addPermission(channelId: string, userId: string) {
        return this.privateChannelControl.addPermission(channelId, userId);
    }

    listenDefaultChannelChange(callback: FirebaseCallback) {
        this.defaultChannelControl.listenChannelChange('not used', callback);
    }

    listenPublicChannelChange(channelId: string, callback: FirebaseCallback) {
        this.publicChannelControl.listenChannelChange(channelId, callback);
    }

    listenPrivateChannelChange(channelId: string, callback: FirebaseCallback) {
        this.privateChannelControl.listenChannelChange(channelId, callback);
    }
}