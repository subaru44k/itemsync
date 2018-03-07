import { FirebaseCallback } from './firebasecallback';
import { Item } from '../item/item';

export class FirebaseControl {
    firebase: any;
    db: any;
    defaultChannelName: string = 'defaultChannel';
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

    updateItemForDefaultChannel(item: Item, itemUpdateBy: string) {
        return this.getDefaultItemReference().doc(item.getId()).update({
            content: item.getContent(),
            createdBy: itemUpdateBy,
            timestamp: this.firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    deleteItemForDefaultChannel(itemId: string) {
        return this.getDefaultItemReference().doc(itemId).delete();
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

    private getDefaultItemReference() {
        return this.db.collection(this.defaultChannelName)
            .doc(this.defaultChannelUid)
            .collection(this.itemConnectionName)
    }

}