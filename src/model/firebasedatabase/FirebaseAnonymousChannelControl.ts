import { FirebaseDatabaseControl } from "./FirebaseDatabaseControl";
import { Item } from "../../item/item";
import { FirebaseCallback } from "../firebasecallback";
import { Channel } from "../../item/channel";

export class FirebaseAnonymousChannelControl implements FirebaseDatabaseControl {
    private firebase: any;
    private db: any;
    private anonymousChannelCollectionName: string = 'anonymousChannels';
    private itemCollectionName: string = 'items';
    
    constructor(firebase: any) {
        this.firebase = firebase;
        this.db = firebase.firestore();
    }

    addItem(channelId: string, itemContent: string, itemCreatedBy: string) {
        return this.getAnonymousChannelItemCollectionReference(channelId).add({
            content: itemContent,
            createdBy: itemCreatedBy,
            timestamp: this.firebase.firestore.FieldValue.serverTimestamp()
        })
    }

    updateItem(channelId: string, item: Item, itemUpdatedBy: string) {
        return this.getAnonymousChannelItemCollectionReference(channelId).doc(item.getId()).update({
            content: item.getContent(),
            createdBy: itemUpdatedBy,
            timestamp: this.firebase.firestore.FieldValue.serverTimestamp()
        }) 
    }
    deleteItem(channelId: string, itemId: string) {
        return this.getAnonymousChannelItemCollectionReference(channelId).doc(itemId).delete();
    }

    addChannel(channelName: string, itemUpdatedBy: string) {
        return this.getAnonymousChannelCollectionReference().add({
            name: channelName,
            owner: itemUpdatedBy,
            timestamp: this.firebase.firestore.FieldValue.serverTimestamp(),
        });
    }

    getChannel(channelId: string) {
      return this.getAnonymousChannelCollectionReference().doc(channelId).get();
    }

    getChannels(userId: string, limit: number) {
      return this.getAnonymousChannelCollectionReference()
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

    getPermittedUserIds(channelId: string) {
        throw new Error("Method not implemented.");
    }

    addPermission(channelId: string, userId: string) {
        throw new Error("Method not implemented.");
    }

    listenChannelChange(channelId: string, callback: FirebaseCallback) {
      this.getAnonymousChannelItemCollectionReference(channelId).orderBy('timestamp').onSnapshot((querySnapShot) => {
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
      });
    }

    private getAnonymousChannelItemCollectionReference(channelId: string) {
        return this.getAnonymousChannelDocumentReference(channelId)
            .collection(this.itemCollectionName);
    }
    
    private getAnonymousChannelDocumentReference(channelId: string) {
        return this.getAnonymousChannelCollectionReference()
            .doc(channelId);
    }

    private getAnonymousChannelCollectionReference() {
        return this.db.collection(this.anonymousChannelCollectionName);
    }
}