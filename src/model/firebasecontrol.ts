import { FirebaseCallback } from './firebasecallback';
import { Item } from '../item/item';
import { Channel } from '../item/channel';

export class FirebaseControl {
    firebase: any;
    db: any;
    defaultChannelName: string = 'defaultChannel';
    publicChannelCollectionName: string = 'publicChannels';
    defaultChannelUid: string = '0';
    itemConnectionName: string = 'items';

    constructor(firebase: any) {
        this.firebase = firebase;
        this.db = firebase.firestore();
    }

    addItemForDefaultChannel(itemContent: string, itemCreatedBy: string) {
        return this.getDefaultItemReference().add({
            content: itemContent,
            createdBy: itemCreatedBy,
            timestamp: this.firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    addItemForPublicChannel(channelId: string, itemContent: string, itemCreatedBy: string) {
        return this.getPublicChannelItemReference(channelId).add({
            content: itemContent,
            createdBy: itemCreatedBy,
            timestamp: this.firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    updateItemForDefaultChannel(item: Item, itemUpdateBy: string) {
        return this.getDefaultItemReference().doc(item.getId()).update({
            content: item.getContent(),
            createdBy: itemUpdateBy,
            timestamp: this.firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    updateItemForPublicChannel(channelId: string, item: Item, itemUpdateBy: string) {
        return this.getPublicChannelItemReference(channelId).doc(item.getId()).update({
            content: item.getContent(),
            createdBy: itemUpdateBy,
            timestamp: this.firebase.firestore.FieldValue.serverTimestamp()
        })
    }


    deleteItemForDefaultChannel(itemId: string) {
        return this.getDefaultItemReference().doc(itemId).delete();
    }

    deleteItemForPublicChannel(channelId: string, itemId: string) {
        return this.getPublicChannelItemReference(channelId).doc(itemId).delete();
    }

    addNewPublicChannel(channelName: string, itemUpdateBy: string) {
        return this.getPublicChannelReference().add({
            name: channelName,
            owner: itemUpdateBy,
            timestamp: this.firebase.firestore.FieldValue.serverTimestamp(),
        });
    }

    getPublicChannel(channelId: string) {
        return this.getPublicChannelReference().doc(channelId).get();
    }

    getPublicChannels(limit: number) {
        return this.getPublicChannelReference()
            .orderBy('timestamp')
            .limit(limit)
            .get()
            .then((documentSnapshots) => {
                var channels: Channel[] = [];
                documentSnapshots.forEach((doc) => {
                    channels.push(new Channel(doc.id, doc.data()['name'], doc.data()['createdBy'], doc.data()['timestamp']));
                });
                return channels;
            });
    }

    listenDefaultChannelChange(callback: FirebaseCallback) {
        this.getDefaultItemReference().onSnapshot((querySnapShot) => {
            querySnapShot.docChanges.forEach((change) => {
                if (change.type === 'added') {
                    change.doc.metadata.hasPendingWrites
                     ? callback.onLocalItemAdded(new Item(change.doc.id, change.doc.data()['content'], change.doc.data()['timestamp'], change.doc.data()['createdBy']))
                     : callback.onServerItemAdded(new Item(change.doc.id, change.doc.data()['content'], change.doc.data()['timestamp'], change.doc.data()['createdBy']));
                } else if (change.type === 'modified') {
                    change.doc.metadata.hasPendingWrites
                     ? callback.onLocalItemChanged(new Item(change.doc.id, change.doc.data()['content'], change.doc.data()['timestamp'], change.doc.data()['createdBy']))
                     : callback.onServerItemChanged(new Item(change.doc.id, change.doc.data()['content'], change.doc.data()['timestamp'], change.doc.data()['createdBy']));
                } else if (change.type === 'removed') {
                    change.doc.metadata.hasPendingWrites
                     ? callback.onLocalItemDeleted(new Item(change.doc.id, change.doc.data()['content'], change.doc.data()['timestamp'], change.doc.data()['createdBy']))
                     : callback.onServerItemDeleted(new Item(change.doc.id, change.doc.data()['content'], change.doc.data()['timestamp'], change.doc.data()['createdBy']));
                }  
            });
        })
    }

    listenChannelChange(channelId: string, callback: FirebaseCallback) {
        this.getPublicChannelItemReference(channelId).onSnapshot((querySnapShot) => {
            querySnapShot.docChanges.forEach((change) => {
                if (change.type === 'added') {
                    change.doc.metadata.hasPendingWrites
                     ? callback.onLocalItemAdded(new Item(change.doc.id, change.doc.data()['content'], change.doc.data()['timestamp'], change.doc.data()['createdBy']))
                     : callback.onServerItemAdded(new Item(change.doc.id, change.doc.data()['content'], change.doc.data()['timestamp'], change.doc.data()['createdBy']));
                } else if (change.type === 'modified') {
                    change.doc.metadata.hasPendingWrites
                     ? callback.onLocalItemChanged(new Item(change.doc.id, change.doc.data()['content'], change.doc.data()['timestamp'], change.doc.data()['createdBy']))
                     : callback.onServerItemChanged(new Item(change.doc.id, change.doc.data()['content'], change.doc.data()['timestamp'], change.doc.data()['createdBy']));
                } else if (change.type === 'removed') {
                    change.doc.metadata.hasPendingWrites
                     ? callback.onLocalItemDeleted(new Item(change.doc.id, change.doc.data()['content'], change.doc.data()['timestamp'], change.doc.data()['createdBy']))
                     : callback.onServerItemDeleted(new Item(change.doc.id, change.doc.data()['content'], change.doc.data()['timestamp'], change.doc.data()['createdBy']));
                }  
            });

        })
    }

    private getDefaultItemReference() {
        return this.db.collection(this.defaultChannelName)
            .doc(this.defaultChannelUid)
            .collection(this.itemConnectionName)
    }

    private getPublicChannelItemReference(channelId: string) {
        return this.getPublicChannelReference()
            .doc(channelId)
            .collection(this.itemConnectionName);
    }

    private getPublicChannelReference() {
        return this.db.collection(this.publicChannelCollectionName);
    }

}