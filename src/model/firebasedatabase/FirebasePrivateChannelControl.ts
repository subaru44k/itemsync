import { FirebaseDatabaseControl } from './FirebaseDatabaseControl';
import { Item } from '../../item/item';
import { FirebaseCallback } from '../firebasecallback';
import { Channel } from '../../item/channel';

export class FirebasePrivateChannelControl implements FirebaseDatabaseControl {
  firebase: any;
  db: any;
  privateChannelCollectionName: string = 'privateChannels';
  itemCollectionName: string = 'items';

  constructor(firebase: any) {
    this.firebase = firebase;
    this.db = firebase.firestore();
  }

  addItem(channelId: string, itemContent: string, itemCreatedBy: string) {
    return this.getPrivateChannelItemCollectionReference(channelId).add({
      content: itemContent,
      createdBy: itemCreatedBy,
      timestamp: this.firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  updateItem(channelId: string, item: Item, itemUpdatedBy: string) {
    return this.getPrivateChannelItemCollectionReference(channelId).doc(item.getId()).update({
      content: item.getContent(),
      createdBy: itemUpdatedBy,
      timestamp: this.firebase.firestore.FieldValue.serverTimestamp()
    });
  }

  deleteItem(channelId: string, itemId: string) {
    return this.getPrivateChannelItemCollectionReference(channelId).doc(itemId).delete();
  }

  addChannel(channelName: string, itemUpdatedBy: string) {
    return this.getPrivateChannelCollectionReference().add({
      name: channelName,
      owner: itemUpdatedBy,
      visibleFor: {[itemUpdatedBy]: true}, // Use ComputedPropertyName to refer outer variable from Object
      timestamp: this.firebase.firestore.FieldValue.serverTimestamp(),
    });
  }

  getChannel(channelId: string) {
    return this.getPrivateChannelCollectionReference().doc(channelId).get();
  }

  getChannels(userId: string, limit: number) {
    return this.getPrivateChannelCollectionReference()
    .where('visibleFor.' + userId, '==', true)
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
    return this.getPrivateChannelDocumentReference(channelId).get().then((document) => {
      if (document.exists) {
        console.log(document.data()["visibleFor"]);
        return document.data()["visibleFor"];
      } else {
        console.warn('channel not found : ' + channelId);
      }
    })
  }

  addPermission(channelId: string, userId: string) {
    const object = {};
    object["visibleFor." + userId] = true;
    return this.getPrivateChannelDocumentReference(channelId).update(object)
  }

  listenChannelChange(channelId: string, callback: FirebaseCallback) {
    this.getPrivateChannelItemCollectionReference(channelId).onSnapshot((querySnapShot) => {
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

  private getPrivateChannelItemCollectionReference(channelId: string) {
    return this.getPrivateChannelDocumentReference(channelId)
        .collection(this.itemCollectionName);
  }

  private getPrivateChannelCollectionReference() {
    return this.db.collection(this.privateChannelCollectionName);
  }

  private getPrivateChannelDocumentReference(channelId: string) {
    return this.getPrivateChannelCollectionReference()
      .doc(channelId);
  }

}