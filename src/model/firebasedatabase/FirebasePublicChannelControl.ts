import { FirebaseDatabaseControl } from './FirebaseDatabaseControl';
import { Item } from '../../item/item';
import { FirebaseCallback } from '../firebasecallback';
import { Channel } from '../../item/channel';

export class FirebasePublicChannelControl implements FirebaseDatabaseControl {
  firebase: any;
  db: any;
  publicChannelCollectionName: string = 'publicChannels';
  itemConnectionName: string = 'items';

  constructor(firebase: any) {
    this.firebase = firebase;
    this.db = firebase.firestore();
  }

  addItem(channelId: string, itemContent: string, itemCreatedBy: string) {
    return this.getPublicChannelItemReference(channelId).add({
      content: itemContent,
      createdBy: itemCreatedBy,
      timestamp: this.firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  updateItem(channelId: string, item: Item, itemUpdatedBy: string) {
    return this.getPublicChannelItemReference(channelId).doc(item.getId()).update({
      content: item.getContent(),
      createdBy: itemUpdatedBy,
      timestamp: this.firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  deleteItem(channelId: string, itemId: string) {
    return this.getPublicChannelItemReference(channelId).doc(itemId).delete();
  }

  addChannel(channelName: string, itemUpdatedBy: string) {
    return this.getPublicChannelReference().add({
      name: channelName,
      owner: itemUpdatedBy,
      timestamp: this.firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  getChannel(channelId: string) {
    return this.getPublicChannelReference().doc(channelId).get();
  }

  getChannels(userId: string, limit: number) {
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

  getPermittedUserIds(channelId: string) {
    throw new Error("Method not implemented.");
  }

  addPermission(channelId: string, userId: string) {
    throw new Error("Method not implemented.");
  }

  listenChannelChange(channelId: string, callback: FirebaseCallback) {
    this.getPublicChannelItemReference(channelId).orderBy('timestamp').onSnapshot((querySnapShot) => {
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

  private getPublicChannelItemReference(channelId: string) {
    return this.getPublicChannelReference()
        .doc(channelId)
        .collection(this.itemConnectionName);
  }

  private getPublicChannelReference() {
    return this.db.collection(this.publicChannelCollectionName);
  }
}