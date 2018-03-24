import { Item } from '../../item/item';
import { FirebaseCallback } from '../firebasecallback';

export interface FirebaseDatabaseControl {
  addItem(channelId: string, itemContent: string, itemCreatedBy: string);
  updateItem(channelId: string, item: Item, itemUpdatedBy: string);
  deleteItem(channelId: string, itemId: string);
  addChannel(channelName: string, itemUpdatedBy: string);
  getChannel(channelId: string);
  getChannels(userId: string, limit: number);
  getPermittedUserIds(channelId: string);
  addPermission(channelId: string, userId: string);
  listenChannelChange(channelId: string, callback: FirebaseCallback);
}