import { FirebaseDatabaseControl } from './FirebaseDatabaseControl';
import { Item } from '../../item/item';
import { FirebaseCallback } from '../firebasecallback';
import { Channel } from '../../item/channel';

export class FirebasePrivateChannelControl implements FirebaseDatabaseControl {
  firebase: any;
  db: any;
  privateChannelCollectionName: string = 'privateChannels';
  itemConnectionName: string = 'items';

  constructor(firebase: any) {
    this.firebase = firebase;
    this.db = firebase.firestore();
  }

  addItem(channelId: string, itemContent: string, itemCreatedBy: string) {
    return this.getPrivateChannelItemReference(channelId).add({
      content: itemContent,
      createdBy: itemCreatedBy,
      timestamp: this.firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  updateItem(channelId: string, item: Item, itemUpdatedBy: string) {
    return this.getPrivateChannelItemReference(channelId).doc(item.getId()).update({
      content: item.getContent(),
      createdBy: itemUpdatedBy,
      timestamp: this.firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  deleteItem(channelId: string, itemId: string) {
    return this.getPrivateChannelItemReference(channelId).doc(itemId).delete();
  }

  addChannel(channelName: string, itemUpdatedBy: string) {
    return this.getPrivateChannelReference().add({
      name: channelName,
      owner: itemUpdatedBy,
      visibleFor: [],
      timestamp: this.firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  getChannel(channelId: string) {
    return this.getPrivateChannelReference().doc(channelId).get();
  }

  getChannels(userId: string, limit: number) {
    return this.getPrivateChannelReference()
    .where('owner', '==', userId)
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

  listenChannelChange(channelId: string, callback: FirebaseCallback) {
    this.getPrivateChannelItemReference(channelId).onSnapsahot((querySnapShot) => {
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

  private getPrivateChannelItemReference(channelId: string) {
    return this.getPrivateChannelReference()
        .doc(channelId)
        .collection(this.itemConnectionName);
  }

  private getPrivateChannelReference() {
    return this.db.collection(this.privateChannelCollectionName);
  }
}